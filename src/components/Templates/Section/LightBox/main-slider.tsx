import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import { getThumbnailUrl } from "@/utils/imageHandler";
import { extractBlockFromBlocks } from "@/utils/blocksHandler";
import SwiperSlider from "@/components/Globals/SwiperSlider";

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
            slug: 'home-page-slider',
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

const MainSlider = async () => {
    const gallery = await getGalleryImages();
    const images = extractBlockFromBlocks(gallery.blocks, 'gallery');
    const thumbnails = await fetchThumbnails(images);

    return (
        <div className="overflow-hidden rounded-[10px] lg:rounded-[0_10px_10px_0]">
            <SwiperSlider
                images={images.innerBlocks}
            />
        </div>
    )
}

export default MainSlider;
