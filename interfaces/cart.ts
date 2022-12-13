import { ISize, ITallas } from './';

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex'|'regionales'|'fashion'
    quantity: number;
}
