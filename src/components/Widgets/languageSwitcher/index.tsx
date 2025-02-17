import Link from 'next/link';
import languages from '@/lib/language';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {

    return (
        <div id="language-switcher">
            {
                Object.keys(languages).map((lang: any, index: number) => (
                    <div key={lang} className="inline-block">
                        <Link
                            href={`/${lang}`}
                            className={currentLang === lang ? 'active' : ''}
                        >
                            {languages[lang].name}
                        </Link>
                        {
                            index < Object.keys(languages).length - 1 &&
                            <span className="mx-2">|</span>
                        }
                    </div>
                ))
            }
        </div>
    );
}