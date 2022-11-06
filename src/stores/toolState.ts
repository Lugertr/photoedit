import { ToolState, ToolActionTypes, ToolStateAction, } from "../types/ToolsType";

const defaultState: ToolState = {
    tool: null,
    par: {
        width: 10,
        color: "black",
        lineColor: "black"
    }
}


export const ToolStateReducer = (state: ToolState = defaultState, 
                                action: ToolStateAction):  ToolState => {
    switch (action.type) {
        case ToolActionTypes.CHANGE_TOOL:
            return {...state, tool: action.payload}

        case ToolActionTypes.CHANGE_TOOL_PAR:
            return {...state, par: action.payload}
 
        default:
            return state
    }
}
