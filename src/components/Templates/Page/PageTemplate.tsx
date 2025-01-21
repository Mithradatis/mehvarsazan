import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import ReactHtmlParser from "react-html-parser";
import BlockRenderer from "@/components/Globals/BlockRenderer";

import SocialIcons from "@/components/Globals/SocialIcons";

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
  // const images = extractBlockFromBlocks(page.blocks, 'gallery');

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
    ">
      <div className="
          flex 
          flex-col 
          items-end 
          sticky 
          top-[30px] 
          py-32 
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
    ">
      <div className="flex flex-wrap">
        <div className="flex-auto w-full">
          <div className="p-12">
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
      p-20
    ">
      <div className="sticky top-[30px]">
        <div className="
          mt-28
          text-2xl
          text-slate-800 
          w-3/4
          p-8
          rounded-2xl
          bg-gradient-to-br
          from-blue-100
          to-blue-50
          shadow-[-6px_-6px_10px_-1px_#fff,2px_2px_3px_-1px_rgba(34,34,34,0.1)]
        ">
          <span className="text-demi-bold">
            اطلاعات تماس
          </span>
        </div>
      </div>
    </div>
  </div>;
}
