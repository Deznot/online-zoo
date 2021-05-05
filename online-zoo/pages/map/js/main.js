import common from "../../common/js/common.js";
import MapSlider from '../../common/js/modules/slider/map-slider.js';

window.addEventListener('DOMContentLoaded',()=>{
    'use strict';
    common();  

    const mapSlider = new MapSlider({
        container:'.map-slider__wrapper', 
        slidesField: '.map-slider__inner',
        slides: '.map-slider__slide',
        total: '#map-slider__total',
        current: '#map-slider__current',
        range: '.map-slider__range',
        next: '.map-slider__right-arrow',
        prev: '.map-slider__left-arrow',
        activeClass: 'map-slider__slide--active'
    });
    mapSlider.init();
});