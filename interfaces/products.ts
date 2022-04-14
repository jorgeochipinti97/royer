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
    gender: 'men'|'women'|'kid'|'unisex'|'regionales'|'accesorios';
    createdAt: string;
    updatedAt: string;

}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'Unique';
export type IType = 'shirts'|'t-shirt'|'football shirt'|'jacket'|'pants'|'hoodies'|'hats'|'mate'|'yerba'|'alfajores'|'wine'|'short'|'socks'|'wallet'|'purse';
