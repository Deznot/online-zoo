import Slider from './slider.js';

export default class WatchFavoriteSlider extends Slider{
    constructor(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay, paused){
        super(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay);
        this.paused = paused;
        this.offset = 0;
        this.ratio = 0;
    }

    showTotal() {
        if(this.slides.length < 10) {
            this.total.textContent = `0${this.slides.length}`;
        }else {
            this.total.textContent = `${this.slides.length}`;
        }
    }

    calcFieldHeight(){
        this.slidesField.style.height = window.getComputedStyle(this.slidesField).height;
    }

    initRange() {
        this.range.max = this.slides.length;
    }

    initSlidesPosition() {
        this.slidesField.style.transform = `translateX(${(-100 / this.slides.length) * this.slideIndex}%)`;
    }

    initDots() {
        const dots = document.querySelector('.intro__slider-bg');

        for(let i = 0; i < this.slides.length; i++){
            const dot = document.createElement('li');
            dot.classList.add('intro__slider-dot');
            dots.append(dot);
        }
    }

    deleteNotDigits(string){
        return +string.replace(/\D/g,'');
    }

    decorizeSlides(){
        //удаление activeClass 
        this.slides.forEach(slide=>{
            slide.classList.remove(this.activeClass);
        });

        this.slides[this.range.value-1].classList.add(this.activeClass);
    }

    changeRatio() {
        this.calcFieldHeight();
        let marginRight = window.getComputedStyle(this.slide).marginRight;
        if (window.innerWidth > 1200) {
            this.ratio = ((245 + (Math.trunc(this.deleteNotDigits(marginRight))*2)) / 
            (140 + (Math.trunc(this.deleteNotDigits(marginRight))*2)))-1;
        }
        if (window.innerWidth <= 1200) {
            this.ratio = ((245 + (Math.trunc(this.deleteNotDigits(marginRight))*2)) / 
            (180 + (Math.trunc(this.deleteNotDigits(marginRight))*2)))-1;
        }
        if (window.innerWidth <= 320) {
            this.ratio = ((140 + (Math.trunc(this.deleteNotDigits(marginRight))*2)) / 
            (113 + (Math.trunc(this.deleteNotDigits(marginRight))*2)))-1;
        }
    }

    moveSlide(e) {
        this.changeRatio();
        if (e.type === 'input'){
            this.slideIndex = this.range.value;
        } else {
            this.slideIndex = e.target.closest('[data-slide]').getAttribute('data-slide');
            this.range.value = this.slideIndex;
        }
        
        this.offset = (100 / (this.slides.length + this.ratio)) * (this.slideIndex-1);
        this.decorizeSlides();
        this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        //current value start
        if(this.slides.length < 10) {
            this.current.textContent = `0${this.range.value}/`;
        }else {
            this.current.textContent = `${this.range.value}/`;
        }
        //curent value end
    }

    slideClick() {
        this.slides.forEach((slide,i)=>{
            slide.addEventListener('click', (e)=>this.moveSlide(e));
            slide.setAttribute(`data-slide`,i+1);
        });
    }

    bindTriggers(){
        this.range.addEventListener('input',(e)=>this.moveSlide(e));
        window.addEventListener('resize', ()=> this.changeRatio());
    }   

    init(){
        try{
            this.initDots();
            this.initRange();
            this.initSlidesPosition();
            this.showTotal();
            this.calcFieldHeight();
            this.slideClick();
            this.bindTriggers();
        }catch(e){}
    }
}