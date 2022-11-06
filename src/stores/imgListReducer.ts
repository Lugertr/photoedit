import { ImgData, ImgState, ImgStateAction, ImgActionTypes, ImgCssStyles } from "../types/ImgType"

const defaultState: ImgState = {
    img: null,
    imgList: [],
    error: null
}

function setImg(imgList: ImgData[],payload: ImgData): ImgData | null {
    const NewSetedImg = imgList.find(img => img == payload);
    return NewSetedImg || null
}

function removeImg(state:ImgState,payload: ImgData):ImgState {
    console.log(state.imgList)
    let newImgList = state.imgList.reduce((filtrArr: ImgData[],CurImg) => {
        if (CurImg != payload)
        { 
            filtrArr.push({...CurImg, 
                id: (CurImg.id > payload.id) ? CurImg.id-1: CurImg.id})
        }
        return filtrArr
    },[])

    if (!newImgList.length)
        return {...state,imgList: newImgList, img: null}
    
    else if (payload!==state.img)
        return {...state,imgList: newImgList}

    let curImgId = payload.id;
    while (curImgId>=newImgList.length) {
        curImgId--;
    }
    return {...state,img: newImgList[curImgId], imgList: newImgList}
}

function changeImgInImgList(modImg: ImgData,arr: ImgData[]) {
    return arr.map((img)=> (img.id == modImg.id)? modImg: img)
}

export const imgListReducer = (state: ImgState = defaultState, 
                                action: ImgStateAction): ImgState => {
    switch (action.type) {
        case ImgActionTypes.ADD_IMG:
            return {...state, imgList: [...state.imgList, ...action.payload]}

        case ImgActionTypes.SET_IMG:
            return {...state, img: setImg(state.imgList,action.payload)}

        case ImgActionTypes.REMOVE_IMG:
            return removeImg(state,action.payload)

        case ImgActionTypes.SET_IMG_CHANGES:
            let modifedImg = {...state.img, state: action.payload,} as ImgData;
            return {...state, img: modifedImg,
                imgList: changeImgInImgList(modifedImg, state.imgList) }
        
        case ImgActionTypes.ADD_IN_IMG_HISTORY:
                if (state.img) {
                    const newHistory = [...state.img.history, action.payload]
                    const newImg = {...state.img, history: newHistory};
                    return {...state, img: newImg, imgList: changeImgInImgList(newImg, state.imgList)}
                }
                return state    
        default:
            return state
    }
}
