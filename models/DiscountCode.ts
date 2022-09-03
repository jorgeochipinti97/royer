import mongoose, { Schema, model, Model } from 'mongoose';
import { IDiscount } from '../interfaces/discountCodes';


const productSchema = new Schema({
    name: { type: String, required: true, default: '' },
    percentage: { type: Number, required: true, min: 0, max: 30 },
}, {
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const DiscountPrice: Model<IDiscount> = mongoose.models.DiscountPrice || model('DiscountPrice', productSchema);


export default DiscountPrice;