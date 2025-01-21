import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { extractBlockFromBlocks } from "@/utils/blocksHandler";
import Image from "next/image";
import LogoSimple from "@/assets/logos/logo-simple.png";

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
                640,
                image.attributes.width,
                image.attributes.height
            ),
            width: image.attributes.width,
            height: image.attributes.height,
            alt: image.attributes.alt || image.attributes.title,
        }))
    );
};

const Gallery = async () => {
    const gallery = await getGalleryImages();
    const images = extractBlockFromBlocks(gallery.blocks, 'gallery');
    const thumbnails = await fetchThumbnails(images);

    return <section id="gallery" className="relative">
        <div className="container mx-auto relative">
            <div className="dashed-line absolute left-1/2 mt-[-3rem] has-arrow-after none md:block"></div>
            <div className="relative pt-[200px]">
                <div className="relative flex flex-wrap items-start justify-center gap-[20px] md:gap-12 w-full md:w-2/3 mx-auto ltr">
                    <div className="*
                        absolute 
                        z-20
                        top-[50%] 
                        translate-y-[-40%] 
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
                    {
                        thumbnails && thumbnails.map((thumbnail: any, index: number) => {
                            return <div
                                key={index}
                                className={
                                    `relative transition-all cursor-pointer ${index % 2 === 0
                                        ? 'flex justify-end w-[calc(50%-10px)] md:w-[calc(50%-24px)]'
                                        : 'flex justify-start w-[calc(50%-10px)] md:w-[calc(50%-24px)]'
                                    } ${index < 2
                                        ? 'self-end'
                                        : 'self-start'
                                    }`
                                }
                            >
                                <div className="
                                    relative
                                    rounded-2xl
                                    after:block
                                    after:w-full
                                    after:h-full
                                    after:absolute
                                    after:z-10
                                    after:top-0
                                    after:left-0
                                    after:bg-blue-400
                                    after:opacity-20
                                    after:rounded-2xl
                                    hover:after:opacity-0
                                    transition-all
                                    shadow-[0_0_30px_rgba(34,34,34,.25)]
                                ">
                                    <Image
                                        width={thumbnail.width}
                                        height={thumbnail.height}
                                        src={thumbnail.url}
                                        alt={thumbnail.alt || 'Gallery Image'}
                                        quality={100}
                                        style={{ width: 'auto' }}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </section>
}

export default Gallery;