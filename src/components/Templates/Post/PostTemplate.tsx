import { print } from "graphql/language/printer";
import { ContentNode, Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostQuery } from "./PostQuery";
import ReactHtmlParser from "react-html-parser";
import BlockRenderer from "@/components/Globals/BlockRenderer";

import SocialIcons from "@/components/Globals/SocialIcons";
import Image from "next/image";
import { LanguageType } from "@/types/language";

interface TemplateProps {
  node: ContentNode;
  language: LanguageType
}

export default async function PostTemplate({ node, language }: TemplateProps) {
  const { post }: any = await fetchGraphQL<{ post: Post }>(
    print(PostQuery), 
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
        <SocialIcons
          language={language}
        />
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
              text-3xl 
              text-bold 
              text-slate-600
              mb-12
            ">
              {
                post?.title || ''
              }
            </h1>
            <div className="">
              <Image 
                src={post?.featuredImage?.node?.sourceUrl || ''} 
                alt={post?.featuredImage?.node?.altText || ''}
                width={500}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="
              py-8 
              text-lg 
              text-justify"
              id="post-content"
            >
                <BlockRenderer 
                  blocks={ReactHtmlParser(post?.content || '')} 
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
      hidden
      lg:block
    ">
      <div className="sticky top-[30px]">
        
      </div>
    </div>
  </div>;
}
