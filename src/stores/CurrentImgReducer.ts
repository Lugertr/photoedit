
interface ImgState {
    img: null | File;
    error: null | string;
} 

const defaultState: ImgState = {
    img: null,
    error: null
}

const ADD_IMG = "ADD_IMG"
const GET_IMG = "GET_IMG"
const REMOVE_IMG = "REMOVE_IMG"


export const CurrentImgReducer = (state: ImgState = defaultState, action: string) => {
    switch (action) {
        case ADD_IMG:
            return 
        case GET_IMG:
            return
        case REMOVE_IMG:
            return   
        //return [...state]
        default:
            return state
    }
}

export const addImgAction = (payload:string) => ({type: ADD_IMG, payload})
export const getImgAction = (payload:string) => ({type: GET_IMG, payload})
export const removeImgAction = (payload:string) => ({type: REMOVE_IMG, payload})