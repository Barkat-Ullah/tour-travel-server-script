import httpStatus from 'http-status';
import { divisionService } from './division.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionService.createDivision(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Division created successfully',
    data: result,
  });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionService.getAllDivisions();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Divisions retrieved successfully',
    data: result,
  });
});

const getDivisionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await divisionService.getDivisionById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division retrieved successfully',
    data: result,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionService.updateDivision(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division updated successfully',
    data: result,
  });
});

const softDeleteDivision = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await divisionService.softDeleteDivision(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division soft deleted successfully',
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await divisionService.deleteDivision(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division deleted successfully',
    data: result,
  });
});

export const divisionController = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  softDeleteDivision,
  deleteDivision,
};
