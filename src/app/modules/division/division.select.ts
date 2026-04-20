import { Prisma } from '@prisma/client';

export const divisionSelect = {
  id: true,
  title: true,
  slug: true,
  image: true,
  isDeleted: true,
  createdAt: true,
} satisfies Prisma.DivisionSelect;
