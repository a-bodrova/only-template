import { merge, Subscription } from "rxjs";
import Component, { ComponentProps } from "@/base/component";
import { getComponent } from "@/helpers/helpers";
import Modal from "@/components/ui/modal/modal";
import Button from "@/components/ui/button/button";
import SlideCounter from "@/components/ui/slide-counter/slide-counter";
import { slides } from "@/variables/slides";
import Swiper, { Navigation } from "swiper";

export default class Slider extends Component {
    pageCounter?: HTMLSpanElement | null;
    openButton?: Button;
    modal?: Modal;
    swiper?: Swiper;
    slideCounters?: SlideCounter[];
    counterSubscription?: Subscription;

    constructor(element: ComponentProps) {
        super(element);
        this.pageCounter = this.getElement("counter");

        if (getComponent("modal", this.nRoot).component) {
            this.modal = new Modal(getComponent("modal", this.nRoot));

            if (getComponent("open-button", this.nRoot).component) {
                this.openButton = new Button(
                    getComponent("open-button", this.nRoot)
                );
                if (this.openButton) {
                    this.openButton.setListener(this.modal.open);
                }
            }
            this.initSlider();
        }
    }

    setCounterValue = (value: number) => {
        if (this.pageCounter) {
            this.pageCounter.textContent = value.toString();
        }
    };

    initSlider() {
        if (this.modal) {
            const swiperContainer = this.getElement("swiper");
            if (swiperContainer) {
                this.swiper = new Swiper(swiperContainer, {
                    modules: [Navigation],
                    navigation: {
                        nextEl: ".slide-right",
                        prevEl: ".slide-left",
                    },
                    slidesPerView: 1,
                    speed: 500,
                    centeredSlides: true,
                });
                    this.slideCounters = slides.map(
                        (item) =>
                            new SlideCounter(
                                getComponent(item.class, this.modal?.nRoot)
                            )
                    );
                    this.swiper.on("activeIndexChange", (swiper) => {
                        const index = swiper.activeIndex;

                        if (this.slideCounters) {
                            this.setCounterValue(
                                this.slideCounters[index].value
                            );
                        }
                    });

                    this.counterSubscription = merge(
                        ...this.slideCounters.map((item) => item.value$)
                    ).subscribe(this.setCounterValue);
            }
        }
    }

    destroy = () => {
        // Destroy functions
        this.counterSubscription?.unsubscribe();
    };
}
