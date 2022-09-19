import { useState } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../types/ImgType";

import { filters } from "../../types/Filters";
import ToolBtn from "../UI/ToolMenu";

const GroupToolsFilter = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();

    const rangeChangeFunc = () => {

        }

    return (
        <div className="groupTools" >
        
        </div>
    )       

}

export default GroupToolsFilter