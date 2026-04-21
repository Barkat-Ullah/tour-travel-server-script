import httpStatus from 'http-status';
import { reviewService } from './review.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pickValidFields';

// create Review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReview(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

// get all Review
const reviewFilterableFields = [
  'searchTerm',
  'id',
  'createdAt',
  'status',
];
const getReviewList = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, reviewFilterableFields);
  const result = await reviewService.getReviewList(options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get Review by id
const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.getReviewById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review details retrieved successfully',
    data: result,
  });
});

// get my Review
const getMyReview = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, reviewFilterableFields);
  const result = await reviewService.getMyReview(req, options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Review list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// update Review
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.updateReview(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

// soft delete Review
const softDeleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.softDeleteReview(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review soft deleted successfully',
    data: result,
  });
});

// hard delete Review
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviewList,
  getReviewById,
  getMyReview,
  updateReview,
  softDeleteReview,
  deleteReview,
};