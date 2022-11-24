import { useRef, } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import {  ImgData, ImgActionTypes, ImgStateAction, SizePar,
    ImgCssStyles, HistoryElem, ImgCurrentChanges  } from "../../types/ImgType";
import {  DefFiltersState} from "../../types/Filters";
import { DefSizeState } from "../../types/Size";

import CanvasArea from "./ImgAreaComps/CanvasArea"
import DragComp from "./ImgAreaComps/DragComp";

import ImgBtn from "../UI/ImgBtn";
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
                                size: {x:0,y:0,scale:1} as SizePar,
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
    if (!curImg)
        return
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = curImg.src;
    image.onload = () =>{
        canvas.width = image.width;
        canvas.height = image.height;
        ctx!.filter = curImg.state.style.filter;

        const reSizePar = curImg.state.style.transform.split(' ').map((mes)=>mes.match(/-?\d+(\.\d+)?/g))

        if (reSizePar[0] && reSizePar[1] && reSizePar[2] && reSizePar[3] && reSizePar[4]) {
            ctx!.transform(+reSizePar[0]/100,+reSizePar[3],+reSizePar[4],+reSizePar[1]/100,(canvas.width+(+reSizePar[0]/100))/2,(canvas.height+(+reSizePar[1]/100))/2)
            ctx!.rotate((+reSizePar[2]) * Math.PI / 180)
        }
        else {
            ctx!.translate(canvas.width/2,canvas.height/2)
        }
        ctx!.drawImage(image,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
        const canvasImgSrc = curImg.history[curImg.history.length-1]?.status.canvasSrc;
        if (canvasImgSrc) {
            const canvasImg = new Image();
            canvasImg.src = canvasImgSrc;
            canvasImg.onload = () => {
                ctx!.drawImage(canvasImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
                createDownloadLink(curImg.name, canvas.toDataURL())
            }
        }
        else
            createDownloadLink(curImg.name, canvas.toDataURL())    
    }
}

function createDownloadLink(name:string, href: string) {
    const link = document.createElement('a')
    link.download = name;
    link.href = href;
    link.click()
}


return (
    <div className="workArea">
        <div className="imgBtnArea">
            <button className='imgAreaBtn' onClick={()=>InputFileRef.current?.click()}>Загрузить</button>
            <button className='imgAreaBtn' onClick={saveImg}>Сохранить</button>
        </div>
        <div className="ImgNameList">
                    {imgList.map(imgData => <ImgBtn key={imgData.id} {...{img: imgData,setImg,delImg}}/>)}
        </div>
        {(curImg)? <ImgHistoryTable img={curImg}/>:undefined}
        {(imgList.length)? <CanvasArea {...{curImg,imgList,
                                        setImg,delImg}}></CanvasArea>:
        <DragComp {...{addImgInList}}></DragComp>}
        
        <input type="file" ref={InputFileRef}  accept='image/*' onChange={inputLoadFunc} className="inputImg" hidden></input>
        
    </div>
)

}

export default WorkArea