import { Router } from 'express';
import relatorioControllers from '../controllers/RelatorioController';

const router = new Router();

router.get('/:id', relatorioControllers.index);

export default router;
