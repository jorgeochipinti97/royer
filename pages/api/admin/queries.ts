import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

import { db } from '../../../database';
import { IQuery } from '../../../interfaces';
import { Query } from '../../../models';


type Data =
    | { message: string }
    | IQuery[]
    | IQuery;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getQueries(req, res);

        case 'POST':
            return createQueries(req, res)

        case 'DELETE':
            return deleteQueries(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' });
    }


}

const getQueries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const products = await Query.find()
        .sort({ createdAt: 'desc' })
        .lean();

    await db.disconnect();


    res.status(200).json(products);

}

const createQueries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();

    try {
        const newQuery = new Query(req.body);
        await newQuery.save();
        await db.disconnect();
        return res.status(201).json(newQuery);

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
}
const deleteQueries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', } = req.body as IQuery;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }

    try {

        await db.connect();
        const query_ = await Query.findById(_id);
        if (!query_) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        await Query.findByIdAndDelete({ _id: _id })

        await db.disconnect();


        return res.status(200).json({ message: 'eliminado' });

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }
}

