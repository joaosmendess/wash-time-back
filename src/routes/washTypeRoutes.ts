import { Router } from 'express';
import { createWashType, getWashTypes, updateWashType, deleteWashType } from '../controllers/washTypeController';

const router = Router();

router.post('/', createWashType);
router.get('/', getWashTypes);
router.put('/:id', updateWashType);
router.delete('/:id', deleteWashType);

export default router;
