import Link from "next/link";
import Image from "next/image";
import { LanguageType } from "@/types/language";
import { getPersianDate } from "@/utils/dateTimeHandler";
import stripHtmlTags from "@/utils/stripHtmlTags";
import SocialIcons from "@/components/Globals/SocialIcons";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import Translation from "@/types/translation";

interface BlogItemsProps {
    posts: {
        node: Post["node"];
        thumbnail: string | null;
    }[];
    language: LanguageType;
}

const BlogItems = async ({ posts, language }: BlogItemsProps) => {
    const translation: Translation = await fetchTranslations(language);

    return (
        <div className="flex flex-wrap items-stretch w-full">
            <div className="xl:w-1/6 xl:py-20 lg:w-1/6 lg:py-16 md:py-0 sm:p-0 mx-auto">
                <div className="md:flex lg:flex-col hidden flex-row items-end sticky top-[30px] lg:py-16 xl:py-32 pt-8 pb-0 gap-6">
                    <SocialIcons language={language} />
                </div>
            </div>
            <div className="xl:w-3/6 xl:py-20 lg:w-3/6 lg:pb-16 lg:pt-0 md:py-0 sm:p-0 max-w-full">
                <div className="flex flex-wrap">
                    <div className="flex-auto w-full">
                        <div className="md:p-12 p-6">
                            <h1 className="text-5xl text-bold text-slate-600">
                                {translation.news}
                            </h1>
                            <div className="py-8 text-lg text-justify" id="page-content">
                                {posts.map((post, index) => (
                                    <div className="flex flex-col md:flex-row gap-4 items-start mb-6" key={`post-${index}`}>
                                        <div className="rounded-lg overflow-hidden mb-2 min-w-[300px] w-full md:w-auto">
                                            <Link href={`/${language}/${post.node.slug}`} className="block">
                                                <Image
                                                    src={post.thumbnail || "/placeholder.jpg"}
                                                    alt={post.node.title}
                                                    width={350}
                                                    height={200}
                                                    quality={100}
                                                    className="w-full object-cover"
                                                />
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-sm md:mb-1 mb-0">
                                                {getPersianDate(post.node.date)}
                                            </div>
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-2/6 lg:w-2/6 border-1 border-r border-dashed border-slate-300 py-0 xl:py-20 px-10 hidden lg:block">
                <div className="sticky top-[30px]">
                    {/* Sidebar content (optional) */}
                </div>
            </div>
        </div>
    );
};

export default BlogItems;
