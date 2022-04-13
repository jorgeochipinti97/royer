import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrderCrypto } from '../interfaces';

const orderCryptoSchema = new Schema({
    _idOrder     : { type: Schema.Types.ObjectId,ref: 'Order' },
    total        : { type: Number, required: true },
    isPaid : { type: Boolean, required: true, default: false },
    transactionId: { type: String },

}, {
    timestamps: true,
})

const OrderCrypto:Model<IOrderCrypto> = mongoose.models.OrderCrypto || model('OrderCrypto',orderCryptoSchema);

export default OrderCrypto;