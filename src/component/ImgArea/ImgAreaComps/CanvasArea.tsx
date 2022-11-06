import {  useRef, useEffect } from "react";

import { ImgData } from "../../../types/ImgType";
import ImgBtn from "../../UI/ImgBtn";

import ImgArea from "./ImgArea";

const CanvasArea = ({curImg,imgList, 
                setImg,delImg} : {  
                    curImg: ImgData | null, imgList: ImgData[],
                            setImg(img: ImgData): void,
                            delImg(img: ImgData): void}) => {

                                

        return (
            <div>
                <div className="ImgNameList">
                    {imgList.map(imgData => <ImgBtn key={imgData.id} {...{img: imgData,setImg,delImg}}/>)}
                </div>
                    {(!!curImg) ? 
                    <ImgArea curImg={curImg}></ImgArea>:
                    <h1>Нет картинки</h1>}
            </div>
        )

}

export default CanvasArea