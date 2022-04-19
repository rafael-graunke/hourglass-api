import { Router } from 'express';
import entidadeControllers from '../controllers/EntidadeController';

const router = new Router();

router.get('/', entidadeControllers.index);

export default router;
