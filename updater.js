const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')


// configure log debugging
 autoUpdater.logger = require('electron-log')
 autoUpdater.logger.transports.file.level = 'info'
// disable auto update
autoUpdater.autoDownload = false
// single export to check for and apply any available updates
module.exports = () => {
  // check for update (GitHub releases)
  // console.log('checking for updates')
  
  autoUpdater.checkForUpdates()

  // listen for update found
  autoUpdater.on('update-available', () => {
      // prompt user to start dowload or postpone
      dialog.showMessageBox({
          type: 'info',
          title: 'Update available',
          message: 'A new version is available. Do you want to update now ?',
          buttons: ['Update', 'No']
      }).then( result => {
        let buttonIndex = result.response
        // if button index 0(Update) start downloading
        if (buttonIndex === 0) autoUpdater.downloadUpdate()
      })
  })

  // listen for update downloaded
  autoUpdater.on('update-downloaded', () => {
    // prompt user to install now or later
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'Install & Restart Now',
      buttons: ['Yes', 'Later']
    }).then( result => {
      let buttonIndex = result.response
      // if button index 0(Yes) install and restart
      if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true)
    })

  })
}

