import { Router } from 'express';
import { ServicesController } from '../controllers/servicesController';

const router = Router();
const controller = new ServicesController();

router.get('/servicos', controller.index);
router.put('/servicos/:id', controller.update);

export default router;