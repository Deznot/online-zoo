import ThemeSwap from "./modules/themeSwap.js";

let common = () => {
    'use strict';
    new ThemeSwap('.design-toggle__range').init();
};
 
export default common;

