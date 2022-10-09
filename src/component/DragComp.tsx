import { useState } from "react";
import { ImgData } from "../types/ImgType";

const DragComp = ({curImg,addImgInList} : {
                                        curImg: ImgData | null,
                                        addImgInList:(Imgs: FileList) => void}) => {

    const [drag, setDrag] = useState(false)
    //const [imgComp, setImgComp] = useState(null as null | File)

    const dragHandler = (e:React.DragEvent<HTMLDivElement>,status: boolean = true) => {
        e.preventDefault();
        setDrag(status)
    }

    const onDropHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e.dataTransfer.files)
        addImgInList(e.dataTransfer.files)
        //setImgComp(imgData[0]);

    }

    if (!!curImg) {
        return (
           <img className="img" style={curImg.style} src={curImg.src} alt='картинки нет'></img>
        )
    }

    return ( 
// //{(!!curImg) ? <img className="img" style={curImg.style} 
//src={curImg.src} alt='картинки нет'></img>:
//undefined
//}
        <div>
    
            {(drag) ? 
                <div className="dropArea Open"
                onDragStart={(e) => dragHandler(e) }
                onDragLeave={(e) => dragHandler(e,false) }
                onDragOver={(e) => dragHandler(e)}
                onDrop={(e)=> onDropHandler(e)}
                >"Перенесите файлы в эту область"</div>
                :
                <div className="dropArea"
                onDragStart={(e) => dragHandler(e) }
                onDragLeave={(e) => dragHandler(e,false) }
                onDragOver={(e) => dragHandler(e) }
                >"Перетащите мышкой файлы"</div>
            }
        </div>
    )       

}

export default DragComp