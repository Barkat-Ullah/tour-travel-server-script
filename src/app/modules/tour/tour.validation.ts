import { z } from 'zod';
import { TourStatus } from '@prisma/client';

const createSchema = z.object({
  divisionId: z.string({ required_error: 'divisionId is required' }),
  title: z.string({ required_error: 'title is required' }),
  description: z.string({ required_error: 'description is required' }),
  location: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  costFrom: z.number().int().optional(),
  startDate: z.coerce.date({ required_error: 'startDate is required' }),
  endDate: z.coerce.date({ required_error: 'endDate is required' }),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  amenities: z.array(z.string()),
  tourPlan: z.array(z.string()),
  maxGuest: z.number().int().optional(),
  minAge: z.number().int().optional(),
  status: z.nativeEnum(TourStatus).optional(),
});

const updateSchema = z.object({
  divisionId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  costFrom: z.number().int().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().int().optional(),
  minAge: z.number().int().optional(),
  status: z.nativeEnum(TourStatus).optional(),
});

export const tourValidation = {
  createSchema,
  updateSchema,
};
