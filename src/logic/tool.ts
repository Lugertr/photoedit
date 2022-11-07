import { ToolPar } from "../types/ToolsType";
import { ImgCssStyles } from "../types/ImgType";
import { saveState } from "../hooks/UseDispatchSaveState";

export class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    mouseDownState: boolean;
    ImgCss: ImgCssStyles;

    constructor(canvas: HTMLCanvasElement,par: ToolPar,ImgCss: ImgCssStyles) {
        this.ImgCss = ImgCss;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        if (this.ctx) {
            this.ctx.fillStyle = par.color;
            this.ctx.strokeStyle = par.lineColor;
            this.ctx.lineWidth = par.width;
        }
        this.mouseDownState = false;
    }

    saveCanvasState() {
        const canvasState = this.canvas.toDataURL();
        saveState(this.ImgCss,canvasState);
    }

    DestroyEvents() {
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.canvas.onmouseout = null;
        this.canvas.onmouseup = null;
    }

}