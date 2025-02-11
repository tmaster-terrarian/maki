import TextDocument from "./TextDocument.js"

const fs = require('fs')
const { app, dialog } = require('@electron/remote')

export default class Project
{
    lineEnding = '\n'

    currentDocumentIndex = 0

    /** @type {TextDocument[]} */
    __documents = []

    get currentDocument()
    {
        return this.__documents[this.currentDocumentIndex]
    }

    get lineEndingFriendlyName()
    {
        switch(this.lineEnding)
        {
            case '\n': return 'lf'
            case '\r\n': return 'crlf'
            default: return null
        }
    }

    constructor()
    {
        this.__documents.push(new TextDocument())
    }

    /** @param {string} path */
    add(path)
    {
        let document
        if(!path || !(document = this.__documents.find(doc => doc.path === path)))
        {
            document = new TextDocument()
            if(path)
            {
                document = new TextDocument(this.load(path), path)
            }

            this.__documents.push(document)

            this.currentDocumentIndex = this.__documents.length - 1
        }

        maki.nav.update(this.currentDocumentIndex)
    }

    load(path)
    {
        console.log(`Load: ${path}`)
    
        let data
        try
        {
            data = fs.readFileSync(path, 'utf-8')
        }
        catch (err)
        {
            console.warn(`Could not load ${path}`)
            return;
        }
        return data
    }

    new()
    {
        console.log('New Page')

        this.add()
        maki.reload()

        setTimeout(() => {
            maki.update()
        }, 200)
    }

    open()
    {
        console.log('Open Pages')

        const paths = dialog.showOpenDialogSync(app.win, { properties: ['openFile', 'multiSelections'] })

        console.log(paths)
        if(!paths)
        {
            console.log('Nothing to load')
            return
        }

        for(const id in paths)
        {
            console.log(id)
            this.add(paths[id])
        }

        setTimeout(() => {
            maki.update()
        }, 200)
    }

    save()
    {
        console.log('Save Page')

        const doc = this.currentDocument

        if(!doc.path)
        {
            this.saveAs()
            return
        }

        fs.writeFile(doc.path, doc.text, (err) => {
            if (err) 
            {
                alert('Error updating file: ' + err.message)
                console.log(err)
                return
            }
            maki.update()
            // setTimeout(() => { maki.infoBar.el.innerHTML = `<b>Saved</b> ${doc.path}` }, 200)
        })
    }

    saveAs()
    {
        console.log('Save As Page')

        const doc = this.currentDocument
        const path = dialog.showSaveDialogSync(app.win)

        if(!path)
        {
            console.log('Nothing to save')
            return
        }

        fs.writeFile(path, doc.text, (err) => {
            if(err)
            {
                alert('Error creating file: ' + err.message)
                return
            }
            if(!doc.path)
            {
                doc.path = path
            }
            else if(doc.path !== path)
            {
                this.__documents.push(new TextDocument(doc.text, path))
            }
            maki.update()
            // setTimeout(() => { left.stats.el.innerHTML = `<b>Saved</b> ${page.path}` }, 200)
        })
    }
}
