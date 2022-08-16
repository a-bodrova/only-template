import Component, { ComponentProps } from '@/base/component';
import Nav from '@/components/ui/nav/nav';
import { getComponent } from '@/helpers/helpers';

export default class Header extends Component {
    navigation?: Nav;

    constructor(element: ComponentProps) {
        super(element);

        if (getComponent('nav').component) {
            this.navigation = new Nav(getComponent('nav'));
        }
    }

    destroy = () => {};
}
