import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { divisionController } from './division.controller';
import { divisionValidation } from './division.validation';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

const fileUpload = fileUploader.upload.fields([
  { name: 'image', maxCount: 1 },
]);

router.post(
  '/',
  auth(),
  fileUpload,
  validateRequest(divisionValidation.createDivisionSchema),
  divisionController.createDivision,
);

router.get('/', divisionController.getAllDivisions);

router.get('/:id', divisionController.getDivisionById);

router.put(
  '/:id',
  auth(),
  fileUpload,
  validateRequest(divisionValidation.updateDivisionSchema),
  divisionController.updateDivision,
);

router.delete(
  '/soft-delete/:id',
  auth(),
  divisionController.softDeleteDivision,
);

router.delete('/:id', auth(), divisionController.deleteDivision);

export const divisionRoutes = router;
