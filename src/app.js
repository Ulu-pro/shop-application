const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    icon: path.join(__dirname, 'icon.ico')
  });

  mainWindow.maximize();

  mainWindow.loadFile(path.join(__dirname, 'index.html'))
      .then(() => console.log('File loaded successfully'));
}

Menu.setApplicationMenu(null);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
