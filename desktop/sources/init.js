import Maki from './maki.js'
import menuItems from './scripts/menuItems.js'

const { shell } = require('electron'), remote = require('@electron/remote')
const { app, BrowserWindow } = remote

const maki = new Maki()

maki.menu.options = menuItems

if(process.platform === 'win32')
    maki.project.lineEnding = '\r\n'

maki.install(document.body)
maki.start()

if (remote.process.argv.length > 1) {
    // pass in file remote.process.argv[1]
}

console.log(process.platform)
