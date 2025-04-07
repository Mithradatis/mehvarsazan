import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode } from "@/gql/graphql";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { PageParams } from "@/types/page-params";
import SocialIcons from "@/components/Globals/SocialIcons";
import gql from "graphql-tag";
import Image from "next/image";
import { getThumbnailUrl } from "@/utils/imageHandler";
import Link from "next/link";
import stripHtmlTags from "@/utils/stripHtmlTags";
import { getPersianDate } from "@/utils/dateTimeHandler";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";

type Props = {
    params: Promise<PageParams>;
};

async function getPosts() {
    const PostsQuery = gql`
        query LatestPosts {
            posts {
                edges {
                    node {
                        id
                        title
                        slug
                        date
                        content
                        featuredImage {
                            node {
                                sourceUrl
                                altText
                                mediaDetails {
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
   `;

    const response = await fetchGraphQL<{
        posts: any;
    }>(print(PostsQuery));

    if (!response || !response.posts) {
        return null;
    }

    return response.posts.edges;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = await nextSlugToWpSlug(resolvedParams.slug || '');
    const decodedSlug = decodeURIComponent(slug);
    const isPreview = slug.includes("preview");

    const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode & { seo: unknown } }>(
        print(SeoQuery),
        {
            slug: isPreview ? slug.split("preview/")[1] : decodedSlug,
            idType: isPreview ? "DATABASE_ID" : "URI",
        },
    );

    if (!contentNode) {
        return notFound();
    }

    const metadata = setSeoData({ seo: contentNode.seo });

    return {
        ...metadata,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
        }
    } as Metadata;
}

export function generateStaticParams() {
    return [];
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const language = resolvedParams.lang;
    const translation: Translation = await fetchTranslations(language);
    const posts = await getPosts();

    const blogItems = await Promise.all(
        posts.map(async (post: Post, index: number) => {
          const thumb = await getThumbnailUrl(
            post.node.featuredImage.node.sourceUrl,
            300,
            post.node.featuredImage.node.mediaDetails.width,
            post.node.featuredImage.node.mediaDetails.height
          );
      
          return (
            <div className="flex md:flex-row items-start mb-6" key={`post-${index}`}>
              <Link href={`/${language}/${post.node.slug}`}>
                <div className="min-w-[300px] mx-4 flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={thumb}
                    alt={post.node.title}
                    width={350}
                    height={200}
                    quality={100}
                    className="relative w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div>
                <p className="text-slate-500 text-sm mb-1">
                  {getPersianDate(post.node.date)}
                </p>
                <h3 className="flex-1 text-xl font-bold mb-2">
                  <Link href={`/${language}/${post.node.slug}`}>
                    {post.node.title}
                  </Link>
                </h3>
                <p className="text-base">
                  {stripHtmlTags(post.node.content, 200)}
                </p>
              </div>
            </div>
          );
        })
      );

    return (
        <div className="
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
                                text-5xl 
                                text-bold 
                                text-slate-600
                            ">
                                { translation.news }
                            </h1>
                            <div className="
                                py-8 
                                text-lg 
                                text-justify"
                                id="page-content"
                            >
                                {
                                    posts.map(async (post: Post, index: number) => (
                                        <div className="flex md:flex-row items-start mb-6" key={`post-${index}`}>
                                            <Link href={`/${language}/${post.node.slug}`}>
                                                <div className="min-w-[300px] mx-4 flex-1 rounded-lg overflow-hidden" style={{ minWidth: 300 }}>
                                                    <Image
                                                        src={
                                                            await getThumbnailUrl(
                                                                post.node.featuredImage.node.sourceUrl,
                                                                300,
                                                                post.node.featuredImage.node.mediaDetails.width,
                                                                post.node.featuredImage.node.mediaDetails.height
                                                            )
                                                        }
                                                        alt={post.node.title}
                                                        width={350}
                                                        height={200}
                                                        quality={100}
                                                        className="relative w-full h-full object-cover"
                                                    />
                                                </div>
                                            </Link>
                                            <div>
                                                <p className="text-slate-500 text-sm" style={{ marginBottom: 5 }}>
                                                    {
                                                        getPersianDate(post.node.date)
                                                    }
                                                </p>
                                                <h3 className="flex-1 text-xl font-bold mb-2">
                                                    <Link href={`/${language}/${post.node.slug}`}>
                                                        {
                                                            post.node.title
                                                        }
                                                    </Link>
                                                </h3>
                                                <p className="text-base">
                                                    {
                                                        stripHtmlTags(post.node.content, 200)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
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

                </div>
            </div>
        </div>
    );
}
