import Image from "next/image";
import AxlesImage from "@/assets/images/axles.png";
import parseHTML from "@/utils/htmlParser";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";

async function getWidget() {
    const widgetQuery = gql`
     query SinglePost {
        widget(id: "19", idType: DATABASE_ID) {
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

const Introduction = async () => {
    const content = await getWidget();

    return <section className="2xl:container mx-auto relative z-10">
        <div className="flex flex-wrap items-start justify-between md:px-0 px-4 py-12 xl:py-12 2xl:py-0">
            <div className="w-full lg:flex-1">
                <div className={`
                    relative
                    lg:mt-24
                    mt-20 
                    text-lg 
                    text-justify
                    w-full 
                    lg:w-2/3 
                    text-gray-500
                    mr-auto 
                    lg:mr-[25%] 
                    p-10
                    bg-gradient-to-b 
                    from-transparent 
                    from-0% 
                    via-ultraLightBlue 
                    via-90% 
                    to-ultraLightBlue 
                    to-100% 
                    rounded-xl 
                    shadow
                    md:before:absolute
                    md:before:top-[-1.5rem]
                    md:before:right-[-1.5rem]
                    md:before:w-[5rem]
                    md:before:h-[5rem]
                    md:before:rounded-tr-[1.2rem]
                    md:before:border-t-4
                    md:before:border-r-4
                    md:before:border-t-[#3F74E6]
                    md:before:border-r-[#3F74E6]`}
                >
                    {
                        parseHTML(content.content)
                    }
                </div>
            </div>
            <div className="w-full xl:flex-1 m-auto mt-16 flex-wrap items-start justify-center hidden xl:flex">
                <Image
                    width={550}
                    src={AxlesImage}
                    alt={"axles"}
                    quality={100}
                    className={"md:absolute relative lg:mt-12"}
                />
            </div>
        </div>
    </section>
}

export default Introduction
