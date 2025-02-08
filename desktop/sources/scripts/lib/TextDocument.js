import Project from "./Project.js"

export default class TextDocument
{
    text = ''
    path = null

    /** @type {string[]} */ __labels = []
    /** @type {string[]} */ __lines = []

    __bytes = 0
    __chars = 0
    __words = 0

    __dirty = true

    get name()
    {
        return this.path?.match(/(?<=\/)[^/]+$/)[0] ?? 'untitled'
    }

    /** @param {Project} project */
    constructor(project)
    {
        this.project = project
    }

    update(str)
    {
        this.text = str
        this.__dirty = true
    }

    __checkDirty()
    {
        if(!this.__dirty) return

        // labels
        {
            this.__labels = []
            const regex = /^ *(#* +.+)$/g
            let match = null
            while((match = regex.exec(this.text)) !== null)
            {
                this.__labels.push(match[0])
            }
        }

        this.__lines = this.text.split(this.project.lineEnding)
        this.__bytes = Buffer.from(this.text, this.project.encoding).byteLength
        this.__chars = Buffer.from(this.text, this.project.encoding).length
        this.__words = Array.from(this.text.matchAll(/\b.+\b/g)).length

        this.__dirty = false
    }

    getLabels()
    {
        this.__checkDirty()
        return [...this.__labels]
    }

    getLines()
    {
        this.__checkDirty()
        return [...this.__lines]
    }

    getByteCount()
    {
        this.__checkDirty()
        return this.__bytes
    }

    getCharCount()
    {
        this.__checkDirty()
        return this.__chars
    }

    getWordCount()
    {
        this.__checkDirty()
        return this.__words
    }
}
