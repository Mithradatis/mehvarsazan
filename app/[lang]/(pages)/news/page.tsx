import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode } from "@/gql/graphql";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { PageParams } from "@/types/page-params";
import gql from "graphql-tag";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import BlogItems from "@/components/Templates/BlogItems";
import { getThumbnailUrl } from "@/utils/imageHandler";

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

    const response = await fetchGraphQL<{ posts: any }>(print(PostsQuery));

    if (!response || !response.posts) {
        return null;
    }

    // Fetch thumbnail for each post
    const postsWithThumbs = await Promise.all(
        response.posts.edges.map(async (post: any) => {
            const image = post.node.featuredImage?.node;
            const thumb = image
                ? await getThumbnailUrl(image.sourceUrl, 300, image.mediaDetails.width, image.mediaDetails.height)
                : null;

            return {
                node: post.node,
                thumbnail: thumb,
            };
        })
    );

    return postsWithThumbs;
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
    const posts = await getPosts();

    return <BlogItems 
        posts={posts || []} 
        language={language} 
    />;
}
