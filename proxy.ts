import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import languages from "./lib/language";

const defaultLanguage = 'fa';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasValidLocale = Object.keys(languages).some(
    (lang) => pathname.startsWith(`/${lang}`)
  );

  if (!pathnameHasValidLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLanguage}${pathname}`, request.url)
    );
  }

  if (!process.env.WP_USER || !process.env.WP_APP_PASS) {
    return NextResponse.next();
  }

  const basicAuth = `${process.env.WP_USER}:${process.env.WP_APP_PASS}`;

  const currentLang = pathname.split('/')[1];
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '');
  const pathnameWithoutTrailingSlash = pathnameWithoutLang.replace(/\/$/, '');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/redirection/v1/redirect/?filterBy%5Burl-match%5D=plain&filterBy%5Burl%5D=${pathnameWithoutTrailingSlash}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data?.items?.length > 0) {
    const redirect = data.items.find(
      (item: any) => item.url === pathnameWithoutTrailingSlash
    );

    if (!redirect) {
      return NextResponse.next();
    }

    const redirectUrl = new URL(
      `/${currentLang}${redirect.action_data.url}`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/fa`
    ).toString();

    return NextResponse.redirect(redirectUrl, {
      status: redirect.action_code === 301 ? 308 : 307,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api|favicon.ico|fonts/|assets/|images/|.*\\.(?:ttf|woff|woff2|eot|png|jpg|jpeg|gif|svg|css|js)$).*)'
  ]
};