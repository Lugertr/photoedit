import {  useRef, useEffect, useState } from "react";

import { ImgData, HistoryElem, ImgActionTypes, ImgCurrentChanges} from "../../../types/ImgType";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";

const ImgArea = ({curImg} : {  
                    curImg: ImgData | null }) => {

        const dispatch = useDispatch()
        const {tool , par} = useTypedSelector(state => state.toolState)

        const [drawStatus, setDrawStatus] = useState<boolean>(false);
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const imgRef = useRef<HTMLImageElement>(null)



        useEffect(()=>{
            if (!curImg || 
                (curImg.history.length &&
                curImg?.state.canvasSrc===
                curImg.history[curImg.history.length-1].status.canvasSrc))
                return
            //canvasRef.current!.onmousedown = (e)=>startDraw(e);
            imgRef.current!.src = curImg.src;
            imgRef.current!.onload = ()=> {
                canvasRef.current!.width = imgRef.current!.width;
                canvasRef.current!.height = imgRef.current!.height;

                const context = canvasRef.current!.getContext("2d");

                if (curImg.state.canvasSrc) {
                    let img = new Image()
                    img.src = curImg.state.canvasSrc;
                    img.onload = () => {
                        context!.drawImage(img,0,0,imgRef.current!.width, imgRef.current!.height)
                    }
                }
                else 
                context!.clearRect(0,0,imgRef.current!.width, imgRef.current!.height)
            }

        }, [curImg?.src, curImg?.state.canvasSrc]) 

        useEffect(()=>{
            if (!tool)
                return

            if (drawStatus) {
                    
                    

                    canvasRef.current!.onmousemove = draw;
                    canvasRef.current!.onmouseup = stopDraw;
                    canvasRef.current!.onmouseout = stopDraw;
                }
            else {
                    canvasRef.current!.onmousedown = startDraw;
                    canvasRef.current!.onmousemove = null;
                    canvasRef.current!.onmouseup = null;
                    canvasRef.current!.onmouseout = null;
                }
        }, [tool,drawStatus])


        function startDraw(e: MouseEvent) {
            const context = canvasRef.current!.getContext("2d");
            console.log(context)
            console.log(drawStatus)
            if (!drawStatus && context) {
                setDrawStatus(true)
                context.fillStyle = par.color
                context.strokeStyle = par.lineColor
                context.lineWidth = par.width
                context.beginPath();
                const coords = canvasRef.current!.getBoundingClientRect(); 

                context.moveTo(e.pageX - coords.left , e.pageY - coords.top) 
            }
        }

        function draw(e: MouseEvent) {
            const context = canvasRef.current!.getContext("2d");
            if (drawStatus && context) {
                context.fillStyle = par.color
                context.strokeStyle = par.lineColor
                context.lineWidth = par.width
                const coords = canvasRef.current!.getBoundingClientRect(); 
                context.lineTo(e.pageX - coords.left , e.pageY - coords.top);
                context.stroke()
            }
        }

        function stopDraw() {
            if (curImg) {
                const canvasState = canvasRef.current!.toDataURL()
                dispatch({type: ImgActionTypes.ADD_IN_IMG_HISTORY, 
                    payload: {type:"brush", 
                    status: {style: {...curImg.state.style},
                            canvasSrc: canvasState}} as HistoryElem})
                
                dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
                        payload:{
                            canvasSrc: canvasState as string,
                            style:{...curImg.state.style}} as ImgCurrentChanges
                })
            }

                setDrawStatus(false)
        }

        return (
            <div className="ImgArea">
                <img className="img" ref={imgRef} style={curImg!.state.style} />
                <canvas className="canvas"  ref={canvasRef} ></canvas>
            </div>
        )

}

export default ImgArea