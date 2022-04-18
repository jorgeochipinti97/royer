import { IProduct } from '../interfaces/products';

export const sortLow = (products: IProduct[]) => {
    products.sort((a:IProduct, b:IProduct) => {
        if (a.price < b.price) {
            return -1
        } else if (a.price, b.price) {
            return 1
        }
        return 0
    })

}
export const sortHight = (products: IProduct[]) => {
    products.sort((a:IProduct, b:IProduct) => {
        if (a.price < b.price) {
            return 1
        } else if (a.price, b.price) {
            return -1
        }
        return 0
    })

}
