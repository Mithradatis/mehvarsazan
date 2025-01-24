import type { Metadata } from "next";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode, Page } from "@/gql/graphql";
import { PageQuery } from "@/components/Templates/Page/PageQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";

const notFoundPageWordPressId = 501;

export async function generateMetadata(): Promise<Metadata> {
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode & { seo: unknown } }>(
    print(SeoQuery),
    { slug: notFoundPageWordPressId, idType: "DATABASE_ID" },
  );

  if (!contentNode || !contentNode.seo) {
    // Handle the case where contentNode or seo data is missing
    return {
      title: "404 Not Found",
      description: "The page you are looking for does not exist.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
      },
    };
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  } as Metadata;
}

export default async function NotFound() {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: notFoundPageWordPressId,
  });
  if (!page) {
    // Handle the case where the page data is not found
    return <p>The page you are looking for does not exist.</p>;
  }

  return (page.content || "Page content is missing.");
}
