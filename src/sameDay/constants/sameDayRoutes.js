import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';

export const sameDayRoutes = {
  cancel: '/standby/cancel-confirmation',
  checkInBoardingPosition: checkInRoutes['checkInBoardingPosition'],
  confirmation: '/same-day/confirmation',
  review: '/same-day/price-difference',
  shopping: '/same-day/shopping'
};

export const sameDayOldRoutes = {
  checkInBoardingPosition: checkInOldRoutes['checkInBoardingPosition']
};
