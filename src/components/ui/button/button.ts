import Component, { ComponentProps } from '@/base/component';

export default class Button extends Component {
    listeners: Array<() => void> = [];

    constructor(element: ComponentProps) {
        super(element);
    }

    setListener = (listener: () => void) => {
        this.listeners.push(listener);
        this.nRoot.addEventListener('click', listener);
    }

    deleteListener = (listener: () => void) => {
        this.listeners.filter((handler) => handler !== listener);
        this.nRoot.removeEventListener('click', listener);
    }

    destroy = () => {
        // Destroy functions
        this.listeners.forEach((listener) => this.nRoot.removeEventListener('click', listener));
    }
}
