import Image from "next/image";
import CarImage from "@/assets/images/car.png";
import parseHTML from "@/utils/htmlParser";
import gql from "graphql-tag";
import MotionWrapper from "@/components/Globals/MotionWrapper";
import "animate.css";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";

async function getWidget() {
    const widgetQuery = gql`
   query SinglePost {
      widget(id: "16", idType: DATABASE_ID) {
        title
        content
      }
    }
  `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(print(widgetQuery));

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

const LightBox = async () => {
    const content = await getWidget();

    return (
        <div className="flex xl:flex-row lg:flex-row md:flex-col flex-col items-center justify-center md:px-0 px-4">
            <div className="md:mr-[15%] md:text-right text-center mx-auto flex-1 min-w-1/2">
                <h1 className="md:text-7xl text-6xl text-white font-bold animate__animated animate__bounceInRight">
                    محورسازان<br />
                    ایران خودرو
                </h1>
                <h2 className="text-blue-200 text-xl mt-7 font-bold animate__animated animate__fadeInUp animate__delay-1s">
                    ساخت محور خودرو
                </h2>
            </div>
            <div className="lg:w-auto flex flex-col items-end">
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
                                left-[20px]
                                sm:left-[20px] 
                                lg:left-[50px] 
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
                    className="scene w-[90%] sm:w-full md:w-full lg:w-[600px] h-[100px] ml-0 mr-auto relative"
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
                            left-0
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
                            lg:w-[82px]
                            md:w-[82px]
                            sm:w-[82px]
                            w-[38px]
                            h-[200px]
                            top-[40px]
                            md:left-[13px]
                            left-[9px]
                            bg-gradient-to-br from-[#f1f1f1] via-[#f7f7f7] to-[#ffffff]  via-[20%] to-[40%]
                            md:skew-y-[40deg]
                            skew-y-[60deg]
                            origin-left-top
                            z-20"
                        ></div>
                        <div className="
                            absolute 
                            flex 
                            justify-center 
                            px-8 
                            lg:px-16 
                            w-[98%] 
                            sm:w-[98.3%]
                            md:w-[98.3%]
                            h-[200px]
                            top-[70px]
                            left-[46px]
                            md:left-[95px]
                            rounded-tr-[5px]
                            bg-gradient-to-b from-[#e7e7e7] via-[#f1f1f1] to-white from-0% via-[20%] to-[40%]
                            z-30"
                        >
                            <p className="mt-8 lg:mt-16 text-base lg:text-lg text-justify text-gray-500">
                                {parseHTML(content.content)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightBox;