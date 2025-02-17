import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Link from "next/link";
import { LanguageType } from "@/types/language";

const SocialIcons = (
    {
        language
    }: {
        language: LanguageType
    }
) => {
    const socialIcons = [
        {
            title: "Home",
            icon: <FaHome />,
            link: `${process.env.NEXT_PUBLIC_BASE_URL}/${language}`,
            target: "_self"
        },
        {
            title: "Email",
            icon: <MdEmail />,
            link: "mailto:mehvarsazan@ikamco.com",
            target: "_self"
        },
        {
            title: "Language",
            icon: <span className="text-base font-bold">{ language === 'fa' ? 'EN' : 'FA' }</span>,
            link: `${process.env.NEXT_PUBLIC_BASE_URL}/${language === 'fa' ? 'en' : 'fa'}`,
            target: "_self"
        }
    ]

    return (
        <>
            {
                socialIcons.map(item =>
                    <Link 
                        href={item.link} 
                        target={item.target} 
                        key={item.title}
                    >
                        <div className="
                            text-2xl
                            text-cyan-600
                            flex
                            items-center
                            justify-center 
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-50
                            shadow-[-6px_-6px_10px_-1px_#fff,2px_2px_5px_-1px_rgba(34,34,34,0.1)]
                            hover:shadow-[inset_4px_4px_6px_-1px_rgba(0,0,0,0.1),inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.7),-0.5px_-0.5px_0px_rgba(255,255,255,1),0.5px_0.5px_0px_rgba(0,0,0,0.075),0px_12px_10px_-10px_rgba(0,0,0,0.05)]
                            hover:border
                            hover:border-slate-200
                        ">
                            {
                                item.icon
                            }
                        </div>
                    </Link>
                )
            }
        </>
    )
}

export default SocialIcons;
