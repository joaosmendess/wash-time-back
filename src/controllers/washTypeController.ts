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

export const getWashTypes = async (req: Request, res:Response) => {
    
    try {
        const washTypes = await WashType.find();
        res.status(200).json(washTypes);
    } catch (error) {
        res.status(500).json({message: 'Server error' })
        
    }
};

// Adicione outros métodos conforme necessário (obter, atualizar, deletar)
