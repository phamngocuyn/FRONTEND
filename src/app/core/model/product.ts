export class data{
    id!: number;
    urlBanner!: string;
    category !: string;
    brand !: string;
    name !: string;
    type!: type[];
    layouts!: layouts[];
    groupimage !: groupimage[];
    options !: options[];
    url!: string;
    introduce!: string;
    relatedProducts!: string;
    route!: string;
    statusProduct!: string;
    newproduct!: string;
}


interface groupimage{

}
interface type{
    id: number;
    name: string;
}
interface layouts{
    id: number;
    name: string;
    path: string;
}
interface options{
    layout : layout[];
}
interface layout{
    id: number;
    name: string;
    optioncolor: optioncolor[];
}
interface optioncolor{
    id: number;
    name: string;
    url: string;
    optionswitch: optionswitch[];
}
interface optionswitch{
    id: number;
    name: string;
    price: number;
}
