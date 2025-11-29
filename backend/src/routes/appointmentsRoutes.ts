import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointmentsController';

const router = Router();
const controller = new AppointmentsController();

router.post('/agendamentos', controller.store);
router.get('/agendamentos', controller.index);
router.delete('/agendamentos/:id', controller.delete);

export default router;