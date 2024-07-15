import { Router } from 'express';
import { createWashType, getWashTypes } from '../controllers/washTypeController';

const router = Router();

router.post('/', createWashType);
router.get('/', getWashTypes);


export default router;
