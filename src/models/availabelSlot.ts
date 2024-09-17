// src/models/AvailableSlot.ts
import { Schema, model } from 'mongoose';

interface AvailableSlot {
  date: string;
  times: string[]; // Certifique-se de que times é um array de strings
}

const availableSlotSchema = new Schema<AvailableSlot>({
  date: { type: String, required: true },
  times: { type: [String], required: true }, // Define times como array de strings
});

export default model<AvailableSlot>('AvailableSlot', availableSlotSchema);
