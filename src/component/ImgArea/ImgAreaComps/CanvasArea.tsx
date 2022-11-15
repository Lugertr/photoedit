import {  useRef, useEffect, useState, WheelEvent } from "react";

import { scrollParInterface } from "../../../types/ScrollParInterface";

import { ImgData } from "../../../types/ImgType";
import ImgBtn from "../../UI/ImgBtn";

import ImgHistoryTable from "./ImgHistory";

import ImgArea from "./ImgArea";

import { Zoom } from "../../../logic/zoom";

const CanvasArea = ({curImg,imgList, 
                setImg,delImg} : {  
                    curImg: ImgData | null, imgList: ImgData[],
                            setImg(img: ImgData): void,
                            delImg(img: ImgData): void}) => { 


        const imgFieldRef = useRef<HTMLDivElement>(null)

        useEffect(()=>{
            if (imgFieldRef.current)
                new Zoom(imgFieldRef.current)
        },[curImg?.src])                         

        return (
            <div className="img_field" ref={imgFieldRef}>
                    {(!!curImg) ? 
                    <ImgArea curImg={curImg}></ImgArea>:
                    <h1>Нет картинки</h1>}
                {(curImg)? <ImgHistoryTable img={curImg}/>:undefined}
            </div>
        )

}

export default CanvasArea