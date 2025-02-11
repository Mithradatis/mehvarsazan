import Navigation from "@/components/Globals/Navigation/Navigation";
import LightBox from "@/components/Templates/Section/LightBox";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logos/logo.png";

const HomeHeader = async () => {
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
                    <div className="ml-4">
                        <input 
                            className="rounded-lg border border-1 border-slate-300 py-2 px-4"
                            type="text" 
                            name="search"
                            placeholder="جست‌وجو"
                        />
                    </div>
                    <div>
                        <Link href={'#'}>
                            فا
                        </Link>
                        <span className="mx-2">|</span>
                        <Link href={'#'}>
                            EN
                        </Link>
                    </div>
                </div>
            </div>
            <div className="
                header-gradient 
                max-h-auto 
                lg:max-h-[650px]
                2xl:min-h-[650px]"
            >
                <div className="2xl:container mx-auto py-6 px-4">
                    <div className="lg:w-4/5 w-full mx-auto mb-6">
                        <Navigation />
                    </div>
                    <header>
                        <LightBox />
                    </header>
                </div>
            </div>
        </>
    );
};

export default HomeHeader;