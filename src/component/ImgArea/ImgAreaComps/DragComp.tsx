import { useState } from "react";

const DragComp = ({addImgInList} : {addImgInList:(Imgs: FileList) => void}) => {

    const [drag, setDrag] = useState(false)

    const dragHandler = (e:React.DragEvent<HTMLDivElement>,status: boolean = true) => {
        e.preventDefault();
        setDrag(status)
    }

    const onDropHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        addImgInList(e.dataTransfer.files)
    }

    if (drag) 
        return (<div className="dropArea Open"
        onDragStart={(e) => dragHandler(e) }
        onDragLeave={(e) => dragHandler(e,false) }
        onDragOver={(e) => dragHandler(e)}
        onDrop={(e)=> onDropHandler(e)}
        >"Перенесите файлы в эту область"</div>)
    
    return (<div className="dropArea"
    onDragStart={(e) => dragHandler(e) }
    onDragLeave={(e) => dragHandler(e,false) }
    onDragOver={(e) => dragHandler(e) }
    >"Перетащите мышкой файлы"</div>)
    
}

export default DragComp