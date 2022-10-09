const BtnToolComp = ({name, inputFunc, resFunc}:{
    name:string,
    ref: React.RefObject<HTMLInputElement>,
    max: string,
    min: string,
    inputFunc: () => void,
    resFunc:() => void}) => {

return (
<div className="toolBtn">
<span>{name}</span>
<button onInput={inputFunc}/>
<button className="resetFilter" onClick={resFunc}>RESET</button>
</div>
)       

}

export default BtnToolComp