import { Tool } from "../tool";
import { ImgCssStyles, SizePar } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class Circle extends Tool {
    x: number = 0;
    y: number = 0;
    canvasSrc: string = '';

    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        ImgCss: ImgCssStyles,
        imgSize: SizePar,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        super(canvas,par, ImgCss,imgSize,saveStateFunc)
        this.eventsListen()
    }
    eventsListen() {
        this.canvas.onmousedown = this.mouseDownEvent.bind(this);
        this.canvas.onmousemove = this.mouseMoveEvent.bind(this);
        this.canvas.onmouseout = this.mouseUpEvent.bind(this);
        this.canvas.onmouseup = this.mouseUpEvent.bind(this);
    }

    mouseDownEvent(e: MouseEvent) {
        if (e.button === 0 && this.ctx) {
            this.canvasSrc = this.canvas.toDataURL()
            const coords = this.canvas.getBoundingClientRect(); 
            this.x = this.mathX(e,coords.left);
            this.y = this.mathY(e,coords.top);
        }
        this.mouseDownState = true;
    }

    mouseMoveEvent(e: MouseEvent) {
        if (this.mouseDownState && this.ctx) {
            const img = new Image()
            img.src = this.canvasSrc;

            const coords = this.canvas.getBoundingClientRect();  
            const width = this.mathX(e,coords.left) -this.x;
            const height = this.mathY(e,coords.top) -this.y;
            const r = Math.sqrt(width**2 + height**2)

            img.onload = () => {

            this.ctx!.clearRect(0,0, this.canvas.width,this.canvas.height)
            this.ctx!.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx!.beginPath()
            this.ctx!.arc(this.x, this.y, r, 0, 2*Math.PI)
            this.ctx!.fill()
            this.ctx!.stroke()
            }
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
