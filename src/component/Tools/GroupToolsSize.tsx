import { useState } from "react";
import { useDispatch } from "react-redux";

import { ImgData, ImgStateAction,ImgActionTypes } from "../../types/ImgType";

import ToolsOpenBtn from "../UI/ToolsOpenBtn";

import { drawTools } from "../../types/DrawTools"
import BtnToolComp from "../UI/BtnToolComp";
import InputToolComp from "../UI/InputToolComp";

const GroupToolsSize = ({curImg}:{curImg: ImgData | null}) => {

    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)

    const [color, setColor] = useState('black')
    const [borderColor, setBorderColor] = useState('black')
    const [lineWidth, setLineWidth] = useState(1)

    const toolAction = (id: number) => {
            //dispatch({type: ImgActionTypes.CHANGE_IMG_STYLE, 
            //    payload:[{name:'brush', value: 'a', history: null}]})
        }


    return (
        <div className="groupTools" >
            <ToolsOpenBtn {...{status:openMenu,openMenuFunc:setOpenMenu}}>Карандаш</ToolsOpenBtn>
            <input onChange={e=>setColor(e.target.value)} type="color"></input>
            {(openMenu) ? drawTools.map((tool) => 
                <BtnToolComp key={tool.id} {...{tool,inputFunc: toolAction}}/>) 
                :undefined}
        </div>
    )       

}

export default GroupToolsSize