import { Router } from 'express';
import entidadeControllers from '../controllers/EntidadeController';

const router = new Router();

router.get('/', entidadeControllers.index);
router.get('/:id', entidadeControllers.show);

export default router;
