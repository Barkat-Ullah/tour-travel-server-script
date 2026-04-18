import { Prisma } from '@prisma/client';

/**
 * ✏️  MANUALLY EDITABLE SELECT
 *
 * • Scalar fields  → set to `true` (included) or `false` / remove line (excluded)
 * • Relation fields → uncomment and customize the nested select as needed
 *
 * This file is generated ONCE. The generator will never overwrite it.
 */
export const tourSelect = {
  id: true,
  divisionId: true,
  title: true,
  description: true,
  image: true,
  location: true,
  lat: true,
  lon: true,
  costFrom: true,
  startDate: true,
  endDate: true,
  departureLocation: true,
  arrivalLocation: true,
  included: true,
  excluded: true,
  amenities: true,
  tourPlan: true,
  maxGuest: true,
  minAge: true,
  status: true,
  isDeleted: true,
  createdAt: true,
  updatedAt: true,
  // division: { select: { id: true } }, // ← uncomment to include relation
  // favorite: { select: { id: true } }, // ← uncomment to include relation
  // booking: { select: { id: true } }, // ← uncomment to include relation
  // review: { select: { id: true } }, // ← uncomment to include relation
  // comment: { select: { id: true } }, // ← uncomment to include relation
  // payment: { select: { id: true } }, // ← uncomment to include relation
} satisfies Prisma.TourSelect;