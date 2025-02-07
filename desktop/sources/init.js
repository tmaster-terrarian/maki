import { MenuOption, MenuOptionList } from './scripts/lib/MenuItem.js'
import Maki from './maki.js'

const { shell } = require('electron'), remote = require('@electron/remote')
const { app } = remote
const EOL = '\n'

const maki = new Maki()

maki.menu.options = [
    new MenuOption({
        name: 'File',
        altKey: 'f',
        menu: new MenuOptionList([
            new MenuOption({
                name: 'new',
                hint: '<c-n>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'n' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'n' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'open...',
                hint: '<c-o>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'o' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'o' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'save',
                hint: '<c-s>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 's' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 's' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'save as...',
                hint: '<c-S>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 's' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 's' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey,
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'quit',
                hint: process.platform === 'win32' ? '<m-f4>' : '<c-q>',
                onclick: () => window.close(),
                keyListener: event => process.platform === 'win32'
                    ? false
                    : (process.platform === 'darwin'
                        ? event.key.toLowerCase() === 'q' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                        : event.key.toLowerCase() === 'q' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey),
            }),
        ]),
    }),
    new MenuOption({
        name: 'Edit',
        altKey: 'e',
        menu: new MenuOptionList([
            new MenuOption({
                name: 'undo',
                hint: '<c-z>',
            }),
            new MenuOption({
                name: 'redo',
                hint: '<c-y>',
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'cut',
                hint: '<c-x>',
            }),
            new MenuOption({
                name: 'copy',
                hint: '<c-c>',
            }),
            new MenuOption({
                name: 'paste',
                hint: '<c-v>',
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'find',
                hint: '<c-f>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'KeyF' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'KeyF' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'replace',
                hint: '<c-h>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'KeyH' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'KeyH' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
        ]),
    }),
]

maki.install(document.body)
maki.start()

if (remote.process.argv.length > 1) {
    // pass in file remote.process.argv[1]
}

console.log(process.platform)
