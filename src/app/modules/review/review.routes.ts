import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewController } from './review.controller';
import { reviewValidation } from './review.validation';


const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(reviewValidation.createSchema),
  reviewController.createReview,
);

router.get('/', auth(), reviewController.getReviewList);

router.get('/my', auth(), reviewController.getMyReview);

router.get('/:id', auth(), reviewController.getReviewById);

router.put(
  '/:id',
  auth(),
  validateRequest(reviewValidation.updateSchema),
  reviewController.updateReview,
);

router.delete(
  '/soft-delete/:id',
  auth(),
  reviewController.softDeleteReview,
);

router.delete('/:id', auth(), reviewController.deleteReview);

export const reviewRoutes = router;