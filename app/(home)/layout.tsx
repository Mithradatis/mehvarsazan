
import { draftMode } from "next/headers";
import { Suspense } from "react";
import "animate.css";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/HomeHeader";
import Footer from "@/components/Partials/Footer";
import Modal from "@/components/Partials/Modal";

import { ModalProvider } from "@/hooks/useModal";
import Loading from "@/components/Globals/Loading";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Suspense fallback={<Loading />}>
          <ModalProvider>
            {isEnabled && <PreviewNotice />}
            <Modal />
            <Header />
            <main className="pt-0 lg:pt-20">
              {children}
            </main>
            <Footer />
          </ModalProvider>
        </Suspense>
      </body>
    </html>
  );
}
