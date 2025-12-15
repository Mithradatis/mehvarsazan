
import { draftMode } from "next/headers";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/PageHeader";
import Footer from "@/components/Partials/Footer";

import languages from "@/lib/language";
import { ModalProvider } from "@/hooks/useModal";
import Modal from "@/components/Partials/Modal";
import { Suspense } from "react";
import Loading from "@/components/Globals/Loading";
import NavigationLoading from "@/components/Globals/NavigationLoading";

export default async function RootLayout({
  children,
  params
}: TLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dir = languages[lang]?.dir || 'ltr';
  const { isEnabled } = await draftMode();

  return (
    <html lang={lang}>
      <body
        dir={dir}
        className="flex flex-col"
        style={{ minHeight: '100vh' }}
      >
        <Suspense fallback={<Loading />}>
          <ModalProvider>
            <NavigationLoading />
            {isEnabled && <PreviewNotice />}
            <Modal />
            <Header
              currentLanguage={lang}
            />
            <main className="
            flex-1 
            flex 
            items-stretch 
            bg-gradient-to-r 
            from-slate-200 
            to-white">
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
