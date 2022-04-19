import { Router } from 'express';
import horaControllers from '../controllers/HoraController';

const router = new Router();

router.get('/:id', horaControllers.index);
router.put('/:id', horaControllers.update);
router.post('/', horaControllers.create);

export default router;
