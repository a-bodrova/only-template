import Component, { ComponentProps } from '@/base/component';

export default class Button extends Component {
    listeners: Set<() => void> = new Set();

    constructor(element: ComponentProps) {
        super(element);
    }

    setListener = (listener: () => void) => {
        this.listeners.add(listener);
        this.nRoot.addEventListener('click', listener);
    }

    deleteListener = (listener: () => void) => {
        this.listeners.delete(listener);
        this.nRoot.removeEventListener('click', listener);
    }

    destroy = () => {
        // Destroy functions
        this.listeners.forEach(this.deleteListener);
    }
}
