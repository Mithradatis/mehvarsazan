import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
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

const MainSlider = async () => {
    const gallery = await getGalleryImages();
    const images = extractBlockFromBlocks(gallery.blocks, 'gallery');

    return (
        <div className="overflow-hidden flex">
            <SwiperSlider
                images={images.innerBlocks}
                options={
                    {
                        modules: {
                            hasPagination: true
                        },
                        autoplay: {
                            delay: 6000
                        }
                    }
                }
            />
        </div>
    )
}

export default MainSlider;
