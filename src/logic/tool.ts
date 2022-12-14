import { ToolPar } from "../types/ToolsType";
import { ImgCssStyles, SizePar } from "../types/ImgType";

export class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    mouseDownState: boolean;
    imgCss: ImgCssStyles;
    imgSize: SizePar;
    saveStateFunc: (imgCss: ImgCssStyles, canvasStateUrl: string) => void;

    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        imgCss: ImgCssStyles,
        imgSize: SizePar,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        this.imgSize = imgSize;
        this.imgCss = imgCss;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        if (this.ctx) {
            this.ctx.fillStyle = par.color;
            this.ctx.strokeStyle = par.lineColor;
            this.ctx.lineWidth = par.width;
        }
        this.mouseDownState = false;
        this.DestroyEvents();
        this.saveStateFunc = saveStateFunc;
    }

    mathY(e: MouseEvent, top: number) {
        return (e.clientY - top) / this.imgSize.scale
    }
    mathX(e: MouseEvent, left: number) {
        return (e.clientX  - left) / this.imgSize.scale
    }


    saveCanvasState() {
        const canvasState = this.canvas.toDataURL();
        this.saveStateFunc(this.imgCss,canvasState);
    }

    DestroyEvents() {
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.canvas.onmouseout = null;
        this.canvas.onmouseup = null;
    }

}