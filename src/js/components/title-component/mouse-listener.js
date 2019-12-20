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
                this.titleComponent.setAttribute('selection', 'web');
            },
            selectMail = () => {
                this.titleComponent.setAttribute('selection', 'mail');
            };

        this.titleComponent.webDiv.addEventListener("mouseenter", selectWeb);
        this.titleComponent.webDiv.addEventListener("touchend", selectWeb);
        this.titleComponent.mailDiv.addEventListener("mouseenter", selectMail);
        this.titleComponent.mailDiv.addEventListener("touchend", selectMail);
    }
}