import { useTypedSelector } from "../hooks/useTypedSelector";


import GroupToolsFilter from "./Tools/GroupToolsFilter";
import GroupToolsCanvas from "./Tools/Canvas/GroupToolsCanvas";
import GroupToolsSize from "./Tools/GroupToolsSize";

const ToolsPanel = () => {

    //const dispatch = useDispatch()
    const {img: curImg} = useTypedSelector(state => state.imgState)

    return (
        <div className="toolsPanel">
            <div className="toolTitle">Инструменты</div>
            <GroupToolsFilter {...{curImg}}/>
            <GroupToolsSize {...{curImg}}/>
            <GroupToolsCanvas/>
        </div>
    )       
}

export default ToolsPanel