
// Modules
const {Menu, shell, app} = require('electron')
const isMac = process.platform === 'darwin' ? true : false

// Module function to create main app menu
module.exports = () => {

    // Menu template
    let menuTemplate = [
        ...(isMac ? [
            { 
                role: 'appMenu' 
            }, 
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Quit',
                        click: () => app.quit()
                    }
                ]  
            }
        ] : [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Exit',
                        click: () => app.quit()
                    }
                ]  
            }
        ]),
        {
            role: 'editMenu'
        },
        {
            role: 'windowMenu'
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        shell.openExternal('https://google.com')
                }
                }
                
            ]
        }

    ]

    // Create Mac menu
    // if (isMac) menuTemplate.unshift({ role: 'appMenu' })

    // Build Menu
    let appMenu = Menu.buildFromTemplate(menuTemplate)

    // Set as main app menu
    Menu.setApplicationMenu(appMenu)
}