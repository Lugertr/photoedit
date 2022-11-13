import React, {useState, useRef} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import {  ImgData, ImgActionTypes, ImgStateAction, 
    ImgCssStyles, HistoryElem, ImgCurrentChanges  } from "../../types/ImgType";
import {  DefFiltersState} from "../../types/Filters";
import { DefSizeState } from "../../types/Size";

import CanvasArea from "./ImgAreaComps/CanvasArea"
import DragComp from "./ImgAreaComps/DragComp";
import ImgHistoryTable from "./ImgAreaComps/ImgHistory";

const WorkArea = () => {

    const dispatch = useDispatch()
    const {img: curImg, imgList} = useTypedSelector(state => state.imgState)

    const InputFileRef = useRef<HTMLInputElement>(null);

    function addImgInList(imgs: FileList) {
        let newImgs = [] as ImgData[];
        for (let i = 0; i < imgs.length; i++)
            { 
                if (!imgs[i].type.includes('image') || imgList.find((img)=>img.name==imgs[i].name))
                    continue
                console.log(URL.createObjectURL(imgs[i]))
                const newImg = {id: imgList.length+i,
                                name: imgs[i].name,
                                state: {
                                    style: {filter: DefFiltersState(), transform: DefSizeState()} as ImgCssStyles,
                                    canvasSrc: null,
                                } as ImgCurrentChanges,
                                src:URL.createObjectURL(imgs[i]),
                                history:[] as HistoryElem[]}
                newImgs.push(newImg)
            }
        if (!newImgs.length)
            return
        dispatch({type: ImgActionTypes.ADD_IMG, payload: [...newImgs]} as ImgStateAction)
        dispatch({type: ImgActionTypes.SET_IMG, payload: newImgs[0]} as ImgStateAction)
    }

    function setImg(img: ImgData) {
        dispatch({type: ImgActionTypes.SET_IMG, payload: img} as ImgStateAction)
    }

    function delImg(img: ImgData) {
        dispatch({type: ImgActionTypes.REMOVE_IMG, payload: img} as ImgStateAction)
    }

const inputLoadFunc = () => {
    if (!!InputFileRef.current!.files) 
        addImgInList(InputFileRef.current!.files)
}

const saveImg = () => {
    console.log(curImg)
}


return (
    <div className="imgArea">

        {(imgList.length)? <CanvasArea {...{curImg,imgList,
                                        setImg,delImg}}></CanvasArea>:
        <DragComp {...{addImgInList}}></DragComp>}
        
        <input type="file" ref={InputFileRef}  accept='image/*' onChange={inputLoadFunc} className="inputImg" hidden></input>
        <div className="imgBtnArea">
            <button className='imgAreaBtn add' onClick={()=>InputFileRef.current?.click()}>Загрузить</button>
            <button className='imgAreaBtn save' onClick={saveImg}>Сохранить</button>
        
        </div>
        
        {(curImg)? <ImgHistoryTable img={curImg}/>:undefined}
    </div>
)

}

export default WorkArea