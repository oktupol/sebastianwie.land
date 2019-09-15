import { Title } from "./Title";
const Hammer = require('hammerjs');

export class TitleSwipeListener {
    /**
     * Initialize listening to swipes
     * @param {HTMLDocument} document 
     * @param {Title} title 
     */
    constructor(document, title) {
        let mc = new Hammer(document);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        mc.on('swipeup swipedown swiperight', (event) => {
            switch (event.type) {
                case 'swipedown':
                    title.selectMailLink();
                    break;
                case 'swipeup':
                    title.selectHttpLink();
                    break;
                case 'swiperight':
                    title.getLink().click();
                    break;
                default:
                // Do nothing
            }
        });
    }
}