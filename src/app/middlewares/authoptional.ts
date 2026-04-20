import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../errors/AppError';
import { verifyToken } from '../utils/verifyToken';
import { UserRoleEnum, UserStatus } from '@prisma/client';
import { insecurePrisma } from '../utils/prisma';

type TupleHasDuplicate<T extends readonly unknown[]> = T extends [
  infer F,
  ...infer R,
]
  ? F extends R[number]
    ? true
    : TupleHasDuplicate<R>
  : false;

type NoDuplicates<T extends readonly unknown[]> =
  TupleHasDuplicate<T> extends true ? never : T;

const authOptional = <T extends readonly (UserRoleEnum | 'ANY')[]>(
  ...roles: NoDuplicates<T> extends never ? never : T
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      // No token → completely optional, just continue
      if (!token) {
        return next();
      }

      // Token exists → try to validate it
      const verifyUserToken = verifyToken(
        token,
        config.jwt.access_secret as Secret,
      );

      // Check if user exists and is active
      const user = await insecurePrisma.user.findUnique({
        where: {
          id: verifyUserToken.id,
        },
      });

      if (!user) {
        return next(); // invalid token → treat as guest
      }
      if (user.isDeleted) {
        return next(); // deleted user → treat as guest
      }
      if (!user.isEmailVerified) {
        return next(); // not verified → treat as guest
      }
      if (user.status === UserStatus.SUSPENDED) {
        return next(); // suspended → treat as guest
      }
      
      // Attach extra user data
      if (user?.image) {
        verifyUserToken.image = user?.image;
      }

      req.user = verifyUserToken;

      // Role check (only applied if user is authenticated)
      if (roles.includes('ANY')) {
        return next();
      }

      if (roles.length && !roles.includes(verifyUserToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
      }

      next();
    } catch (error) {
      // Any error (invalid token, expired, malformed, etc.) → treat as guest
      // Do NOT call next(error) → we silently continue
      next();
    }
  };
};

export default authOptional;
