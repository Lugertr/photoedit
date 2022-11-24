import { useState } from "react";
import { useDispatch } from "react-redux";

import { ImgData,ImgActionTypes,HistoryElem, ImgCurrentChanges} from "../../types/ImgType";

import ToolsOpenBtn from "../UI/ToolsOpenBtn";

import { sizes, ConvertSizesToString } from "../../types/Size";
import InputToolComp from "../UI/InputToolComp";

const GroupToolsSize = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const rangeChangeFunc = (ref: React.RefObject<HTMLInputElement>, id:number) => {
        if (!!curImg) {
            let regex = new RegExp(`${sizes[id].par}\\([\\w|\\W]+?\\)`,'gm'); 
            let newSize: string | undefined = curImg.state.style.transform?.replace(regex,
                `${sizes[id].par}(${ref.current?.value+sizes[id].units})`);
            dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
                payload:{
                    canvasSrc: curImg.state.canvasSrc,
                    style:{...curImg.state.style, transform:newSize}} as ImgCurrentChanges
                })  
            }
        }

    
    const defaultValueSet = (ref: React.RefObject<HTMLInputElement>,id:number) => {
        if (curImg && curImg.state.style.transform) {
            ConvertSizesToString(ref, id, curImg.state.style.transform)
        }
    }

    const saveHistory = ()=>{
        if (!!curImg) {
            dispatch({type: ImgActionTypes.ADD_IN_IMG_HISTORY, 
                payload:{type: "size", status: {...curImg.state}} as HistoryElem})
        }
    } 

    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Размеры</ToolsOpenBtn>
            {(openMenu) ? sizes.map((size) => 
                <InputToolComp key={size.id} 
                {...{rangePar: size, CurPar: (curImg) ? curImg!.state.style.transform: undefined,
                        inputFunc:rangeChangeFunc, resFunc: defaultValueSet,
                        mouseUpEvFunc:saveHistory}}
                />) :undefined}
        </div>
    )       

}

export default GroupToolsSize
