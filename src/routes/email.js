import { Router } from 'express';
import emailControllers from '../controllers/EmailController';

const router = new Router();

router.get('/:id', emailControllers.index);
router.post('/', emailControllers.create);
router.delete('/:id', emailControllers.delete);

export default router;
