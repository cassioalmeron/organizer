import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import DocumentController from '../controllers/DocumentController';

const router = Router();

router.get('/', DocumentController.show);
router.get('/:id', DocumentController.index);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
      hashTags: Joi.array().items(Joi.string()),
      files: Joi.array()
        .required()
        .items(
          Joi.object().keys({
            id: Joi.number(),
            url: Joi.string().required(),
          }),
        )
        .min(1),
    },
  }),
  DocumentController.create,
);
router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
      description: Joi.string().allow(null),
      hashTags: Joi.array().items(Joi.string()),
      files: Joi.array()
        .items(
          Joi.object().keys({
            id: Joi.number(),
            url: Joi.string(),
          }),
        )
        .min(1),
    },
  }),
  DocumentController.update,
);
router.delete('/:id', DocumentController.delete);

export default router;
