const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

require('@electron/remote/main').initialize()

let isShown = true

app.win = null

Menu.setApplicationMenu(null)

app.on('ready', () => {
    app.win = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 380,
        minHeight: 360,
        backgroundColor: '#181818',
        // icon: path.join(__dirname, { darwin: 'icon.icns', linux: 'icon.png', win32: 'icon.ico' }[process.platform] || 'icon.ico'),
        resizable: true,
        frame: process.platform !== 'darwin',
        skipTaskbar: process.platform === 'darwin',
        autoHideMenuBar: process.platform === 'darwin',
        webPreferences: {
            zoomFactor: 1.0,
            nodeIntegration: true,
            backgroundThrottling: false,
            textAreasAreResizable: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
        titleBarStyle: 'hidden',
        disableAutoHideCursor: true
    })

    // if(process.platform !== 'darwin')
    //     app.win.setMenuBarVisibility(false)

    app.win.loadURL(`file://${__dirname}/sources/index.html`)

    require('@electron/remote/main').enable(app.win.webContents)

    app.win.on('closed', () => {
        app.quit()
    })

    app.win.on('hide', () => {
        isShown = false
    })

    app.win.on('show', () => {
        isShown = true
    })

    app.on('window-all-closed', () => {
        app.quit()
    })

    app.on('activate', () => {
        if (app.win === null) {
            createWindow()
        } else {
            app.win.show()
        }
    })
})

app.inspect = () => {
    app.win.toggleDevTools()
}

app.toggleFullscreen = () => {
    app.win.setFullScreen(!app.win.isFullScreen())
}

app.toggleMenubar = () => {
    // app.win.setMenuBarVisibility(!app.win.isMenuBarVisible())
}

app.toggleVisible = () => {
    if (process.platform !== 'darwin')
    {
        if (!app.win.isMinimized()) { app.win.minimize() } else { app.win.restore() }
    }
    else
    {
        if (isShown && !app.win.isFullScreen()) { app.win.hide() } else { app.win.show() }
    }
}

app.injectMenu = (menu) => {
    try
    {
        Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
    }
    catch (err)
    {
        console.warn('Cannot inject menu.')
    }
}
