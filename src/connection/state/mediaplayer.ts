import { meType } from "../enums";

export interface mpTypeT
{
    type:meType,
    selectIndex:number,
}

export interface mpStrill
{
    index:number,
    path:string,
}
export interface mpBrowser
{
    index:number,
    url:string,
}
export interface mediaT {
    mpTypes:mpTypeT[],
    mpStrills:mpStrill[],
    mpBrowsers:mpBrowser[],
}