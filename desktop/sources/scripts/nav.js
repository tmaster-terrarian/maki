export default class Nav
{
    el = document.createElement('ul')

    currentItem = 0

    constructor()
    {
        this.el.classList.add('files')
    }

    /** @param {HTMLElement} host */
    install(host)
    {
        host.appendChild(this.el)
    }

    update(newCurrent = null)
    {
        if(newCurrent !== null)
            this.currentItem = newCurrent

        this.currentItem = Math.min(Math.max(this.currentItem, 0), maki.project.__documents.length - 1)

        this.el.innerHTML = ''

        maki.project.__documents.forEach((doc, i) => {
            const li = document.createElement('li')

            const button = document.createElement('button')
            button.innerText = doc.name

            if(i == this.currentItem)
            {
                button.classList.add('active')
            }

            button.onclick = event => {
                this.currentItem = i
                this.updateCurrentItem()
                maki.project.currentDocumentIndex = i
                maki.reload()
            }

            li.appendChild(button)

            this.el.appendChild(li)
        })
    }

    updateCurrentItem()
    {
        Array.from(this.el.children).forEach((element, i) => {
            element.firstChild.classList.remove('active')
            if(i == this.currentItem)
            {
                element.firstChild.classList.add('active')
            }
        })
    }
}
