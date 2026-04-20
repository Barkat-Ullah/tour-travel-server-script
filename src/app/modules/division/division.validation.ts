import { z } from 'zod';

const createDivisionSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  slug: z.string({ required_error: 'Slug is required' }),
});

const updateDivisionSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
});

export const divisionValidation = {
  createDivisionSchema,
  updateDivisionSchema,
};
