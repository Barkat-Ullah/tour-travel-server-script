import httpStatus from 'http-status';
import { tourService } from './tour.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pickValidFields';

// Filterable fields
const tourFilterableFields = [
  'searchTerm',
  'id',
  'createdAt',
  'status',
  'isDeleted',
];

// create Tour
const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.createTour(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tour created successfully',
    data: result,
  });
});

// get all Tour
const getTourList = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, tourFilterableFields);
  const result = await tourService.getTourList(options, filters, req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get Tour by id
const getTourById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourService.getTourById(id, req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour details retrieved successfully',
    data: result,
  });
});

// get my Tour
const getMyTour = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, tourFilterableFields);
  const result = await tourService.getMyTour(req.user.id, options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Tour list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// update Tour
const updateTour = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.updateTour(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour updated successfully',
    data: result,
  });
});

// toggle status Tour
const toggleStatusTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourService.toggleStatusTour(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour status toggled successfully',
    data: result,
  });
});

// soft delete Tour
const softDeleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourService.softDeleteTour(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour soft deleted successfully',
    data: result,
  });
});

// hard delete Tour
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourService.deleteTour(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour deleted successfully',
    data: result,
  });
});

export const tourController = {
  createTour,
  getTourList,
  getTourById,
  getMyTour,
  updateTour,
  toggleStatusTour,
  softDeleteTour,
  deleteTour,
};
