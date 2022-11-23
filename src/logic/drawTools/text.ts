import { Tool } from "../tool";
import { ImgCssStyles, SizePar } from "../../types/ImgType";
import { ToolPar } from "../../types/ToolsType";

export class addText extends Tool {
    x: number = 0;
    y: number = 0;
    canvasSrc: string = '';
    mes: string[] = [];
    pos: number = 0;

    constructor(canvas: HTMLCanvasElement,par: ToolPar,
        ImgCss: ImgCssStyles,
        imgSize: SizePar,
        saveStateFunc:  (imgCss: ImgCssStyles, canvasStateUrl: string) => void) {
        super(canvas,par, ImgCss,imgSize,saveStateFunc)
        this.eventsListen()

        this.ctx!.font = `${par.width}px serif`;
    }
    eventsListen() {
        this.canvas.onmousedown = this.mouseDownEvent.bind(this);
    }

    mouseDownEvent(e: MouseEvent) {
        console.log('1')
        if (e.button === 0 && this.ctx) {
            if (!this.mouseDownState) {
                this.mes.length = 0;
                const coords = this.canvas.getBoundingClientRect(); 
                this.x = this.mathX(e,coords.left);
                this.y = this.mathY(e,coords.top);
                this.StartWrite()
            }
            else {
                this.stopWrite();
            }
        }
    }

    StartWrite() {
        this.pos = 0;
        this.canvasSrc = this.canvas.toDataURL()
        this.mouseDownState = true;
        window.onkeydown = this.keyDownWrite.bind(this);
    }

    stopWrite() {
        this.pos = 0;
        window.onkeydown = null;
        this.saveCanvasState();
        this.mouseDownState = false;
    }

    keyDownWrite(e: KeyboardEvent) {

        if (this.mouseDownState && this.ctx) {
            if (e.code === e.key) {
                if (e.code === 'Backspace' && this.mes.length) {
                    this.pos--;
                    this.mes.pop();
                }
                else if (e.code === 'Escape' || e.code === 'Enter')
                    this.stopWrite();
                else if (e.code === 'ArrowLeft' && this.pos>=0)
                    this.pos--;
                else if (e.code === 'ArrowRight' && this.pos<=this.mes.length)
                    this.pos++;
            }
            else {
                this.mes.push(e.key);
            }

            const img = new Image()
            img.src = this.canvasSrc;
            img.onload = () => {

            this.ctx!.clearRect(0,0, this.canvas.width,this.canvas.height)
            this.ctx!.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx!.fillText(this.mes.join(''), this.x, this.y);
            }
        }
    }


}
