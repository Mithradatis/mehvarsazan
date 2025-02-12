import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.HEADLESS_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
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

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths,
      tags,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating paths or tags" },
      { status: 500 }
    );
  }
}