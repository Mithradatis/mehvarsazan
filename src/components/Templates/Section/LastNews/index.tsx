import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { getPersianDate } from "@/utils/dateTimeHandler";
import Link from "next/link";
import Image from "next/image";
import BeveledLabel from "@/components/Globals/BeveledLabel";

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
        <div className="container mx-auto relative md:px-0 px-4">
            <div className="flex flex-col items-center justify-center md:min-h-[200px] mx-auto">
                <div className="dashed-line mx-auto has-arrow-before"></div>
                <h3 className="
                    h-[5rem]
                    mt-2
                    md:absolute
                    relative 
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
                    <BeveledLabel label={"آخرین اخبار"} />
                </h3>
            </div>
            <div className="flex flex-wrap items-start justify-center md:gap-12 gap-6 w-full lg:w-3/4 mx-auto relative">
                {
                    posts.map(async (post: Post, index: number) => {
                        return <div className={`w-full lg:flex-1 card rounded-2xl overflow-hidden ${index !== 1 ? 'md:mt-12' : ''}`} key={post.node.id}>
                            <Link href={post.node.slug}>
                                <div className={`
                                    relative 
                                    z-20
                                    h-48 
                                    overflow-hidden 
                                    before:absolute
                                    before:z-20
                                    before:w-full 
                                    before:h-full 
                                    before:bg-red-500 
                                    before:top-[5px] 
                                    before:left-[5px]
                                    ${ index !== 0 ? index !== 2 ? 'md:rounded-2xl' : 'md:rounded-bl-2xl' : 'md:rounded-br-2xl' }`
                                }>
                                    <div className="
                                        
                                    "></div>
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
                                        className="relative z-20"
                                    />
                                </div>
                                <div className={`md:w-[calc(100%-1rem)] w-full p-4 border border-t-0 border-1 border-cyan-400 bg-slate-50 rounded-br-2xl rounded-bl-2xl ${ index !== 0 ? index !== 2 ? 'md:mx-auto' : 'md:ml-auto' : 'md:mr-auto' }`}>
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