import { z } from 'zod';
import { TourStatus } from '@prisma/client';

const createSchema = z.object({
  divisionId: z.string({ required_error: 'divisionId is required', invalid_type_error: 'Invalid divisionId' }),
  title: z.string({ required_error: 'title is required', invalid_type_error: 'Invalid title' }),
  description: z.string({ required_error: 'description is required', invalid_type_error: 'Invalid description' }),
  image: z.array(z.string({ required_error: 'image is required', invalid_type_error: 'Invalid image' }), { required_error: 'image is required', invalid_type_error: 'Invalid image' }),
  location: z.string({ required_error: 'location is required', invalid_type_error: 'Invalid location' }).optional(),
  lat: z.number({ required_error: 'lat is required', invalid_type_error: 'Invalid lat' }).optional(),
  lon: z.number({ required_error: 'lon is required', invalid_type_error: 'Invalid lon' }).optional(),
  costFrom: z.number({ required_error: 'costFrom is required', invalid_type_error: 'Invalid costFrom' }).int('Must be an integer').optional(),
  startDate: z.coerce.date({ required_error: 'startDate is required', invalid_type_error: 'Invalid startDate' }),
  endDate: z.coerce.date({ required_error: 'endDate is required', invalid_type_error: 'Invalid endDate' }),
  departureLocation: z.string({ required_error: 'departureLocation is required', invalid_type_error: 'Invalid departureLocation' }).optional(),
  arrivalLocation: z.string({ required_error: 'arrivalLocation is required', invalid_type_error: 'Invalid arrivalLocation' }).optional(),
  included: z.array(z.string({ required_error: 'included is required', invalid_type_error: 'Invalid included' }), { required_error: 'included is required', invalid_type_error: 'Invalid included' }),
  excluded: z.array(z.string({ required_error: 'excluded is required', invalid_type_error: 'Invalid excluded' }), { required_error: 'excluded is required', invalid_type_error: 'Invalid excluded' }),
  amenities: z.array(z.string({ required_error: 'amenities is required', invalid_type_error: 'Invalid amenities' }), { required_error: 'amenities is required', invalid_type_error: 'Invalid amenities' }),
  tourPlan: z.array(z.string({ required_error: 'tourPlan is required', invalid_type_error: 'Invalid tourPlan' }), { required_error: 'tourPlan is required', invalid_type_error: 'Invalid tourPlan' }),
  maxGuest: z.number({ required_error: 'maxGuest is required', invalid_type_error: 'Invalid maxGuest' }).int('Must be an integer').optional(),
  minAge: z.number({ required_error: 'minAge is required', invalid_type_error: 'Invalid minAge' }).int('Must be an integer').optional(),
  status: z.nativeEnum(TourStatus, { required_error: 'status is required', invalid_type_error: 'Invalid status' }).optional(),
  isDeleted: z.boolean({ required_error: 'isDeleted is required', invalid_type_error: 'Invalid isDeleted' }).optional(),
});

const updateSchema = z.object({
  divisionId: z.string({ required_error: 'divisionId is required', invalid_type_error: 'Invalid divisionId' }).optional(),
  title: z.string({ required_error: 'title is required', invalid_type_error: 'Invalid title' }).optional(),
  description: z.string({ required_error: 'description is required', invalid_type_error: 'Invalid description' }).optional(),
  image: z.array(z.string({ required_error: 'image is required', invalid_type_error: 'Invalid image' }), { required_error: 'image is required', invalid_type_error: 'Invalid image' }).optional(),
  location: z.string({ required_error: 'location is required', invalid_type_error: 'Invalid location' }).optional(),
  lat: z.number({ required_error: 'lat is required', invalid_type_error: 'Invalid lat' }).optional(),
  lon: z.number({ required_error: 'lon is required', invalid_type_error: 'Invalid lon' }).optional(),
  costFrom: z.number({ required_error: 'costFrom is required', invalid_type_error: 'Invalid costFrom' }).int('Must be an integer').optional(),
  startDate: z.coerce.date({ required_error: 'startDate is required', invalid_type_error: 'Invalid startDate' }).optional(),
  endDate: z.coerce.date({ required_error: 'endDate is required', invalid_type_error: 'Invalid endDate' }).optional(),
  departureLocation: z.string({ required_error: 'departureLocation is required', invalid_type_error: 'Invalid departureLocation' }).optional(),
  arrivalLocation: z.string({ required_error: 'arrivalLocation is required', invalid_type_error: 'Invalid arrivalLocation' }).optional(),
  included: z.array(z.string({ required_error: 'included is required', invalid_type_error: 'Invalid included' }), { required_error: 'included is required', invalid_type_error: 'Invalid included' }).optional(),
  excluded: z.array(z.string({ required_error: 'excluded is required', invalid_type_error: 'Invalid excluded' }), { required_error: 'excluded is required', invalid_type_error: 'Invalid excluded' }).optional(),
  amenities: z.array(z.string({ required_error: 'amenities is required', invalid_type_error: 'Invalid amenities' }), { required_error: 'amenities is required', invalid_type_error: 'Invalid amenities' }).optional(),
  tourPlan: z.array(z.string({ required_error: 'tourPlan is required', invalid_type_error: 'Invalid tourPlan' }), { required_error: 'tourPlan is required', invalid_type_error: 'Invalid tourPlan' }).optional(),
  maxGuest: z.number({ required_error: 'maxGuest is required', invalid_type_error: 'Invalid maxGuest' }).int('Must be an integer').optional(),
  minAge: z.number({ required_error: 'minAge is required', invalid_type_error: 'Invalid minAge' }).int('Must be an integer').optional(),
  status: z.nativeEnum(TourStatus, { required_error: 'status is required', invalid_type_error: 'Invalid status' }).optional(),
  isDeleted: z.boolean({ required_error: 'isDeleted is required', invalid_type_error: 'Invalid isDeleted' }).optional(),
});

export const tourValidation = {
  createSchema,
  updateSchema,
};