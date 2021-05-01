export default class Slider{
    constructor({
        container = null,
        slides = null,
        slidesField = null,
        next = null, 
        prev = null,
        range = null,
        total = '',
        current = '',
        activeClass = '',
        autoplay} = {}){
        this.container = document.querySelector(container);
        this.slidesField = document.querySelector(slidesField);
        this.slides = document.querySelectorAll(slides);
        this.slide = document.querySelector(slides);
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.range = document.querySelector(range);
        this.total = document.querySelector(total);
        this.current = document.querySelector(current);
        this.slideIndex = 1;
        this.activeClass = activeClass;
        this.autoplay = autoplay;
    }
}