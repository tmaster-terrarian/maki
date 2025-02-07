import Project from "./lib/Project.js"

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
        // this.selectionEl = document.createElement('span')
        // this.positionEl = document.createElement('span')
        this.encodingEl = document.createElement('span')
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

        // this.rightEl.appendChild(this.selectionEl)
        // this.rightEl.appendChild(this.positionEl)
        this.rightEl.appendChild(this.encodingEl)
        this.rightEl.appendChild(this.lineEndingEl)
        this.el.appendChild(this.rightEl)

        host.appendChild(this.el)
    }

    /** @param {Project} project */
    update(project)
    {
        // byte count
        {
            let unit = 'b'
            let count = 0
            const bytes = project.currentDocument.getByteCount()
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

        this.charCountEl.innerText = project.currentDocument.getCharCount() + 'c'
        this.wordCountEl.innerText = project.currentDocument.getWordCount() + 'w'
        this.lineCountEl.innerText = project.currentDocument.getLines().length + 'l'

        this.encodingEl.innerText = project.encoding

        if(project.lineEndingFriendlyName)
        {
            this.lineEndingEl.innerText = project.lineEndingFriendlyName
            this.lineEndingEl.hidden = false
        }
        else
        {
            this.lineEndingEl.hidden = true
        }
    }
}
