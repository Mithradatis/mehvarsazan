import Image from "next/image";
import CarImage from "@/assets/images/car.png";
import parseHTML from "@/utils/htmlParser";
import gql from "graphql-tag";

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
        <div className="flex flex-wrap items-center justify-between">
            <div className="lg:mr-[15%]">
                <h1 className="text-7xl text-white font-bold">
                    محورسازان<br />
                    ایران خودرو
                </h1>
                <h2 className="text-blue-200 text-xl mt-7 font-bold">
                    ساخت محور خودرو
                </h2>
            </div>
            <div className="w-full lg:w-auto">
                <Image
                    className={`
                        relative 
                        left-0 
                        lg:left-[-160px] 
                        bottom-[-80px] 
                        lg:bottom-[-81px] 
                        z-[3]
                        w-[325px] 
                        sm:w-[450px] 
                        md:w-[550px] 
                        lg:w-[600px] 
                        max-w-full`
                    }
                    src={CarImage}
                    alt={"car"}
                    quality={100}
                />
                <div
                    className="scene w-[95%] lg:w-[800px] h-[100px] ml-0 mr-auto"
                    style={{
                        perspective: '800px'
                    }}
                >
                    <div className="cube">
                        <div className="top-container w-[77.5%] lg:w-[600px] h-[80px]">
                            <div className="top"></div>
                        </div>
                        <div className="left flex w-1/2 lg:w-[85px] h-[200px]"></div>
                        <div className="right flex justify-center px-8 lg:px-16 w-[75%] lg:w-[591px] h-[196px]">
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