import Image from "next/image";
import Link from "next/link";
import IranKhodroLogo from "@/assets/logos/ikco.png";
import SapcoLogo from "@/assets/logos/sapco.png";
import IsacoLogo from "@/assets/logos/isako.png";
import ExchangeOrganizationLogo from "@/assets/logos/exchange-organizaition.png";
import TavanirLogo from "@/assets/logos/tavaniran.png";

const Colleagues = async () => {
    const colleagues = [
        {
            id: 'colleague-1',
            title: 'ایران خودرو',
            logo: IranKhodroLogo,
            link: 'https://ikco.ir'
        },
        {
            id: 'colleague-2',
            title: 'ساپکو',
            logo: SapcoLogo,
            link: 'https://sapco.com'
        },
        {
            id: 'colleague-3',
            title: 'ایساکو',
            logo: IsacoLogo,
            link: 'https://isaco.ir'
        },
        {
            id: 'colleague-4',
            title: 'سازمان بورس ایران',
            logo: ExchangeOrganizationLogo,
            link: 'https://seo.ir'
        },
        {
            id: 'colleague-5',
            title: 'شرکت توانیر ایران',
            logo: TavanirLogo,
            link: 'https://tavanir.org.ir'
        },
    ];

    return <div className="container mx-auto relative pt-12">
        <div className="dashed-line absolute left-1/2 has-arrow-before"></div>
        <div className="flex flex-wrap items-center justify-between w-full lg:w-3/4 mx-auto pt-52">
            {
                colleagues.map(colleague => <div key={colleague.id} className="w-full md:flex-1 flex justify-center">
                    <Link
                        href={colleague.link}
                        target="_blank"
                        className="grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                    >
                        <Image
                            src={colleague.logo}
                            alt={colleague.title}
                        />
                    </Link>
                </div>)
            }
        </div>
    </div>
}

export default Colleagues;