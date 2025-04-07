export default function stripHtmlTags(str: string, length?: number): string {
    const stripped = str.replace(/<\/?[^>]+(>|$)/g, "");
    if (length === undefined) {
        return stripped;
    }
    return stripped.substring(0, length) + '...';
}