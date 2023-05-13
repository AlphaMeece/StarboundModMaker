const CrossProcessExports = require("electron");
const { ipcRenderer } =  require("electron");

// Next time work on flipImages, work on reversing the img element with pure js, and pass
// Bi-Directional, Cursor Position, Frames, and Animation Cycle from main.js to simulator.js

let canvas, ctx
let background = new Image()
let bHeight, bWidth
let oHeight, oWidth, oScale
let cursor = new Image()
let cHeight, cWidth
let height, width
let objectImage
let directional
let lButton, rButton
let direction = "right"
let zoom = 1;
let animated = false
let frames, cycle, frameWidth
let frame = 0
let animation = null

const startDraw = () => {
    if(!animated) {
        draw()
        return
    }
    clearInterval(animation)
    draw()
    animation = setInterval(draw, 1000 * cycle)
}

const updateSpan = () => {
    let range = document.getElementById("sizeSlider")
    zoom = +range.value
    document.getElementById("zoomLevel").innerHTML = `x${zoom.toFixed(2)}`
    startDraw()
    
}

const draw = () => {
    canvas.height = height = window.innerHeight
    canvas.width = width = window.innerWidth
    ctx.imageSmoothingEnabled = false
    if(background) ctx.drawImage(background, width/2 - bWidth, height - bHeight * 2, bWidth * 2, bHeight * 2)
    if(objectImage) {
        if(!animated) {
            if(direction == "left") mirror(objectImage, 0, 0, oWidth, oHeight, width/2 - oWidth * zoom, height - oHeight * 2 * zoom - 16, oWidth * 2 * zoom, oHeight * 2 * zoom)
            else ctx.drawImage(objectImage, 0, 0, oWidth, oHeight, width/2 - oWidth * zoom, height - oHeight * 2 * zoom - 16, oWidth * 2 * zoom, oHeight * 2 * zoom)
        } else {
            if(frame >= frames) frame = 0
            if(direction == "left") mirror(objectImage, frameWidth*frame, 0, frameWidth, oHeight, width/2 - frameWidth * zoom, height - oHeight * 2 * zoom - 16, frameWidth * 2 * zoom, oHeight * 2 * zoom)
            else ctx.drawImage(objectImage, frameWidth*frame, 0, frameWidth, oHeight, width/2 - frameWidth * zoom, height - oHeight * 2 * zoom - 16, frameWidth * 2 * zoom, oHeight * 2 * zoom)
            frame++
        }
    }
    if(cursor) ctx.drawImage(cursor, width/2, height - cHeight - 8, cWidth * 2, cHeight * 2)
}

const mirror = (image, sx, sy, sw, sh, x, y, w, h) => {
    ctx.save()
    ctx.setTransform(-1, 0, 0, 1, x + w, y)
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, w, h)
    ctx.restore()
}

const startSimulator = () => {
    canvas = document.getElementById("simulatorCanvas")
    ctx = canvas.getContext("2d")

    lButton = document.getElementById("leftButton")
    rButton = document.getElementById("rightButton")
    
    background.src = "./assets/biggun.png"
    background.onload = () => {
        bHeight = background.height
        bWidth = background.width
        startDraw()
    }

    cursor.src = "./assets/cursor.png"

    cursor.onload = () => {
        cHeight = cursor.height
        cWidth = cursor.width
        startDraw()
    }
}

const left = () => {
    lButton.firstChild.src = "./assets/leftArrowDisabled.png"
    rButton.firstChild.src = "./assets/rightArrow.png"
    direction = "left"
    startDraw()
}

const right = () => {
    lButton.firstChild.src = "./assets/leftArrow.png"
    rButton.firstChild.src = "./assets/rightArrowDisabled.png"
    direction = "right"
    startDraw()
}

ipcRenderer.on('image-sent', (event, image, data) => {
    objectImage = new Image()
    objectImage.src = image.replace(/file:\/\/\//, "")
    directional = data["bidirectional"]
    animated = data["animated"]

    if(animated) {
        let animationData = data["animation"]
        frames = animationData["frames"]
        cycle = animationData["frameLength"]
    }

    lButton.style.display = directional ? "block":"none"
    rButton.style.display = directional ? "block":"none"
    
    objectImage.onload = () => {
        oHeight = objectImage.height
        oWidth = objectImage.width
        if(animated) frameWidth = oWidth / frames
        right()
        startDraw()
    }
})