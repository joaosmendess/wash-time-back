import { Request, Response } from 'express';
import WashType from '../models/washType';

export const createWashType = async (req: Request, res: Response) => {
  const { name, description, priceSmall, priceMedium, priceLarge } = req.body;
  try {
    const newWashType = new WashType({ name, description, priceSmall, priceMedium, priceLarge });
    await newWashType.save();
    res.status(201).json(newWashType);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWashTypes = async (req: Request, res: Response) => {
  try {
    const washTypes = await WashType.find();
    res.status(200).json(washTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateWashType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, priceSmall, priceMedium, priceLarge } = req.body;
  try {
    const updatedWashType = await WashType.findByIdAndUpdate(id, { name, description, priceSmall, priceMedium, priceLarge }, { new: true });
    if (!updatedWashType) {
      return res.status(404).json({ message: 'WashType not found' });
    }
    res.status(200).json(updatedWashType);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteWashType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedWashType = await WashType.findByIdAndDelete(id);
    if (!deletedWashType) {
      return res.status(404).json({ message: 'WashType not found' });
    }
    res.status(200).json({ message: 'WashType deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
