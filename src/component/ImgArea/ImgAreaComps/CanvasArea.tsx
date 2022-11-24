import {  useRef, useEffect } from "react";

import { ImgActionTypes, ImgData,ImgStateAction,SizePar } from "../../../types/ImgType";

import ImgArea from "./ImgArea";

import { Zoom } from "../../../logic/zoom";
import { useDispatch } from "react-redux";

const CanvasArea = ({curImg,
                setImg,delImg} : {  
                    curImg: ImgData | null, imgList: ImgData[],
                            setImg(img: ImgData): void,
                            delImg(img: ImgData): void}) => { 


        const imgFieldRef = useRef<HTMLDivElement>(null)
        const imgRef = useRef<HTMLDivElement>(null)

        const dispatch = useDispatch()

        function changeImgPar(par: SizePar) {
            dispatch({type: ImgActionTypes.SET_IMG_SIZE, payload: {...par}} as ImgStateAction)
        }

        useEffect(()=>{
            if (imgFieldRef.current && imgRef.current)
                new Zoom(imgRef.current, imgFieldRef.current,changeImgPar,{...curImg!.size})
        },[curImg?.src,imgFieldRef.current,imgRef.current])                         

        return (
            <div className="img_field" ref={imgFieldRef}>
                    {(!!curImg) ? 
                    <ImgArea {...curImg} ref={imgRef} ></ImgArea>:
                    <h1>Нет картинки</h1>}
            </div>
        )

}

export default CanvasArea