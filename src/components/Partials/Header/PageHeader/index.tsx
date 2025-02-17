import Navigation from "@/components/Globals/Navigation/Navigation";
import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import { LanguageType } from "@/types/language";
import LanguageSwitcher from "@/components/Widgets/languageSwitcher";

const PageHeader = async (
    {
        currentLanguage
    }: {
        currentLanguage: LanguageType
    }
) => {
    const translation: Translation = await fetchTranslations(currentLanguage);

    return (
        <>
            <div className="
                flex 
                flex-wrap 
                items-center
                justify-center 
                md:justify-between
                w-full 
                xl:w-3/4 
                m-auto 
                xl:px-0 
                px-4
                py-2"
            >
                <div className="
                    relative 
                    inline-block 
                    drop-shadow-lg"
                >
                    <div className="
                        relative 
                        z-10
                        mx-auto 
                        lg:mx-4 
                        mb-6 
                        lg:mb-0 
                        flex 
                        items-center 
                        justify-center"
                    >
                        <Image
                            className="mt-2"
                            src={Logo}
                            alt={"Mehvar Sazan Iran Khodro Logo"}
                            quality={100}
                            width={60}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="me-4">
                        <input 
                            className="rounded-lg border border-1 border-slate-300 py-2 px-4"
                            type="text" 
                            name="search"
                            placeholder={translation.search}
                        />
                    </div>
                    <LanguageSwitcher 
                        currentLang={currentLanguage} 
                    />
                </div>
            </div>
            <div className="header-gradient">
                <div className="mx-auto">
                    <div className="lg:w-3/4 w-full mx-auto">
                        <Navigation 
                            language={currentLanguage} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageHeader;