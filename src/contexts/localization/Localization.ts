export enum SupportedLanguages {
    ptBR = "ptBR",
    enUS = "enUS"
}

export interface LocalizedString {
    ptBR: string,
    enUS: string,

    [key: string]: string
}

export interface LocalizedSet {
    [key: string]: LocalizedString
}