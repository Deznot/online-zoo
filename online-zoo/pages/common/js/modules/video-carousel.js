export default class VideoCarousel{
    constructor({
        video = null,
        previews = null,
        activeClass = '',
        previewsInner = null,
        dots = null,
    } = {}) {
        this.video = document.querySelector(`${video} > iframe`);
        this.previews = document.querySelectorAll(previews);
        this.previewsInner = document.querySelector(previewsInner);
        this.preview = document.querySelector(previews);
        this.dots = document.querySelectorAll(dots);
        this.activeClass = activeClass; 
    }
    
    handlerPreviewClick(e) {
        let target = e.target.nextElementSibling;
        let prevPath = target.querySelector('.video__media').src.split('/')[4];
        let videoPath = this.video.src.split('/')[4];
        this.video.src = `https://www.youtube.com/embed/${prevPath}`;
        target.querySelector('.video__media').src = `https://i.ytimg.com/vi/${videoPath}/mqdefault.jpg`;
    }

    handlerDotClick(e) {
        let target = e.target;
        this.dots.forEach((dot,i) => {
            dot.classList.remove(this.activeClass);
            if (target === dot) {
                target.classList.add(this.activeClass);
                this.previewsInner.style.transform = `translateX(${-104 * i}%)`;
                // console.log(this.previewsInner);
            }
            // this.previewsInner.style.transform = `translateX(${-103 * i}%)`;
            // this.previewsInner.style.transform = `translateX(${-100 / (this.previews.length / 3) * i}%)`;
        });
        
      }

    bindTriggers() {
        this.previews.forEach((el) => {
            el.addEventListener('click', (e) => this.handlerPreviewClick(e));
        });
        this.dots.forEach((dot) => {
            dot.addEventListener('click', (e) => this.handlerDotClick(e));
        });
    }   

    init(){
        try{
            this.bindTriggers();
        }catch(e){}
    }
}