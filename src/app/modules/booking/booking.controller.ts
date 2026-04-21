import httpStatus from 'http-status';
import { bookingService } from './booking.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pickValidFields';

// create Booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createBooking(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

// get all Booking
const bookingFilterableFields = [
  'searchTerm',
  'id',
  'createdAt',
  'status',
];
const getBookingList = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, bookingFilterableFields);
  const result = await bookingService.getBookingList(options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get Booking by id
const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingService.getBookingById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking details retrieved successfully',
    data: result,
  });
});

// get my Booking
const getMyBooking = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, bookingFilterableFields);
  const result = await bookingService.getMyBooking(req, options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Booking list retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// update Booking
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.updateBooking(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

// toggle status Booking
const toggleStatusBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingService.toggleStatusBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking status toggled successfully',
    data: result,
  });
});

// soft delete Booking
const softDeleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingService.softDeleteBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking soft deleted successfully',
    data: result,
  });
});

// hard delete Booking
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingService.deleteBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getBookingList,
  getBookingById,
  getMyBooking,
  updateBooking,
  toggleStatusBooking,
  softDeleteBooking,
  deleteBooking,
};