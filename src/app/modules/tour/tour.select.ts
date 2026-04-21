import { Prisma } from '@prisma/client';

export const tourSelect = {
  id: true,
  divisionId: true,
  title: true,
  description: true,
  thumbnail: true,
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

  // Relations
  division: {
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
    },
  },

  comment: {
    select: {
      id: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          image: true,
        },
      },
      parent: {
        select: {
          id: true,
          description: true,
          user: {
            select: {
              id: true,
              fullName: true,
              image: true,
            },
          },
        },
      },
      replies: {
        select: {
          id: true,
          description: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              fullName: true,
              image: true,
            },
          },
        },
      },
    },
  },

  review: {
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          image: true,
        },
      },
    },
  },

  _count: {
    select: {
      review: true,
      favorite: true,
      comment: true,
    },
  },
} satisfies Prisma.TourSelect;
