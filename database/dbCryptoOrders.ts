import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrderCrypto } from '../interfaces';
import { OrderCrypto } from '../models';


export const getOrderCryptoById = async (id: string): Promise<IOrderCrypto | null> => {
    
    
    if (!isValidObjectId(id)) {
        return null;
    }
    try{
        
        await db.connect();
        const order = await OrderCrypto.findById(id).lean();
        await db.disconnect();
        
        if (!order) {
            return null;
        }

        return JSON.parse(JSON.stringify(order));

    }catch(err){
        console.log(err)
        return null
    }


}
export const deleteOrderCryptoById = async (id: string) => {

    if (!isValidObjectId(id)) {
        return null;
    }

    await db.connect();
    await OrderCrypto.findByIdAndDelete(id)
    await db.disconnect();


}


