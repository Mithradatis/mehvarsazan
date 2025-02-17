import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const allowedOrigins = ["https://ikamco.ir"];

export async function GET(request: NextRequest) {
  console.log(request);
  const secret = request.nextUrl.searchParams.get("secret");
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    if (secret !== process.env.HEADLESS_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401, headers });
    }

    try {
      const paths = ["/"];
      const tags = ["home"];

      if (paths && paths.length > 0) {
        await Promise.all(paths.map((path) => revalidatePath(path)));
        console.log("Revalidated paths:", paths);
      }

      if (tags && tags.length > 0) {
        await Promise.all(tags.map((tag) => revalidateTag(tag)));
        console.log("Revalidated tags:", tags);
      }

      return new NextResponse(
        JSON.stringify({
          revalidated: true,
          now: Date.now(),
          paths,
          tags,
        }),
        { status: 200, headers }
      );
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(
        JSON.stringify({ message: "Error revalidating paths or tags" }),
        { status: 500, headers }
      );
    }
  }

  return NextResponse.json({ message: "Origin not allowed" }, { status: 403 });
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    return new Response(null, { status: 204, headers });
  }

  return new Response(null, { status: 403 });
}
