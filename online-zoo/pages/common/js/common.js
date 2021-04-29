import themeSwap from "./modules/themeSwap.js";

let common = () => {
    'use strict';
    new themeSwap('.design-toggle__range').init();
};
 
export default common;

