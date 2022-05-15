import { Router } from 'express';
import DefaultController from '../controllers/DefaultController';
import TestController from '../controllers/TestController';
import authenticated from '../middlewares/authenticated';
import sessionRouter from './session.routes';
import documentRouter from './document.routes';

const router = Router();

router.get('/', DefaultController.index);
router.post('/test', TestController.index);

router.use('/session', sessionRouter);

router.use(authenticated);

router.use('/document', documentRouter);

export default router;
