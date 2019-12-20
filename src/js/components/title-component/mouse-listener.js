import {AbstractListener} from "./abstract-listener";

export class MouseListener extends AbstractListener {
    constructor() {
        super();
    }

    /**
     * @override
     */
    init() {
        let selectWeb = () => {
                this.titleComponent.selection = 'web';
            },
            selectMail = () => {
                this.titleComponent.selection = 'mail';
            };

        this.titleComponent.webDiv.addEventListener("mouseenter", selectWeb);
        this.titleComponent.webDiv.addEventListener("touchend", selectWeb);
        this.titleComponent.mailDiv.addEventListener("mouseenter", selectMail);
        this.titleComponent.mailDiv.addEventListener("touchend", selectMail);
    }
}