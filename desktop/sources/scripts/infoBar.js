import Project from "./lib/Project.js"
import Page from "./page.js"

export default class InfoBar
{
    constructor()
    {
        this.el = document.createElement('div')

        this.leftEl = document.createElement('div')
        this.byteCountEl = document.createElement('span')
        this.charCountEl = document.createElement('span')
        this.wordCountEl = document.createElement('span')
        this.lineCountEl = document.createElement('span')

        this.rightEl = document.createElement('div')
        this.positionEl = document.createElement('span')
        this.selectionEl = document.createElement('span')
        // this.encodingEl = document.createElement('span')
        this.lineEndingEl = document.createElement('span')
    }

    /** @param {HTMLElement} host */
    install(host)
    {
        this.el.classList.add('footer')

        this.leftEl.appendChild(this.byteCountEl)
        this.leftEl.appendChild(this.charCountEl)
        this.leftEl.appendChild(this.wordCountEl)
        this.leftEl.appendChild(this.lineCountEl)
        this.el.appendChild(this.leftEl)

        this.rightEl.appendChild(this.positionEl)
        this.rightEl.appendChild(this.selectionEl)
        // this.rightEl.appendChild(this.encodingEl)
        this.rightEl.appendChild(this.lineEndingEl)
        this.el.appendChild(this.rightEl)

        host.appendChild(this.el)
    }

    update()
    {
        if(maki.project.currentDocument)
        {
            // byte count
            {
                let unit = 'b'
                let count = 0
                const bytes = maki.project.currentDocument.getByteCount()
                if(bytes < 1024)
                {
                    unit = 'b'
                    count = Math.floor((bytes) * 100) / 100
                }
                else if(bytes < 1024**2)
                {
                    unit = 'kib'
                    count = Math.floor((bytes / 1024) * 100) / 100
                }
                else if(bytes < 1024**3)
                {
                    unit = 'mib'
                    count = Math.floor((bytes / 1024**2) * 100) / 100
                }

                this.byteCountEl.innerText = count.toString() + unit
            }

            this.charCountEl.innerText = maki.project.currentDocument.getCharCount() + 'c'
            this.wordCountEl.innerText = maki.project.currentDocument.getWordCount() + 'w'
            this.lineCountEl.innerText = maki.project.currentDocument.getLines().length + 'l'

            // this.encodingEl.innerText = project.encoding

            {
                const selectionNum = maki.page.textEl.selectionEnd - maki.page.textEl.selectionStart

                if(selectionNum > 0)
                {
                    this.selectionEl.innerText = `(${selectionNum} selected)`
                    this.selectionEl.hidden = false
                }
                else
                {
                    this.selectionEl.hidden = true
                }
            }

            {
                const ln = maki.project.currentDocument.getActiveLine(maki.page.getPosition()) + 1
                const col = maki.project.currentDocument.getActiveColumn(maki.page.getPosition()) + 1
                this.positionEl.innerText = `${ln}:${col}`
            }
        }

        if(maki.project.lineEndingFriendlyName)
        {
            this.lineEndingEl.innerText = maki.project.lineEndingFriendlyName
            this.lineEndingEl.hidden = false
        }
        else
        {
            this.lineEndingEl.hidden = true
        }
    }
}
