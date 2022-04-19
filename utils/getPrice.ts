import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();

export const getPrice = async (crypto: string, total: number) => {
    const data = await CoinGeckoClient.simple.price({
        ids: [crypto],
        vs_currencies: ['usd'],
    })

    let price: number

    if (crypto == 'bitcoin') {
        return price = total / data.data.bitcoin.usd 

    } else if (crypto == 'ethereum') {
        return price = total / data.data.ethereum.usd 

    } else if (crypto == 'binancecoin') {
        return price = total / data.data.binancecoin.usd 
    }

}

