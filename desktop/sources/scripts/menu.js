const { BrowserWindow } = require("@electron/remote")
import { MenuOption, MenuOptionList } from "./lib/MenuItem.js"

let holdingAlt = false

export default class Menu
{
    el = document.createElement('div')
    leftEl = document.createElement('div')
    rightEl = document.createElement('div')

    spacerEl = document.createElement('div')

    activeButtons = this.leftEl.getElementsByClassName('active')
    rootButtonHolders = this.leftEl.getElementsByClassName('_menu-root-item')

    /** @type {MenuOption[]} */
    options = []

    /** @type {((event: KeyboardEvent) => {})[]} */
    altKeyEvents = []
    /** @type {((event: KeyboardEvent) => {})[]} */
    keyEvents = []

    constructor()
    {
        this.el.classList.add('header')
        this.el.appendChild(this.leftEl)
        this.el.appendChild(this.rightEl)

        this.spacerEl.style.width = process.platform === 'darwin' ? '10ch' : '0'
        this.leftEl.appendChild(this.spacerEl)
    }

    build() {
        this.options.forEach((option, i) => {
            const el = this.buildItem(option, 0)
            if(el)
            {
                this.leftEl.appendChild(el)
                el.classList.add('_menu-root-item')
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
     * @returns {HTMLElement}
     */
    buildItem(option, depth) {
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
                if(event.key.toLowerCase() === `${option.altKey.toLowerCase()}` && event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey)
                {
                    el.click()
                    event.preventDefault()
                }
            })
        }

        if(option.hint)
        {
            label += `<span class="label">${option.hint.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</span>`
        }
        else if(option.menu && depth != 0)
        {
            label += `<span class="label">-&gt;</span>`
        }

        el.innerHTML = label

        el.addEventListener('click', event => {
            if(option.menu)
            {
                el.classList.toggle('active')
                if(el.classList.contains('active'))
                {
                    const listEl = Array.from(holderEl.children)[1]
                    recalculateListBounds(listEl)
                }
            }
            else
                option.onclick()
        })

        if(option.menu)
        {
            document.body.addEventListener('click', event => {
                if(!holderEl.contains(event.target) && holderEl != event.target)
                    el.classList.remove('active')
            })
            el.addEventListener('mouseenter', event => {
                let anyActive = Array.from(this.rootButtonHolders)
                    .findIndex(item => {
                        return item.firstElementChild.classList.contains('active')
                    }) != -1

                if(!el.classList.contains('active') && anyActive && depth == 0)
                {
                    Array.from(this.activeButtons).forEach(element => {
                        element.classList.remove('active')
                    })
                    el.classList.add('active')
                }
            })

            const listEl = document.createElement('ul')
            listEl.classList.add('submenu')
            listEl.style.zIndex = depth
            holderEl.appendChild(listEl)

            BrowserWindow.getFocusedWindow().addListener('resize', () => {
                if(el.classList.contains('active'))
                {
                    recalculateListBounds(listEl)
                }
            })

            option.menu.options.forEach((option => {
                const el = this.buildItem(option, depth + 1)
                if(el)
                {
                    listEl.appendChild(el)
                    if(option.sectionEnd)
                    {
                        listEl.appendChild(document.createElement('hr'))
                    }
                }
            }))
        }

        function recalculateListBounds(listEl) {
            listEl.style.maxWidth = ''
            listEl.style.left = ''

            const maxWidth = window.innerWidth - listEl.getBoundingClientRect().left
            listEl.style.maxWidth = `${Math.max(maxWidth, 0)}px`

            if (depth != 0) {
                const offset = Math.min(0, window.innerWidth - (listEl.getBoundingClientRect().right))
                listEl.style.left = `calc(100% + ${offset}px)`
                if (offset != 0) {
                    listEl.style.boxShadow = '-2px -2px var(--c-0)'
                }

                else {
                    listEl.style.boxShadow = ''
                }
            }
        }

        if(option.keyListener)
        {
            this.keyEvents.push(event => {
                if(option.keyListener(event))
                {
                    el.click()
                    event.preventDefault()
                }
            })
        }

        return holderEl
    }

    /** @param {HTMLElement} host */
    install(host) {
        host.appendChild(this.el)

        this.altKeyEvents.forEach(
            handler => window.addEventListener('keydown', event => {
                handler(event)
            })
        )
        this.keyEvents.forEach(
            handler => window.addEventListener('keydown', event => {
                handler(event)
            })
        )
    }
}
