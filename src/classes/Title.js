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
        this.mailHref = 'mailto:sebastianwie.land';
    }

    _toggleSlider() {
        if (this.slider.classList.contains('up')) {
            this._moveSliderDown();
        } else {
            this._moveSliderUp();
        }
    }

    _moveSliderDown() {
        this.slider.classList.remove('up');
        this.slider.classList.add('down');
    }

    _moveSliderUp() {
        this.slider.classList.remove('down');
        this.slider.classList.add('up');
    }

    _updateLink() {
        if (this.slider.classList.contains('up')) {
            this.link.href = this.webHref;
        } else {
            this.link.href = this.mailHref;
        }
    }

    _initListeners() {
        this.webDiv.onmouseenter = () => {
            this._moveSliderUp();
            this._updateLink();
        };

        this.mailDiv.onmouseenter = () => {
            this._moveSliderDown();
            this._updateLink();
        };
    }

    init() {
        this._updateLink();
        this._initListeners();
        console.log(this.slider, this.webDiv, this.mailDiv);
    }
}