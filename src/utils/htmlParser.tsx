import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';

const sanitizerConfig = { 
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'br' ], 
    allowedAttributes: { 'a': [ 'href' ] } 
};

const parseHTML = ( rawHtml: string ) => {
    const sanitizedHtml = sanitizeHtml(rawHtml, sanitizerConfig); 
    const parsedHtml = ReactHtmlParser(sanitizedHtml);

    return parsedHtml;
}

export default parseHTML;