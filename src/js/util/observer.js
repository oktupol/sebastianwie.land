export class Observer {
    constructor() {
        Reflect.defineProperty(this, 'listeners', {
            value: {},
        });
    }

    /**
     * @param {string} event
     * @param {function} listener
     */
    waitFor(event, listener) {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.hasOwnProperty(event)) {
            for (let fn of this.listeners[event]) {
                fn(...args);
            }
        }
    }
}