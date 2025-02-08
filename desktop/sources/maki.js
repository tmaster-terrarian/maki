import Project from './scripts/lib/Project.js'
import InfoBar from './scripts/infoBar.js'
import Menu from './scripts/menu.js'
import Page from './scripts/page.js'

export default class Maki
{
    menu = new Menu()
    infoBar = new InfoBar()
    page = new Page()

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

        this.page.install(gridEl)

        this.infoBar.install(gridEl)
    }

    start()
    {
        this.infoBar.update(this.project)
        this.page.update(this.project)
    }
}
