export default class Project
{
    lineEnding = 'LF'
    encoding = 'UTF-8'

    currentDocument = {
        text: '',
        name: 'untitled',
        path: null,
        getLabels: () => [],
        getLines: () => this.currentDocument.text.split(this.currentDocument.lineEnding),
        getByteCount: () => 0,
        getCharCount: () => 0,
        getWordCount: () => 0,
    }

    constructor()
    {
        
    }
}
