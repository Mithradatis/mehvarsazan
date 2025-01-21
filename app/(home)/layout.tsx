
import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/HomeHeader";
import Footer from "@/components/Partials/Footer";
import Modal from "@/components/Partials/Modal";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="fa" dir="rtl">
      <body>
        {isEnabled && <PreviewNotice />}
        <Modal />
        <Header />
        <main className="py-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
