import {  useRef, useEffect, useState } from "react";

import { ImgData, HistoryElem, ImgActionTypes, ImgCurrentChanges} from "../../../types/ImgType";

import { useDispatch } from "react-redux";

const ImgArea = ({curImg} : {  
                    curImg: ImgData | null }) => {

        const dispatch = useDispatch()

        const [drawStatus, setDrawStatus] = useState<boolean>(false);
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const imgRef = useRef<HTMLImageElement>(null)



        useEffect(()=>{
            if (!curImg)
                return
            //canvasRef.current!.onmousedown = (e)=>startDraw(e);
            imgRef.current!.src = curImg.src;
            imgRef.current!.onload = ()=> {
                canvasRef.current!.width = imgRef.current!.width;
                canvasRef.current!.height = imgRef.current!.height;

                const context = canvasRef.current!.getContext("2d");
                context!.clearRect(0,0,imgRef.current!.width, imgRef.current!.height)

                if (curImg.state.canvasSrc) {
                    let img = new Image()
                    img.src = curImg.state.canvasSrc;
                    img.onload = () => {
                        context!.drawImage(img,0,0,imgRef.current!.width, imgRef.current!.height)
                    }
                }
            }

        }, [curImg?.src, curImg?.state.canvasSrc])    

        useEffect(()=>{
            console.log(curImg!.state.style)
            if (drawStatus) {
                canvasRef.current!.onmousemove = draw;
                canvasRef.current!.onmouseup = stopDraw;
                canvasRef.current!.onmouseout = stopDraw;
            }
            else {
                canvasRef.current!.onmousemove = null;
                canvasRef.current!.onmouseup = null;
                canvasRef.current!.onmouseout = null;
            }
        }, [drawStatus])

        function startDraw(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
            const context = canvasRef.current!.getContext("2d");
            console.log(context)
            console.log(drawStatus)
            if (!drawStatus && context) {
                setDrawStatus(true)
                context.fillStyle = 'black';
                context.strokeStyle = 'black';
                context.lineWidth = 20;
                context.beginPath();
                const coords = canvasRef.current!.getBoundingClientRect(); 

                context.moveTo(e.pageX - coords.left , e.pageY - coords.top) 
            }
        }

        function draw(e: MouseEvent) {
            const context = canvasRef.current!.getContext("2d");
            if (drawStatus && context) {
                context.fillStyle = 'black';
                context.strokeStyle = 'black';
                context.lineWidth = 20;
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
                <canvas className="canvas" onMouseDown={(e)=>startDraw(e)}  ref={canvasRef} ></canvas>
            </div>
        )

}

export default ImgArea