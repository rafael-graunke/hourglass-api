import { Router } from 'express';
import relatorioControllers from '../controllers/RelatorioController';

const router = new Router();

router.get('/:id', relatorioControllers.index);
router.post('/', relatorioControllers.create);
router.delete('/:id', relatorioControllers.delete);

export default router;
