import { scrollParInterface } from "../types/ScrollParInterface";


export class Zoom {
    el: HTMLDivElement;
    par: scrollParInterface = {zX:1,zY:0,tX:0,tY:0}

    constructor(el: HTMLDivElement) {
        this.el = el;
        this.eventsListen()
    }

    eventsListen() {
        this.el.onwheel = this.onWheel;
    }

    setTransform() {
        this.el.style.transform = "translate(" + this.par.tX + "px, " + this.par.tY + "px) scale(" + this.par.zX + ")";
    }

    onWheel(e: WheelEvent) {
        console.log(this.par.zX )
        e.preventDefault();
        let xs = (e.clientX - this.par.tX) / this.par.zX,
        ys = (e.clientY - this.par.tY) / this.par.zX,
        delta = -e.deltaY;
        (delta > 0) ? (this.par.zX *= 1.2) : (this.par.zX /= 1.2);
        this.par.tX = e.clientX - xs * this.par.zX;
        this.par.tY = e.clientY - ys * this.par.zX;

        this.setTransform();

    }

    //https://dev.to/stackfindover/zoom-image-point-with-mouse-wheel-11n3

}
