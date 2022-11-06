import { combineReducers } from "@reduxjs/toolkit";
import {configureStore } from "@reduxjs/toolkit";

import {imgListReducer} from "./imgListReducer";

const rootReducer = combineReducers({
    imgData: imgListReducer,
})

export const store = configureStore({
    reducer:rootReducer,  
})

export type RootState = ReturnType<typeof rootReducer>