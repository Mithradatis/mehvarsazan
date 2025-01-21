import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { getPersianDate } from "@/utils/dateTimeHandler";
import Link from "next/link";
import Image from "next/image";

interface Post {
    node: {
        id: string;
        title: string;
        slug: string;
        date: string;
        featuredImage: {
            node: {
                sourceUrl: string;
                altText: string;
                mediaDetails: {
                    width: number;
                    height: number;
                };
            };
        };
    }
}

async function getLatestPosts() {
    const LatestPostsQuery = gql`
        query LatestPosts {
            posts(last: 3) {
                edges {
                    node {
                        id
                        title
                        slug
                        date
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
    }>(print(LatestPostsQuery));

    if (!response || !response.posts) {
        return null;
    }

    return response.posts.edges;
}
const LastNews = async () => {
    const posts = await getLatestPosts();

    return <section 
                id="latest-news" 
                className="
                    relative 
                    bg-gradient-to-b 
                    from-gray-100 
                    via-transparent 
                    to-transparent
                "
            >
        <div className="container mx-auto relative">
            <div className="flex flex-col items-center justify-center">
                <div className="dashed-line mx-auto"></div>
                <h3 className="
                    mt-2
                    absolute 
                    inline-flex 
                    mx-auto 
                    font-bold 
                    text-2xl 
                    bg-[#f6f7f8] 
                    py-4
                    before:absolute
                    before:left-[50%]
                    before:translate-x-[-50%]
                    before:top-0
                    before:w-8
                    before:h-1
                    before:bg-[#7fc1e4]
                     after:absolute
                    after:left-[50%]
                    after:translate-x-[-50%]
                    after:bottom-0
                    after:w-8
                    after:h-1
                    after:bg-[#7fc1e4]
                ">
                    آخرین اخبار
                </h3>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-12 w-full lg:w-3/4 mx-auto relative">
                {
                    posts.map(async (post: Post, index: number) => {
                        return <div className={`w-full lg:flex-1 card rounded-2xl overflow-hidden ${index !== 1 ? 'mt-12' : ''}`} key={post.node.id}>
                            <Link href={post.node.slug}>
                                <div className={`relative h-48 overflow-hidden ${ index !== 0 ? index !== 2 ? 'rounded-2xl' : 'rounded-bl-2xl' : 'rounded-br-2xl' }`}>
                                    <Image
                                        src={
                                            await getThumbnailUrl(
                                                post.node.featuredImage.node.sourceUrl,
                                                300,
                                                post.node.featuredImage.node.mediaDetails.width,
                                                post.node.featuredImage.node.mediaDetails.height
                                            )
                                        }
                                        alt={ post.node.title }
                                        width={350}
                                        height={200}
                                        quality={100}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                                <div className={`w-[calc(100%-1rem)] p-4 border border-t-0 border-1 border-cyan-400 bg-slate-50 rounded-br-2xl rounded-bl-2xl ${ index !== 0 ? index !== 2 ? 'mx-auto' : 'ml-auto' : 'mr-auto' }`}>
                                    <h4 className="mb-4 text-justify">
                                        {
                                            post.node.title
                                        }
                                    </h4>
                                    <p className="text-slate-500 text-sm">{getPersianDate(post.node.date)}</p>
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
}

export default LastNews;