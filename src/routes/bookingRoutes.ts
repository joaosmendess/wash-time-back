import { Router } from 'express';
import { createBooking, getBookings, updateBooking, deleteBooking, getAllBookings } from '../controllers/bookingController';

const router = Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/all', getAllBookings); // Nova rota para listar todos os agendamentos

router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
