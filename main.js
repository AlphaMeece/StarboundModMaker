let CurrentItem = require("./CurrentItem")
const fs = require("fs")
const { ipcRenderer } =  require("electron")

let filepath = null;
let filepathSpan = document.getElementById("filepath")

let save = document.getElementById("save")
let type = document.getElementById("type")
let select = document.getElementById("selectfilepath")
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

select.addEventListener("click", (event) => {
    ipcRenderer.send('getpath')
})

ipcRenderer.on('gottenpath', (event, path) => {
    filepath = path["filePaths"][0]
    filepathSpan.innerHTML = filepath
})

descriptionCheckbox.addEventListener("change", (event) => {
    if(event.target.checked) {
        avianDescription.setAttribute("disabled", true)
        floranDescription.setAttribute("disabled", true)
        glitchDescription.setAttribute("disabled", true)
        humanDescription.setAttribute("disabled", true)
        hylotlDescription.setAttribute("disabled", true)
        novakidDescription.setAttribute("disabled", true)
    } else {
        avianDescription.removeAttribute("disabled")
        floranDescription.removeAttribute("disabled")
        glitchDescription.removeAttribute("disabled")
        humanDescription.removeAttribute("disabled")
        hylotlDescription.removeAttribute("disabled")
        novakidDescription.removeAttribute("disabled")
    }
})