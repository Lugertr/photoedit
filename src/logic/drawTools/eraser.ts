import { Tool } from "../tool";
import { ImgCssStyles, SizePar } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class Eraser extends Tool {
    constructor(
        canvas: HTMLCanvasElement,
        width: number,
        ImgCss: ImgCssStyles,
        imgSize: SizePar,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        const eraserPar: ToolPar = {
                width: width,
                color: "white",
                lineColor: "white"
                //transparent
            }
        super(canvas,eraserPar, ImgCss,imgSize, saveStateFunc)
        this.eventsListen()
    }

    eventsListen() {
        this.canvas.onmousedown = this.mouseDownEvent.bind(this);
        this.canvas.onmousemove = this.mouseMoveEvent.bind(this);
        this.canvas.onmouseout = this.mouseUpEvent.bind(this);
        this.canvas.onmouseup = this.mouseUpEvent.bind(this);
    }

    mouseDownEvent(e: MouseEvent) {
        if (e.button === 0) {
            if (this.ctx) {
                this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.beginPath();
                const coords = this.canvas.getBoundingClientRect(); 
                this.ctx.moveTo(this.mathX(e,coords.left) , this.mathY(e,coords.top)) 
            }
        }
        this.mouseDownState = true;
    }

    mouseMoveEvent(e: MouseEvent) {
        if (this.mouseDownState && this.ctx) {
            const coords = this.canvas.getBoundingClientRect();  
            this.ctx.lineTo(this.mathX(e,coords.left) , this.mathY(e,coords.top));
            this.ctx.stroke()
        }
    }

    mouseUpEvent(e: MouseEvent) {
        if (e.button === 0 && this.mouseDownState) {
            this.saveCanvasState();
            this.mouseDownState = false;
            this.ctx!.globalCompositeOperation = "source-over";
        }
    }

}
