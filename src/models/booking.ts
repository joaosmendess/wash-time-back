import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  washType: { type: String, required: true }
});

export default model('Booking', bookingSchema);
