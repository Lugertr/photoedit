import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../types/ImgType";

import ToolsOpenBtn from "../UI/ToolsOpenBtn";

import { filters } from "../../types/Filters";
import InputToolComp from "../UI/InputToolComp";
//import ToolBtn from "../ToolMenu";

const GroupToolsFilter = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const rangeChangeFunc = (ref: React.RefObject<HTMLInputElement>, id:number) => {
        if (!!curImg) {
            let regex = new RegExp(`${filters[id].par}\\([\\w|\\W]+?\\)`,'gm'); 
            let newFilter: string | undefined = curImg.style.filter?.replace(regex,
                `${filters[id].par}(${ref.current?.value+filters[id].units})`);
            dispatch({type: ImgActionTypes.CORRECT_IMG, 
                payload:{
                    filter:newFilter}
                })  
            }
        }

    
    const defaultValueSet = (ref: React.RefObject<HTMLInputElement>,id:number) => {
        const regex = new RegExp(`${filters[id].par}\\([\\w|\\W]+?\\)`,'gm'); 
        const currentPar = curImg?.style.filter?.match(regex);
        if (currentPar != null)
            {
                const newValue = currentPar[0].replace(/\D/g, '');
                ref.current!.value = newValue
            }
        else 
            ref.current!.value = filters[id].default.toString();
    }

    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Фильтры</ToolsOpenBtn>
            {(openMenu) ? filters.map((filter) => 
                <InputToolComp key={filter.id} 
                {...{filter, imgId:(!!curImg) ? curImg.id : null,
                        inputFunc:rangeChangeFunc, resFunc: defaultValueSet}}
                />) :undefined}
        </div>
    )       

}

export default GroupToolsFilter
