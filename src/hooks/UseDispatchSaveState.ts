import { useDispatch } from "react-redux";
import { ImgActionTypes } from "../types/ImgType";

import { ImgCssStyles, HistoryElem, ImgCurrentChanges } from "../types/ImgType";


export function useSaveState(imgCss:ImgCssStyles, canvasStateUrl: string) {
    const dispatch = useDispatch()
    dispatch({type: ImgActionTypes.ADD_IN_IMG_HISTORY, 
        payload: {type:"brush", 
        status: {style: {...imgCss},
                canvasSrc: canvasStateUrl}} as HistoryElem})
    
    dispatch({type: ImgActionTypes.SET_IMG_CHANGES, 
            payload:{
                canvasSrc: canvasStateUrl,
                style:{...imgCss}} as ImgCurrentChanges
    })
}