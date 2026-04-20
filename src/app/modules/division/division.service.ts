import httpStatus from 'http-status';
import prisma from '../../utils/prisma';
import { Request } from 'express';
import ApiError from '../../errors/AppError';
import { handleFileUploads } from '../../utils/handleFile';
import { divisionSelect } from './division.select';

const createDivision = async (req: Request) => {
  const data = req.body;
  const file = req.file;

  const uploadedFile = await handleFileUploads({ image: file ? [file] : [] });

  const result = await prisma.division.create({
    data: {
      ...data,
      ...uploadedFile,
    },
    select: divisionSelect,
  });

  return result;
};

const getAllDivisions = async () => {
  return await prisma.division.findMany({
    where: { isDeleted: false },
    select: divisionSelect,
    orderBy: { createdAt: 'desc' },
  });
};

const getDivisionById = async (id: string) => {
  const result = await prisma.division.findUnique({
    where: { id },
    select: divisionSelect,
  });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Division not found');
  return result;
};

const updateDivision = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  const existing = await prisma.division.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, 'Division not found');

  const uploadedFile = await handleFileUploads({ image: file ? [file] : [] });

  const result = await prisma.division.update({
    where: { id },
    data: {
      ...data,
      ...uploadedFile,
    },
    select: divisionSelect,
  });

  return result;
};

const softDeleteDivision = async (id: string) => {
  const existing = await prisma.division.findUnique({
    where: { id, isDeleted: false },
  });
  if (!existing)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Division not found or already deleted',
    );

  return await prisma.division.update({
    where: { id },
    data: { isDeleted: true },
    select: divisionSelect,
  });
};

const deleteDivision = async (id: string) => {
  const existing = await prisma.division.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, 'Division not found');

  return await prisma.division.delete({ where: { id } });
};

export const divisionService = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  softDeleteDivision,
  deleteDivision,
};
