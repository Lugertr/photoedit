import { useState } from "react";
import { useDispatch } from "react-redux";
import ToolBtn from "./ToolMenu";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { ImgActionTypes, ImgStateAction } from "../types/ImgType";
import { filters } from "../types/Filters";
import GroupToolsFilter from "./Tools/GroupToolsFilter";

const ToolsPanel = () => {

    //const dispatch = useDispatch()
    const {img: curImg} = useTypedSelector(state => state.imgData)

    return (
        <div className="toolsPanel">
            <div>Инструменты</div>
             <GroupToolsFilter {...{curImg}}/>
             <GroupToolsFilter {...{curImg}}/>
        </div>
    )       
}

export default ToolsPanel