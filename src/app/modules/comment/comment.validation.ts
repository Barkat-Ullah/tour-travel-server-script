import { z } from 'zod';

const createSchema = z.object({
  tourId: z.string({ required_error: 'tourId is required' }),
  description: z
    .string({ required_error: 'description is required' })
    .min(1, 'Description cannot be empty'),
});

const replySchema = z.object({
  description: z
    .string({ required_error: 'description is required' })
    .min(1, 'Description cannot be empty'),
});

export const commentValidation = {
  createSchema,
  replySchema,
};
