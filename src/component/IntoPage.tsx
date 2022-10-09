import React, {useState, useRef} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";

import {  ImgCssStyles, ImgData, ImgActionTypes, ImgStateAction  } from "../types/ImgType";
import {  DefFiltersState} from "../types/Filters";

import ImgBtn from "./UI/ImgBtn";
import DragComp from "./DragComp";

const IntroPage = () => {

    const dispatch = useDispatch()
    const {img: curImg, imgList} = useTypedSelector(state => state.imgData)

    const InputFileRef = useRef<HTMLInputElement>(null);

    function addImgInList(imgs: FileList) {
        let newImgs = [] as ImgData[];
        for (let i = 0; i < imgs.length; i++)
            { 
                if (!imgs[i].type.includes('image') || imgList.find((img)=>img.name==imgs[i].name))
                    continue
                const newImg = {id: imgList.length+i,
                                name: imgs[i].name,
                                style: {content:'',
                                filter: DefFiltersState()} as ImgCssStyles,
                                src:URL.createObjectURL(imgs[i]),
                                history:[] as string[]}
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
        {(!!imgList.length)? 
            <div className="ImgNameList">
                {imgList.map(imgData => <ImgBtn key={imgData.id} {...{img: imgData,setImg,delImg}}/>)}
            </div>: undefined}
        <DragComp {...{curImg,addImgInList}}></DragComp>
        <input type="file" ref={InputFileRef}  accept='image/*' onChange={inputLoadFunc} className="inputImg" hidden></input>
        <div className="imgBtnArea">
            <button className='imgAreaBtn add' onClick={()=>InputFileRef.current?.click()}>Загрузить</button>
            <button className='imgAreaBtn save' onClick={saveImg}>Сохранить</button>
        </div>
    </div>
)

}

export default IntroPage