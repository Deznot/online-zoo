import map from "./modules/map.js";
import common from "../../common/js/common.js";
import WatchFavoriteSlider from '../../common/js/modules/slider/watch-favorite-slider.js';
import PetsSlider from '../../common/js/modules/slider/pets-slider.js';

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

    const petsSlider = new PetsSlider({
        container:'.pets-in-zoo__slider-wrapper', 
        slidesField: '.pets-in-zoo__slider-inner',
        slides: '.pets-in-zoo__slide',
        total: '#pets-in-zoo__total',
        current: '#pets-in-zoo__current',
        range: '.pets-in-zoo__range',
        next: '.pets-in-zoo__slider-right-arrow',
        prev: '.pets-in-zoo__slider-left-arrow',
        activeClass: 'pets-in-zoo__slide--active'
    });
    petsSlider.init();
});