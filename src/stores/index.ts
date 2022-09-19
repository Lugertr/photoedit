import { combineReducers } from "@reduxjs/toolkit";
import {configureStore } from "@reduxjs/toolkit";

import {imgListReducer} from "./imgListReducer";
import {CurrentImgReducer} from "./CurrentImgReducer";

const rootReducer = combineReducers({
    curImg: CurrentImgReducer,
    imgData: imgListReducer,
})

export const store = configureStore({
    reducer:rootReducer,  
})

export type RootState = ReturnType<typeof rootReducer>