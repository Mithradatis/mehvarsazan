import "animate.css";
import MainSlider from "@/components/Templates/Section/LightBox/main-slider";

const LightBox = async () => {
    return (
        <section className="flex xl:flex-row lg:flex-row md:flex-col flex-col items-center justify-between md:px-0 relative z-20">
            <div className="xl:ms-[12.5%] lg:text-start text-center mx-auto flex-1 min-w-1/2 px-0 pb-12 md:px-4 hidden">
                <h1 className="
                    xl:text-7xl 
                    lg:text-7xl 
                    md:text-5xl 
                    text-6xl 
                    text-white 
                    font-bold 
                    animate__animated 
                    animate__bounceInRight 
                    beveled-title
                    !leading-snug"
                >
                    محورسازان<br />
                    ایران خودرو
                </h1>
                <h2 className="text-blue-200 text-xl mt-7 font-bold animate__animated animate__fadeInUp animate__delay-1s">
                    ساخت محور خودرو
                </h2>
            </div>
            {/* <div className="lg:w-auto flex flex-col items-end">
                <div className="relative z-40">
                    <MotionWrapper
                        type="div"
                        initial={{ opacity: 0, x: -300 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                            },
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <Image
                            className={`
                                relative 
                                end-[20px]
                                sm:end-[50px] 
                                md:end-[0]
                                lg:end-[30px]
                                xl:end-[50px] 
                                bottom-[-80px] 
                                lg:bottom-[-81px] 
                                z-[3]
                                w-[350px] 
                                sm:w-[450px] 
                                md:w-[550px] 
                                lg:w-[600px] 
                                max-w-full`
                            }
                            src={CarImage}
                            alt={"car"}
                            quality={100}
                        />
                    </MotionWrapper>
                </div>
                <div
                    className="scene w-[90%] sm:w-full md:w-[120%] lg:w-[500px] xl:w-[600px] h-[100px] me-0 ms-auto relative"
                    style={{
                        perspective: '800px'
                    }}
                >
                    <div className="relative">
                        <div className="
                            absolute
                            w-full 
                            h-[80px]
                            md:skew-x-[50deg]
                            skew-x-[30deg]
                            rotate-0
                            origin-top-left
                            overflow-hidden
                            top-0
                            end-0
                            z-40"
                        >
                            <div className="
                                w-full
                                h-full
                                bg-[#f1f1f1]
                                rounded-[20px_5px_15px_0]"
                            ></div>
                        </div>
                        <div className="
                            absolute 
                            flex 
                            w-[38px]
                            sm:w-[44px]
                            md:w-[83px]
                            lg:w-[83px]
                            h-[200px]
                            top-[40px]
                            md:end-[13px]
                            end-[9px]
                            bg-gradient-to-br from-[#f1f1f1] via-[#f7f7f7] to-[#ffffff]  via-[20%] to-[40%]
                            md:skew-y-[40deg]
                            skew-y-[60deg]
                            origin-end-top
                            rounded-tl-[3px]
                            z-20"
                        ></div>
                        <div className="
                            absolute 
                            flex 
                            justify-center 
                            px-8 
                            lg:px-16 
                            w-[98%] 
                            sm:w-[98.5%]
                            md:w-[98.5%]
                            h-[200px]
                            top-[70px]
                            end-[46px]
                            md:end-[95px]
                            rounded-tr-[5px]
                            bg-gradient-to-b from-[#e7e7e7] via-[#f1f1f1] to-white from-0% via-[20%] to-[40%]
                            z-30"
                        >
                            <p className="mt-8 lg:mt-16 text-base lg:text-lg text-justify text-gray-500">
                                {parseHTML(content || '')}
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="
                main-slider 
                w-full
                h-auto
                transition-[.5s]
                relative"
            >
                <MainSlider />
            </div>
        </section>
    );
};

export default LightBox;