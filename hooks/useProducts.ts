import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { sortPopularity, sortProductsByTerm, sendLast } from '../utils';



export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);
    const sortByType = (products: IProduct[]) => {
        const tshirts: IProduct[] = sortPopularity(products, 'shirts')
        const tShirtsBoca = sortProductsByTerm(tshirts, 'boca')
        const tShirtsRiver = sortProductsByTerm(tShirtsBoca, 'river')
        const tShirtBoca = sortProductsByTerm(tShirtsRiver, 'boca_juniors_jersey_22-23_aero.rdy_adidas_official')
        const tShirtRiver = sortProductsByTerm(tShirtBoca, 'river_plate_home_t-shirt_2023')
        const tshirtArgentinaVieja = sortProductsByTerm(tShirtRiver, 'argentina_national_team_shirt_2021_-_aeroready')
        const tshirtArgentinaVieja_ = sortProductsByTerm(tshirtArgentinaVieja, 'messi_argentina_team_home_t-shirt_10')
        const tshirtArgentina = sortProductsByTerm(tshirtArgentinaVieja_, 'argentina_official')
        const tshirtArgentinaNueva = sortProductsByTerm(tshirtArgentina, 'argentina_alternative')
        const tShirtsMessi = sortProductsByTerm(tshirtArgentinaNueva, 'argentina_official_home_shirt_22_aero.rdy_messi')
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
        const footwear: IProduct[] = sortPopularity(products, 'footwear')

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
            .concat(footwear)
    }
    return {
        products: data && sortByType(data) || [],
        isLoading: !error && !data,
        isError: error
    }

}