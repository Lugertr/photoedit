import { useEffect,useRef } from "react";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ToolPar } from "../../../types/ToolsType"
import InputToolComp from "../../UI/InputToolComp";

const CanvasColorPanel = ({changeParFunc}: {changeParFunc:(par: ToolPar)=> void}) => {

        const {par} = useTypedSelector(state => state.toolState)
        const InputRef = useRef<HTMLInputElement>(null)

        const setWidth = (numb:number) => {
            const newPar = {...par, width: numb}
            changeParFunc(newPar)
        } 

        const setColor = (color:string)=> {
            const newPar = {...par, color: color}
            changeParFunc(newPar)
        }

        const setLineColor = (color:string)=> {
            const newPar = {...par, lineColor: color}
            changeParFunc(newPar)
        }

        

    return (
        <div className="groupTools borders" >
            <div className="lineWidth">
                <span>Тощина линии</span>
                <input type="range" ref={InputRef} onInput={(e)=>setWidth(+InputRef.current!.value)} min={1} max={100}></input>
                <button className="resetBtn" onClick={()=>setWidth(10)}>Reset</button>
            </div>
            <span>Цвет фона</span>
            <input className="inputColor" onChange={e=>setColor(e.target.value)} type="color"></input>
            <span>Цвет границы/линии</span>
            <input className="inputColor" onChange={e=>setLineColor(e.target.value)} type="color"></input>
        </div>
    )       

}

export default CanvasColorPanel