import { Metadata } from "next";
import Introduction from "@/components/Templates/Section/Introduction";
import Product from "@/components/Templates/Section/Product";
import Services from "@/components/Templates/Section/Services";
import LastNews from "@/components/Templates/Section/LastNews";
import Gallery from "@/components/Templates/Section/Gallery";
import Colleagues from "@/components/Templates/Section/Colleagues";

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
  const posts = { slug: 'test' } as any
  return posts;
}

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const test = await params;

  return (
    <>
      <Introduction />
      <Product />
      <Services />
      <LastNews />
      <Gallery />
      <Colleagues />
    </>
  );
}