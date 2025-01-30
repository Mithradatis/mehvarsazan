import Link from "next/link";
import Image from "next/image";
import CarManufacturerImage from "@/assets/images/car-manufacturer.png";
import ConferenceIcon from "@/assets/icons/conference-icon.png";
import AnnouncementsIcon from "@/assets/icons/announcements-icon.png";
import BidsIcon from "@/assets/icons/bids-icon.png";
import OnlineShopIcon from "@/assets/icons/online-shop-icon.png";
import MarketingIcon from "@/assets/icons/marketing-icon.png";
import LabIcon from "@/assets/icons/lab-icon.png";

const Services = () => {
    const services = [
        {
            id: 'service-1',
            icon: ConferenceIcon,
            title: 'سالن همایش',
            link: 'سالن-همایش',
            target: '_self'
        },
        {
            id: 'service-2',
            icon: AnnouncementsIcon,
            title: 'اطلاعیه‌ها',
            link: 'اطلاعیه‌ها',
            target: '_self'
        },
        {
            id: 'service-3',
            icon: BidsIcon,
            title: 'مزایدات و مناقصات',
            link: 'مزایدات-و-مناقصات',
            target: '_self'
        },
        {
            id: 'service-4',
            icon: OnlineShopIcon,
            title: 'فروشگاه اینترنتی',
            link: 'https://eikamco.ir/',
            target: '_blank'
        },
        {
            id: 'service-5',
            icon: MarketingIcon,
            title: 'بازاریابی و فروش',
            link: 'بازاریابی-و-فروش',
            target: '_self'
        },
        {
            id: 'service-6',
            icon: LabIcon,
            title: 'آزمایشگاه',
            link: 'آزمایشگاه',
            target: '_self'
        },
    ];

    return <section className="relative bg-gray-100">
        <div className="2xl:container mx-auto relative px-4">
            <div className="has-connection flex justify-between">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 350 250"
                    className="2xl:absolute relative left-0 w-1/2 hidden 2xl:block"
                >
                    <defs>
                        <path id="path3" strokeWidth="2" strokeLinecap="round"
                            d="M 85.5 0 
                                V 47 
                                Q 85.5 62 95 62 
                                H 350"
                        />
                        <mask id="mask3">
                            <use className="mask" xlinkHref="#path3" />
                        </mask>
                    </defs>
                    <use className="path" xlinkHref="#path3" mask="url(#mask3)" />
                </svg>
                <Image
                    className="
                        hidden
                        lg:block
                        absolute
                        mx-auto
                        min-w-[100px]
                        xl:min-w-[350px]
                        xl:max-w-auto
                        max-w-[75%]
                        xl:left-[15%]
                        lg:left-[35px]
                        2xl:top-[-35px]
                        lg:top-[35px]
                        drop-shadow-[2px_4px_6px_rgba(34,34,34,.25)]
                    "
                    src={CarManufacturerImage}
                    alt={"Products"}
                    quality={100}
                />
                <div className="
                    ltr 
                    pt-10 
                    gap-10 
                    relative
                    z-10 
                    mx-auto 
                    lg:left-[210px]
                    left-0 
                    flex 
                    flex-col 
                    md:w-[36rem]
                    w-full
                ">
                    <div className="grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-6 pt-2">
                        {
                            services.map((item, index: number) => 
                            <Link 
                                href={item.link} 
                                target={item.target} 
                                key={item.id}
                                className={`${ index % 2 === 0 ? 'justify-self-end' : 'justify-self-start' }`}
                            >
                                <div className="
                                    w-40 
                                    h-40 
                                    p-4 
                                    flex 
                                    flex-col 
                                    items-center 
                                    justify-center 
                                    rounded-2xl 
                                    bg-blue-50
                                    shadow-[-6px_-6px_10px_-1px_#fff,6px_6px_10px_-1px_rgba(34,34,34,0.1)]
                                    hover:shadow-[inset_4px_4px_6px_-1px_rgba(0,0,0,0.1),inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.7),-0.5px_-0.5px_0px_rgba(255,255,255,1),0.5px_0.5px_0px_rgba(0,0,0,0.075),0px_12px_10px_-10px_rgba(0,0,0,0.05)]
                                    hover:border
                                    hover:border-slate-200
                                ">
                                    <Image
                                        className="min-w-[75px]"
                                        src={item.icon}
                                        alt={item.title}
                                        quality={100}
                                    />
                                    <h4 className="mt-2 text-slate-700">
                                        {
                                            item.title
                                        }
                                    </h4>
                                </div>
                            </Link>)
                        }

                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 350 250"
                    className="absolute right-0 top-0 w-1/2 hidden 2xl:block"
                >
                    <defs>
                        <path id="path4" strokeWidth="2" strokeLinecap="round"
                            d="M 5 60 
                            H 250 
                            Q 260 60 260 70 
                            V 140 
                            Q 260 150 250 150
                            H 5"
                        />
                        <mask id="mask4">
                            <use className="mask" xlinkHref="#path4" />
                        </mask>
                    </defs>
                    <use className="path" xlinkHref="#path4" mask="url(#mask4)" />
                </svg>
            </div>
        </div>
    </section>
}

export default Services;