import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import ApiError from '../../errors/AppError';
import { Request } from 'express';

// -------------------------------------------------------
// CREATE TOP-LEVEL COMMENT
// -------------------------------------------------------
const createComment = async (req: Request) => {
  const userId = req.user.id;
  const { tourId, description } = req.body;

  // Verify tour exists
  const tour = await prisma.tour.findUnique({ where: { id: tourId } });
  if (!tour) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tour not found');
  }

  const result = await prisma.comment.create({
    data: {
      userId,
      tourId,
      description,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          image: true,
        },
      },
    },
  });

  return result;
};

// -------------------------------------------------------
// REPLY TO A COMMENT
// -------------------------------------------------------
const replyComment = async (req: Request) => {
  const userId = req.user.id;
  const { parentId } = req.params;
  const { description } = req.body;

  // Verify parent comment exists and get its tourId
  const parent = await prisma.comment.findUnique({
    where: { id: parentId },
    select: { tourId: true },
  });

  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent comment not found');
  }

  const result = await prisma.comment.create({
    data: {
      userId,
      tourId: parent.tourId,
      description,
      parentId,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          image: true,
        },
      },
    },
  });

  return result;
};

// -------------------------------------------------------
// DELETE COMMENT (only owner can delete)
// -------------------------------------------------------
const deleteComment = async (req: Request) => {
  const { id } = req.params;
  const userId = req.user.id;

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  if (comment.userId !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You can only delete your own comment',
    );
  }

  const result = await prisma.comment.delete({
    where: { id },
  });

  return result;
};

const updateComment = async (req: Request) => {
  const { id } = req.params;
  const { description } = req.body;

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  const result = await prisma.comment.update({
    where: { id },
    data: {
      description,
    },
  });

  return result;
};

export const commentService = {
  createComment,
  replyComment,
  deleteComment,
  updateComment,
};
