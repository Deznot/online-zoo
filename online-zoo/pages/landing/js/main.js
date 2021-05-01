import map from "./modules/map.js";
import common from "../../common/js/common.js";
import WatchFavoriteSlider from '../../common/js/modules/slider/watch-favorite-slider.js';

window.addEventListener('DOMContentLoaded', ()=>{
    'use strict';
    common();
    
    const watchSlider = new WatchFavoriteSlider({
        container:'.intro__slider-wrapper', 
        slidesField: '.intro__slider-inner',
        slides: '.intro__item',
        total: '#intro__total',
        current: '#intro__current',
        range: '.intro__range',
        activeClass: 'intro__item--active'
    });
    watchSlider.init();

});