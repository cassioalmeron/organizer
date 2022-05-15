import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';

const router = Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string(),
    },
  }),
  SessionController.create,
);

export default router;
