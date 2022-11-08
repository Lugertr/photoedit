import { ToolPar } from "../types/ToolsType";
import { ImgCssStyles } from "../types/ImgType";
import { useSaveState } from "../hooks/UseDispatchSaveState";

export class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    mouseDownState: boolean;
    imgCss: ImgCssStyles;
    saveStateFunc: (imgCss: ImgCssStyles, canvasStateUrl: string) => void;

    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        imgCss: ImgCssStyles,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
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