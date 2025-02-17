import AxlesImage from "@/assets/images/axles.png";
import gql from "graphql-tag";
import Image from "next/image";
import parseHTML from "@/utils/htmlParser";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";
import stripHtmlTags from "@/utils/stripHtmlTags";
import { LanguageType } from "@/types/language";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import Translation from "@/types/translation";

async function getAboutUs(language: string) {
    const widgetQuery = gql`
      query SinglePost($slug: ID!, $idType: WidgetIdType!) {
        widget(id: $slug, idType: $idType) {
            title
            content
        }
      }
    `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(
        print(widgetQuery),
        {
            slug: `about-us-${language}`,
            idType: 'URI'
        }
    );

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

async function getShortHistory(language: string) {
    const widgetQuery = gql`
     query SinglePost($slug: ID!, $idType: WidgetIdType!) {
        widget(id: $slug, idType: $idType) {
          title
          content
        }
      }
    `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(
        print(widgetQuery),
        {
            slug: `short-history-${language}`,
            idType: 'URI',
        }
    );

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

const Introduction = async (
        {
            language, 
            direction
        }: {
            language: LanguageType, 
            direction: string
        }
    ) => {
    const aboutUs = await getAboutUs(language);
    const shortHistory = await getShortHistory(language);
    const translation: Translation = await fetchTranslations(language);

    return <section dir="rtl" className="
        2xl:container 
        mx-auto 
        relative 
        z-10 
        pt-4
        px-4"
    >
        <div className="
            flex 
            flex-wrap 
            items-start 
            justify-between 
            md:px-0
            pb-12
            2xl:pb-0"
        >
            <div className="w-full lg:flex-1 2xl:mt-36 pt-6">
                <div 
                    dir={direction}
                    className="
                    relative
                    xl:mt-24
                    mt-0 
                    text-lg 
                    text-justify
                    w-full
                    lg:w-1/2 
                    xl:w-2/3 
                    text-gray-500
                    mx-auto
                    xl:mr-auto
                    2xl:mr-[25%] 
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
                    md:before:border-r-[#3F74E6]"
                >
                    {
                        parseHTML(shortHistory.content || '')
                    }
                </div>
            </div>
            <div className="
                w-full 
                xl:flex-1 
                m-auto 
                mt-10 
                flex-wrap 
                flex-col
                items-start 
                justify-start"
            >
                <div 
                    dir={direction}
                    className="
                        relative
                        w-full
                        lg:w-1/2
                        xl:w-3/4 
                        mx-auto
                        xl:mx-0
                        px-10 
                        text-justify 
                        text-blue-900 
                        text-lg 
                        py-10
                        rounded-[1rem]
                        bg-gradient-to-tr
                        from-[#f1f1f1]
                        to-[#fff]
                        border-l-4
                        border-l-solid
                        border-l-[#eee]
                        border-b-4
                        border-b-solid
                        border-b-[#eee]
                        text-shadow-[1px_1px_0_rgba(255, 255, 255,1)]
                        shadow-[2.5px_-2.5px_10px_rgba(34,34,34,.05)]
                        before:absolute
                        before:w-[20px]
                        before:h-[20px]
                        before:xl:left-[20%]
                        before:left-[50%]
                        before:rotate-45
                        before:bg-[#e7e7e7]
                        before:bottom-[-10px]
                        before:-z-10
                    "
                >
                    {
                        stripHtmlTags(aboutUs.content || '')
                    } 
                </div>
                <Image
                    quality={100}
                    width={500}
                    src={AxlesImage}
                    alt={"axles"}
                    className="
                        xl:absolute 
                        relative 
                        xl:ms-12 
                        mt-4 
                        2xl:mt-16 
                        mx-auto 
                        md:mx-auto 
                        lg:mx-auto
                    "
                />
            </div>
        </div>
    </section>
}

export default Introduction
