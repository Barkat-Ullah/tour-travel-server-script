import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { commentController } from './comment.controller';
import { commentValidation } from './comment.validation';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(commentValidation.createSchema),
  commentController.createComment,
);

router.post(
  '/:parentId/reply',
  auth(),
  validateRequest(commentValidation.replySchema),
  commentController.replyComment,
);

router.patch('/:id', auth(), commentController.updateComment);
router.delete('/:id', auth(), commentController.deleteComment);

export const commentRoutes = router;
