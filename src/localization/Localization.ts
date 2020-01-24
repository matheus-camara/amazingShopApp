export enum SupportedLanguages {
    ptBR = "pt-BR",
    enUS = "en-US"
}

export interface LocalizedString {
    en_US: string,
    pt_BR: string
}

export interface LocalizedSet {
    [key: string]: LocalizedString
}