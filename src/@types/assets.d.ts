declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string }; // Объект с классами
  export default classes;
}

// declare module "*.scss" {
//   const value: string;
//   export default value;
// }
