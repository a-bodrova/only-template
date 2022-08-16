import Component, { ComponentProps } from '@/base/component';

export default class Preloader extends Component {
    constructor(element: ComponentProps) {
        super(element);
    }

    showSelf = () => {
        this.nRoot.style.height = '100vh';
    }

    hideSelf = () => {
        this.nRoot.style.height = '0px';

    }

    destroy = () => {
        // Destroy functions
    }
}
