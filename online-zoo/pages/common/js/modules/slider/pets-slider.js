import Slider from './slider.js';

export default class PetsSlider extends Slider{
    constructor(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay, paused){
        super(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay);
        this.paused = paused;
        this.offset = 0;
        this.size = 4;
        this.state = [1,2,3,4];
    }

    showTotal() {
        if(this.slides.length < 10) {
            this.total.textContent = `0${this.slides.length}`;
        }else {
            this.total.textContent = `${this.slides.length}`;
        }
    }
    currentValue(slideIndex){
        if(slideIndex.length < 10) {
            this.current.textContent = `0${slideIndex}/`;
        }else {
            this.current.textContent = `${slideIndex}/`;
        }
    }

    handlerState(n) {
        switch (n) {
            case 'begin':
                this.state = [1,2,3,4];
                break;
            case 'end':
                for(let i = 3 , k = 0, v = this.slides.length; i >= 0; i--, k++) {
                    this.state[i] = v - k;
                }
                break;
            case 'next':
                for(let i = 0; i < this.state.length; i++) {
                    this.state[i] = this.state[i] + 1;
                }
                break;
            case 'prev':
                for(let i = 0; i < this.state.length; i++) {
                    this.state[i] = this.state[i] - 1;
                }
                break;
        }
    }

    initRange() {
        this.range.max = this.slides.length;
    }

    deleteNotDigits(string){
        return +string.replace(/\D/g,'');
    }

    decorizeSlides(){
        //удаление activeClass 
        this.slides.forEach(slide=>{
            slide.classList.remove(this.activeClass);
        });
        this.slides[this.slideIndex-1].classList.add(this.activeClass);
    }

    nextSlide(){
        if (this.slideIndex == this.state[this.size - 1] && this.slideIndex == this.slides.length) {
            this.handlerState('begin');
            this.state = [1,2,3,4];
            this.offset = 0;
            this.slideIndex = 1;
            this.range.value = 1;
        } else if (this.slideIndex == this.state[this.size - 1]) {
            this.handlerState('next');
            this.slideIndex++;
            this.range.value++;
            this.offset += (100 / this.slides.length);
        } else {
            this.slideIndex++;
            this.range.value++;
        }
        this.decorizeSlides();
        this.currentValue(this.slideIndex);   
        this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    }
   
    prevSlide(){
        if (this.slideIndex == this.state[0] && this.slideIndex == 1) {
            this.handlerState('end');
            this.slideIndex = this.slides.length;
            this.range.value = this.slides.length;
            this.offset = (100 / this.slides.length) * (this.slideIndex - this.size); 
        } else if(this.slideIndex == this.state[0]) {
            this.handlerState('prev');
            this.slideIndex--; 
            this.range.value--;
            this.offset -= (100 / this.slides.length);
        } else {
            this.slideIndex--;
            this.range.value--;
        }
        this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        this.decorizeSlides();
        this.currentValue(this.slideIndex);   
    }
    

    moveSlide() {
        let inputValue = this.slideIndex;
        this.slideIndex = this.range.value;
        if ((inputValue == this.state[this.size - 1]) && (this.slideIndex > inputValue)) {
            this.handlerState('next');
            this.offset += (100 / this.slides.length);
            this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        }
        if (((inputValue == this.state[0])) && (this.slideIndex < inputValue)) {
            this.handlerState('prev');
            this.offset -= (100 / this.slides.length);
            this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        }
        this.decorizeSlides();
        this.currentValue(this.slideIndex);
    }

    bindTriggers(){
        this.range.addEventListener('input', () => this.moveSlide());
        this.next.forEach(item=>{
            item.addEventListener('click',()=>this.nextSlide());
        });
        this.prev.forEach(item=>{
            item.addEventListener('click',()=>this.prevSlide());
        });
    }   

    init(){
        try{
            this.initRange();
            this.showTotal();
            this.bindTriggers();
        }catch(e){}
    }
}