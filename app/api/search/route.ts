import { NextResponse } from "next/server";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return NextResponse.json({ error: "Search term is required" }, { status: 400 });
  }

  try {
    const query = `
      query Search($search: String!) {
        pages(where: { search: $search }) {
          nodes {
            id
            title
            uri
          }
        }
      }
    `;

    const variables = { search: searchTerm };
    const revalidateTime = 1;

    const data = await fetchGraphQL<{
      pages: { nodes: Array<{ id: string; title: string; uri: string }> };
    }>( query, variables, undefined, revalidateTime);

    return NextResponse.json({ results: data.pages.nodes });
  }

catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}