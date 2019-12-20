export class Observer {
    constructor() {
        Reflect.defineProperty(this, 'listeners', {
            value: {},
        });

        Reflect.defineProperty(this, 'onceListeners', {
            value: {}
        });
    }

    /**
     * Execute a listener whenever a specific event is emitted
     * 
     * @param {string} event 
     * @param {Function} listener 
     */
    whenever(event, listener) {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listener);
    }

    /**
     * Execute listener once a specific event has been emitted
     * 
     * @param {string} event 
     * @param {Function} listener 
     */
    once(event, listener) {
        if (!this.onceListeners.hasOwnProperty(event)) {
            this.onceListeners[event] = [];
        }

        this.onceListeners[event].push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.hasOwnProperty(event)) {
            for (let fn of this.listeners[event]) {
                fn(...args);
            }
        }

        if (this.onceListeners.hasOwnProperty(event)) {
            for (let fn of this.onceListeners[event]) {
                fn(...args);
            }

            delete this.onceListeners[event];
        }
    }
}