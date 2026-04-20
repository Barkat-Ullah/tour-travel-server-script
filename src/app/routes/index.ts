import express from 'express';
import { UserRouters } from '../modules/user/user.routes';
import { FollowRoutes } from '../modules/follow/follow.routes';
import { favoriteRoutes } from '../modules/favorite/favorite.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { AuthRouters } from '../modules/auth/auth.routes';
import { notificationsRoute } from '../modules/notifications/notification.routes';
import { tourRoutes } from "../modules/tour/tour.routes";
import { divisionRoutes } from "../modules/division/division.routes";

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
