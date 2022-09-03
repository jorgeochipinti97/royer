import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { db } from '../../database';
import { DiscountCode } from '../../models';
import { IDiscount } from '../../interfaces/discountCodes';

type Data =
    | { message: string }
    | IDiscount
    | IDiscount[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getCodes(req, res);
        case 'POST':
            return createCode(req, res)
        case 'PUT':
            return updateCode(req, res);
        case 'DELETE':
            return deleteCode(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })

    }


}

const getCodes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const codes = await DiscountCode.find().lean();
    await db.disconnect();
    console.log(codes)
    return res.status(200).json(codes);

}

const createCode = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    try {
        await db.connect();
        const productInDB = await DiscountCode.findOne({ name: req.body.name });
        if (productInDB) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
        }

        const code = new DiscountCode(req.body);
        await code.save();
        await db.disconnect();

        res.status(201).json(code);


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}


const updateCode = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '' } = req.body;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'No existe usuario por ese id' })
    }

    await db.connect();
    const code = await DiscountCode.findById(_id);

    if (!code) {
        await db.disconnect();
        return res.status(404).json({ message: 'Usuario no encontrado: ' + _id });
    }

    await code.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado' });

}


const deleteCode = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', } = req.body as IDiscount;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }



    try {

        await db.connect();
        const code = await DiscountCode.findById(_id);
        if (!code) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        await DiscountCode.findByIdAndDelete({ _id: _id })

        await db.disconnect();


        return res.status(200).json({ message: 'eliminado' });

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}
