import Slider from '@/components/blocks/slider/slider';
import Counter from '@/components/ui/counter/counter';
import Modal from '@/components/ui/modal/modal';
import Spoiler from '@/components/ui/spoiler/spoiler';
import { getComponent, getComponents } from '@/helpers/helpers';
import { ITransitionData } from '@barba/core/dist/core/src/defs';

export default {
    namespace: 'common',
    async beforeEnter({ next }: ITransitionData) {
        try {
            // Инициализация компонентов
            if (getComponent('spoiler', next.container).component) {
                new Spoiler(getComponent('spoiler', next.container));
            }

            if (getComponent('slider', next.container).component) {
                new Slider(getComponent('slider', next.container));
            }

            // if (getComponent('counter', next.container).component) {
            //     new Counter(getComponent('counter', next.container));
            // }
        } catch (e) {
            console.error(e);
        }
    },
    beforeLeave() {
    },

    afterLeave() {},
};
