import { Title } from "./Title";

export class TitleKeyboardListener {
    /**
     * Creates a keyboard listener for the title component.
     * 
     * @param {HTMLDocument} document 
     * @param {Title} title 
     */
    constructor(document, title) {
        let upKeys = ['k', 'ArrowUp'],
            downKeys = ['j', 'ArrowDown'],
            enterKeys = ['Enter'];

        document.addEventListener('keydown', (event) => {
            let key = event.key;

            if (upKeys.includes(key)) {
                title.selectHttpLink();
                return;
            }

            if (downKeys.includes(key)) {
                title.selectMailLink();
                return;
            }

            if (enterKeys.includes(key)) {
                title.getLink().click();
            }
        });
    }
}