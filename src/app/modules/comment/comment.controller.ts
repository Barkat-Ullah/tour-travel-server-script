import httpStatus from 'http-status';
import { commentService } from './comment.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// create top-level comment
const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.createComment(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

// reply to a comment
const replyComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.replyComment(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Reply created successfully',
    data: result,
  });
});

// delete comment (only owner can delete)
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.deleteComment(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

const updateComment= catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.updateComment(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});
export const commentController = {
  createComment,
  replyComment,
  deleteComment,
  updateComment,
};
