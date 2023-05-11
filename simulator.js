const { ipcRenderer } =  require("electron");

let canvas, ctx
let background = new Image()
let bHeight, bWidth
let oHeight, oWidth, oScale
let cursor = new Image()
let cHeight, cWidth
let height, width
let objectImage

const draw = () => {
    canvas.height = height = window.innerHeight
    canvas.width = width = window.innerWidth
    ctx.imageSmoothingEnabled = false
    if(background) ctx.drawImage(background, width/2 - bWidth, height - bHeight * 2, bWidth * 2, bHeight * 2)
    if(objectImage) ctx.drawImage(objectImage, width/2, height - oHeight * 2 - 16, oWidth * 2, oHeight * 2)
    if(cursor) ctx.drawImage(cursor, width/2 + oWidth, height - cHeight - 8, cWidth * 2, cHeight * 2)
}

const startSimulator = () => {
    canvas = document.getElementById("simulatorCanvas")
    ctx = canvas.getContext("2d")

    background.src = "./assets/biggun.png"
    background.onload = () => {
        bHeight = background.height
        bWidth = background.width
        draw()
    }

    cursor.src = "./assets/cursor.png"

    cursor.onload = () => {
        cHeight = cursor.height
        cWidth = cursor.width
        draw()
    }
}

ipcRenderer.on('image-sent', (event, image) => {
    objectImage = new Image()
    objectImage.src = image.replace(/file:\/\/\//, "")
    
    objectImage.onload = () => {
        oHeight = objectImage.height
        oWidth = objectImage.width
        draw()
    }
})