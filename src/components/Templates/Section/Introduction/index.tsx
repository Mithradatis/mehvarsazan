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

    return <section className="container mx-auto relative z-10">
        <div className="flex flex-wrap items-start justify-between">
            <div className="w-full lg:flex-1">
                <div className={`
                    mt-24
                    history 
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
                    via-lightBlue 
                    via-90% 
                    to-lightBlue 
                    to-100% 
                    rounded-xl 
                    shadow`
                }>
                    {parseHTML(content.content)}
                </div>
            </div>
            <div className="w-full lg:flex-1 m-auto mt-16 flex flex-wrap items-start justify-center">
                <Image
                    width={500}
                    src={AxlesImage}
                    alt={"axles"}
                    quality={100}
                    className={"absolute pt-3"}
                />
            </div>
        </div>
    </section>
}

export default Introduction
