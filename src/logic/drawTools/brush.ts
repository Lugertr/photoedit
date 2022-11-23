import { Tool } from "../tool";
import { ImgCssStyles, SizePar } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class Brush extends Tool {
    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        imgSize: SizePar,
        ImgCss: ImgCssStyles,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        super(canvas,par, ImgCss,imgSize,saveStateFunc)
        this.imgSize = imgSize;
        this.eventsListen()
    }

    eventsListen() {
        this.canvas.onmousedown = this.mouseDownEvent.bind(this);
        this.canvas.onmousemove = this.mouseMoveEvent.bind(this);
        this.canvas.onmouseout = this.mouseUpEvent.bind(this);
        this.canvas.onmouseup = this.mouseUpEvent.bind(this);
    }

    mathY(e: MouseEvent, top: number) {
        return (e.clientY - top) / this.imgSize.scale
    }
    mathX(e: MouseEvent, left: number) {
        return (e.clientX  - left) / this.imgSize.scale
    }

    mouseDownEvent(e: MouseEvent) {
        if (e.button === 0) {
            if (this.ctx) {
                this.ctx.beginPath();
                const coords = this.canvas.getBoundingClientRect(); 
                this.ctx.moveTo(this.mathX(e,coords.left),this.mathY(e,coords.top)) 
            }
        }
        this.mouseDownState = true;
    }

    mouseMoveEvent(e: MouseEvent) {
        if (this.mouseDownState && this.ctx) {
            const coords = this.canvas.getBoundingClientRect();  
            this.ctx.lineTo(this.mathX(e,coords.left),this.mathY(e,coords.top));
            this.ctx.stroke()
        }
    }

    mouseUpEvent(e: MouseEvent) {
        if (e.button === 0 && this.mouseDownState) {
            this.saveCanvasState();
            this.mouseDownState = false;
        }
    }

}
