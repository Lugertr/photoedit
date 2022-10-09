

interface Props {
    openMenuFunc: React.Dispatch<React.SetStateAction<boolean>>
    status: Boolean,
    children: React.ReactNode
}

const ToolsOpenBtn = (props: Props)=> {
    return (
        <div className="toolBtn">
            <button className="toolsOpenBtn"
                onClick={()=>props.openMenuFunc(!props.status)}>
            {props.children}
            </button>
        </div>
    )       
}

export default ToolsOpenBtn