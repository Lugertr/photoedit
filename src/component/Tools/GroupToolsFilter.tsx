import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes,HistoryElem, ImgCurrentChanges} from "../../types/ImgType";

import ToolsOpenBtn from "../UI/ToolsOpenBtn";

import { filters, ConvertFiltersToString } from "../../types/Filters";
import InputToolComp from "../UI/InputToolComp";
//import ToolBtn from "../ToolMenu";

const GroupToolsFilter = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const rangeChangeFunc = (ref: React.RefObject<HTMLInputElement>, id:number) => {
        if (!!curImg) {
            let regex = new RegExp(`${filters[id].par}\\([\\w|\\W]+?\\)`,'gm'); 
            let newFilter: string | undefined = curImg.state.style.filter?.replace(regex,
                `${filters[id].par}(${ref.current?.value+filters[id].units})`);
            dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
                payload:{
                    canvasSrc: curImg.state.canvasSrc,
                    style:{...curImg.state.style, filter:newFilter}} as ImgCurrentChanges
                })  
            }
        }

    
    const defaultValueSet = (ref: React.RefObject<HTMLInputElement>,id:number) => {
        if (curImg && curImg.state.style.filter) {
            ConvertFiltersToString(ref, id, curImg.state.style.filter)
        }
    }

    const saveHistory = ()=>{
        if (!!curImg) {
            dispatch({type: ImgActionTypes.ADD_IN_IMG_HISTORY, 
                payload:{type: "filter", status: {...curImg.state}} as HistoryElem})
        }
    } 

    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Фильтры</ToolsOpenBtn>
            {(openMenu) ? filters.map((filter) => 
                <InputToolComp key={filter.id} 
                {...{rangePar: filter, CurPar: (curImg) ? curImg!.state.style.filter: undefined,
                        inputFunc:rangeChangeFunc, resFunc: defaultValueSet,
                        mouseUpEvFunc:saveHistory}}
                />) :undefined}
        </div>
    )       

}

export default GroupToolsFilter
