import { Router } from 'express';
import { createAvailableSlot, getAvailableSlots, updateAvailableSlot, deleteAvailableSlot, getAvailableSlotsByDate } from '../controllers/availabelSlotController';

const router = Router();

router.post('/', createAvailableSlot);
router.get('/', getAvailableSlots);
router.get('/by-date', getAvailableSlotsByDate); 
router.put('/:id', updateAvailableSlot);
router.delete('/:id', deleteAvailableSlot);

export default router;
