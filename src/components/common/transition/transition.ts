import Component, { ComponentProps } from '@/base/component';

export default class Transition extends Component {
    top?: HTMLElement;
    bottom?: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);
        this.top = this.getElement("top");
        this.bottom = this.getElement("bottom");
    }

    showSelf = () => {
        this.nRoot.classList.add('iter');
        this.top?.classList.add("trans");
        this.bottom?.classList.add("trans");
    };

    hideSelf = () => {
        this.nRoot.classList.remove('iter');
        this.top?.classList.remove("trans");
        this.bottom?.classList.remove("trans");
    };

    destroy = () => {
        // Destroy functions
    }
}
