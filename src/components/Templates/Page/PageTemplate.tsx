import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import ReactHtmlParser from "react-html-parser";
import BlockRenderer from "@/components/Globals/BlockRenderer";

import SocialIcons from "@/components/Globals/SocialIcons";
import ContactWidget from "@/components/Widgets/ContactWidget";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page }: any = await fetchGraphQL<{ page: Page }>(
    print(PageQuery), 
    {
      id: node.databaseId,
    }
  );

  return <div className="
    flex 
    flex-wrap 
    items-stretch 
    w-full
  ">
    <div className="
      xl:w-1/6 
      xl:py-20
      lg:w-1/6
      lg:py-16 
      md:py-8 
      sm:p-0
      mx-auto
    ">
      <div className="
          flex 
          lg:flex-col
          flex-row 
          items-end 
          sticky 
          top-[30px] 
          lg:py-32 
          py-8
          gap-6
        ">
        <SocialIcons />
      </div>
    </div>
    <div className="
      xl:w-3/6 
      xl:py-20
      lg:w-3/6 
      lg:py-16 
      md:py-8 
      sm:p-0
      max-w-full
    ">
      <div className="flex flex-wrap">
        <div className="flex-auto w-full">
          <div className="md:p-12 p-6">
            <h1 className="
              text-5xl 
              text-bold 
              text-slate-600
            ">
              {
                page?.title || ''
              }
            </h1>
            <div className="
              py-8 
              text-lg 
              text-justify"
              id="page-content"
            >
                <BlockRenderer 
                  blocks={ReactHtmlParser(page?.content || '')} 
                />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="
      xl:w-2/6 
      lg:w-2/6 
      border-1 
      border-r 
      border-dashed 
      border-slate-300 
      py-20
      px-10
      hidden
      lg:block
    ">
      <div className="sticky top-[30px]">
        <ContactWidget />
      </div>
    </div>
  </div>;
}
