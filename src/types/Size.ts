import { RangeParInterface } from "./ToolsType";

export const sizes:RangeParInterface[] = [
    {id:0, name:'scaleX',par:'scaleX',
    min:1, max:500, default: 100, units:'%'},

    {id:1, name:'scaleY',par:'scaleY',
    min:1, max:500, default: 100, units:'%'},

    {id:2, name:'rotateX',par:'rotateX',
    min:0, max:360, default: 0, units:'deg'},

    {id:3, name:'rotateY',par:'rotateY',
    min:0, max:360, default: 0, units:'deg'},

    {id:4, name:'skewX',par:'skewX',
    min:0, max:360, default: 0, units:'deg'},

    {id:5, name:'skewY',par:'skewY',
    min:0, max:360, default: 0, units:'deg'},

]

export const DefSizeState = () => sizes.reduce((str, size) => 
            str+=`${size.par}(${size.default+size.units}) `,'')

export const ConvertSizesToString = (ref: React.RefObject<HTMLInputElement>, id: number, imgFilter:string) => {
        const regex = new RegExp(`${sizes[id].par}\\([\\w|\\W]+?\\)`,'gm'); 
        const currentPar = imgFilter.match(regex);
        if (currentPar)
            {  
                const newValue = currentPar[0].replace(/\D/g, '');
                ref.current!.value = newValue
            }
        else 
            ref.current!.value = sizes[id].default.toString();
}