export default class Page
{
    el = document.createElement('div')
    textEl = document.createElement('textarea')

    constructor()
    {
        this.el.classList.add('main')
        this.textEl.setAttribute('type', 'text')
    }

    /** @param {HTMLElement} host */
    install(host)
    {
        this.el.appendChild(this.textEl)
        host.appendChild(this.el)
    }

    update()
    {
        //
    }

    getPosition()
    {
        return this.textEl.selectionEnd
    }

    load(text)
    {
        this.textEl.value = text ?? ''
    }
}
