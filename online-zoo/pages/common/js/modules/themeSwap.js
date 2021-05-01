export default class ThemeSwap {
    constructor(designToggle){
        this.designToggle = document.querySelector(designToggle);
    }

    themeToggle(remove,add) {
        let body = document.querySelector('body');
        body.classList.remove(remove);
        body.classList.add(add);
    }

    swapThemeInit() {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', '0');
            this.designToggle.value = 0;
        } else if (localStorage.getItem('theme') === '0') {
            this.designToggle.value = 0;
            this.themeToggle('dark','light');
        } else {
            this.designToggle.value = 1;
            this.themeToggle('light','dark');
        }
    }

    swap() {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', '0');
        } else if (localStorage.getItem('theme') === '0') {
            localStorage.setItem('theme','1');
            this.themeToggle('light','dark');
        } else {
            localStorage.setItem('theme', '0');
            this.themeToggle('dark','light');
        }
    }

    bindTriggers(){
        this.designToggle.addEventListener('input',()=>this.swap());
    }

    init(){
        try{
            this.swapThemeInit();
            this.bindTriggers();
        }catch(e){}
    }
}