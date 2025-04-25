
import { draftMode } from "next/headers";
import { Suspense } from "react";
import languages from "@/lib/language";
import "animate.css";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/HomeHeader";
import Footer from "@/components/Partials/Footer";
import Modal from "@/components/Partials/Modal";

import { ModalProvider } from "@/hooks/useModal";
import Loading from "@/components/Globals/Loading";
import NavigationLoading from "@/components/Globals/NavigationLoading";
import { LayoutParams } from "@/types/page-params";

type Props = {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { lang } = await params;
  const dir = languages[lang]?.dir || 'ltr';
  const { isEnabled } = await draftMode();

  return (
    <html lang={lang}>
      <body dir={dir}>
        <Suspense fallback={<Loading />}>
          <ModalProvider>
            <NavigationLoading />
            {isEnabled && <PreviewNotice />}
            <Modal />
            <Header 
              currentLanguage={lang}
            />
            <main className="pt-0 lg:pt-20">
              {children}
            </main>
            <Footer 
              currentLanguage={lang} 
            />
          </ModalProvider>
        </Suspense>
      </body>
    </html>
  );
}
