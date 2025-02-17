import { Metadata } from "next";
import Introduction from "@/components/Templates/Section/Introduction";
import Product from "@/components/Templates/Section/Product";
import Services from "@/components/Templates/Section/Services";
import LastNews from "@/components/Templates/Section/LastNews";
import Gallery from "@/components/Templates/Section/Gallery";
import Colleagues from "@/components/Templates/Section/Colleagues";
import { LanguageType } from "@/types/language";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import Translation from "@/types/translation";
import languages from "@/lib/language";
import { PageParams } from "@/types/page-params";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "محورسازان ایران خودرو",
    description: "This is a customized homepage for my Next.js website.",
    icons: {
      icon: "/favicon.png",
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: 'fa' },
    { lang: 'en' }
  ];
}

type Props = {
  params: Promise<PageParams>;
}

export default async function Home(
  { 
    params 
  }: Props
) {
  const { lang } = await params;
  const translation: Translation = await fetchTranslations(lang);
  const direction = languages[lang]?.dir || 'ltr';

  return (
    <>
      <Introduction 
        language={lang} 
        direction={direction}
      />
      <Product 
        language={lang}
        translation={translation}
      />
      <Services 
        language={lang}
      />
      <LastNews 
        language={lang}
      />
      <Gallery 
        language={lang}
      />
      <Colleagues 
        language={lang}
      />
    </>
  );
}