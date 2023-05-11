let CurrentItem = require("./CurrentItem")
const fs = require("fs")
const { ipcRenderer } =  require("electron");
const remote = require("@electron/remote")

let tags = []
let userTags = JSON.parse(fs.readFileSync("userTags.json", {encoding: "utf-8"}))
let simulator = null

let filepath = null;
let filepathSpan = document.getElementById("filepath")

let cover = document.getElementById("cover")
let coverBG = document.getElementById("coverBG")
let cover2 = document.getElementById("cover2")
let cover2BG = document.getElementById("cover2BG")
let tagList = document.getElementById("tagList")
let tagSpace = document.getElementById("tags")

let iconImage = document.getElementById("inventoryIcon")
let objectImage = document.getElementById("orientations")

let save = document.getElementById("save")
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

let descriptionCheckbox = document.getElementById("matchingdescriptions")
let apexDescription = document.getElementById("apexDescription")
let avianDescription = document.getElementById("avianDescription")
let floranDescription = document.getElementById("floranDescription")
let hylotlDescription = document.getElementById("hylotlDescription")
let humanDescription = document.getElementById("humanDescription")
let novakidDescription = document.getElementById("novakidDescription")

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
        simulator.webContents.send('image-sent', objectImage.src)
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

save.addEventListener("click", (event) => {
    let path = "./bones/bananas/"
    let fileName = "aaaaaa.txt"
    if(!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
    fs.writeFile(path + fileName, "aaaaaaaaaaaaaaaaa\nsssssssssssssssss\ngggggggggggggggggggg\n\n\n\n\n\n\n", (error) => console.error(error))
})

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

objectImage.addEventListener("click", (event) => {
    ipcRenderer.send('getpath', 'object')
})

ipcRenderer.on('gottenpath', (event, type, path) => {
    switch(type) {
        case "folder":
            filepath = path["filePaths"][0]
            filepathSpan.innerHTML = filepath
            break
        case "icon":
            iconImage.src = path["filePaths"][0]
            break
        case "object":
            objectImage.src = path["filePaths"][0]
            break
    }
    
})

descriptionCheckbox.addEventListener("change", (event) => {
    if(event.target.checked) {
        apexDescription.children[0].src = "assets/aiIcon.png"
        avianDescription.style.display = "none"
        floranDescription.style.display = "none"
        glitchDescription.style.display = "none"
        humanDescription.style.display = "none"
        hylotlDescription.style.display = "none"
        novakidDescription.style.display = "none"
    } else {
        apexDescription.children[0].src = "assets/apexIcon.png"
        avianDescription.style.display = ""
        floranDescription.style.display = ""
        glitchDescription.style.display = ""
        humanDescription.style.display = ""
        hylotlDescription.style.display = ""
        novakidDescription.style.display = ""
    }
})