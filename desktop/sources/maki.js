import Project from './scripts/lib/Project.js'
import InfoBar from './scripts/infoBar.js'
import Menu from './scripts/menu.js'
import Page from './scripts/page.js'
import Nav from './scripts/nav.js'
const { BrowserWindow } = require('@electron/remote')

export default class Maki
{
    menu = new Menu()
    infoBar = new InfoBar()
    page = new Page()
    nav = new Nav()

    project = new Project()

    constructor() { }

    /** @param {HTMLElement} host */
    install(host)
    {
        const gridEl = document.createElement('div')
        gridEl.classList.add('grid')
        host.appendChild(gridEl)

        this.menu.build()
        this.menu.install(gridEl)

        this.nav.install(gridEl)

        this.page.install(gridEl)

        this.infoBar.install(gridEl)

        this.page.textEl.addEventListener('input', event => {
            this.update()
        })
        this.page.textEl.addEventListener('selectionchange', event => {
            this.update()
        })

        BrowserWindow.getAllWindows().forEach(win => {
            win.addListener("focus", event => {
                this.reload()
            })
        })
    }

    start()
    {
        this.page.textEl.focus()
        this.page.textEl.setSelectionRange(0, 0)

        this.page.load('')
        this.update()
        this.nav.update()
    }

    update()
    {
        this.project.currentDocument.update(this.page.textEl.value)
        this.page.update()
        this.infoBar.update(this.project, this.page)
    }

    reload(force = false)
    {
        this.project.currentDocument.reload(force)
        this.load(this.project.currentDocument.text)
    }

    load(text)
    {
        this.page.load(text)
        this.update()
    }
}
