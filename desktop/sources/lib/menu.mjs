export default class Navi
{
    constructor()
    {
        this.el = document.createElement('div')
        this.el.classList.add('header')
    }

    /** @param {Node} host */
    install = (host) => {
        host.appendChild(this.el)
    }
}
