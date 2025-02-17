import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { extractBlockFromBlocks } from "@/utils/blocksHandler";
import Image from "next/image";
import LogoSimple from "@/assets/logos/logo-simple.png";
import GalleryBackgroundImage from "@/assets/backgrounds/geometric-shapes.png";
import BeveledLabel from "@/components/Globals/BeveledLabel";
import { LanguageType } from "@/types/language";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import GalleryComponent from "@/components/Templates/Section/Gallery/GalleryComponent";

async function getGalleryImages() {
    const GalleryImagesQuery = gql`
        query GetGallery($slug: ID!, $idType: WidgetIdType!) {
            widget(id: $slug, idType: $idType) {
                id
                title
                blocks
            }
        }
   `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(
        print(GalleryImagesQuery),
        {
            slug: 'home-page-gallery',
            idType: 'URI',
        },
    );

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

const fetchThumbnails = async (images: any) => {
    if (!Array.isArray(images.innerBlocks)) {
        return [];
    }
    return await Promise.all(
        images.innerBlocks.map(async (image: any) => ({
            url: await getThumbnailUrl(
                image.attributes.url,
                300,
                image.attributes.width,
                image.attributes.height
            ),
            width: image.attributes.width,
            height: image.attributes.height,
            alt: image.attributes.alt || image.attributes.title,
        }))
    );
};

const Gallery = async ({language}: {language: LanguageType}) => {
    const gallery = await getGalleryImages();
    const images = extractBlockFromBlocks(gallery.blocks, 'gallery');
    const thumbnails = await fetchThumbnails(images);
    const translation: Translation = await fetchTranslations(language);

    return <section
        id="gallery"
        className="relative"
    >
        <div className="
            2xl:container 
            mx-auto 
            relative
            px-4
            before:absolute
            before:z-1
            before:top-[-15%]
            lg:before:left-[15%]
            before:left-0
            lg:before:w-[70%]
            before:w-full
            before:h-[130%]
            before:bg-[url(/assets/background/geometric-shapes.png)]
            before:bg-no-repeat
            before:bg-center
            before:bg-contain
            before:-z-10"
        >
            <div className="hidden lg:block h-[200px] mb-4">
                <div className="
                    dashed-line 
                    mx-auto 
                    mt-[-6rem] 
                    has-arrow-after 
                    hidden md:block"
                ></div>
            </div>
            <BeveledLabel 
                label={translation.gallery} 
            />
            <div className="relative pt-12">
                <div className="
                    relative 
                    flex 
                    flex-wrap 
                    items-start 
                    justify-center 
                    gap-[20px] 
                    md:gap-12 
                    w-full 
                    md:w-2/3 
                    mx-auto ltr"
                >
                    <div className="
                        absolute 
                        z-20
                        top-[50%] 
                        translate-y-[-50%] 
                        m-auto 
                        hexagon 
                        bg-white
                        w-[100px]
                        h-[100px] 
                        md:w-[175px] 
                        md:h-[175px] 
                        mx-4 flex 
                        items-center 
                        justify-center
                    ">
                        <Image
                            className="mt-1 w-[50px] md:w-[75px]"
                            src={LogoSimple}
                            alt={"Logo Simple"}
                            quality={100}
                        />
                    </div>
                    <GalleryComponent 
                        images={images.innerBlocks}
                        thumbnails={thumbnails}
                        translation={translation}
                    />
                </div>
            </div>
        </div>
    </section>
}

export default Gallery;