export interface SpecificService {
    id:number
    name:string
    description:string,
    slug:string,
    firstPrice:number,
    pricePerMeter:number,
    available:boolean,
    offer:boolean
}

export interface SpecificServiceName {
    id:number, 
    name:string
}