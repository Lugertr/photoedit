import { combineReducers } from "@reduxjs/toolkit";
import {configureStore } from "@reduxjs/toolkit";

import {imgStateReducer} from "./imgListReducer";
import { ToolStateReducer } from "./toolState";

const rootReducer = combineReducers({
    imgState: imgStateReducer,
    toolState:ToolStateReducer,
})

export const store = configureStore({
    reducer:rootReducer,  
})

export type RootState = ReturnType<typeof rootReducer>