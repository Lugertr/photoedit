import { UsedDrawTools } from "../../types/DrawTools"

const BtnToolComp = ({tool, inputFunc}:{
    tool: UsedDrawTools,
    inputFunc: (id: number) => void,}) => {

return (
<div className="toolBtn">
<span>{tool.name}</span>
<button onClick={()=>inputFunc(tool.id)}/>
</div>
)       

}

export default BtnToolComp