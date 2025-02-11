export default function stripHtmlTags(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
}
