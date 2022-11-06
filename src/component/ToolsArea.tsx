import { useState } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { ImgActionTypes, ImgStateAction } from "../types/ImgType";
import { filters } from "../types/Filters";
import GroupToolsFilter from "./Tools/GroupToolsFilter";
import GroupToolsSize from "./Tools/GroupToolsSize";

const ToolsPanel = () => {

    //const dispatch = useDispatch()
    const {img: curImg} = useTypedSelector(state => state.imgData)

    return (
        <div className="toolsPanel">
            <div>Инструменты</div>
            <GroupToolsFilter {...{curImg}}/>
            <GroupToolsSize {...{curImg}}/>
        </div>
    )       
}

export default ToolsPanel