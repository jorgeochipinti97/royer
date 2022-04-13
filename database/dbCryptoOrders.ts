import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrderCrypto } from '../interfaces';
import { OrderCrypto } from '../models';


export const getOrderById = async( id: string ):Promise<IOrderCrypto| null> => {

    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    const order = await OrderCrypto.findById( id ).lean();
    await db.disconnect();

    if ( !order ) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));


}


