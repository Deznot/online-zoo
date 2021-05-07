import Slider from './slider.js';

export default class MapSlider extends Slider{
    constructor(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay, paused){
        super(container, slides, slidesField, next, prev, range, total, current, activeClass, autoplay);
        this.paused = paused;
        this.offset = 0;
        this.state = [];
        this.size = 8;
        this.button = document.querySelectorAll('.main__button');
        this.mapActiveClass = 'main-map__icon--active';
        this.pins = document.querySelectorAll('.main-map__icon');
        this.madePages = ['alligator','eagle','gorilla','panda'];
        this.ratio = 0;
    }

    showTotal() {
        if(this.slides.length < 10) {
            this.total.textContent = `0${this.slides.length}`;
        }else {
            this.total.textContent = `${this.slides.length}`;
        }
    }
    currentValue(slideIndex){
        if(slideIndex < 10) {
            this.current.textContent = `0${slideIndex}/`;
        }else {
            this.current.textContent = `${slideIndex}/`;
        }
        this.changeButtonLink();
    }

    slidesSetName() {
        this.slides.forEach((slide)=>{
            slide.setAttribute('data-name', slide.lastElementChild.alt);
        });
    }

    handlerState(n) {
        switch (n) {
            case 'begin':
                this.state = [];
                for (let i = 1; i <= this.size; i++) {
                    this.state.push(i);
                }
                break;
            case 'end':
                for(let i = this.size-1 , k = 0, v = this.slides.length; i >= 0; i--, k++) {
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
        this.slideIndex = this.range.value;
        this.range.max = this.slides.length;
        this.currentValue(this.range.value);
    }

    slideClick() {
        this.slides.forEach((slide,i)=>{
            slide.addEventListener('click', (e)=>this.moveSlide(e));
            slide.setAttribute(`data-slide`,i+1);
        });
    }

    deleteNotDigits(string){
        return +string.replace(/\D/g,'');
    }

    changeButtonLink() {
        this.button[0].disabled = true;
        if (this.madePages.includes(this.slides[this.slideIndex-1].getAttribute('data-name'))) {
            this.button[0].disabled = false;
        }
        this.button[0].parentElement.action = `../live-broadcast/${this.slides[this.slideIndex-1].getAttribute('data-name')}.html`;
    }

    decorizeSlides(){
        //удаление activeClass 
        this.slides.forEach(slide=>{
            slide.classList.remove(this.activeClass);
        });
        this.slides[this.slideIndex-1].classList.add(this.activeClass);
    }

    changeStateSize() {
        if (window.innerWidth > 1200) {
            this.size = 8;
            this.handlerState('begin');
        }
        if (window.innerWidth <= 1200) {
            this.size = 5;
            this.handlerState('begin');
        }
        if (window.innerWidth <= 780) {
            this.size = 4;
            this.handlerState('begin');
        }
        console.log(this.state);
    }
    handlerActivePin(name){
        this.pins.forEach((pin) => {
            pin.classList.remove(this.mapActiveClass);
            if (pin.dataset.name === name) {
                pin.classList.add(this.mapActiveClass);
            }
        });
    }

    handlerClickPin(e) {
        let name = e.target.closest('[data-name]').getAttribute('data-name');
        this.pins.forEach((pin) => {
            pin.classList.remove(this.mapActiveClass);
            if (pin.dataset.name === name) {
                pin.classList.add(this.mapActiveClass);
            }
        });
        this.slides.forEach((slide)=>{
            if(slide.dataset.name == name) {
                this.slideIndex = slide.dataset.slide;
            }
        });
        this.decorizeSlides();
        this.range.value = this.slideIndex;
        this.currentValue(this.slideIndex);
    }

    slideWidth() {
        let marginRight = window.getComputedStyle(this.slide).marginRight;
        if (window.innerWidth > 320) {
            this.ratio = ((108 + (Math.trunc(this.deleteNotDigits(marginRight))*2)));
        }
        if (window.innerWidth <= 320) {
            this.ratio = ((85 + (Math.trunc(this.deleteNotDigits(marginRight))*2)) / 
            (60 + (Math.trunc(this.deleteNotDigits(marginRight))*2)))-1;
        }
    }

    nextSlide(){
        if (this.slideIndex == this.state[this.size - 1] && this.slideIndex == this.slides.length) {
            this.handlerState('begin');
            this.offset = 0;
            this.slideIndex = 1;
            this.range.value = 1;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        } else if (this.slideIndex == this.state[this.size - 1]) {
            this.handlerState('next');
            this.slideIndex++;
            this.range.value++;
            this.offset += this.ratio;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        } else {
            this.slideIndex++;
            this.range.value++;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        }
        this.decorizeSlides();
        this.currentValue(this.slideIndex);   
        this.slidesField.style.transform = `translateX(-${this.offset}px)`;
    }
   
    prevSlide(){
        if (this.slideIndex == this.state[0] && this.slideIndex == 1) {
            this.handlerState('end');
            this.slideIndex = this.slides.length;
            this.range.value = this.slides.length;
            // this.offset = (100 / this.slides.length) * (this.slideIndex - this.size); 
            this.offset = (this.ratio * (this.slideIndex - this.size));
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        } else if(this.slideIndex == this.state[0]) {
            this.handlerState('prev');
            this.slideIndex--; 
            this.range.value--;
            this.offset -= this.ratio;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        } else {
            this.slideIndex--;
            this.range.value--;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        }
        this.slidesField.style.transform = `translateX(-${this.offset}px)`;
        this.decorizeSlides();
        this.currentValue(this.slideIndex);   
    }
    

    moveSlide(e) {
        let inputValue = this.slideIndex;
        if (e.type === 'input'){
            this.slideIndex = this.range.value;
        } else {
            this.slideIndex = e.target.closest('[data-slide]').getAttribute('data-slide');
            this.range.value = this.slideIndex;
        }
        if ((inputValue == this.state[this.size - 1]) && (this.slideIndex > inputValue)) {
            this.handlerState('next');
            this.offset += this.ratio;
            this.slidesField.style.transform = `translateX(-${this.offset}px)`;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        }
        if (((inputValue == this.state[0])) && (this.slideIndex < inputValue)) {
            this.handlerState('prev');
            this.offset -=  this.ratio;
            this.slidesField.style.transform = `translateX(-${this.offset}px)`;
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        }
        this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
        this.decorizeSlides();
        this.currentValue(this.slideIndex);
    }

    bindTriggers(){
        this.range.addEventListener('input', (e) => this.moveSlide(e));
        this.next.forEach(item=>{
            item.addEventListener('click',()=>this.nextSlide());
        });
        this.prev.forEach(item=>{
            item.addEventListener('click',()=>this.prevSlide());
        });
        this.pins.forEach((pin)=>{
            pin.addEventListener('click', (e)=>this.handlerClickPin(e));
        });
        window.addEventListener('resize', ()=> this.changeStateSize());
    }   

    init(){
        try{
            this.slideWidth();
            this.changeStateSize();
            this.slidesSetName();
            this.handlerState('begin');
            this.slideClick();
            this.initRange();
            this.handlerActivePin(this.slides[this.slideIndex-1].dataset.name);
            this.showTotal();
            this.bindTriggers();
            
        }catch(e){}
    }
}