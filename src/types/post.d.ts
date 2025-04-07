interface Post {
    node: {
        id: string;
        title: string;
        slug: string;
        date: string;
        content: string;
        featuredImage: {
            node: {
                sourceUrl: string;
                altText: string;
                mediaDetails: {
                    width: number;
                    height: number;
                };
            };
        };
    }
}