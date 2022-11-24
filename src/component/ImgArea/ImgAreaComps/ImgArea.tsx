import {  useRef, useEffect, forwardRef, } from "react";

import { ImgData, HistoryElem, ImgActionTypes, ImgCurrentChanges, ImgCssStyles} from "../../../types/ImgType";

import {Brush} from "../../../logic/drawTools/brush"

import { Eraser } from "../../../logic/drawTools/eraser";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { Circle } from "../../../logic/drawTools/circle";
import { Square } from "../../../logic/drawTools/square";
import { Line } from "../../../logic/drawTools/line";
import { addText } from "../../../logic/drawTools/text";

type Props = ImgData | null;
type Ref = HTMLDivElement;

const ImgArea = forwardRef<Ref, Props>((curImg, ref) => {

        const dispatch = useDispatch()
        const {tool , par} = useTypedSelector(state => state.toolState)
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const imgRef = useRef<HTMLImageElement>(null)

        useEffect(()=>{
            if (!curImg ||
                (curImg.history.length &&
                curImg?.state.canvasSrc===
                curImg.history[curImg.history.length-1].status.canvasSrc))
                return
    
            imgRef.current!.src = curImg.src;

            imgRef.current!.onload = ()=> {
                reCreateCanvas()
            }

        }, [curImg?.src, curImg?.state]) 

        useEffect(()=>{
            setTool()
        }, [tool,par,curImg?.state.style, curImg?.size])


        function setTool() {
            if (!tool && 
                curImg === null && 
                curImg!.state.style === undefined
                && canvasRef.current === null)
                return

            canvasRef.current!.onmousedown = null;

            if (tool==='Кисть') {
                new Brush(canvasRef.current!, par, curImg!.size,
                    curImg!.state.style,useSaveState)
            }
            else if (tool==='Ластик') {
                new Eraser(canvasRef.current!, par.width, 
                    curImg!.state.style,curImg!.size,useSaveState)
            }
            else if (tool==='Квадрат') {
                new Square(canvasRef.current!, par, 
                    curImg!.state.style,curImg!.size,useSaveState)
            }
            else if (tool==='линия'){
                new Line(canvasRef.current!, par, 
                    curImg!.state.style,curImg!.size,useSaveState)
            }
            else if (tool==='Круг') {
                new Circle(canvasRef.current!, par, 
                    curImg!.state.style,curImg!.size,useSaveState)
            }
            else if (tool==='Текст') {
                new addText(canvasRef.current!, par, 
                    curImg!.state.style,curImg!.size,useSaveState)
            }
        }

            function useSaveState(imgCss:ImgCssStyles, canvasStateUrl: string) {

            dispatch({type: ImgActionTypes.ADD_IN_IMG_HISTORY, 
                payload: {type:tool, 
                status: {style: {...imgCss},
                        canvasSrc: canvasStateUrl}} as HistoryElem})
            
            dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
                    payload:{
                        canvasSrc: canvasStateUrl,
                        style:{...imgCss}} as ImgCurrentChanges
            })
        }

        function reCreateCanvas() {
            setCanvasSize()

            const context = canvasRef.current!.getContext("2d");
            canvasRef.current!.onmousedown = null;
            setTool()
            
            if (curImg!.state.canvasSrc) {
                let img = new Image()
                img.src = curImg!.state.canvasSrc;
                img.onload = () => {
                    context!.drawImage(img,0,0,imgRef.current!.width, imgRef.current!.height)
                }
            }
            else 
                context!.clearRect(0,0,imgRef.current!.width, imgRef.current!.height)
        }

        function setCanvasSize() {
            canvasRef.current!.width = imgRef.current!.width;
            canvasRef.current!.height = imgRef.current!.height;
        }

        return (
            <div className="imgArea" ref={ref}>
                <img className="img" ref={imgRef} style={curImg!.state.style} />
                <canvas className="canvas"  ref={canvasRef}></canvas>
                <div className="imgBorder"></div>
            </div>
        )

    }
)

export default ImgArea