export default class ThemeSwap {
    constructor(designToggle){
        this.designToggle = document.querySelector(designToggle);
    }

    bindTriggers(){
        this.designToggle.addEventListener('input', function(){
            let toggleValue = this.value;
            let body = document.querySelector('body');
            if (toggleValue == 1) {
                body.classList.remove('light');
                body.classList.add('dark');
            } else {
                body.classList.remove('dark');
                body.classList.add('light');
            }
        });
    }

    init(){
        try{
            this.bindTriggers();
        }catch(e){}
    }

}