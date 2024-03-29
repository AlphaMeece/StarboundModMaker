let CurrentItem = require("./CurrentItem")
const fs = require("fs")
const path = require("path")
const { ipcRenderer } =  require("electron");
const remote = require("@electron/remote")

let directional = true;
let tags = []
let userTags = JSON.parse(fs.readFileSync("userTags.json", {encoding: "utf-8"}))
let simulator = null

let filepath = null;
let filepathSpan = document.getElementById("filepath")
let cursorPos = document.getElementById("cursorPos")

let realImage, trueWidth
let framesInput = document.getElementById("animationFrames")
let cycleInput = document.getElementById("animationTime")
let orientationsAnimated = document.getElementById("orientationsAnimated")
let width, maxWidth, height, maxHeight
let animated = false;
let animationInterval = null
let frames = 1, cycle = 1
let offset = 0
let anchor = "bottom"

let cover = document.getElementById("cover")
let coverBG = document.getElementById("coverBG")
let cover2 = document.getElementById("cover2")
let cover2BG = document.getElementById("cover2BG")
let tagList = document.getElementById("tagList")
let tagSpace = document.getElementById("tags")

let iconImage = document.getElementById("inventoryIcon")
let objectImage = document.getElementById("orientations")

let type = document.getElementById("type")
let select = document.getElementById("selectfilepath")
let tagButton = document.getElementById("tagschangebutton")
let createTagButton = document.getElementById("createNewTag")
let doneTagButton = document.getElementById("doneTags")
let finishNewTagButton = document.getElementById("finishNewTag")
let cancelNewTagButton = document.getElementById("cancelNewTag")
let colonySearch = document.getElementById("colonyTagSearch")
let newTagInput = document.getElementById("newTag")
let types = [
    document.getElementById("object"), 
    document.getElementById("item"),
    document.getElementById("weapon"),
    document.getElementById("armor")
]
let itemID = document.getElementById("itemIDInput")

let shortdescription = document.getElementById("shortDescription")
let category = document.getElementById("category")
let race = document.getElementById("raceDropdown")
let descriptionCheckbox = document.getElementById("matchingdescriptions")
let apexDescription = document.getElementById("apexDescription")
let avianDescription = document.getElementById("avianDescription")
let floranDescription = document.getElementById("floranDescription")
let hylotlDescription = document.getElementById("hylotlDescription")
let humanDescription = document.getElementById("humanDescription")
let novakidDescription = document.getElementById("novakidDescription")
let glitchDescription = document.getElementById("glitchDescription")

let apexDescriptionReal = document.getElementById("apexinspect")
let avianDescriptionReal = document.getElementById("avianinspect")
let floranDescriptionReal = document.getElementById("floraninspect")
let hylotlDescriptionReal = document.getElementById("hylotlinspect")
let humanDescriptionReal = document.getElementById("humaninspect")
let novakidDescriptionReal = document.getElementById("novakidinspect")
let glitchDescriptionReal = document.getElementById("glitchinspect")

let generateButton = document.getElementById("save")

const lcm = (a, b) => {
    let hcf
    for (let i = 1; i <= a && i <= b; i++) {
        if( a % i == 0 && b % i == 0) {
            hcf = i;
        }
    }

    return a * b / hcf
}

const sendImage = () => {
    simulator.webContents.send('image-sent', objectImage.src, {
        "bidirectional": directional,
        "animated": animated,
        "animation": {
            "frames": frames,
            "frameLength": cycle
        }
    })
}

const animate = () => {
    if(offset - width < -maxWidth) offset = 0
    orientationsAnimated.style.backgroundPositionX = `${offset}px`
    offset -= width
}

const newFrames = () => {
    let old = frames
    clearInterval(animationInterval)
    offset = 0
    frames = +framesInput.value
    cursorPos.innerHTML = `[-${trueWidth / frames / 2}, 0]`
    for(let i = 0; i < frames-old; i++) {
        if(maxHeight <= 80) {
            let m = lcm(maxHeight, old+i) / maxHeight
            if(maxWidth * m / (old+i) < 512) {
                maxHeight *= m
                height *= m
                maxWidth *= m
            }
        }   
    }
    
    width = maxWidth / frames
    orientationsAnimated.style.backgroundImage = `url(${objectImage.src})`
    orientationsAnimated.style.width = `${width}px`
    orientationsAnimated.style.height = `${height}px`
    orientationsAnimated.style.backgroundSize = `${maxWidth}px ${height}px`
    animate()
    animationInterval = setInterval(animate, 1000 * cycle)
    if(simulator) sendImage()
}

const newTime = () => {
    offset = 0
    cycle = +cycleInput.value
    clearInterval(animationInterval)
    animate()
    animationInterval = setInterval(animate, 1000 * cycle)
    if(simulator) sendImage()
}

const changeDirectionality = (direction) => {
    let buttons = document.getElementsByClassName("directionalButton")
    if(direction == 1) {
        if(buttons[0].classList.contains("clicked")) buttons[0].classList.remove("clicked")
        if(!buttons[1].classList.contains("clicked")) buttons[1].classList.add("clicked")
        directional = false
    } else if(direction == 2) {
        if(!buttons[0].classList.contains("clicked")) buttons[0].classList.add("clicked")
        if(buttons[1].classList.contains("clicked")) buttons[1].classList.remove("clicked")
        directional = true
    }
    if(simulator) sendImage()
}

const changeAnimation = (animation) => {
    let buttons = document.getElementsByClassName("animationButton")
    animated = animation
    if(animation == false) {
        if(buttons[0].classList.contains("clicked")) buttons[0].classList.remove("clicked")
        if(!buttons[1].classList.contains("clicked")) buttons[1].classList.add("clicked")
        document.getElementById("animationBox").style.display = "none"
        objectImage.style.display = "block"
        orientationsAnimated.style.display = "none"
        clearInterval(animationInterval)
    } else if(animation == true) {
        if(!buttons[0].classList.contains("clicked")) buttons[0].classList.add("clicked")
        if(buttons[1].classList.contains("clicked")) buttons[1].classList.remove("clicked")
        document.getElementById("animationBox").style.display = "flex"
        objectImage.style.display = "none"
        orientationsAnimated.style.display = "block"
        animationInterval = setInterval(animate, 1000 * cycle)
    }
    if(simulator) sendImage()
}

const generateTags = () => {
    tags = []
    let names = []
    let li = tagList.getElementsByTagName("li")

    for(let i = 0; i < li.length; i++) {
        let box = li[i].getElementsByTagName("input")[0]
        if(box.checked) {
            names.push(li[i].innerText.split("|")[0].slice(1))
            tags.push(li[i].innerText.split("|")[0].slice(1).toLowerCase().replace(" ", ""))
        }
    }

    tagSpace.innerText = names.join(", ")
}

const loadJSON = () => {
    for(tag of userTags) {
        tagList.innerHTML += `<li><input type="checkbox"> ${tag.display}<button style="display: block; float: right" onclick="deleteTag(this)">|Delete|</button></li>`
    }
}

const simulatorWindow = () => {
    if(simulator) {
        let ans = prompt("Warning: Simulator window is already open, to close the window please type \"CLOSE\"")
        if(ans == "CLOSE") simulator.close()
        simulator = null
    }
    simulator = new remote.BrowserWindow({
    width: 1280,
    height: 768,
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    },
    })

    simulator.loadFile("simulator.html");
    simulator.once("ready-to-show", (event) => {
        sendImage()
    })
    simulator.on('before-quit', () => {
        simulator.webContents.send('gimme-data')
    })
    simulator.on('close', () => {
        simulator = null
    })
}

const createTag = (name) => {
    let id = name.toLowerCase().replace(" ", "")

    userTags.push({
        "display": name,
        "id": id
    })

    tagList.innerHTML += `<li><input type="checkbox"> ${name}<button style="display: block; float: right" onclick="deleteTag(this)">|Delete|</button></li>`
    fs.writeFileSync("userTags.json", JSON.stringify(userTags))
}

const deleteTag = (button) => {
    button.parentElement.remove()
    userTags = userTags.filter(x => x["id"] != button.parentElement.innerText.split("|")[0].slice(1).toLowerCase().replace(" ", ""))
    fs.writeFileSync("userTags.json", JSON.stringify(userTags))
}

CurrentItem.item = JSON.parse(fs.readFileSync("./dummies/object.json", "utf-8"))
CurrentItem.type = "object" 

type.addEventListener("change", (event) => {
    CurrentItem.item = JSON.parse(fs.readFileSync(`./dummies/${type.value}.json`, "utf-8"))
    CurrentItem.type = type.value
    for(let element of types) {
        element.classList = ["block", element.id == type.value ? "":" hidden"]
    }
})

colonySearch.addEventListener("change", (event) => {
    let input = colonySearch.value
    let filter = input.toUpperCase()
    let li = tagList.getElementsByTagName("li")

    for(let i = 0; i < li.length; i++) {
        let text = li[i].innerText.split("|")[0].slice(1).toUpperCase()
        if(text.indexOf(filter) > -1) {
            li[i].style.display = ""
        } else {
            li[i].style.display = "none"
        }
    }
})

tagButton.addEventListener("click", (event) => {
    cover.classList.remove("hidden")
})

coverBG.addEventListener("click", (event) => {
    cover.classList.add("hidden")
    generateTags()
})

cover2BG.addEventListener("click", (event) => {
    cover2.classList.add("hidden")
    generateTags()
})

doneTagButton.addEventListener("click", (event) => {
    cover.classList.add("hidden")
    generateTags()
})

finishNewTagButton.addEventListener("click", (event) => {
    cover2.classList.add("hidden")
    createTag(newTagInput.value)
    newTagInput.value = ""
    generateTags()
})

cancelNewTagButton.addEventListener("click", (event) => {
    cover2.classList.add("hidden")
    generateTags()
})

createTagButton.addEventListener("click", (event) => {
    cover2.classList.remove("hidden")
})

select.addEventListener("click", (event) => {
    ipcRenderer.send('getpath', "folder")
})

iconImage.addEventListener("click", (event) => {
    ipcRenderer.send('getpath', 'icon')
})

orientationsAnimated.addEventListener("click", (event) => {
    ipcRenderer.send('getpath', 'object')
})

objectImage.addEventListener("click", (event) => {
    ipcRenderer.send('getpath', 'object')
})

generateButton.addEventListener("click", (event) => {
    CurrentItem.item["objectName"] = itemID.value
    CurrentItem.item["colonyTags"] = tags
    CurrentItem.item["rarity"] = rarity.value
    CurrentItem.item["price"] = +price.value
    CurrentItem.item["description"] = description.value
    CurrentItem.item["shortdescription"] = shortdescription.value
    CurrentItem.item["race"] = race.value
    CurrentItem.item["category"] = category.value
    if(descriptionCheckbox.checked) {
        CurrentItem.item["apexDescription"] = apexDescriptionReal.value
        CurrentItem.item["avianDescription"] = apexDescriptionReal.value
        CurrentItem.item["floranDescription"] = apexDescriptionReal.value
        CurrentItem.item["glitchDescription"] = apexDescriptionReal.value
        CurrentItem.item["humanDescription"] = apexDescriptionReal.value
        CurrentItem.item["hylotlDescription"] = apexDescriptionReal.value
        CurrentItem.item["novakidDescription"] = apexDescriptionReal.value
    } else {
        CurrentItem.item["apexDescription"] = apexDescriptionReal.value
        CurrentItem.item["avianDescription"] = avianDescriptionReal.value
        CurrentItem.item["floranDescription"] = floranDescriptionReal.value
        CurrentItem.item["glitchDescription"] = glitchDescriptionReal.value
        CurrentItem.item["humanDescription"] = humanDescriptionReal.value
        CurrentItem.item["hylotlDescription"] = hylotlDescriptionReal.value
        CurrentItem.item["novakidDescription"] = novakidDescriptionReal.value
    }
    CurrentItem.item["orientations"] = [
        {
            "imageLayers": [ { "image" : `${itemID.value}.png` } ],
            "direction": "left",
            "imagePosition" : JSON.parse(cursorPos.innerText),
            "frames" : frames,
            "animationCycle": cycle,
            "spaceScan": 0.1,
            "anchors": [anchor]
        }
    ]
    if(directional) {
        CurrentItem.item["orientations"].push({
            "imageLayers": [ { "image" : `${itemID.value}.png` } ],
            "flipImages": true,
            "direction": "right",
            "imagePosition" : JSON.parse(cursorPos.innerText),
            "frames" : frames,
            "animationCycle": cycle,
            "spaceScan": 0.1,
            "anchors": [anchor]
        })
    }
    let filteredName = [...itemID.value].filter(x => /[a-z]/i.test(x)).join("")
    let folder = path.join(filepath, filteredName)
    if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
        fs.writeFileSync(path.join(folder, `${filteredName}.object`), JSON.stringify(CurrentItem.item, null, '\t'))
        fs.writeFileSync(path.join(folder, `${filteredName}.frames`), JSON.stringify({
            "frameGrid": {
                "size": [trueWidth/frames, realImage.height],
                "dimensions": [frames, 1],
                "names": [
                    Array(frames).fill(0).map((x, i) => `default.${i}`)
                ]
            },
            "aliases": {
                "default.default": "default.0"
            }
        }, null, '\t'))
        fs.copyFileSync(path.normalize(objectImage.src).slice(6), path.join(folder, `${filteredName}.png`))
        fs.copyFileSync(path.normalize(iconImage.src).slice(6), path.join(folder, "icon.png"))
    }
})

ipcRenderer.on('gottenpath', (event, type, path) => {
    if(path["canceled"]) return
    switch(type) {
        case "folder":
            filepath = path["filePaths"][0]
            filepathSpan.innerHTML = filepath
            break
        case "icon":
            iconImage.src = path["filePaths"][0]
            break
        case "object":
            let old = objectImage.style.display
            objectImage.style.display = "block"
            objectImage.src = path["filePaths"][0]
            realImage = new Image()
            realImage.src = objectImage.src
            realImage.onload = () => {
                trueWidth = realImage.width
                cursorPos.innerHTML = `[-${trueWidth / 2}, 0]`
            }
            objectImage.onload = () => {
                width = maxWidth = objectImage.width
                height = maxHeight = objectImage.height
                orientationsAnimated.style.backgroundImage = `url(${objectImage.src})`
                orientationsAnimated.style.width = `${width}px`
                orientationsAnimated.style.height = `${height}px`
                orientationsAnimated.style.backgroundSize = `${width}px ${height}px`
                objectImage.style.display = old
                if(simulator) sendImage()
            }
            break
    }
    
})

ipcRenderer.on('closeWindows', (event) => {
    if(simulator) simulator.close()
})

ipcRenderer.on('simulator-data', (event, data) => {
    anchor = data['anchor']
})

descriptionCheckbox.addEventListener("change", (event) => {
    if(event.target.checked) {
        apexDescription.children[0].src = "assets/mainWindow/aiIcon.png"
        avianDescription.style.display = "none"
        floranDescription.style.display = "none"
        glitchDescription.style.display = "none"
        humanDescription.style.display = "none"
        hylotlDescription.style.display = "none"
        novakidDescription.style.display = "none"
    } else {
        apexDescription.children[0].src = "assets/mainWindow/apexIcon.png"
        avianDescription.style.display = ""
        floranDescription.style.display = ""
        glitchDescription.style.display = ""
        humanDescription.style.display = ""
        hylotlDescription.style.display = ""
        novakidDescription.style.display = ""
    }
})