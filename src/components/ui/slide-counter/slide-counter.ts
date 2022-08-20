import Component, { ComponentProps } from '@/base/component';
import { fromEvent, Subscription, BehaviorSubject } from 'rxjs';

export default class SlideCounter extends Component {
    value = 0;
    value$: BehaviorSubject<number>;
    span: HTMLSpanElement | null;
    btnInc: HTMLButtonElement | null;
    btnDec: HTMLButtonElement | null;
    btnDecEvent?: Subscription;
    btnIncEvent?: Subscription;

    constructor(element: ComponentProps) {
        super(element);
        this.nRootName = 'slide-counter';
        this.span = <HTMLSpanElement>this.getElement('span') ?? null;

        this.value$ = new BehaviorSubject(this.value);
        this.value$.subscribe((val: number) => this.setValue(val));

        this.btnDec = <HTMLButtonElement>this.getElement('minus') ?? null;
        this.btnInc = <HTMLButtonElement>this.getElement('plus') ?? null;

        if (this.btnDec && this.btnInc) {
            this.btnDecEvent = fromEvent(this.btnDec, 'click').subscribe(this.dec);
            this.btnIncEvent = fromEvent(this.btnInc, 'click').subscribe(this.inc);
        }
    }

    setValue = (val: number) => {
        this.value = val;

        if (this.span) {
            this.span.textContent = val.toString();
        }
    }

    inc = () => {
        this.value$.next(this.value + 1);
    }

    dec = () => {
        this.value$.next(this.value - 1);
    }

    destroy = () => {
        // Destroy functions
        this.btnDecEvent?.unsubscribe();
        this.btnIncEvent?.unsubscribe();
        this.value$.unsubscribe();
    }
}
