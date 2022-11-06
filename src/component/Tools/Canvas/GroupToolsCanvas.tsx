import { useState } from "react";

import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../../types/ImgType";
import { ToolActionTypes, ToolPar } from "../../../types/ToolsType";

import ToolsOpenBtn from "../../UI/ToolsOpenBtn";

import { drawTools } from "../../../types/DrawTools"
import BtnToolComp from "../../UI/BtnToolComp";
import CanvasColorPanel from "./CanvasColorPanel";

const GroupToolsCanvas = () => {

    const dispatch = useDispatch();
    
    const [openMenu, setOpenMenu] = useState(false)

    const changeToolFunc = (id: number) => {
        dispatch({type: ToolActionTypes.CHANGE_TOOL, payload: drawTools[id].name})
    }

    const changeParFunc = (par: ToolPar) => {
        dispatch({type: ToolActionTypes.CHANGE_TOOL_PAR, payload: par})
    }

    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Карандаш</ToolsOpenBtn>
            {(openMenu)? <CanvasColorPanel {...{changeParFunc}} />: undefined}
            {(openMenu) ? drawTools.map((tool) => 
                <BtnToolComp key={tool.id} {...{tool,inputFunc: changeToolFunc}}/>) 
                :undefined}
        </div>
    )       

}

export default GroupToolsCanvas