export class AbstractListener {
    constructor() {
        Reflect.defineProperty(this, 'titleComponent', {
            writable: true
        });
    }

    init() {

    }
}