import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { bookingValidation } from './booking.validation';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(bookingValidation.createSchema),
  bookingController.createBooking,
);

router.get('/', auth(), bookingController.getBookingList);

router.get('/my', auth(), bookingController.getMyBooking);

router.get('/:id', auth(), bookingController.getBookingById);

router.put(
  '/:id',
  auth(),
  validateRequest(bookingValidation.updateSchema),
  bookingController.updateBooking,
);

router.patch(
  '/toggle-status/:id',
  auth(),
  bookingController.toggleStatusBooking,
);

router.delete(
  '/soft-delete/:id',
  auth(),
  bookingController.softDeleteBooking,
);

router.delete('/:id', auth(), bookingController.deleteBooking);

export const bookingRoutes = router;