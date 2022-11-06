export interface ToolPar {
    width: number,
    color: string,
    lineColor: string
}

export interface ToolState {
    tool: string | null,
    par:ToolPar,

}

export enum ToolActionTypes {
    CHANGE_TOOL = "CHANGE_TOOL",
    CHANGE_TOOL_PAR = "CHANGE_TOOL_PAR"
}

interface ToolStateSetAction { 
    type:ToolActionTypes.CHANGE_TOOL;
    payload: string | null}

interface ToolStateChangeParAction {
    type: ToolActionTypes.CHANGE_TOOL_PAR;
    payload: ToolPar}



export type ToolStateAction = ToolStateSetAction | ToolStateChangeParAction 


export interface InputRangePar {
    id: number;
    name: string;
    min: number;
    max:number;
    default: number;
}

export interface FilterRangePar extends InputRangePar {
    par: string;
    units: string;
}