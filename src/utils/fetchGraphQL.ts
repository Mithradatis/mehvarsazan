import { draftMode, cookies } from "next/headers";

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: { [key: string]: any },
  headers?: { [key: string]: string },
  revalidateTime?: number,
): Promise<T> {
  const { isEnabled: preview } = await draftMode();

  try {
    let authHeader = "";
    if (preview) {
      const cookiesStore = await cookies();
      const auth = cookiesStore.get("wp_jwt")?.value;
      if (auth) {
        authHeader = `Bearer ${auth}`;
      }
    }

    const body = JSON.stringify({
      query,
      variables: {
        preview,
        ...variables,
      },
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
          ...headers,
        },
        body,
        cache: preview ? "no-cache" : "force-cache",
        next: {
          revalidate: revalidateTime || 60,
          tags: ["wordpress"],
        },
      },
    );

    if (!response.ok) {
      console.error("Response Status:", response);
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      throw new Error("Error executing GraphQL query");
    }

    return data.data as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
