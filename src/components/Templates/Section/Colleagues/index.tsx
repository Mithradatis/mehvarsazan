import Image from "next/image";
import Link from "next/link";
import IranKhodroLogo from "@/assets/logos/ikco.png";
import SapcoLogo from "@/assets/logos/sapco.png";
import IsacoLogo from "@/assets/logos/isako.png";
import ExchangeOrganizationLogo from "@/assets/logos/exchange-organizaition.png";
import TavanirLogo from "@/assets/logos/tavaniran.png";
import BeveledLabel from "@/components/Globals/BeveledLabel";
import MotionWrapper from "@/components/Globals/MotionWrapper";
import { LanguageType } from "@/types/language";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";

const Colleagues = async (
    {
        language
    }: {
        language: LanguageType
    }
) => {
    const translation: Translation = await fetchTranslations(language);
    const colleagues = [
        {
            id: 'colleague-1',
            title: {
                en: 'Iran Khodro',
                fa: 'ایران خودرو'
            },
            logo: IranKhodroLogo,
            link: 'https://ikco.ir'
        },
        {
            id: 'colleague-2',
            title: {
                en: 'Sapco',
                fa: 'ساپکو'
            },
            logo: SapcoLogo,
            link: 'https://sapco.com'
        },
        {
            id: 'colleague-3',
            title: {
                en: 'Isaco',
                fa: 'ایساکو'
            },
            logo: IsacoLogo,
            link: 'https://isaco.ir'
        },
        {
            id: 'colleague-4',
            title: {
                en: 'Securities and Exchange Organization of Iran',
                fa: 'سازمان بورس ایران'
            },
            logo: ExchangeOrganizationLogo,
            link: 'https://seo.ir'
        },
        {
            id: 'colleague-5',
            title: {
                en: 'Tavanir Co.',
                fa: 'شرکت توانیر ایران'
            },
            logo: TavanirLogo,
            link: 'https://tavanir.org.ir'
        },
    ];

    return <section className="2xl:container mx-auto relative py-12 px-4">
        <div className="min-h-[200px] mb-6">
            <div
                className="
                dashed-line 
                mx-auto
                has-arrow-before 
                relative
                after:absolute
                after:left-1/2
                after:bottom-[-12px]
                after:-translate-x-1/2
                after:w-[20px]
                after:h-[20px]
                after:rounded-full
                after:border-4
                after:border-lightBlue
            "
            ></div>
        </div>
        <BeveledLabel
            label={translation.colleagues}
            fontSize={3}
        />
        <div className="
            flex 
            flex-col 
            md:flex-row 
            flex-wrap 
            items-center 
            justify-between 
            w-full 
            lg:w-3/4 
            mx-auto 
            pt-12"
        >
            {
                colleagues.map((colleague, index) =>
                    <MotionWrapper
                            key={colleague.id}
                            type="div"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.3,
                                ease: "easeOut"
                            }}
                        >
                        <div className="w-full md:flex-1 flex justify-center">
                            <Link
                                href={colleague.link}
                                target="_blank"
                                className="
                                    grayscale 
                                    hover:grayscale-0 
                                    transition-all 
                                    duration-500 
                                    ease-in-out
                                "
                            >
                                <Image
                                    src={colleague.logo}
                                    alt={colleague.title[language]}
                                />
                            </Link>
                        </div>
                    </MotionWrapper>
                )
            }
        </div>
    </section>
}

export default Colleagues;