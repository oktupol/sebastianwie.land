import {MouseListener} from "./mouse-listener";
import {KeyboardListener} from "./keyboard-listener";
import {SwipeListener} from "./swipe-listener";

(function (window, document) {
    window.customElements.define('nwieland-title', class extends HTMLElement {
        constructor() {
            super();

            let wrapper = document.createElement('div'),
                anchor = document.createElement('a'),
                slider = this.createLabel(['slider', 'up'], true),
                webDiv = this.createLabel(
                    ['web'],
                    false,
                    'http:',
                    'a'
                ),
                mailDiv = this.createLabel(
                    ['mail'],
                    false,
                    'mail:',
                    '@'
                );

            wrapper.classList.add('title-box');
            wrapper.appendChild(anchor);
            this.appendChild(wrapper);

            anchor.appendChild(slider);
            anchor.appendChild(webDiv);
            anchor.appendChild(mailDiv);

            Reflect.defineProperty(this, 'anchor', {
                value: anchor,
                enumerable: true
            });

            Reflect.defineProperty(this, 'slider', {
                value: slider,
                enumerable: true
            });

            Reflect.defineProperty(this, 'webDiv', {
                value: webDiv,
                enumerable: true
            });

            Reflect.defineProperty(this, 'mailDiv', {
                value: mailDiv,
                enumerable: true
            });

            Reflect.defineProperty(this, 'listeners', {
                value: [],
                writable: true
            });

            this.updateSlider();

            this.addListener(new MouseListener());
            this.addListener(new KeyboardListener());
            this.addListener(new SwipeListener());
        }

        /**
         * @override
         * @returns {Array<string>}
         */
        static get observedAttributes() {
            return ['selection'];
        }

        /**
         * @override
         * @param {string} name
         */
        attributeChangedCallback(name) {
            if (name === 'selection') {
                this.updateSlider();
            }
        }

        /**
         * @param {Array<string>} classes
         * @param {boolean} isSlider
         * @param {string|null} labelText
         * @param {string} aText
         * @returns {HTMLDivElement}
         * @private
         */
        createLabel(classes, isSlider, labelText = null, aText = ' ') {
            let div = document.createElement('div');
            if (classes) {
                div.classList.add(...classes);
            }

            if (labelText) {
                let label = document.createElement('span');
                label.classList.add('label');
                label.appendChild(document.createTextNode(labelText));
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
            ];

            for (let [text, sliderClasses, staticClasses] of content) {
                let classes;
                if (isSlider) {
                    classes = sliderClasses;
                } else {
                    classes = staticClasses;
                }

                if (classes === null) {
                    div.appendChild(document.createTextNode(text));
                } else {
                    let span = document.createElement('span');
                    span.appendChild(document.createTextNode(text));
                    span.classList.add(...classes);
                    div.appendChild(span);
                }
            }

            return div;
        }

        /**
         * Updates the slider position and the anchor's href depending on the 'selection' attribute.
         * @private
         */
        updateSlider() {
            let selection = this.getAttribute("selection");

            switch (selection) {
                default:
                case 'web':
                    this.slider.classList.remove('down');
                    this.slider.classList.add('up');
                    if (this.webHref) {
                        this.anchor.href = this.webHref;
                    }
                    break;
                case 'mail':
                    this.slider.classList.remove('up');
                    this.slider.classList.add('down');
                    if (this.mailHref) {
                        this.anchor.href = this.mailHref;
                    }
                    break;
            }
        }

        /**
         * @param {AbstractListener} listener
         */
        addListener(listener) {
            listener.titleComponent = this;
            this.listeners.push(listener);
            listener.init();
        }

        /**
         * @returns {string}
         */
        get webHref() {
            return this.getAttribute('web-href');
        }

        /**
         * @param {string} webHref
         */
        set webHref(webHref) {
            this.setAttribute('web-href', webHref);
        }

        /**
         * @returns {string}
         */
        get mailHref() {
            return this.getAttribute('mail-href');
        }

        /**
         * @param {string} mailHref
         */
        set mailHref(mailHref) {
            this.setAttribute('mail-href', mailHref);
        }
    });
}(window, document));