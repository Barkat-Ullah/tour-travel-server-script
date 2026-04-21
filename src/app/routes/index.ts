import express from 'express';
import { UserRouters } from '../modules/user/user.routes';
import { FollowRoutes } from '../modules/follow/follow.routes';
import { favoriteRoutes } from '../modules/favorite/favorite.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { AuthRouters } from '../modules/auth/auth.routes';
import { notificationsRoute } from '../modules/notifications/notification.routes';
import { tourRoutes } from "../modules/tour/tour.routes";
import { divisionRoutes } from "../modules/division/division.routes";
import { commentRoutes } from "../modules/comment/comment.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/follow',
    route: FollowRoutes,
  },
  {
    path: '/notifications',
    route: notificationsRoute,
  },

  {
    path: '/favorite',
    route: favoriteRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },


  {
    path: "/tours",
    route: tourRoutes,
  },

  {
    path: "/divisions",
    route: divisionRoutes,
  },

  {
    path: "/comments",
    route: commentRoutes,
  },

  {
    path: "/reviews",
    route: reviewRoutes,
  },

  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
