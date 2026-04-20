import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { tourController } from './tour.controller';
import { tourValidation } from './tour.validation';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

const fileUpload = fileUploader.tourImageUpload;

router.post(
  '/',
  auth(),
  fileUpload,
  validateRequest(tourValidation.createSchema),
  tourController.createTour,
);

router.get('/', auth(), tourController.getTourList);

router.get('/my', auth(), tourController.getMyTour);

router.get('/:id', auth(), tourController.getTourById);

router.put(
  '/:id',
  auth(),
  fileUpload,
  validateRequest(tourValidation.updateSchema),
  tourController.updateTour,
);

router.patch('/toggle-status/:id', auth(), tourController.toggleStatusTour);

router.delete('/soft-delete/:id', auth(), tourController.softDeleteTour);

router.delete('/:id', auth(), tourController.deleteTour);

export const tourRoutes = router;
