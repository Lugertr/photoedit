import { WheelEvent } from "react";
import { useDispatch } from "react-redux";

import { ImgData, HistoryElem, ImgActionTypes, ImgCurrentChanges} from "../../../types/ImgType";


const ImgHistoryTable = ({img} : {  
                    img: ImgData | null,}) => {
        
        const dispatch = useDispatch()
        
        function chooseState(action: HistoryElem) {
            console.log(action)
            if (img) 
                dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
                    payload:{...action.status} as ImgCurrentChanges})
        }

const removeActions = (id: number) => {
    //РЕАЛИЗОВАТЬ ПОМЕТКУ ДЛЯ ВСЕХ ДЕЙСТВИЙ ЧТО ВЫШЕ
    //УДЕРЖИВАТЬ 3 СЕКУНДЫ ЧТОБЫ УДАЛИТЬ
}



        return (
            <div className="historyArea" >
                <span>История</span>
                <div className="history">
                    {(img && img.history.length) ? 
                    img.history.map((action,ind) =>
                    <button onClick={()=>chooseState(action)} key={ind}>{action.type}</button>):
                    undefined}
                </div>

            </div>
        )

}

export default ImgHistoryTable