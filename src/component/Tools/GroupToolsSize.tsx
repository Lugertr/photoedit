import { useState } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../types/ImgType";

import ToolsOpenBtn from "../UI/ToolsOpenBtn";

import { filters } from "../../types/Filters";
import InputToolComp from "../UI/InputToolComp";

const GroupToolsFilter = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const rangeChangeFunc = () => {

        }

    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Фильтры</ToolsOpenBtn>

        </div>
    )       

}

export default GroupToolsFilter