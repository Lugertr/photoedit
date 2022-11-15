

interface Props {
    openMenuFunc: React.Dispatch<React.SetStateAction<boolean>>
    status: Boolean,
    children: React.ReactNode
}

const ToolsOpenBtn = (props: Props)=> {
    return (
            <button className="toolsOpenBtn"
                onClick={()=>props.openMenuFunc(!props.status)}>
            {props.children}
            </button>
    )       
}

export default ToolsOpenBtn