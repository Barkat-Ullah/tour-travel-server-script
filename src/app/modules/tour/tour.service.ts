import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IPaginationOptions } from '../../interface/pagination.type';
import { paginationHelper } from '../../utils/calculatePagination';
import ApiError from '../../errors/AppError';
import { Request } from 'express';
import { fileUploader } from '../../utils/fileUploader';
import { tourSelect } from './tour.select';
import { buildFilterConditions } from './tour.utils';

// Searchable fields
const tourSearchAbleFields = [
  'title',
  'description',
  'location',
  'departureLocation',
  'arrivalLocation',
];

// -------------------------------------------------------
// CREATE TOUR (with separate thumbnail upload)
// -------------------------------------------------------
const createTour = async (req: Request) => {
  const data = req.body;
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  let imageUrls: string[] = [];
  if (files?.image?.length) {
    const uploadPromises = files.image.map(file =>
      fileUploader.uploadToCloudinaryWithType(file, 'image'),
    );
    const uploads = await Promise.all(uploadPromises);
    imageUrls = uploads.map(u => u.Location);
  }

  let thumbnailUrl: string | null = null;
  if (files?.thumbnail?.[0]) {
    const upload = await fileUploader.uploadToCloudinaryWithType(
      files.thumbnail[0],
      'image',
    );
    thumbnailUrl = upload.Location;
  }

  const tourData = {
    ...data,
    image: imageUrls,
    thumbnail: thumbnailUrl || imageUrls[0] || null,
  };

  const result = await prisma.tour.create({
    data: tourData,
    select: tourSelect,
  });

  return result;
};

// -------------------------------------------------------
// GET ALL TOURS
// -------------------------------------------------------
type ITourFilterRequest = {
  searchTerm?: string;
  id?: string;
  createdAt?: string;
  status?: string;
  isDeleted?: string;
};

const getTourList = async (
  options: IPaginationOptions,
  filters: ITourFilterRequest,
  userId?: string,
) => {
  const {
    page,
    limit,
    skip,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = paginationHelper.calculatePagination(options);

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

  const favorite = await prisma.favorite.findMany({
    where: { userId },
    select: { tourId: true },
  });
  const favoriteIds = favorite.map(f => f.tourId);
  whereConditions.id = { in: favoriteIds };

  const [result, total] = await Promise.all([
    prisma.tour.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { [sortBy]: sortOrder as 'asc' | 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        location: true,
        costFrom: true,
        startDate: true,
        endDate: true,
        status: true,
        isDeleted: true,
        createdAt: true,
        division: {
          select: { id: true, title: true, slug: true, image: true },
        },
        _count: { select: { favorite: true, review: true } },
      },
    }),
    prisma.tour.count({ where: whereConditions }),
  ]);
  const formattedData = result.map(tour => ({
    ...tour,
    isFavorite: favoriteIds.includes(tour.id),
  }));

  return { meta: { total, page, limit }, data: formattedData };
};

// -------------------------------------------------------
// GET TOUR BY ID
// -------------------------------------------------------
const getTourById = async (id: string, userId?: string) => {
  const tour = await prisma.tour.findUnique({
    where: { id },
    select: tourSelect,
  });

  if (!tour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }

  let isFavorite = false;
  if (userId) {
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        tourId: id,
      },
    });
    isFavorite = !!favorite;
  }

  return {
    ...tour,
    isFavorite,
  };
};
// -------------------------------------------------------
// GET MY TOUR
// -------------------------------------------------------
const getMyTour = async (
  req: Request,
  options: IPaginationOptions,
  filters: ITourFilterRequest,
) => {
  const userId = req.user.id;
  return getTourList(options, filters, userId);
};

// -------------------------------------------------------
// UPDATE TOUR (with separate thumbnail upload)
// -------------------------------------------------------
const updateTour = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  const existing = await prisma.tour.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');

  // 1. Upload new images if provided
  let imageUrls: string[] = [];
  if (files?.image?.length) {
    const uploadPromises = files.image.map(file =>
      fileUploader.uploadToCloudinaryWithType(file, 'image'),
    );
    const uploads = await Promise.all(uploadPromises);
    imageUrls = uploads.map(u => u.Location);
  }

  // 2. Upload new thumbnail if provided
  let thumbnailUrl: string | undefined;
  if (files?.thumbnail?.[0]) {
    const upload = await fileUploader.uploadToCloudinaryWithType(
      files.thumbnail[0],
      'image',
    );
    thumbnailUrl = upload.Location;
  }

  const updateData: any = { ...data };

  if (imageUrls.length > 0) {
    updateData.image = imageUrls;
  }

  if (thumbnailUrl !== undefined) {
    updateData.thumbnail = thumbnailUrl;
  } else if (data.thumbnail !== undefined) {
    updateData.thumbnail = data.thumbnail;
  } else if (imageUrls.length > 0) {
    updateData.thumbnail = imageUrls[0];
  }

  const result = await prisma.tour.update({
    where: { id },
    data: updateData,
  });

  return result;
};

// -------------------------------------------------------
// TOGGLE STATUS
// -------------------------------------------------------
const toggleStatusTour = async (id: string) => {
  const existing = await prisma.tour.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');

  const current = existing.status;
  let newStatus: any;
  switch (current) {
    case 'Upcoming':
      newStatus = 'Ongoing';
      break;
    case 'Ongoing':
      newStatus = 'Completed';
      break;
    case 'Completed':
      newStatus = 'Upcoming';
      break;
    default:
      newStatus = 'Upcoming';
  }

  const result = await prisma.tour.update({
    where: { id },
    data: { status: newStatus },
  });
  return result;
};

// -------------------------------------------------------
// SOFT DELETE
// -------------------------------------------------------
const softDeleteTour = async (id: string) => {
  const existing = await prisma.tour.findUnique({
    where: { id, isDeleted: false },
  });
  if (!existing)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Tour not found or already deleted',
    );

  const result = await prisma.tour.update({
    where: { id },
    data: { isDeleted: true },
  });
  return result;
};

// -------------------------------------------------------
// HARD DELETE
// -------------------------------------------------------
const deleteTour = async (id: string) => {
  const existing = await prisma.tour.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');

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
