import { useState } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { ImgActionTypes, ImgStateAction } from "../types/ImgType";
import { filters } from "../types/Filters";

import GroupToolsFilter from "./Tools/GroupToolsFilter";
import GroupToolsCanvas from "./Tools/Canvas/GroupToolsCanvas";
import GroupToolsSize from "./Tools/GroupToolsSize";

const ToolsPanel = () => {

    //const dispatch = useDispatch()
    const {img: curImg} = useTypedSelector(state => state.imgState)

    return (
        <div className="toolsPanel">
            <div>Инструменты</div>
            <GroupToolsFilter {...{curImg}}/>
            <GroupToolsCanvas/>
        </div>
    )       
}

export default ToolsPanel