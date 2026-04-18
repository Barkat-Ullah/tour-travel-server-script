import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IPaginationOptions } from '../../interface/pagination.type';
import { paginationHelper } from '../../utils/calculatePagination';
import ApiError from '../../errors/AppError';
import { Request } from 'express';
import { handleFileUploads } from '../../utils/handleFile';
import { tourSelect } from './tour.select';
import { buildFilterConditions } from './tour.utils';

// -------------------------------------------------------
// create Tour
// -------------------------------------------------------
const createTour = async (req: Request) => {
  const userId = req.user.id;
  const data = req.body;
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  const uploadedFiles = await handleFileUploads(files);
  const addedData = { ...data, ...uploadedFiles, userId };
  const result = await prisma.tour.create({
    data: addedData,
    select: tourSelect,
  });
  return result;
};

// -------------------------------------------------------
// get all Tour
// -------------------------------------------------------
type ITourFilterRequest = {
  searchTerm?: string;
  id?: string;
  createdAt?: string;
  status?: string;
};

const tourSearchAbleFields = ['fullName', 'email'];

const getTourList = async (
  options: IPaginationOptions,
  filters: ITourFilterRequest,
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.TourWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: tourSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

   if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.TourWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [result, total] = await Promise.all([
      prisma.tour.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: tourSelect,
    }),
    prisma.tour.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// get Tour by id
// -------------------------------------------------------
const getTourById = async (id: string) => {
  const result = await prisma.tour.findUnique({
    where: { id },
    select: tourSelect,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }
  return result;
};

// -------------------------------------------------------
// get my Tour
// -------------------------------------------------------
const getMyTour = async (
  req: Request,
  options: IPaginationOptions,
  filters: ITourFilterRequest,
) => {
  const userId = req.user.id;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.TourWhereInput[] = [];
  // const andConditions: Prisma.TourWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: tourSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

   if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.TourWhereInput = { AND: andConditions };

  const [result, total] = await Promise.all([
      prisma.tour.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: tourSelect,
    }),
    prisma.tour.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// update Tour
// -------------------------------------------------------
const updateTour = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  const uploadedFiles = await handleFileUploads(files);

  const existingTour = await prisma.tour.findUnique({ where: { id } });
  if (!existingTour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }

  const result = await prisma.tour.update({
    where: { id },
    data: {
      divisionId: data.divisionId ?? (existingTour as any).divisionId,
      title: data.title ?? (existingTour as any).title,
      description: data.description ?? (existingTour as any).description,
      image: data.image ?? (existingTour as any).image,
      location: data.location ?? (existingTour as any).location,
      lat: data.lat ?? (existingTour as any).lat,
      lon: data.lon ?? (existingTour as any).lon,
      costFrom: data.costFrom ?? (existingTour as any).costFrom,
      startDate: data.startDate ?? (existingTour as any).startDate,
      endDate: data.endDate ?? (existingTour as any).endDate,
      departureLocation: data.departureLocation ?? (existingTour as any).departureLocation,
      arrivalLocation: data.arrivalLocation ?? (existingTour as any).arrivalLocation,
      included: data.included ?? (existingTour as any).included,
      excluded: data.excluded ?? (existingTour as any).excluded,
      amenities: data.amenities ?? (existingTour as any).amenities,
      tourPlan: data.tourPlan ?? (existingTour as any).tourPlan,
      maxGuest: data.maxGuest ?? (existingTour as any).maxGuest,
      minAge: data.minAge ?? (existingTour as any).minAge,
      status: data.status ?? (existingTour as any).status,
      isDeleted: data.isDeleted ?? (existingTour as any).isDeleted,
    },
    select: tourSelect,
  });

  return result;
};

// -------------------------------------------------------
// toggle status Tour
// -------------------------------------------------------
const toggleStatusTour = async (id: string) => {
  const existingTour = await prisma.tour.findUnique({ where: { id } });
  if (!existingTour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }

  // TODO: define your status enum toggle logic below
  // Example for enum: { ACTIVE -> INACTIVE, INACTIVE -> ACTIVE }
  const currentStatus = (existingTour as any).status;
  // const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  const result = await prisma.tour.update({
    where: { id },
    data: { status: currentStatus /* replace with newStatus */ },
    select: tourSelect,
  });

  return result;
};

// -------------------------------------------------------
// soft delete Tour
// -------------------------------------------------------
const softDeleteTour = async (id: string) => {
  const existingTour = await prisma.tour.findUnique({ where: { id , isDeleted: false} });
  if (!existingTour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found or Tour is already deleted');
  }

  const result = await prisma.tour.update({
    where: { id },
    data: { isDeleted: true },
    select: tourSelect,
  });
  return result;
};

// -------------------------------------------------------
// hard delete Tour
// -------------------------------------------------------
const deleteTour = async (id: string) => {
  const existingTour = await prisma.tour.findUnique({ where: { id } });
  if (!existingTour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }
  const result = await prisma.tour.delete({ where: { id } });
  return result;
};

export const tourService = {
  createTour,
  getTourList,
  getTourById,
  getMyTour,
  updateTour,
  toggleStatusTour,
  softDeleteTour,
  deleteTour,
};