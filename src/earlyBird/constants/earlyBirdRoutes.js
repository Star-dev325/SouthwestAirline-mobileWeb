export const earlyBirdRoutes = {
  checkin: '/earlybird/select.html',
  confirmation: '/earlybird/confirmation.html',
  index: {
    canonicalPath: '/earlybird/',
    htmlPath: '/earlybird/index.html'
  },
  payment: '/earlybird/payment.html',
  purchase: '/earlybird/purchase/paypal',
  review: '/earlybird/purchase.html'
};

export const earlyBirdOldRoutes = {
  checkin: '/earlybird/checkin/:pnr',
  confirmation: '/earlybird/checkin/:pnr/confirmation',
  index: '/earlybird/checkin',
  payment: '/earlybird/checkin/:pnr/payment',
  purchase: '/earlybird/checkin/:pnr/review/paypal',
  review: '/earlybird/checkin/:pnr/review'
};
