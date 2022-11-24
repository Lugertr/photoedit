import { ImgData } from "../../types/ImgType";

const ImgBtn = ({img,setImg, delImg}:{img:ImgData,
                                    setImg: (img: ImgData) => void,
                                    delImg:(img: ImgData) => void}) => {
    
    function delImgHandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        delImg(img);
    }

    return (
        <div className="ImgBtn" onClick={()=> setImg(img)}>
            <span>{img.name}</span>
            <button className="delBtn" onClick={delImgHandler}>X</button>
        </div>
    )       

}

export default ImgBtn