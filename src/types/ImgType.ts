export interface ImgCssStyles{
    content: string,
    filter?: string,
}

export interface ImgData {
    id: number,
    name: string,
    style: ImgCssStyles,
    src: string,
    history: string[],
}

export interface ImgState {
  //  img: File | null | undefined;
    img: ImgData | null;
    //imgList: Array<File | null>
    imgList: Array<ImgData>
    error: string | null | undefined;
} 

export enum ImgActionTypes {
    ADD_IMG = "ADD_IMG",
    SET_IMG = "SET_IMG",
    REMOVE_IMG = "REMOVE_IMG",
    CORRECT_IMG = "CORRECT_IMG",
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

interface ImgStateCorrectImgAction {
    type:ImgActionTypes.CORRECT_IMG;
    payload: ImgCssStyles}

export type ImgStateAction = ImgStateAddAction | ImgStateGetAction 
                            | ImgStateRemoveAction | ImgStateCorrectImgAction
