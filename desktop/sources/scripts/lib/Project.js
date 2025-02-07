import TextDocument from "./TextDocument.js"

export default class Project
{
    lineEnding = '\n'
    encoding = 'utf-8'

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
        this.currentDocument = new TextDocument(this)
        this.currentDocument.update('')
    }
}
