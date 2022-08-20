import Component, { ComponentProps } from '@/base/component';
import { getComponent } from '@/helpers/helpers';
import Button from '../button/button';

export default class Modal extends Component {
    isOpen = false;
    closeButton: Button;

    constructor(element: ComponentProps) {
        super(element);
        this.closeButton = new Button(getComponent('close-button', this.nRoot)) ?? null;
        if (this.closeButton) {
            this.closeButton.setListener(this.close);
        }
    }

    open = () => {
        if (!this.nRoot.classList.contains('open')) {
            this.nRoot.classList.add('open');
            this.isOpen = true;
        }
    }

    close = () => {
        if (this.nRoot.classList.contains('open')) {
            this.nRoot.classList.remove('open');
            this.isOpen = false;
        }
    }

    destroy = () => {
        // Destroy functions
        this.closeButton.destroy();
    }
}
