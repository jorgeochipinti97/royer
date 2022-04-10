import { IProduct } from "../interfaces"



const existInFavorites = (product: IProduct): boolean => {
    let favorites: IProduct[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    let isLiked = false
    favorites.forEach(e => {
        if (e.slug == product.slug) {
            isLiked = true
            return  true;
        } else {
            isLiked = false
            return false
        }
    })
    return isLiked
 
}



const productsInFavorites = (): IProduct[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const toggleFavorite = (product: IProduct) => {
    let favorites: IProduct[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    let a
    const isLiked = () => {
        favorites.forEach(e => {
            if (e.slug == product.slug) {
                a = true;
            } else {
                a = false
            }
        })
    }
    isLiked()
    if (a) {
        favorites = favorites.filter(e => e == product)
        console.log(favorites)
    } else {
        favorites.push(product)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    existInFavorites,
    toggleFavorite,
    productsInFavorites
}