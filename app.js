const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
      .then(() => {
        console.log('File loaded successfully')
      })
      .catch((error) => {
        console.error('Failed to load file:', error)
      })
}

app.whenReady().then(createWindow)
