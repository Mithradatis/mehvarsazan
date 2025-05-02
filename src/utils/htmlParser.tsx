import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

const sanitizerConfig = { 
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'br' ], 
    allowedAttributes: { 'a': [ 'href' ] } 
};

const parseHTML = ( rawHtml: string ) => {
    const sanitizedHtml = sanitizeHtml(rawHtml, sanitizerConfig); 
    const parsedHtml = parse(sanitizedHtml);

    return parsedHtml;
}

export default parseHTML;