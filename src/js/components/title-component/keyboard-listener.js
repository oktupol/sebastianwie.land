import {AbstractListener} from "./abstract-listener";

export class KeyboardListener extends AbstractListener {
    constructor() {
        super();
    }

    init() {
        const upKeys = ['k', 'ArrowUp'],
            downKeys = ['j', 'ArrowDown'],
            enterKeys = ['Enter'];

        document.addEventListener('keydown', event => {
            let key = event.key;

            if (upKeys.includes(key)) {
                this.titleComponent.selection = 'web';
            } else if (downKeys.includes(key)) {
                this.titleComponent.selection = 'mail';
            } else if (enterKeys.includes(key)) {
                this.titleComponent.anchor.click();
            }
        })
    }
}