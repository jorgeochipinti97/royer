import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';
import { sortPopularity } from '../utils';



export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    try {


        await db.connect();
        const product = await Product.findOne({ slug }).lean();
        await db.disconnect();

        if (!product) {
            return null;
        }

        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });

        return JSON.parse(JSON.stringify(product));
    } catch (err) {
        console.log(err)
        return null
    }
}

interface ProductSlug {
    slug: string;
}
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {


    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}




export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {

    term = term.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
        .select('title images price inStock slug -_id')
        .lean();

    await db.disconnect();

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });

        return product;
    })


    return updatedProducts;
}


export const getAllProducts = async (): Promise<IProduct[]> => {

    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(products));
}



export const getPopulars = async (): Promise<IProduct[]> => {


    await db.connect();
    const products = await Product.find({ popular: true }).lean();
    console.log(products)
    const tshirts: IProduct[] = sortPopularity(products, 'shirts')
    const alfajores: IProduct[] = sortPopularity(products, 'alfajores')
    const wine: IProduct[] = sortPopularity(products, 'wine')
    const mate: IProduct[] = sortPopularity(products, 'mate')
    const accessories: IProduct[] = sortPopularity(products, 'accessories')
    const purse: IProduct[] = sortPopularity(products, 'purse')





    //  Boca Juniors Jersey 22-23 Aero.rdy Adidas Official
    //   Argentina Official Home Shirt 22 Aero.rdy Messi
    //    River Plate Home Jersey Shirt 21-22 - Heat.rdy Adidas Official 
    //   Alfajor Havanna X12
    //     Wine Dv Catena Cabernet-malbec 750ml Case X 2 
    //      Leather Lounge Bag 
    //     Cutlery Set Stainless Steel Blade. El Boyero 
    //      Mate Imperial Copa Calado De Maestro Platero


    tshirts.sort((a: IProduct, b: IProduct) => {

        if (a.slug.indexOf('river') < b.slug.indexOf('river')) {
            return 1
        } else if (a.slug.indexOf('river') > b.slug.indexOf('river')) {
            return -1
        }
        return 0
    })

    const tShirtsMessi = tshirts.sort((a: IProduct, b: IProduct) => {

        if (a.slug.indexOf('messi') < b.slug.indexOf('messi')) {
            return 1
        } else if (a.slug.indexOf('messi') > b.slug.indexOf('messi')) {
            return -1
        }
        return 0
    })
    const tShirtBoca = tShirtsMessi.sort((a: IProduct, b: IProduct) => {

        if (a.slug.indexOf('boca') < b.slug.indexOf('boca')) {
            return 1
        } else if (a.slug.indexOf('boca') > b.slug.indexOf('boca')) {
            return -1
        }
        return 0
    })


    const productos = tShirtBoca
        .concat(alfajores)
        .concat(wine)
        .concat(purse)
        .concat(accessories)
        .concat(mate)
console.log(productos)
    await db.disconnect();


    return JSON.parse(JSON.stringify(productos));
}


