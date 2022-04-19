import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IOrderCrypto } from '../../../interfaces';
import { OrderCrypto } from '../../../models';
import { isValidObjectId } from 'mongoose';


type Data =
    | { message: string }
    | IOrderCrypto;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
        case 'DELETE':
            return deleteOrder(req, res);
        case 'PUT':
            return updateOrder(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    try {

        const newOrderCrypto = new OrderCrypto(req.body);
        await newOrderCrypto.save();
        await db.disconnect();

        return res.status(201).json(newOrderCrypto);

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
}

const deleteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', } = req.body as IOrderCrypto;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }

    try {

        await db.connect();
        const orderCrypto_ = await OrderCrypto.findById(_id);
        if (!orderCrypto_) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        await OrderCrypto.findByIdAndDelete({ _id: _id })

        await db.disconnect();


        return res.status(200).json({ message: 'eliminado' });

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }
}

const updateOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = ''} = req.body as IOrderCrypto;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }
    
    try {
        console.log(req.body)
        await db.connect();
        const order = await OrderCrypto.findById(_id);
        if ( !order ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }
        await order.update( req.body );
        await db.disconnect();
        

        return res.status(200).json( order );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }


}