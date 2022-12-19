export interface ITallas{
    size:ISize,
    stock:number
}


export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    personalization?:string
    talles?: ITallas[]
    gender: 'men' | 'women' | 'kid' | 'unisex' | 'regionales' | 'fashion';
    popular: boolean;
    destacados: boolean;
    createdAt: string;
    updatedAt: string;

}

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'Unique' | '7.5' | '8' | '8.5' | '9' | '9.5' | '10' | '10.5' | '11' | '11.5' | '12' | '12.5' | '13' | '14' | '15';
export type IType = 'shirts' | 't-shirt' | 'football shirt' | 'jacket' | 'pants' | 'hoodies' | 'hats' | 'mate' | 'yerba' | 'alfajores' | 'wine' | 'short' | 'socks' | 'wallet' | 'purse' | 'accessories' | 'bag' | 'espadrilles' | 'footwear';
