import { useRef,  useEffect } from "react";
import { UsedFilters } from "../types/Filters";

const ToolBtn = ({filter, rangeChangeFunc,def,imgChange}:{
    filter: UsedFilters,
    rangeChangeFunc: (name: string, par: string, rangeRef: React.RefObject<HTMLInputElement>) => void,
    def: string | undefined,imgChange: number | null}) =>
    {
    const rangeRef = useRef<HTMLInputElement>(null);

    const resetFilterBtn = () => {
        rangeRef.current!.value = filter.default.toString();
        rangeChangeFunc(filter.par,filter.units,rangeRef)
    }

    const defaultValueSet = () => {
        const regex = new RegExp(`${filter.par}\\([\\w|\\W]+?\\)`,'gm'); 
        const currentPar = def?.match(regex);
        if (currentPar != null)
            {
                const newValue = currentPar[0].replace(/\D/g, '');
                rangeRef.current!.value = newValue
            }
        else 
            rangeRef.current!.value = filter.default.toString();
    }

    useEffect(()=>{
        defaultValueSet()
    },[imgChange])

    return (
        <div className="toolBtn">
            <span>{filter.name}</span>
            <input ref={rangeRef} type="range" onInput={()=>rangeChangeFunc(filter.par,filter.units,rangeRef)} 
             min={filter.min} max={filter.max}/>
            <button className="resetFilter" onClick={resetFilterBtn}>RESET</button>
        </div>
    )       

}

export default ToolBtn