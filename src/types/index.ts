declare module 'react-html-parser' {   
    import { ReactNode } from "react";
    function parse(html: string): ReactNode; 
    export = parse; 
}

declare module 'sanitize-html' { 
    interface IOptions { 
        allowedTags?: string[]; 
        allowedAttributes?: { [key: string]: string[] }; 
    } 
    function sanitize(html: string, options?: IOptions): string; 
    export = sanitize; 
}

