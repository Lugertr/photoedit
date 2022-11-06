import { useEffect,useRef } from "react";
import { UsedFilters } from "../../types/Filters";

interface Props {
    filter: UsedFilters;
    imgStyle: string | undefined;
    inputFunc: (ref: React.RefObject<HTMLInputElement>, id: number) => void
    resFunc:(ref: React.RefObject<HTMLInputElement>, id: number) => void
    mouseUpEvFunc: ()=>void;
}

const InputToolComp = (props: Props)=> {

    const InputRef = useRef<HTMLInputElement>(null)
    const resetFilterBtn = () => {
        if (InputRef) {
            InputRef.current!.value = props.filter.default.toString();
            props.inputFunc(InputRef,props.filter.id)
        }
        }                               

    useEffect(()=>{
        props.resFunc(InputRef,props.filter.id)},
        [props.imgStyle])   
    
    return (
        <div className="toolBtn">
            <span>{props.filter.name}</span>
            <input ref={InputRef} type="range" 
                onInput={()=>props.inputFunc(InputRef,props.filter.id)}
                onMouseUp={()=>props.mouseUpEvFunc()}
                min={props.filter.min} max={props.filter.max}/>
            <button className="resetFilter" onClick={resetFilterBtn}>RESET</button>
        </div>
    )       
}

export default InputToolComp