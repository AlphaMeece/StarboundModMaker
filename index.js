const electron = require("electron")
const { app, BrowserWindow, dialog, ipcMain } = electron
const path = require("path")

try {
  require('electron-reloader')(module)
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

ipcMain.on('getpath', (event) => {  
  dialog.showOpenDialog({ 
    properties: [ 'openDirectory' ]
  }).then(path => {
    win.webContents.send('gottenpath', path)
  }).catch(error => {
    console.error(error)
  })
});