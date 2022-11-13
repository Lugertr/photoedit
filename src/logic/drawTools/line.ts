import { Tool } from "../tool";
import { ImgCssStyles } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class Line extends Tool {
    x: number = 0;
    y: number = 0;
    canvasSrc: string = '';

    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        ImgCss: ImgCssStyles,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        super(canvas,par, ImgCss,saveStateFunc)
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
            this.x = e.pageX - coords.left;
            this.y = e.pageY - coords.top;
            this.ctx!.beginPath()
            this.ctx.moveTo(this.x, this.y )
        }
        this.mouseDownState = true;
    }

    mouseMoveEvent(e: MouseEvent) {
        if (this.mouseDownState && this.ctx) {
            const img = new Image()
            img.src = this.canvasSrc;

            const coords = this.canvas.getBoundingClientRect();  
            const curX = e.pageX - coords.left;
            const curY = e.pageY - coords.top;

            img.onload = () => {

            this.ctx!.clearRect(0,0, this.canvas.width,this.canvas.height)
            this.ctx!.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx!.beginPath()
            this.ctx!.moveTo(this.x, this.y )
            this.ctx!.lineTo(curX, curY)
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
