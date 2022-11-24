import { useEffect,useRef } from "react";
import {InputRangePar} from "../../types/ToolsType"

interface Props {
    rangePar: InputRangePar ;
    CurPar: string | undefined;
    inputFunc: (ref: React.RefObject<HTMLInputElement>, id: number) => void
    resFunc:(ref: React.RefObject<HTMLInputElement>, id: number) => void
    mouseUpEvFunc: (typeName: string)=>void | null;
}

const InputToolComp = (props: Props)=> {

    const InputRef = useRef<HTMLInputElement>(null)
    const resetBtn = () => {
        if (InputRef) {
            InputRef.current!.value = props.rangePar.default.toString();
            props.inputFunc(InputRef,props.rangePar.id)
        }
        }                               

    useEffect(()=>{
        props.resFunc(InputRef,props.rangePar.id)},
        [props.CurPar])   
    
    return (
        <div className="toolBtn">
            <span>{`${props.rangePar.name}: ${InputRef.current!.value}`}</span>
            <input ref={InputRef} type="range" 
                onInput={()=>props.inputFunc(InputRef,props.rangePar.id)}
                onMouseUp={()=>props.mouseUpEvFunc(props.rangePar.name)}
                min={props.rangePar.min} max={props.rangePar.max}/>
            <button className="resetBtn" onClick={resetBtn}>RESET</button>
        </div>
    )       
}

export default InputToolComp