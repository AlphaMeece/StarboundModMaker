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
let topButton, bottomButton, noHoldButton, backgroundButton
let hold = "bottom"
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
    if(background) {
        switch(hold) {
            case "bottom":
                ctx.drawImage(background, width/2 - bWidth, height - bHeight * 2, bWidth * 2, bHeight * 2)
                break
            case "top":
                ctx.drawImage(background, width/2 - bWidth, 0, bWidth * 2, bHeight * 2)
                break
            case "background":
                ctx.drawImage(background, width/2 - bWidth, height/2 - bHeight, bWidth * 2, bHeight * 2)
                break
            case "noHold":
                ctx.drawImage(background, width/2 - bWidth, height - bHeight * 2, bWidth * 2, bHeight * 2)
                break
        }
    }
    if(objectImage) {
        let tHeight
        switch(hold) {
            case "bottom":
                tHeight = height - oHeight * 2 * zoom - 16
                break
            case "top":
                tHeight = 16
                break
            case "background":
                tHeight = height / 2 - oHeight * zoom
                break
            case "noHold":
                tHeight = height / 2 - oHeight * zoom
                break
        }
        if(!animated) {
            if(direction == "left") mirror(objectImage, 0, 0, oWidth, oHeight, width/2 - oWidth * zoom, tHeight, oWidth * 2 * zoom, oHeight * 2 * zoom)
            else ctx.drawImage(objectImage, 0, 0, oWidth, oHeight, width/2 - oWidth * zoom, tHeight, oWidth * 2 * zoom, oHeight * 2 * zoom)
        } else {
            if(frame >= frames) frame = 0
            if(direction == "left") mirror(objectImage, frameWidth*frame, 0, frameWidth, oHeight, width/2 - frameWidth * zoom, tHeight, frameWidth * 2 * zoom, oHeight * 2 * zoom)
            else ctx.drawImage(objectImage, frameWidth*frame, 0, frameWidth, oHeight, width/2 - frameWidth * zoom, tHeight, frameWidth * 2 * zoom, oHeight * 2 * zoom)
            frame++
        }
    }
    if(cursor) {
        let tHeight
        switch(hold) {
            case "bottom":
                tHeight = height - cHeight - 8
                break
            case "top":
                tHeight = 16 + 8
                break
            case "background":
                tHeight = height / 2
                break
            case "noHold":
                tHeight = height / 2
                break
        }
        ctx.drawImage(cursor, width/2, tHeight, cWidth * 2, cHeight * 2)
    }
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
    topButton = document.getElementById("topButton")
    bottomButton = document.getElementById("bottomButton")
    noHoldButton = document.getElementById("noHoldButton")
    backgroundButton = document.getElementById("backgroundButton")
    
    background.src = "./assets/simulatorWindow/biggun.png"
    background.onload = () => {
        bHeight = background.height
        bWidth = background.width
        startDraw()
    }

    cursor.src = "./assets/simulatorWindow/cursor.png"

    cursor.onload = () => {
        cHeight = cursor.height
        cWidth = cursor.width
        startDraw()
    }
}

const left = () => {
    lButton.firstChild.src = "./assets/simulatorWindow/leftArrowDisabled.png"
    rButton.firstChild.src = "./assets/simulatorWindow/rightArrow.png"
    direction = "left"
    startDraw()
}

const right = () => {
    lButton.firstChild.src = "./assets/simulatorWindow/leftArrow.png"
    rButton.firstChild.src = "./assets/simulatorWindow/rightArrowDisabled.png"
    direction = "right"
    startDraw()
}

const topRender = () => {
    background.src = "./assets/simulatorWindow/biggunTop.png"
    topButton.firstChild.src = "./assets/simulatorWindow/topHoldDisabled.png"
    noHoldButton.firstChild.src = "./assets/simulatorWindow/noHold.png"
    backgroundButton.firstChild.src = "./assets/simulatorWindow/backgroundHold.png"
    bottomButton.firstChild.src = "./assets/simulatorWindow/bottomHold.png"
    hold = "top"
    startDraw()
}

const noHold = () => {
    background.src = "./assets/simulatorWindow/biggunNoWalls.png"
    topButton.firstChild.src = "./assets/simulatorWindow/topHold.png"
    noHoldButton.firstChild.src = "./assets/simulatorWindow/noHoldDisabled.png"
    backgroundButton.firstChild.src = "./assets/simulatorWindow/backgroundHold.png"
    bottomButton.firstChild.src = "./assets/simulatorWindow/bottomHold.png"
    hold = "noHold"
    startDraw()
}

const backgroundHold = () => {
    background.src = "./assets/simulatorWindow/biggun.png"
    topButton.firstChild.src = "./assets/simulatorWindow/topHold.png"
    noHoldButton.firstChild.src = "./assets/simulatorWindow/noHold.png"
    backgroundButton.firstChild.src = "./assets/simulatorWindow/backgroundHoldDisabled.png"
    bottomButton.firstChild.src = "./assets/simulatorWindow/bottomHold.png"
    hold = "background"
    startDraw()
}

const bottom = () => {
    background.src = "./assets/simulatorWindow/biggun.png"
    topButton.firstChild.src = "./assets/simulatorWindow/topHold.png"
    noHoldButton.firstChild.src = "./assets/simulatorWindow/noHold.png"
    backgroundButton.firstChild.src = "./assets/simulatorWindow/backgroundHold.png"
    bottomButton.firstChild.src = "./assets/simulatorWindow/bottomHoldDisabled.png"
    hold = "bottom"
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
        bottom()
        startDraw()
    }
})

ipcRenderer.on('gimme-data', (event) => {
    ipcRenderer.send('heredata-pass-along', {
        "anchor": hold,
        
    })
})