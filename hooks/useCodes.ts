import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { sortPopularity, sortProductsByTerm, sendLast } from '../utils';



export const useCodes = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

    return {
        codes: data || [],
        isLoading: !error && !data,
        isError: error
    }

}