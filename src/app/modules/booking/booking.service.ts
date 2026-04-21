import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IPaginationOptions } from '../../interface/pagination.type';
import { paginationHelper } from '../../utils/calculatePagination';
import ApiError from '../../errors/AppError';
import { Request } from 'express';
import { bookingSelect } from './booking.select';
import { buildFilterConditions } from './booking.utils';

// -------------------------------------------------------
// CREATE BOOKING (User can book a tour)
// -------------------------------------------------------
const createBooking = async (req: Request) => {
  const userId = req.user.id;
  const { tourId, numberOfGuests, totalAmount, specialRequest, title } =
    req.body;

  // 1. Check if tour exists and is available
  const tour = await prisma.tour.findUnique({
    where: {
      id: tourId,
      isDeleted: false,
    },
    select: {
      title: true,
      status: true,
      maxGuest: true,
    },
  });

  if (!tour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }

  if (tour.status !== 'Upcoming') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Tour is ${tour.status.toLowerCase()}. Booking not allowed.`,
    );
  }

  // 2. Check max guest limit (if set)
  if (tour.maxGuest > 0 && numberOfGuests > tour.maxGuest) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Maximum ${tour.maxGuest} guests allowed for this tour`,
    );
  }

  const bookingData = {
    userId,
    tourId,
    title: title || tour.title, // title না দিলে tour থেকে নেবে
    numberOfGuests,
    totalAmount,
    specialRequest: specialRequest || null,
    // status → default: Pending (model থেকে)
    // paymentStatus → default: Unpaid (model থেকে)
  };

  const result = await prisma.booking.create({
    data: bookingData,
    select: bookingSelect,
  });

  return result;
};

// -------------------------------------------------------
// GET ALL BOOKINGS (Admin)
// -------------------------------------------------------
const bookingSearchAbleFields = ['title'];

type IBookingFilterRequest = {
  searchTerm?: string;
  id?: string;
  createdAt?: string;
  status?: string;
  paymentStatus?: string;
};

const getBookingList = async (
  options: IPaginationOptions,
  filters: IBookingFilterRequest,
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.BookingWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [result, total] = await Promise.all([
    prisma.booking.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: bookingSelect,
    }),
    prisma.booking.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// GET SINGLE BOOKING
// -------------------------------------------------------
const getBookingById = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: { id },
    select: bookingSelect,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return result;
};

// -------------------------------------------------------
// GET MY BOOKINGS
// -------------------------------------------------------
const getMyBooking = async (
  req: Request,
  options: IPaginationOptions,
  filters: IBookingFilterRequest,
) => {
  const userId = req.user.id;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.BookingWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push(...buildFilterConditions(filterData));
  }

  const whereConditions: Prisma.BookingWhereInput = { AND: andConditions };

  const [result, total] = await Promise.all([
    prisma.booking.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: { createdAt: 'desc' },
      select: bookingSelect,
    }),
    prisma.booking.count({ where: whereConditions }),
  ]);

  return { meta: { total, page, limit }, data: result };
};

// -------------------------------------------------------
// UPDATE BOOKING
// -------------------------------------------------------
const updateBooking = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await prisma.booking.update({
    where: { id },
    data: {
      title: data.title,
      numberOfGuests: data.numberOfGuests,
      totalAmount: data.totalAmount,
      status: data.status,
      paymentStatus: data.paymentStatus,
      specialRequest: data.specialRequest,
      isDeleted: data.isDeleted,
    },
    select: bookingSelect,
  });

  return result;
};

// -------------------------------------------------------
// TOGGLE STATUS (Pending ↔ Confirmed ↔ Cancelled)
// -------------------------------------------------------
const toggleStatusBooking = async (id: string) => {
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const current = existing.status as string;

  let newStatus: 'Pending' | 'Confirmed' | 'Cancelled';

  if (current === 'Pending') newStatus = 'Confirmed';
  else if (current === 'Confirmed') newStatus = 'Cancelled';
  else newStatus = 'Pending';

  const result = await prisma.booking.update({
    where: { id },
    data: { status: newStatus },
    select: bookingSelect,
  });

  return result;
};

// -------------------------------------------------------
// SOFT DELETE
// -------------------------------------------------------
const softDeleteBooking = async (id: string) => {
  const existing = await prisma.booking.findUnique({
    where: { id, isDeleted: false },
  });
  if (!existing) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Booking not found or already deleted',
    );
  }

  const result = await prisma.booking.update({
    where: { id },
    data: { isDeleted: true },
    select: bookingSelect,
  });
  return result;
};

// -------------------------------------------------------
// HARD DELETE
// -------------------------------------------------------
const deleteBooking = async (id: string) => {
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await prisma.booking.delete({ where: { id } });
  return result;
};

export const bookingService = {
  createBooking,
  getBookingList,
  getBookingById,
  getMyBooking,
  updateBooking,
  toggleStatusBooking,
  softDeleteBooking,
  deleteBooking,
};
