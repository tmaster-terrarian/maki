import { MenuOption, MenuOptionList } from "./lib/MenuItem.js"
const { BrowserWindow } = require('@electron/remote')

const menuItems = [
    new MenuOption({
        name: 'File',
        altKey: 'f',
        menu: new MenuOptionList([
            new MenuOption({
                name: 'new',
                hint: '<c-n>',
                onclick: () => {
                    maki.project.add()
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'n' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'n' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'open...',
                hint: '<c-o>',
                onclick: () => {
                    maki.project.open()
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'o' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'o' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'save',
                hint: '<c-s>',
                onclick: () => {
                    maki.project.save()
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 's' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 's' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'save as...',
                hint: '<c-S>',
                onclick: () => {
                    maki.project.saveAs()
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 's' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 's' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey,
                sectionEnd: true,
            }),

            new MenuOption({
                name: 'quit',
                hint: process.platform === 'win32' ? '<m-f4>' : '<c-q>',
                onclick: () => BrowserWindow.getFocusedWindow().close(),
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
                name: 'find',
                hint: '<c-f>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'f' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'f' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'replace',
                hint: '<c-h>',
                onclick: () => {},
                keyListener: event => process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'h' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'h' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey,
            }),
        ]),
    }),
    new MenuOption({
        name: 'View',
        altKey: 'v',
        menu: new MenuOptionList([
            new MenuOption({
                name: 'reset zoom',
                hint: '<c-0>',
                onclick: () => {
                    let win = BrowserWindow.getFocusedWindow().webContents
                    win.setZoomLevel(0)
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key === '0' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key === '0' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'zoom in',
                hint: '<c-equals>',
                onclick: () => {
                    let win = BrowserWindow.getFocusedWindow().webContents
                    win.setZoomLevel(win.getZoomLevel() + 1)
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key === '=' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key === '=' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey,
            }),
            new MenuOption({
                name: 'zoom out',
                hint: '<c-minus>',
                onclick: () => {
                    let win = BrowserWindow.getFocusedWindow().webContents
                    win.setZoomLevel(win.getZoomLevel() - 1)
                },
                keyListener: event => process.platform === 'darwin'
                    ? event.key === '-' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key === '-' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey,
            }),
        ]),
    }),
    new MenuOption({
        name: 'Help',
        altKey: 'h',
        menu: new MenuOptionList([
            new MenuOption({
                name: 'devtools',
                hint: '<c-I>',
                onclick: () => BrowserWindow.getFocusedWindow().webContents.toggleDevTools(),
                keyListener: event => (process.platform === 'darwin'
                    ? event.key.toLowerCase() === 'i' && event.metaKey && !event.altKey && event.shiftKey && !event.ctrlKey
                    : event.key.toLowerCase() === 'i' && !event.metaKey && !event.altKey && event.shiftKey && event.ctrlKey)
                || (process.platform === 'darwin'
                    ? event.code === 'F12' && !event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                    : event.code === 'F12' && !event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey),
            }),
        ]),
    }),
]

export default menuItems
