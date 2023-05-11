const electron = require("electron")
const { app, dialog, ipcMain } = electron
let { BrowserWindow } = electron
const path = require("path")
require("@electron/remote/main").initialize()

try {
  require('electron-reloader')(module, {ignore: [/userTags/]})
} catch (_) {}

let win = null

const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

app.on('browser-window-created', (_, window) => {
  require("@electron/remote/main").enable(window.webContents)
})

ipcMain.on('getpath', (event, type) => {  
  
  dialog.showOpenDialog({ 
    properties: [ type == "folder" ? 'openDirectory' : 'openFile' ],
    filters: [type == "folder" ? null : { name: "Images", extensions: [ "png" ] } ]
  }).then(path => {
    win.webContents.send('gottenpath', type, path)
  }).catch(error => {
    console.error(error)
  })
});