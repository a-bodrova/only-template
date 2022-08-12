import Component, { ComponentProps } from '@/base/component';

export default class SpoilerItem extends Component {
    isOpen = false;
    contentElement: HTMLElement | undefined;
    public id: string | null;

    constructor(element: ComponentProps) {
        super(element);

        if(this.getElement('content')) {
            this.contentElement = this.getElement('content');
        }
        this.id = this.nRoot.dataset.id ?? null;
    }

    open() {
        if (!this.nRoot.classList.contains("open")) {
            if (this.contentElement) {
                this.contentElement.style.height = `${this.contentElement.scrollHeight}px`;
            }
            this.isOpen = true;
            this.nRoot.classList.add("open");
        }
    }

    close() {
        if (this.nRoot.classList.contains("open")) {
            this.nRoot.classList.remove("open");
            if (this.contentElement) {
                this.contentElement.style.height = "0";
            }
            this.isOpen = false;
        }
    }

    destroy = () => {
        // Destroy functions
    }
}