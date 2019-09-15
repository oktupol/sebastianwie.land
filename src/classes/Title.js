export class Title {
    /**
     * Initializes the Title component.
     * 
     * @param {HTMLElement} titleElement 
     */
    constructor(titleElement) {
        this.titleElement = titleElement;
        this.slider = titleElement.getElementsByClassName('slider')[0];
        this.webDiv = titleElement.getElementsByClassName('web')[0];
        this.mailDiv = titleElement.getElementsByClassName('mail')[0];
        this.link = titleElement.getElementsByTagName('a')[0];

        this.webHref = 'https://sebastianwie.land';
        this.mailHref = 'mailto:sebasti@nwie.land';
    }

    _moveSliderDown() {
        this.slider.classList.remove('up');
        this.slider.classList.add('down');
        this._updateLink();
    }

    _moveSliderUp() {
        this.slider.classList.remove('down');
        this.slider.classList.add('up');
        this._updateLink();
    }

    _updateLink() {
        if (this.slider.classList.contains('up')) {
            this.link.href = this.webHref;
        } else {
            this.link.href = this.mailHref;
        }
    }

    _initListeners() {
        let moveSliderUp = () => this._moveSliderUp();
        let moveSliderDown = () => this._moveSliderDown();
        this.webDiv.onmouseenter = moveSliderUp;
        this.webDiv.ontouchend = moveSliderUp;
        this.mailDiv.onmouseenter = moveSliderDown;
        this.mailDiv.ontouchend = moveSliderDown;
    }

    init() {
        this._updateLink();
        this._initListeners();
        console.log(this.slider, this.webDiv, this.mailDiv);
    }
}