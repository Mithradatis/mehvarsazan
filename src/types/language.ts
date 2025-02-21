export type LanguageType = 'en' | 'fa';

export interface LanguageProps {
    name: string;
    abbreviation: string;
    dir: string;
    locale: string;
}

interface Language {
    [key: string]: LanguageProps
}

export default Language;