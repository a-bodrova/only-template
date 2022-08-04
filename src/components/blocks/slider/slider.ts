import { merge, Subscription } from "rxjs";
import Component, { ComponentProps } from "@/base/component";
import { getComponent } from "@/helpers/helpers";
import Modal from "@/components/ui/modal/modal";
import Button from "@/components/ui/button/button";
import SlideCounter from "@/components/ui/slide-counter/slide-counter";
import { slides } from "@/variables/slides";
import Swiper, { Navigation } from "swiper";

export default class Slider extends Component {
    pageCounter: HTMLSpanElement | null;
    openButton: Button;
    modal: Modal;
    swiper?: Swiper;
    slideCounters?: SlideCounter[];
    counterSubscription?: Subscription;

    constructor(element: ComponentProps) {
        super(element);
        this.pageCounter = this.getElement("counter") ?? null;
        this.modal = new Modal(getComponent("modal", this.nRoot)) ?? null;
        this.openButton =
            new Button(getComponent("open-button", this.nRoot)) ?? null;

        if (this.openButton) {
            this.openButton.setListener(this.modal.open);
        }

        if (this.modal) {
            this.swiper = new Swiper('.swiper', {
                modules: [Navigation],
                navigation: {
                    nextEl: '.slide-right',
                    prevEl: '.slide-left',
                },
                slidesPerView: 1,
                speed: 500,
                centeredSlides: true,
            });
                if (this.swiper) {
                this.slideCounters = slides.map(
                    (item) =>
                        new SlideCounter(
                            getComponent(
                                item.class,
                                this.modal.nRoot
                            )
                        )
                );
                    this.swiper.on(
                    "activeIndexChange",
                    (swiper) => {
                        const index = swiper.activeIndex;

                        if (this.slideCounters) {
                            this.setCounterValue(
                                this.slideCounters[index].value
                            );
                        }
                    }
                );

                this.counterSubscription = merge(
                    ...this.slideCounters.map((item) => item.value$)
                ).subscribe(this.setCounterValue);
            }
        }
    }

    setCounterValue = (value: number) => {
        if (this.pageCounter) {
            this.pageCounter.textContent = value.toString();
        }
    };

    destroy = () => {
        // Destroy functions
        this.counterSubscription?.unsubscribe();
    };
}
