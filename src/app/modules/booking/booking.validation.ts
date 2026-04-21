import { z } from 'zod';
import { BookingStatus, PaymentStatus } from '@prisma/client';

const createSchema = z.object({
  tourId: z.string({ required_error: 'tourId is required', invalid_type_error: 'Invalid tourId' }),
  title: z.string({ required_error: 'title is required', invalid_type_error: 'Invalid title' }),
  numberOfGuests: z.number({ required_error: 'numberOfGuests is required', invalid_type_error: 'Invalid numberOfGuests' }).int('Must be an integer'),
  totalAmount: z.number({ required_error: 'totalAmount is required', invalid_type_error: 'Invalid totalAmount' }).int('Must be an integer'),
  status: z.nativeEnum(BookingStatus, { required_error: 'status is required', invalid_type_error: 'Invalid status' }).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus, { required_error: 'paymentStatus is required', invalid_type_error: 'Invalid paymentStatus' }).optional(),
  specialRequest: z.string({ required_error: 'specialRequest is required', invalid_type_error: 'Invalid specialRequest' }).optional(),
});

const updateSchema = z.object({
  tourId: z.string({ required_error: 'tourId is required', invalid_type_error: 'Invalid tourId' }).optional(),
  title: z.string({ required_error: 'title is required', invalid_type_error: 'Invalid title' }).optional(),
  numberOfGuests: z.number({ required_error: 'numberOfGuests is required', invalid_type_error: 'Invalid numberOfGuests' }).int('Must be an integer').optional(),
  totalAmount: z.number({ required_error: 'totalAmount is required', invalid_type_error: 'Invalid totalAmount' }).int('Must be an integer').optional(),
  status: z.nativeEnum(BookingStatus, { required_error: 'status is required', invalid_type_error: 'Invalid status' }).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus, { required_error: 'paymentStatus is required', invalid_type_error: 'Invalid paymentStatus' }).optional(),
  specialRequest: z.string({ required_error: 'specialRequest is required', invalid_type_error: 'Invalid specialRequest' }).optional(),
  isDeleted: z.boolean({ required_error: 'isDeleted is required', invalid_type_error: 'Invalid isDeleted' }).optional(),
});

export const bookingValidation = {
  createSchema,
  updateSchema,
};