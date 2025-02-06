export class MenuOption
{
    /**
     * @param {{
     *   name: string,
     *   altKey?: string,
     *   onclick?: () => {},
     *   keyListener?: (event: KeyboardEvent) => boolean,
     *   hint?: string,
     *   sectionEnd?: boolean,
     *   menu?: MenuOptionList
     * }} [options]
     */
    constructor(options)
    {
        this.name = options?.name ?? 'Undefined'
        this.altKey = options?.altKey ?? null
        this.onclick = options?.onclick ?? (() => {})
        this.keyListener = options?.keyListener ?? (() => false)
        this.hint = options?.hint ?? ''
        this.sectionEnd = options?.sectionEnd ?? false
        this.menu = options?.menu ?? null
    }
}

export class MenuOptionList
{
    /**
     * @param  {MenuOption[]} options
     */
    constructor(options)
    {
        this.options = options ?? []
    }
}
