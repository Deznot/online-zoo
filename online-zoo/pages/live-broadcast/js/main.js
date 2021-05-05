import common from "../../common/js/common.js";
import VideoCarousel from "../../common/js/modules/video-carousel.js";

window.addEventListener('DOMContentLoaded',()=>{
    'use strict';
    common();
    let videoCarousel = new VideoCarousel({
        video : '.video',
        previews : '.videos__slide',
        previewsInner: '.videos__slides',
        activeClass: 'videos__dot--active',
        dots: '.videos__dot'
    });
    videoCarousel.init();
});