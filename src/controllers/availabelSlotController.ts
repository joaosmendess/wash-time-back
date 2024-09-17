import { Request, Response } from 'express';
import AvailableSlot from '../models/availabelSlot';

export const createAvailableSlot = async (req: Request, res: Response) => {
  const { date, times } = req.body;

  try {
    const existingSlot = await AvailableSlot.findOne({ date });
    if (existingSlot) {
      return res.status(400).json({ message: 'Horários já definidos para esta data' });
    }

    const newSlot = new AvailableSlot({ date, times }); // Aqui times é um array de strings
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    console.error('Erro ao criar os horários disponíveis:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const slots = await AvailableSlot.find();
    res.status(200).json(slots);
  } catch (error) {
    console.error('Erro ao buscar os horários disponíveis:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableSlotsByDate = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Data é obrigatória' });
  }

  try {
    const slots = await AvailableSlot.find({ date });
    if (slots.length === 0) {
      return res.status(404).json({ message: 'Nenhum horário disponível para esta data' });
    }
    res.status(200).json(slots);
  } catch (error) {
    console.error('Erro ao buscar os horários disponíveis:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAvailableSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, times } = req.body;

  try {
    const updatedSlot = await AvailableSlot.findByIdAndUpdate(id, { date, times }, { new: true });
    if (!updatedSlot) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }
    res.status(200).json(updatedSlot);
  } catch (error) {
    console.error('Erro ao atualizar os horários disponíveis:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAvailableSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedSlot = await AvailableSlot.findByIdAndDelete(id);
    if (!deletedSlot) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }
    res.status(200).json({ message: 'Horário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar o horário disponível:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
