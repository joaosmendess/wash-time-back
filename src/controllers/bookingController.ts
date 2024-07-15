import { Request, Response } from 'express';
import Booking from '../models/booking';

export const createBooking = async (req: Request, res: Response) => {
  const { customerName, customerPhone, date, time, vehicleModel, washType } = req.body;
  try {
    const newBooking = new Booking({ customerName, customerPhone, date, time, vehicleModel, washType });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
