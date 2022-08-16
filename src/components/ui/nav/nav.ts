import Component, { ComponentProps } from '@/base/component';

export default class Nav extends Component {
    links?: HTMLAnchorElement[];

    constructor(element: ComponentProps) {
        super(element);

        if (this.getElement('item')) {
            this.links = this.getElements('item');
        }
    }

    setActiveLink = (path: string | undefined) => {
        if (this.links && path) {
            this.links.forEach((link) => {
                link.getAttribute('href') === path ? link.classList.add('active') : link.classList.remove('active');
            })
        }
    }

    destroy = () => {
        // Destroy functions
    }
}
