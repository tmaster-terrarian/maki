import { MenuOption, MenuOptionList } from "../lib/MenuItem.js"

let holdingAlt = false

export default class Menu
{
    el = document.createElement('div')
    leftEl = document.createElement('div')
    rightEl = document.createElement('div')

    buttons = this.leftEl.getElementsByTagName('button')
    activeButtons = this.leftEl.getElementsByClassName('active')

    options = [
        new MenuOption({
            name: 'File',
            altKey: 'f',
            menu: new MenuOptionList([
                new MenuOption({
                    name: 'Quit',
                    hint: '<c-q>',
                    onclick: () => window.close(),
                    keyListener: event => process.platform === 'win32'
                        ? event.code === 'KeyF4' && !event.metaKey && event.altKey && !event.shiftKey && !event.ctrlKey
                        : (process.platform === 'darwin'
                            ? event.code === 'KeyQ' && event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey
                            : event.code === 'KeyQ' && !event.metaKey && !event.altKey && !event.shiftKey && event.ctrlKey),
                })
            ]),
        })
    ]

    /** @type {((event: KeyboardEvent) => {})[]} */
    altKeyEvents = []
    /** @type {((event: KeyboardEvent) => {})[]} */
    keyEvents = []

    constructor()
    {
        this.el.classList.add('header')
        this.el.appendChild(this.leftEl)
        this.el.appendChild(this.rightEl)
    }

    build() {
        this.options.forEach((option, i) => {
            const el = this.buildItem(option)
            if(el)
            {
                this.leftEl.appendChild(el)
            }
        })

        if(process.platform !== 'darwin')
        {
            const closeButton = document.createElement('button')
            closeButton.innerText = 'X'
            closeButton.onclick = event => {
                window.close()
            }

            this.rightEl.appendChild(closeButton)
        }

        const altLabels = this.el.getElementsByClassName('alt')

        window.addEventListener('keydown', event => {
            if(event.key === "Alt")
            {
                holdingAlt = true
                Array.from(altLabels).forEach(label => {
                    label.setAttribute('style', 'text-decoration: underline')
                })
            }
        })
        window.addEventListener('keyup', event => {
            if(event.key === "Alt")
            {
                holdingAlt = false
                Array.from(altLabels).forEach(label => {
                    label.setAttribute('style', '')
                })
            }
        })
    }

    /**
     * @param {MenuOption} option
     * @returns {Node}
     */
    buildItem(option) {
        const el = document.createElement('button')
        el.setAttribute('tabindex', '-1')

        const holderEl = document.createElement('span')
        holderEl.classList.add('button-holder')
        holderEl.appendChild(el)

        let label = option.name

        if(option.altKey && option.name)
        {
            let labelAltPos = option.name.toLowerCase().indexOf(option.altKey.toLowerCase())
            if(labelAltPos != -1)
            {
                label = `${label.substring(0, labelAltPos)}<span class="alt">${label[labelAltPos]}</span>${label.substring(labelAltPos + 1)}`
            }

            this.altKeyEvents.push(event => {
                if(event.key === `Key${option.altKey.toUpperCase()}` && event.altKey && !event.ctrlKey && !event.shiftKey)
                {
                    el.click()
                    event.preventDefault()
                }
            })
        }

        if(option.hint)
        {
            label += `<span class="f-r">${option.hint.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</span>`
        }

        el.innerHTML = label

        el.addEventListener('click', event => {
            if(option.menu)
                el.classList.toggle('active')
            else
                option.onclick()
        })

        if(option.menu)
        {
            holderEl.addEventListener('focusout', event => {
                if(!holderEl.contains(event.target))
                    el.classList.remove('active')
            })
            el.addEventListener('mouseenter', event => {
                if(this.activeButtons.length != 0)
                {
                    Array.from(this.activeButtons).forEach(element => {
                        element.classList.remove('active')
                    })
                    el.classList.add('active')
                }
            })

            const listEl = document.createElement('ul')
            listEl.classList.add('submenu')
            holderEl.appendChild(listEl)

            option.menu.options.forEach((option => {
                const el = this.buildItem(option)
                if(el)
                {
                    listEl.appendChild(el)
                }
            }))
        }

        if(option.keyListener)
        {
            this.keyEvents.push(event => {
                if(option.keyListener())
                {
                    console.log(option.name + ' clicked !')
                    el.click()
                    event.preventDefault()
                }
            })
        }

        return holderEl
    }

    /** @param {Node} host */
    install(host) {
        host.appendChild(this.el)

        this.altKeyEvents.forEach(handler => window.addEventListener('keydown', handler))
        this.keyEvents.forEach(handler => window.addEventListener('keydown', handler))
    }
}
