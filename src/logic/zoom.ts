import { SizePar } from "../types/ImgType";


export class Zoom {
    imgFieldRef: HTMLDivElement;
    imgRef: HTMLDivElement;
    savePar: (par: SizePar) => void;
    par: SizePar;

    constructor(imgRef: HTMLDivElement, 
        imgFieldRef: HTMLDivElement,
        savePar: (par: SizePar) => void,
        par: SizePar
        ) {
        this.imgFieldRef =  imgFieldRef;
        this.imgRef =  imgRef;
        this.savePar = savePar;
        this.par = par;
        this.imgRef.style.transform = "translate(" + this.par.x + "px, " + this.par.y + "px) scale(" + this.par.scale + ")";
        this.eventsListen()
    }
 
    eventsListen() {
        this.imgFieldRef.onwheel = this.onWheel.bind(this);
    }

    setTransform() {
        this.imgRef.style.transform = "translate(" + this.par.x + "px, " + this.par.y + "px) scale(" + this.par.scale + ")";
        this.savePar(this.par)
    }

    onWheel(e: WheelEvent) {
        let xs = (e.clientX-this.par.x) / this.par.scale,
        ys = (e.clientY-this.par.y) / this.par.scale,
        delta = -e.deltaY;
        (delta > 0) ? (this.par.scale *= 1.1) : (this.par.scale /= 1.1);
        this.par.x = e.clientX - xs * this.par.scale;
        this.par.y = e.clientY - ys * this.par.scale;
        this.setTransform();
    }

    //https://dev.to/stackfindover/zoom-image-point-with-mouse-wheel-11n3

}
