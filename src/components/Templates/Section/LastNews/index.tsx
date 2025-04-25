import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { getPersianDate } from "@/utils/dateTimeHandler";
import Link from "next/link";
import Image from "next/image";
import BeveledLabel from "@/components/Globals/BeveledLabel";
import { LanguageType } from "@/types/language";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";

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

const LastNews = async (
    {
        language
    }: {
        language: LanguageType
    }
) => {
    const posts = await getLatestPosts();
    const translation: Translation = await fetchTranslations(language);

    return (
        <section
            dir="rtl"
            id="latest-news"
            className="
                    relative 
                    bg-gradient-to-b 
                    from-gray-100 
                    via-transparent 
                    to-transparent
                    md:lg-0
                    pb-12
                "
        >
            <div className="2xl:container mx-auto relative px-4 pt-12 xl:pt-0">
                <div className="flex flex-col items-center justify-center xl:min-h-[200px] mx-auto">
                    <div className="dashed-line mx-auto hidden xl:block"></div>
                    <h3 className="
                    xl:h-[5rem]
                    mt-2
                    mb-6
                    xl:mb-0
                    xl:absolute
                    relative 
                    inline-flex 
                    mx-auto 
                    font-bold 
                    text-2xl 
                    bg-[#f6f7f8] 
                    py-4
                    xl:before:absolute
                    xl:before:end-[50%]
                    xl:before:translate-x-[-50%]
                    xl:before:top-0
                    xl:before:w-8
                    xl:before:h-1
                    xl:before:bg-[#7fc1e4]
                     xl:after:absolute
                    xl:after:end-[50%]
                    xl:after:translate-x-[-50%]
                    xl:after:bottom-0
                    xl:after:w-8
                    xl:after:h-1
                    xl:after:bg-[#7fc1e4]
                ">
                        <BeveledLabel
                            label={translation.last_news}
                            fontSize={2.5}
                            extraClasses={language === 'fa' ? '' : 'mt-2'}
                        />
                    </h3>
                </div>
                <div className="
                flex 
                flex-wrap 
                items-start 
                justify-center 
                md:gap-12 
                gap-6 
                w-full 
                lg:w-3/4 
                mx-auto 
                relative"
                >
                    {
                        posts.map(async (post: Post, index: number) => {
                            return <div
                                className={`w-full lg:flex-1 card rounded-2xl overflow-hidden ${index !== 1 ? 'md:mt-12' : ''}`}
                                key={post.node.id}
                            >
                                <Link href={post.node.slug}>
                                    <div className={`
                                    relative 
                                    z-20
                                    min-h-48
                                    xl:h-48
                                    h-auto 
                                    overflow-hidden
                                    ${index !== 0 ? index !== 2 ? 'md:rounded-2xl' : 'md:rounded-bl-2xl' : 'md:rounded-br-2xl'}`
                                    }>
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
                                            className="relative z-20 w-full h-full"
                                        />
                                    </div>
                                    <div className={`
                                        md:w-[calc(100%-1rem)] 
                                        w-full 
                                        p-4 
                                        border 
                                        border-t-0 
                                        border-1 
                                        border-cyan-400 
                                        bg-slate-50 
                                        rounded-br-2xl 
                                        rounded-bl-2xl 
                                        ${index !== 0 ? index !== 2 ? 'md:mx-auto' : 'md:me-auto' : 'md:ms-auto'}`
                                    }
                                    >
                                        <h4 className="mb-4 text-justify">
                                            {
                                                post.node.title
                                            }
                                        </h4>
                                        <p className="text-slate-500 text-sm">
                                            {
                                                getPersianDate(post.node.date)
                                            }
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="text-center mt-10 lg:mt-0">
                <Link 
                    href="/news"
                >
                    <span 
                        className="
                        font-bold
                        text-xl
                        text-blue-800
                        rounded-xl
                        border-[3px]
                        border-[rgba(127,193,228,.5)]
                        px-6
                        py-3
                        transition
                        duration-200
                        ease-in
                        hover:bg-lightBlue
                        hover:text-white"
                    >
                        { 
                            translation.read_more 
                        }
                    </span>
                </Link>
            </div>
        </section>
    );
}

export default LastNews;