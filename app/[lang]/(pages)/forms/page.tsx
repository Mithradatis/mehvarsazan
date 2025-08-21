import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode } from "@/gql/graphql";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { PageParams } from "@/types/page-params";
import Form from "@/components/Globals/Form";
import SocialIcons from "@/components/Globals/SocialIcons";
import gql from "graphql-tag";
import parseHTML from "@/utils/htmlParser";

type Props = {
    params: Promise<PageParams>;
};

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

    return {
        title: "محورسازان ایران خودرو | فرم استخدام",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
        }
    } as Metadata;
}

export function generateStaticParams() {
    return [];
}

async function getEmploymentFormGudie(language: string) {
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
            slug: `employment-form-guide-${language}`,
            idType: 'URI',
        }
    );

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const language = resolvedParams.lang;

    const employmentFormGuide = await getEmploymentFormGudie(language);

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
                            <div className="
                                py-8 
                                text-lg 
                                text-justify"
                                id="page-content"
                            >
                                <div className="px-6">
                                    {
                                        parseHTML(employmentFormGuide?.content || '')
                                    }
                                </div>
                                <Form
                                    formId="910"
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
                <div className="sticky top-[30px]"></div>
            </div>
        </div>
    );
}
