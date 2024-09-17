import express from 'express';
import connectDB from './utils/database';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes';
import washTypeRoutes from './routes/washTypeRoutes';
import availabelSlotRoutes from './routes/availableSlotRoutes';



dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/bookings', bookingRoutes);
app.use('/api/washtypes', washTypeRoutes);
app.use('/api/availabelSlot', availabelSlotRoutes);


connectDB();

export default app;
