import { Schema, model } from 'mongoose';

const washTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priceSmall: { type: Number, required: true },
  priceMedium: { type: Number, required: true },
  priceLarge: { type: Number, required: true }
});

export default model('WashType', washTypeSchema);
