import { z } from 'zod';


const createSchema = z.object({
  tourId: z.string({ required_error: 'tourId is required', invalid_type_error: 'Invalid tourId' }),
  rating: z.number({ required_error: 'rating is required', invalid_type_error: 'Invalid rating' }).int('Must be an integer').optional(),
  comment: z.string({ required_error: 'comment is required', invalid_type_error: 'Invalid comment' }).optional(),
});

const updateSchema = z.object({
  tourId: z.string({ required_error: 'tourId is required', invalid_type_error: 'Invalid tourId' }).optional(),
  rating: z.number({ required_error: 'rating is required', invalid_type_error: 'Invalid rating' }).int('Must be an integer').optional(),
  comment: z.string({ required_error: 'comment is required', invalid_type_error: 'Invalid comment' }).optional(),
  isDeleted: z.boolean({ required_error: 'isDeleted is required', invalid_type_error: 'Invalid isDeleted' }).optional(),
});

export const reviewValidation = {
  createSchema,
  updateSchema,
};