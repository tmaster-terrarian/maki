import TextDocument from "./TextDocument.js"

export default class Project
{
    lineEnding = '\n'
    encoding = 'utf-8'

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
        this.__documents.push(new TextDocument(this))
        this.currentDocument.update('')
    }
}
