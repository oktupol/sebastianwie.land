export class Title {
    /**
     * Initializes the Title component.
     * @param {HTMLDocument} document
     * @param {HTMLElement} titleElement 
     */
    constructor(document, titleElement) {
        this.document = document;
        this.titleElement = titleElement;

        this.webHref = 'https://sebastianwie.land';
        this.mailHref = 'mailto:sebasti@nwie.land';
    }

    _initComponent() {
        this.link = this._createTitleLinkBox(this.titleElement);
        this.slider = this._createLabelDiv(this.link, ['slider', 'up'], true);
        this.webDiv = this._createLabelDiv(this.link, ['web'], false, 'http:', 'a');
        this.mailDiv = this._createLabelDiv(this.link, ['mail'], false, 'mail:', '@');
    }

    /**
     * Creates the title box and a link inside it
     * @param {HtmlElement} titleElement 
     * @return {HTMLAnchorElement}
     */
    _createTitleLinkBox(titleElement) {
        let titleBox = this.document.createElement('div');
        let link = this.document.createElement('a');
        titleBox.classList.add('title-box');
        titleBox.appendChild(link);
        titleElement.appendChild(titleBox);
        return link;
    }

    /**
     * Creates a div containing the text to display
     * 
     * @param {HTMLAnchorElement} linkElement
     * @param {string[]} classes 
     * @param {boolean} isSlider 
     * @param {string} labelText 
     * @param {string} aText 
     * @return {HTMLDivElement}
     */
    _createLabelDiv(linkElement, classes, isSlider, labelText, aText) {
        if (isSlider) {
            labelText = null;
            aText = ' ';
        }

        let div = this.document.createElement('div');
        if (classes) {
            div.classList.add(...classes);
        }

        if (labelText) {
            let label = this.document.createElement('span');
            label.classList.add('label');
            label.innerHTML = labelText;
            div.appendChild(label);
        }

        let placeholder = 'placeholder',
            wie = 'wie',
            dot = 'dot',
            land = 'land';

        let content = [
            ['sebasti', null, [placeholder]],
            [aText, [placeholder], ['static']],
            ['n', null, [placeholder]],
            ['wie', [wie], [placeholder, wie]],
            ['.', [dot], [placeholder, dot]],
            ['land', [land], [placeholder, land]]
        ]

        for (let line of content) {
            let text = line[0], classes;
            if (isSlider) {
                classes = line[1];
            } else {
                classes = line[2];
            }

            div.appendChild(this._createText(text, classes));
        }

        linkElement.appendChild(div);

        return div;
    }

    /**
     * @param {string} content 
     * @param {string[]} classes
     * @return {Text|HTMLSpanElement}
     */
    _createText(content, classes) {
        let text = document.createTextNode(content);

        if (classes !== null) {
            let span = document.createElement('span');
            span.classList.add(...classes);
            span.appendChild(text);
            return span;
        }

        return text;
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
        this._initComponent();
        this._updateLink();
        this._initListeners();
    }
}