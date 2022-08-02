import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { sortPopularity, sortProductsByTerm,sendLast } from '../utils';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);
    const sortByType = (products: IProduct[]) => {
        const tshirts: IProduct[] = sortPopularity(products, 'shirts')
        const tShirtsBoca = sortProductsByTerm(tshirts, 'boca')
        const tShirtsRiver = sortProductsByTerm(tShirtsBoca, 'river')
        const tShirtBoca = sortProductsByTerm(tShirtsRiver, 'boca_juniors_jersey_22-23_aero.rdy_adidas_official')
        const tShirtRiver = sortProductsByTerm(tShirtBoca, 'river_plate_home_jersey_shirt_21-22_-_aero.rdy_adidas_official')
        const tshirtArgentina = sortProductsByTerm(tShirtRiver, 'argentina_official')
        const tShirtsMessi = sortProductsByTerm(tshirtArgentina, 'messi')
        const shorts: IProduct[] = sortPopularity(products, 'short')
        const hoodies: IProduct[] = sortPopularity(products, 'hoodies')
        const jacket: IProduct[] = sortPopularity(products, 'jacket')
        const pants: IProduct[] = sortPopularity(products, 'pants')
        const socks: IProduct[] = sortPopularity(products, 'socks')
        const purse: IProduct[] = sortPopularity(products, 'purse')
        const bag: IProduct[] = sortPopularity(products, 'bag')
        const wallet: IProduct[] = sortPopularity(products, 'wallet')
        const hats: IProduct[] = sortPopularity(products, 'hats')
        const mate: IProduct[] = sortPopularity(products, 'mate')
        const matePlatero = sortProductsByTerm(mate, 'mate_platero')
        const mateImperial = sortProductsByTerm(matePlatero, 'mate_imperial')
        const mateArgentina = sortProductsByTerm(mateImperial, 'edición_argentina')
        const mateMaradona = sortProductsByTerm(mateArgentina, 'maradona')
        const mateMessi = sortProductsByTerm(mateMaradona, 'messi')
        const thermos_ = sendLast(mateMessi, 'thermos')
        const bombilla_ = sendLast(thermos_, 'bombilla')
        const bombillon_ = sendLast(bombilla_, 'bombillon')
        const accessories: IProduct[] = sortPopularity(products, 'accessories')
        const alfajores: IProduct[] = sortPopularity(products, 'alfajores')
        const wine: IProduct[] = sortPopularity(products, 'wine')
        const yerba: IProduct[] = sortPopularity(products, 'yerba')
        const espadrilles: IProduct[] = sortPopularity(products, 'espadrilles')

        return tShirtsMessi
            .concat(shorts)
            .concat(hoodies)
            .concat(jacket)
            .concat(pants)
            .concat(socks)
            .concat(bag)
            .concat(purse)
            .concat(wallet)
            .concat(hats)
            .concat(bombillon_)
            .concat(accessories)
            .concat(alfajores)
            .concat(wine)
            .concat(yerba)
            .concat(espadrilles)
    }


    return {
        products: data && sortByType(data) || [],
        isLoading: !error && !data,
        isError: error
    }

}