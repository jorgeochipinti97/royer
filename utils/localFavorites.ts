import { IProduct } from "../interfaces"



const productsInFavorites = (): IProduct[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const toggleFavorite = (product: IProduct) => {
    try{

        let favorites: IProduct[] = JSON.parse(localStorage.getItem('favorites') || '[]')
        let a:Boolean
        const isLiked = () => {
            favorites.forEach(e => {
                if (e._id == product._id) {
                    a = true;
                } else {
                    a = false
                }
            })
            const f = () => {
                if (a) {
                    favorites = favorites.filter(e => e._id !== product._id)
                } else {
                    favorites.push(product)
                }
                localStorage.setItem('favorites', JSON.stringify(favorites))
            }
            f()
        }
        isLiked()
    }catch(err){
        console.log(err)
    }
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    toggleFavorite,
    productsInFavorites
}