import {AbstractListener} from "./abstract-listener";
import {Observer} from "../../util/observer";

export class SwipeListener extends AbstractListener {
    constructor() {
        super();

        /**
         * @member {boolean} helpDisabled
         * @memberOf SwipeListener
         */
        Reflect.defineProperty(this, 'helpDisabled', {
            writable: true
        });

        /**
         * @member {Observer} helpObserver
         * @memberOf SwipeListener
         */
        Reflect.defineProperty(this, 'helpObserver', {
            value: new Observer()
        });

        /**
         * @member {HTMLDivElement} helpElement
         * @memberOf SwipeListener
         */
        Reflect.defineProperty(this, 'helpElement', {
            writable: true
        })
    }

    /**
     * @override
     */
    init() {
        const isProbablyMobile = Math.max(window.screen.width, window.innerWidth) <= 800;
        this.helpDisabled = !isProbablyMobile;

        const Hammer = require('hammerjs');
        const mc = new Hammer(document.body);
        mc.get('swipe').set({direction: Hammer.DIRECTION_ALL});

        mc.on('swipeup swipedown swiperight', event => {
            switch (event.type) {
                case 'swipedown':
                    this.titleComponent.setAttribute('selection', 'mail');
                    this.helpObserver.emit('swipeDown');
                    break;
                case 'swipeup':
                    this.titleComponent.setAttribute('selection', 'web');
                    this.disableHelp();
                    break;
                case 'swiperight':
                    this.titleComponent.anchor.click();
                    this.disableHelp();
                    break;
                default:
                // Do nothing
            }
        });

        this.displayHelp();
    }

    /**
     * @private
     */
    displayHelp() {
        new Promise((resolve, reject) => {
            if (this.helpDisabled) {
                reject();
            } else {
                let helpElement = document.createElement('div');
                helpElement.classList.add('help', 'hide');
                helpElement.innerHTML = 'Swipe down to select mail';

                this.helpElement = helpElement;
                this.titleComponent.appendChild(helpElement);
                resolve(helpElement);
            }
        }).then(helpElement => new Promise((resolve, reject) => {
            let helpSkipped = false;
            this.helpObserver.waitFor('swipeDown', () => {
                helpSkipped = true;
            });
            setTimeout(() => {
                if (this.helpDisabled || helpSkipped) {
                    reject();
                } else {
                    helpElement.classList.remove('hide');
                    helpElement.classList.add('show');
                    resolve(helpElement);
                }
            }, 5000);
        })).then(helpElement => new Promise((resolve, reject) => {
            this.helpObserver.waitFor('swipeDown', () => {
                if (this.helpDisabled) {
                    reject();
                } else {
                    helpElement.classList.remove('show');
                    helpElement.classList.add('hide');
                    setTimeout(() => {
                        helpElement.classList.remove('hide');
                        helpElement.innerHTML = 'Swipe right to compose mail';
                        helpElement.classList.add('show');
                    }, 350);
                    resolve();
                }
            })
        })).then(() => new Promise((resolve, reject) => {
            setTimeout(() => {
                reject();
            }, 10000);
        })).catch(this.disableHelp.bind(this));
    }

    /**
     * @private
     */
    disableHelp() {
        this.helpDisabled = true;
        if (this.helpElement) {
            this.helpElement.classList.remove('show');
            this.helpElement.classList.add('hide');

            setTimeout(() => {
                this.helpElement.remove();
            }, 350);
        }
    }
}