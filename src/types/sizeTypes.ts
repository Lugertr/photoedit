
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
    {id:10, name:'Оттенки серого',par:'grayscale',
    min:0, max:100, default: 0, units:'%'},



]

export const DefFiltersState = () => filters.reduce((str, filter) => 
            str+=`${filter.par}(${filter.default+filter.units}) `,'')