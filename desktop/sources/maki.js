import Menu from './scripts/menu.js'

export default class Maki
{
    menu = new Menu()

    constructor() { }

    /** @param {Node} host */
    install(host)
    {
        const gridEl = document.createElement('div')
        gridEl.classList.add('grid')
        host.appendChild(gridEl)

        this.menu.build()
        this.menu.install(gridEl)

        host.addEventListener('click', event => {
            window.dispatchEvent(new Event('close-menu', {
                cancelable: false,
            }))
        })
    }

    start()
    {
        
    }
}
