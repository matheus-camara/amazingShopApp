import { SupportedLanguages, LocalizedSet } from "./Localization";
import React from "react";

interface IStringLocalizer {
	get(toLocalize: string): string;
	setSelectedLanguage(selected: SupportedLanguages): void;
}

class StringLocalizer implements IStringLocalizer {

	private _selectedLanguage: SupportedLanguages;
	private _resources: LocalizedSet;

	constructor(language: SupportedLanguages, resources: LocalizedSet) {
		this._selectedLanguage = language;
		this._resources = resources;
	}

	public setSelectedLanguage(selected: SupportedLanguages) {
		this._selectedLanguage = selected;
	}

	get(toLocalize: string): string {
		const found = this._resources[toLocalize];

		switch (this._selectedLanguage) {
			case SupportedLanguages.enUS:
				return found?.en_US ?? toLocalize;

			case SupportedLanguages.ptBR:
				return found?.pt_BR ?? toLocalize;
		}
	}
}

const StringLocalizerContext = React.createContext<IStringLocalizer | null>(null);
const LanguageContext = React.createContext<((language: SupportedLanguages) => void) | null>(null);

export const StringLocalizerProvider = ({ children, resources, defaultLanguage }: { children: any, resources: LocalizedSet, defaultLanguage: SupportedLanguages }) => {
	const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage);
	const localizer = () => new StringLocalizer(selectedLanguage, resources);

	return (
		<StringLocalizerContext.Provider value={localizer()}>
			<LanguageContext.Provider value={setSelectedLanguage}>
				{children}
			</LanguageContext.Provider>
		</StringLocalizerContext.Provider>
	)
}

export const useStringLocalizer = () => {
	const localizer = React.useContext(StringLocalizerContext);
	if (!localizer) {
		throw new Error("useStringLocalizer must be used within a StringLocalizerProvider")
	}

	return localizer;
}

export const useSetLanguage = () => {
	const setLanguage = React.useContext(LanguageContext);
	if (!setLanguage) {
		throw new Error("useSetLanguage must be used within a StringLocalizerProvider")
	}

	return setLanguage;
}