import Maki from './maki.js'

const { shell } = require('electron'), remote = require('@electron/remote')
const { app } = remote
const EOL = '\n'

const maki = new Maki()

maki.install(document.body)
maki.start()

if (remote.process.argv.length > 1) {
    // pass in file remote.process.argv[1]
}

console.log(process.platform)
