import Project from "./lib/Project.js"

export default class Page
{
    el = document.createElement('div')
    textEl = document.createElement('textarea')

    constructor()
    {
        this.el.classList.add('main')
    }

    /** @param {HTMLElement} host */
    install(host)
    {
        this.el.appendChild(this.textEl)
        host.appendChild(this.el)
    }

    /** @param {Project} project */
    update(project)
    {
        this.textEl.innerText = project.currentDocument.text
    }
}
