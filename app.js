const { app, BrowserWindow } = require('electron')
const sqlite3 = require('sqlite3').verbose()

let db

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile('index.html')
      .then(() => {
        console.log('File loaded successfully')
      })
      .catch((error) => {
        console.error('Failed to load file:', error)
      })

  const dbPath = 'database.db'
  db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
      console.error('Error opening database:', error.message)
    } else {
      console.log('Database connection established')
    }
  })

  window.on('closed', () => {
    db.close((error) => {
      if (error) {
        console.error('Error closing database:', error.message)
      } else {
        console.log('Database connection closed')
      }
    })
  })
}

app.whenReady().then(createWindow)

module.exports = { db }
