
import { draftMode } from "next/headers";

import "@/app/globals.css";
import "@/app/globals.scss";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Header from "@/components/Partials/Header/PageHeader";
import Footer from "@/components/Partials/Footer";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="fa" dir="rtl">
      <body 
        className="flex flex-col" 
        style={{ minHeight: '100vh' }}
      >
        {isEnabled && <PreviewNotice />}
        <Header />
        <main className="
          flex-1 
          flex 
          items-stretch 
          bg-gradient-to-r 
          from-slate-200 
          to-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
