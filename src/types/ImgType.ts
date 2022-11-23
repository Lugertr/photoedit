export interface ImgCssStyles{
    filter: string,
    transform: string,
    
}

export interface ImgCurrentChanges {
    style: ImgCssStyles,
    canvasSrc: string | null,
}

export interface HistoryElem  {
    type: string,
    status: ImgCurrentChanges
}

export interface SizePar {
    x: number,
    y: number,
    scale: number,
}


export interface ImgData {
    id: number,
    name: string,
    state: ImgCurrentChanges,
    size: SizePar,
    src: string,
    history: HistoryElem[],
}

export interface ImgState {
    img: ImgData | null;
    imgList: Array<ImgData>
    error: string | null | undefined;
} 

export enum ImgActionTypes {
    ADD_IMG = "ADD_IMG",
    SET_IMG = "SET_IMG",
    REMOVE_IMG = "REMOVE_IMG",
    SET_IMG_CHANGES = "SET_IMG_CHANGES",
    SET_IMG_SIZE = "SET_IMG_SIZE",
    ADD_IN_IMG_HISTORY = "ADD_IN_IMG_HISTORY"
}

interface ImgStateAddAction { 
    type:ImgActionTypes.ADD_IMG;
    payload: Array<ImgData>}

interface ImgStateGetAction {
    type:ImgActionTypes.SET_IMG;
    payload: ImgData}

interface ImgStateRemoveAction {
    type:ImgActionTypes.REMOVE_IMG;
    payload: ImgData}

interface ImgStateSetChangesAction {
    type:ImgActionTypes.SET_IMG_CHANGES;
    payload: ImgCurrentChanges}

interface ImgStateSetIMGAction {
    type:ImgActionTypes.SET_IMG_SIZE;
    payload: SizePar}

interface ImgStateAddInImgHistory {
        type:ImgActionTypes.ADD_IN_IMG_HISTORY;
        payload: HistoryElem}


export type ImgStateAction = ImgStateAddAction | ImgStateGetAction 
                            | ImgStateRemoveAction | ImgStateSetChangesAction
                            | ImgStateAddInImgHistory | ImgStateSetIMGAction
