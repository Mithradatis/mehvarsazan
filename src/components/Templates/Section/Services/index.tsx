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
            link: ''
        },
        {
            id: 'service-2',
            icon: AnnouncementsIcon,
            title: 'اطلاعیه‌ها',
            link: ''
        },
        {
            id: 'service-3',
            icon: BidsIcon,
            title: 'مزایدات و مناقصات',
            link: ''
        },
        {
            id: 'service-4',
            icon: OnlineShopIcon,
            title: 'فروشگاه اینترنتی',
            link: ''
        },
        {
            id: 'service-5',
            icon: MarketingIcon,
            title: 'بازاریابی و فروش',
            link: ''
        },
        {
            id: 'service-6',
            icon: LabIcon,
            title: 'آزمایشگاه',
            link: 'آزمایشگاه'
        },
    ];

    return <section className="relative bg-gray-100">
        <div className="container mx-auto relative">
            <div className="has-connection">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 350 250"
                    className="absolute left-0 w-1/2"
                >
                    <defs>
                        <path id="path3" strokeWidth="2" strokeLinecap="round"
                            d="M 80 0 
                                V 47 
                                Q 80 60 88 60 
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
                        min-w-[350px] 
                        absolute 
                        left-[15%] 
                        top-[-35px]
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
                    left-[210px] 
                    flex flex-col 
                    w-[36rem]
                ">
                    <div className="grid grid-cols-3 gap-10 pt-2">
                        {
                            services.map(item => <Link href={item.link} key={item.id}>
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
                                    <h4 className="mt-2 text-slate-500">
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
                    className="absolute right-0 top-0 w-1/2"
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