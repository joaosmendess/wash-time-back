import { Request, Response } from 'express';
import Booking from '../models/booking';
import WashType from '../models/washType';
import AvailableSlot from '../models/availabelSlot'; // Import do modelo de horários disponíveis

export const createBooking = async (req: Request, res: Response) => {
  const { customerName, customerPhone, date, time, vehicleModel, washType } = req.body;
  try {
    const existingWashType = await WashType.findOne({ name: washType });
    if (!existingWashType) {
      return res.status(400).json({ message: 'Tipo de lavagem inválido' });
    }

    // Verificar se o horário está disponível
    const availableSlot = await AvailableSlot.findOne({ date });
    if (!availableSlot || !availableSlot.times.includes(time)) {
      return res.status(400).json({ message: 'Horário não disponível' });
    }

    const newBooking = new Booking({ customerName, customerPhone, date, time, vehicleModel, washType });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Erro ao criar a reserva:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Outras funções permanecem as mesmas
export const getBookings = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Data é obrigatória' });
  }

  const start = new Date(date as string);
  const end = new Date(date as string);
  end.setDate(end.getDate() + 1);

  try {
    const bookings = await Booking.find({
      date: {
        $gte: start,
        $lt: end
      }
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Erro ao buscar as reservas:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Erro ao buscar todas as reservas:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerName, customerPhone, date, time, vehicleModel, washType } = req.body;
  try {
    const existingWashType = await WashType.findOne({ name: washType });
    if (!existingWashType) {
      return res.status(400).json({ message: 'Tipo de lavagem inválido' });
    }

    // Verificar se o horário está disponível para a nova data e horário
    const availableSlot = await AvailableSlot.findOne({ date });
    if (!availableSlot || !availableSlot.times.includes(time)) {
      return res.status(400).json({ message: 'Horário não disponível' });
    }

    const updateBooking = await Booking.findByIdAndUpdate(id, { customerName, customerPhone, date, time, vehicleModel, washType }, { new: true });
    if (!updateBooking) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(updateBooking);
  } catch (error) {
    console.error('Erro ao atualizar a reserva:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar a reserva:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
