import { Title } from "./Title";
const Hammer = require('hammerjs');

export class TitleSwipeListener {
    /**
     * Initialize listening to swipes
     * @param {Window} window
     * @param {HTMLDocument} document 
     * @param {Title} title 
     */
    constructor(window, document, title) {
        let isProbablyMobile = Math.max(window.screen.width, window.innerWidth) <= 800;

        if (!isProbablyMobile) {
            // we don't want any swipe action on non-touch-screen-browsers
            return;
        }

        this.help = document.getElementById('help');
        this.localStorage = window.localStorage;

        this.help1Shown = false;
        this.help2Shown = false;
        this.helpSkipped = false;

        let mc = new Hammer(document);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        mc.on('swipeup swipedown swiperight', (event) => {
            switch (event.type) {
                case 'swipedown':
                    this._displayHelpSwipeRight();
                    title.selectMailLink();
                    break;
                case 'swipeup':
                    this._hideHelpSwipeRight();
                    title.selectHttpLink();
                    break;
                case 'swiperight':
                    this._hideHelpSwipeRight();
                    title.getLink().click();
                    break;
                default:
                // Do nothing
            }
        });

        this._displayHelpSwipeDown();
    }

    _displayHelpSwipeDown() {
        this.help.classList.add('hide');
        // I need at least one character to pre-load the font
        this.help.innerHTML = ' ';

        setTimeout(() => {
            if (!this.helpSkipped) {
                this.help1Shown = true;
                this.help.classList.remove('hide');
                this.help.innerHTML = 'Swipe down to select mail';
                this.help.classList.add('show');
            }
        }, 5000);
    }

    _displayHelpSwipeRight() {
        if (!this.help1Shown) {
            this.helpSkipped = true;
        }

        this.help.classList.remove('show');
        this.help.classList.add('hide');

        setTimeout(() => {
            if (this.help1Shown && !this.help2Shown) {
                this.help2Shown = true;
                this.help.classList.remove('hide');
                this.help.innerHTML = 'Swipe right to compose mail';
                this.help.classList.add('show');
            }
        }, 350);

        setTimeout(() => {
            this.help.classList.remove('show');
            this.help.classList.add('hide');
        }, 10000);

        setTimeout(() => {
            this.help.classList.remove('hide', 'show');
        }, 10350);
    }

    _hideHelpSwipeRight() {
        if (this.help2Shown) {
            this.help.classList.remove('show');
            this.help.classList.add('hide');
        }
    }
}