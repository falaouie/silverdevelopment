// Modules
const {app, BrowserWindow} = require('electron')
const updater = require('./updater')
const appMenu = require('./menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  // check for updates after 3 seconds

  setTimeout(updater, 3000)

  mainWindow = new BrowserWindow({
  //  width: 1000, height: 800,
  backgroundColor: '#eceeee',
    show: false,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Create main app menu
  appMenu()

  // PRODUCTION new BrowserWindow
  // mainWindow.loadURL('http://silvercrumbs.alawiyeh.com')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http://devsilver.alawiyeh.com')

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  // kirmel el commit el jdeed
  mainWindow.maximize()
  mainWindow.show()
}

// Electron `app` is ready
app.on('ready', () => {
  createWindow()

  mainWindow.on('closed', () => mainWindow = null)
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
