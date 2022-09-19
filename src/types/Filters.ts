
export interface UsedFilters {
    id: number;
    name: string;
    par: string;
    min: number;
    max:number;
    default: number;
    units: string;
}

export const filters: UsedFilters[] = [
    {id:1, name:'grayscale',par:'grayscale',
    min:0, max:100, default: 0, units:'%'},

    {id:2, name:'sepia',par:'sepia',
    min:0, max:100, default: 0, units:'%'},

    {id:3, name:'saturate',par:'saturate',
    min:0, max:200, default: 100, units:'%'},

    {id:4, name:'hue-rotate',par:'hue-rotate',
    min:0, max:360, default: 0, units:'deg'},

    {id:5, name:'invert',par:'invert',
    min:0, max:100, default: 0, units:'%'},

    {id:6, name:'opacity',par:'opacity',
    min:0, max:100, default: 100, units:'%'},

    {id:7, name:'brightness',par:'brightness',
    min:0, max:400, default: 100, units:'%'},

    {id:8, name:'contrast',par:'contrast',
    min:0, max:200, default: 100, units:'%'},

]

export const DefFiltersState = () => filters.reduce((str, filter) => 
            str+=`${filter.par}(${filter.default+filter.units}) `,'')