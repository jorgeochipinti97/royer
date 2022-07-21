import { IProduct } from '../interfaces/products';

export const sortLow = (products: IProduct[]) => {
    products.sort((a: IProduct, b: IProduct) => {
        if (a.price < b.price) {
            return -1
        } else if (a.price, b.price) {
            return 1
        }
        return 0
    })

}
export const sortHigh = (products: IProduct[]) => {
    products.sort((a: IProduct, b: IProduct) => {
        if (a.price < b.price) {
            return 1
        } else if (a.price, b.price) {
            return -1
        }
        return 0
    })

}
export const sortPopularity = (products: IProduct[], word: string) => {
    const a = products.filter(e => e.type == word)
    return a 
}


export const odenarCategorias = (products: IProduct[]) => {

    products.map(e => {
        let a
    })

}

export const capitalizarPrimeraLetraPalabras = (frase: string | any) => {
    if (typeof frase != 'string') {
        throw TypeError('El argumento debe ser una cadena de caracteres.');
    }

    return frase.replace(/\w\S*/g, (palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
}