import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IPaginationOptions } from '../../interface/pagination.type';
import { paginationHelper } from '../../utils/calculatePagination';
import ApiError from '../../errors/AppError';
import { Request } from 'express';
import { handleFileUploads } from '../../utils/handleFile';
import { reviewSelect } from './review.select';
import { buildFilterConditions } from './review.utils';

// -------------------------------------------------------
// create Review
// -------------------------------------------------------
const createReview = async (req: Request) => {
  const userId = req.user.id;
  const data = req.body;

  const addedData = { ...data, userId };
  const result = await prisma.review.create({
    data: addedData,
    select: reviewSelect,
  });
  return result;
};

// -------------------------------------------------------
// get all Review
// -------------------------------------------------------
type IReviewFilterRequest = {
  searchTerm?: string;
  id?: string;
  createdAt?: string;
  status?: string;
};

const reviewSearchAbleFields = ['fullName', 'email'];

const getReviewList = async (
  options: IPaginationOptions,
  filters: IReviewFilterRequest,
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: reviewSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

   if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [result, total] = await Promise.all([
      prisma.review.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: reviewSelect,
    }),
    prisma.review.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// get Review by id
// -------------------------------------------------------
const getReviewById = async (id: string) => {
  const result = await prisma.review.findUnique({
    where: { id },
    select: reviewSelect,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  return result;
};

// -------------------------------------------------------
// get my Review
// -------------------------------------------------------
const getMyReview = async (
  req: Request,
  options: IPaginationOptions,
  filters: IReviewFilterRequest,
) => {
  const userId = req.user.id;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  // const andConditions: Prisma.ReviewWhereInput[] = [];
  const andConditions: Prisma.ReviewWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: reviewSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

   if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.ReviewWhereInput = { AND: andConditions };

  const [result, total] = await Promise.all([
      prisma.review.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: reviewSelect,
    }),
    prisma.review.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// update Review
// -------------------------------------------------------
const updateReview = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;
  const existingReview = await prisma.review.findUnique({ where: { id } });
  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  const result = await prisma.review.update({
    where: { id },
    data: {
      tourId: data.tourId ?? (existingReview as any).tourId,
      rating: data.rating ?? (existingReview as any).rating,
      comment: data.comment ?? (existingReview as any).comment,
      isDeleted: data.isDeleted ?? (existingReview as any).isDeleted,
    },
    select: reviewSelect,
  });

  return result;
};


// -------------------------------------------------------
// soft delete Review
// -------------------------------------------------------
const softDeleteReview = async (id: string) => {
  const existingReview = await prisma.review.findUnique({ where: { id , isDeleted: false} });
  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found or Review is already deleted');
  }

  const result = await prisma.review.update({
    where: { id },
    data: { isDeleted: true },
    select: reviewSelect,
  });
  return result;
};

// -------------------------------------------------------
// hard delete Review
// -------------------------------------------------------
const deleteReview = async (id: string) => {
  const existingReview = await prisma.review.findUnique({ where: { id } });
  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const result = await prisma.review.delete({ where: { id } });
  return result;
};

export const reviewService = {
  createReview,
  getReviewList,
  getReviewById,
  getMyReview,
  updateReview,
  softDeleteReview,
  deleteReview,
};