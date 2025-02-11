const fs = require('fs')
const { app, dialog } = require('@electron/remote')

export default class TextDocument
{
    watchdog = true

    text = ''

    /** @type {string} */
    path = null

    /** @type {string[]} */ __labels = []
    /** @type {string[]} */ __lines = []

    __bytes = 0
    __chars = 0
    __words = 0

    __dirty = true

    get name()
    {
        if(!this.path)
            return 'untitled'

        const split = this.path.replace(/\\/g, '/').split('/')
        return split[split.length - 1]
    }

    constructor(text = '', path = null)
    {
        this.text = text
        this.path = path
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

        if(this.path)
        {
            this.__bytes = fs.statSync(this.path).size ?? Buffer.from(this.text, 'utf-8').byteLength
        }
        else
        {
            this.__bytes = Buffer.from(this.text, 'utf-8').byteLength
        }

        this.__chars = this.text.length
        this.__lines = this.text.split(maki.project.lineEnding)
        this.__words = Array.from(this.text.matchAll(/\b.+\b/g)).length

        this.__dirty = false
    }

    getLabels()
    {
        this.__checkDirty()
        return this.__labels
    }

    getLines()
    {
        this.__checkDirty()
        return this.__lines
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

    getActiveLine(position)
    {
        const split = this.text.substring(0, position).split(maki.project.lineEnding)
        return split.length - 1
    }

    getActiveColumn(position)
    {
        const split = this.text.substring(0, position).split(maki.project.lineEnding)
        return split[split.length - 1].length
    }

    hasChanges()
    {
        if (!this.path)
        {
            if (this.text && this.text.length > 0)
                return true
            return false
        }

        const last_size = this.getByteCount()
        const ret = (this.load() !== this.text)

        // was this change done outside maki?
        if(ret && (last_size !== this.getByteCount() && this.watchdog))
        {
            const response = dialog.showMessageBoxSync(app.win, {
                type: "question",
                title: "confirm",
                message: "file was modified outside maki. do you want to reload it?",
                buttons: ['yes', 'no', 'ignore future occurrencies'],
                detail: `new size of file is: ${this.getByteCount()} bytes.`,
                icon: `${app.getAppPath()}/icon.png`
            })

            if(response === 0)
            {
                this.update(this.load())
                maki.reload()
                return !ret // return false as it was reloaded
            }
            else if(response === 2)
                this.watchdog = !this.watchdog
        }
        return ret
    }

    reload(force = false)
    {
        if(!this.path)
            return;
    
        if(!this.hasChanges() || force)
        {
            this.update(this.load())
        }
    }

    load()
    {
        if(!this.path) return;

        let data
        try
        {
            data = fs.readFileSync(this.path, 'utf-8')
        }
        catch (err)
        {
            console.log('error reading from path ' + this.path)
            this.path = null
            return;
        }

        this.__dirty = true

        return data
    }
}
