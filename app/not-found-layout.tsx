
import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/PageHeader";
import Footer from "@/components/Partials/Footer";

const inter = Inter({ subsets: ["latin"] });

export default async function NotFoundLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="fa" dir="rtl">
      <body 
        className={`${inter.className} flex flex-col`} 
        style={{ minHeight: '100vh' }}
      >
        {isEnabled && <PreviewNotice />}
        <Header />
        <main className="
          flex-1 
          flex 
          items-stretch 
          bg-gradient-to-br 
          from-slate-100 
          to-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
