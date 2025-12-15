// For Img ( JPG )
declare module "*.jpg" {
  export default "" as string;
}
// For Img ( PNG )
declare module "*.png" {
  export default "" as string;
}
// For Img ( SVG )
declare module "*.svg" {
  const content: any;
  export default content;
}
// For Img ( WEBP )
declare module "*.webp" {
  export default "" as string;
}
// For CSS
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For CSS
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For CSS
declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// For LESS
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.mp4" {
  export default "" as string;
}

declare module "*.gif" {
  export default "" as string;
}