import { useState } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../types/ImgType";

import { filters } from "../../types/Filters";
import ToolBtn from "../UI/ToolMenu";

const GroupToolsFilter = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const rangeChangeFunc = (par:string,unit:string,rangeRef:React.RefObject<HTMLInputElement>) => {
        if (!!curImg) {
            let regex = new RegExp(`${par}\\([\\w|\\W]+?\\)`,'gm'); 
            let newFilter: string | undefined = curImg.style.filter?.replace(regex,
                `${par}(${rangeRef.current?.value+unit})`);
            dispatch({type: ImgActionTypes.CORRECT_IMG, 
                payload:{
                    filter:newFilter}
                })
            }
        }

    return (
        <div className="groupTools" >
            <button className="toolsOpenBtn"onClick={()=>setOpenMenu(!openMenu)}>Фильтры</button>
            {(openMenu) ? filters.map(filter => 
                <ToolBtn key={filter.id} {...{filter,rangeChangeFunc,
                def: curImg?.style.filter, imgChange: (!!curImg) ? curImg.id : null}}/>)
            : undefined}
        </div>
    )       

}

export default GroupToolsFilter