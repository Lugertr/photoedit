import { Tool } from "../tool";
import { ImgCssStyles } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class Brush extends Tool {
    constructor(canvas: HTMLCanvasElement,par: ToolPar,ImgCss: ImgCssStyles) {
        super(canvas,par, ImgCss)
        this.eventsListen()
    }

    eventsListen() {
        this.canvas.onmousedown = this.mouseDownEvent.bind(this);
        this.canvas.onmousemove = this.mouseMoveEvent.bind(this);
        this.canvas.onmouseout = this.mouseUpEvent.bind(this);
        this.canvas.onmouseup = this.mouseUpEvent.bind(this);
    }

    mouseDownEvent(e: MouseEvent) {
        this.mouseDownState = true;

        if (this.ctx) {
            this.ctx.beginPath();
            const coords = this.canvas.getBoundingClientRect(); 
            this.ctx.moveTo(e.pageX - coords.left , e.pageY - coords.top) 
        }
    }

    mouseMoveEvent(e: MouseEvent) {
        if (this.mouseDownState && this.ctx) {
            const coords = this.canvas.getBoundingClientRect();  
            this.ctx.lineTo(e.pageX - coords.left , e.pageY - coords.top);
            this.ctx.stroke()
        }
    }

    mouseUpEvent() {
        this.saveCanvasState();
        this.mouseDownState = true;
    }


}
