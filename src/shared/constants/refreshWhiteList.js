import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import { airCancelRoutes } from 'src/airCancel/constants/airCancelRoutes';
import { airChangeRoutes } from 'src/airChange/constants/airChangeRoutes';
import { airReaccomRoutes } from 'src/airChange/constants/airReaccomRoutes';
import { airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { carCancelRoutes } from 'src/carCancel/constants/carCancelRoutes';
import { checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import { flightStatusRoutes } from 'src/flightStatus/constants/flightStatusRoutes';
import { travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import { viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

const WCM_PAGE_URL = [
  '/subscription-details',
  '/hazardous-materials',
  '/baggage-restrictions',
  '/taxes-and-fees',
  '/fare-rules',
  '/fare-rules/:fareType',
  '/privacy-policy',
  '/swabiz-learn-more',
  '/swabiz-learn-more-not-associated',
  '/terms-and-conditions',
  '/forms-of-payment',
  '/cancellation-policy',
  '/page/contract-of-carriage',
  '/page/check-in-refund-information',
  '/flying-southwest',
  '/at-the-airport',
  '/in-the-air',
  '/boarding-the-plane',
  '/car/limit-of-liability',
  '/car/vendor-terms-and-conditions',
  '/contact-us',
  '/rapid-rewards',
  '/airport-info/:code',
  '/fare-details',
  '/early-bird-check-in',
  '/standby-policies',
  '/about-rapid-rewards',
  '/email-enroll',
  '/special-assistance-info',
  '/funds-terms-conditions',
  '/home/offers'
];

const AIR_CANCEL_FLOW_URL = [
  '/air/cancel/:recordLocator',
  '/air/cancel/:recordLocator/refund-summary',
  '/air/cancel/:recordLocator/select-bound',
  '/air/cancel/select-passengers',
  '/air/cancel-reservation',
  '/air/cancel-reservation/',
  '/air/cancel-reservation/view.html',
  ...Object.values(airCancelRoutes)
];

const AIR_BOOKING_FLOW_URL = [
  '/air/booking',
  '/air/booking/',
  '/air/booking/index.html',
  '/air/booking/shopping',
  '/air/booking/shopping/select-passengers',
  '/air/booking/shopping/low-fare-calendar',
  '/air/booking/shopping/low-fare-calendar/date-select',
  '/air/booking/shopping/fare-details',
  '/air/booking/shopping/recent',
  '/air/booking/shopping/:paxType/:direction/results',
  '/air/booking/shopping/select-fare',
  '/air/booking/pricing/repricing',
  '/air/booking/pricing/summary',
  '/air/booking/pricing/review',
  '/air/booking/passengers/:paxNumber',
  '/air/booking/passengers/:paxNumber/edit',
  '/air/booking/passengers/:paxNumber/frequent-travelers',
  '/air/booking/passengers/:paxNumber/special-assistance',
  '/air/booking/contact-method',
  '/air/booking/:paxNumber/contact-info-travel-manager',
  '/air/booking/payment',
  '/air/booking/payment/edit',
  '/air/booking/review',
  '/air/booking/review/paypal',
  '/air/booking/review/paypal-canceled',
  '/air/booking/confirmation',
  '/air/booking/apply-rapid-rewards',
  '/air/booking/apply-travel-funds',
  '/air/booking/billing-address',
  '/air/low-fare-calendar',
  '/air/low-fare-calendar/select-dates.html',
  ...Object.values(airBookingRoutes)
];

const ENROLL_FLOW_URL = [
  '/enroll',
  '/enroll/',
  '/enroll/contact-info',
  '/enroll/security-info',
  '/enroll/confirmation',
  ...Object.values(enrollRoutes)
];

const EARLY_BIRD_FLOW_URL = [
  '/earlybird',
  '/earlybird/',
  '/earlybird/checkin',
  '/earlybird/checkin/:pnr',
  '/earlybird/checkin/:pnr/confirmation',
  '/earlybird/checkin/:pnr/payment',
  '/earlybird/checkin/:pnr/review',
  '/earlybird/checkin/:pnr/review/paypal-canceled',
  '/earlybird/checkin/:pnr/review/paypal',
  '/earlybird/confirmation.html',
  '/earlybird/index.html',
  '/earlybird/payment.html',
  '/earlybird/purchase.html',
  '/earlybird/purchase/paypal-canceled',
  '/earlybird/purchase/paypal',
  '/earlybird/select.html'
];

const UPGRADED_BOARDING_FLOW_URL = [
  '/upgraded-boarding',
  '/upgraded-boarding/',
  '/upgraded-boarding/index.html',
  '/upgraded-boarding/purchase',
  '/upgraded-boarding/purchase/paypal',
  '/upgraded-boarding/purchase/paypal-canceled',
  '/upgraded-boarding/confirmation',
  ...Object.values(upgradedBoardingRoutes)
];

const VIEW_RESERVATION_FLOW_URL = [
  '/air/manage-reservation',
  '/air/manage-reservation/',
  '/air/manage-reservation/index.html',
  '/car/manage-reservation',
  '/car/manage-reservation/',
  '/car/manage-reservation/index.html?tab=CAR',
  '/view-reservation',
  '/view-reservation/car-details',
  '/view-reservation/trip-details/:recordLocator',
  '/view-reservation/trip-details/:recordLocator/contact-method',
  '/view-reservation/trip-details/travel-info-page/:passengerReference',
  '/view-reservation/trip-details/travel-info-page/:passengerReference/special-assistance',
  '/view-reservation/car-details',
  ...Object.values(viewReservationRoutes)
];

const AIR_CHANGE_FLOW_URL = [
  '/air/change',
  '/air/change/',
  '/air/change/shopping',
  '/air/change/shopping/fare-details',
  '/air/change/shopping/:paxType/:direction/results',
  '/air/change/shopping/select-fare',
  '/air/change/pricing/summary',
  '/air/change/pricing/repricing',
  '/air/change/pricing/review',
  '/air/change/contact-method',
  '/air/change/pricing/payment',
  '/air/change/confirmation',
  '/air/change/pricing/review/paypal',
  '/air/change/pricing/review/paypal-canceled',
  '/air/change/reaccom/summary',
  '/air/change/apply-travel-funds',
  '/air/change/select-passengers',
  '/air/change/price.html',
  '/air/change/inbound/select-fare',
  '/air/change/view.html',
  ...Object.values(airChangeRoutes)
];

const AIR_REACCOM_FLOW_URL = [
  ...Object.values(airReaccomRoutes)
];

const CHECK_IN_FLOW_URL = [
  '/check-in',
  '/check-in/',
  '/check-in/:paxNumber/passportPage',
  '/check-in/:paxNumber/additional-passport-info',
  '/check-in/:paxNumber/additional-passport-info/green-card',
  '/check-in/:paxNumber/additional-passport-info/visa',
  '/check-in/:paxNumber/additional-passport-info/destination',
  '/check-in/confirmation',
  '/check-in/confirmation/:pnr/contact-method',
  '/check-in/boarding-positions',
  '/check-in/boarding-pass',
  '/check-in/choose-boarding-passes',
  '/check-in/hazmat-declaration',
  ...Object.values(checkInRoutes)
];

const CAR_BOOKING_FLOW_URL = [
  '/car/booking',
  '/car/booking/',
  '/car/booking/index.html',
  '/car/booking/shopping/recent',
  '/car/booking/results',
  '/car/booking/pricing',
  '/car/booking/purchase',
  '/car/booking/driver-info',
  '/car/booking/confirmation',
  ...Object.values(carBookingRoutes)
];

const FLIGHT_STATUS_FLOW_URL = [
  '/air/flight-status',
  '/air/flight-status/',
  '/air/flight-status/index.html',
  '/flight-status',
  '/flight-status/recent',
  '/flight-status/:from/:to/:date',
  '/flight-details',
  ...Object.values(flightStatusRoutes)
];

const COMPANION_FLOW_URL = [
  '/companion/pricing',
  '/companion/passenger',
  '/companion/contact-method',
  '/companion/payment',
  '/companion/purchase',
  '/companion/confirmation',
  '/companion/paymentEdit',
  '/companion/review',
  '/companion/passengerEdit',
  '/companion/purchase/paypal',
  '/companion/purchase/paypal-canceled',
  '/companion/special-assistance',
  '/companion/apply-travel-funds',
  '/companion/billing-address'
];

const CAR_CANCEL_FLOW_URL = [
  '/car/cancel',
  '/car/cancel/',
  '/car/cancel/confirmation',
  ...Object.values(carCancelRoutes)
];

const TRAVEL_FUNDS_FLOW_URL = [
  '/travel-funds',
  '/travel-funds/',
  '/travel-funds/index.html',
  '/travel-funds/look-up',
  '/travel-funds/transfer-funds',
  '/travel-funds/transfer-funds/confirmation',
  ...Object.values(travelFundsRoutes)
];

const AIR_UPGRADE_FLOW_URL = [
  '/air/upgrade',
  '/air/upgrade/',
  '/air/upgrade/index.html',
  ...Object.values(airUpgradeRoutes)
];

const MY_ACCOUNT_FLOW_URL = [
  '/my-account/upcoming-trips',
  '/my-account/my-rapid-rewards',
  '/my-account/my-rapid-rewards/promotions',
  '/my-account',
  '/my-account/',
  '/my-account/saved-flights',
  '/my-account/past-flights',
  '/my-account/tier-benefits-page',
  '/my-account/upcoming-trip-details/:tripIndex',
  '/my-account/upcoming-trip-details/:tripIndex/contact-method',
  '/my-account/promo-codes'
];

const SAME_DAY_CHANGE_STANDBY_FLOW_URL = [
  '/same-day/bound-selection',
  '/same-day/shopping',
  '/same-day/shopping/select-fare',
  '/same-day/price-difference',
  '/same-day/price-difference/paypal',
  '/same-day/price-difference/paypal-canceled',
  '/same-day/refund-method',
  '/same-day/refund-method/paypal',
  '/same-day/refund-method/paypal-canceled',
  '/same-day/confirmation'
];

const refreshWhiteList = [
  ...AIR_BOOKING_FLOW_URL,
  ...AIR_CANCEL_FLOW_URL,
  ...AIR_CHANGE_FLOW_URL,
  ...AIR_REACCOM_FLOW_URL,
  ...AIR_UPGRADE_FLOW_URL,
  ...CAR_BOOKING_FLOW_URL,
  ...CAR_CANCEL_FLOW_URL,
  ...CHECK_IN_FLOW_URL,
  ...COMPANION_FLOW_URL,
  ...EARLY_BIRD_FLOW_URL,
  ...ENROLL_FLOW_URL,
  ...FLIGHT_STATUS_FLOW_URL,
  ...MY_ACCOUNT_FLOW_URL,
  ...SAME_DAY_CHANGE_STANDBY_FLOW_URL,
  ...TRAVEL_FUNDS_FLOW_URL,
  ...UPGRADED_BOARDING_FLOW_URL,
  ...VIEW_RESERVATION_FLOW_URL,
  ...WCM_PAGE_URL,
  '/',
  '/404',
  '/blank',
  '/chase/offer/apply',
  '/chase/offer/email',
  '/feature-toggles',
  '/payment/external',
  '/redirect-branch',
  '/sitemap.xml',
  '/standby',
  '/view-app-config',
  '/where-we-fly'
];

export default refreshWhiteList;
