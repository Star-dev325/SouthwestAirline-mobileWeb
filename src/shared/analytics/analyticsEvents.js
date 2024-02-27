import _ from 'lodash';
import { matchPath } from 'react-router';
import { getPrevRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { transformPath, raiseEvent, raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import BrowserObject from 'src/shared/helpers/browserObject';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import AirCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import TravelFundsActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';
import RouteActionMethodConstants from 'src/shared/constants/routeActionMethodConstants';
import { UPLIFT } from 'src/shared/constants/creditCardTypes';
import { transformToUnitPrice } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';
import { hasAnyEligibleEarlyBirdProducts } from 'src/shared/selectors/earlyBirdSelector';
import { setIsRedirectingPath } from 'src/shared/actions/sharedActions';

const { window } = BrowserObject;
const {
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY,
  AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS
} = AirBookingActionTypes;
const { TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS, TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED } =
  TravelFundsActionTypes;
const { SHARED__ROUTE_CHANGED, SHARED__CALC_FUNDS_SUCCESS, SHARED__CALC_FUNDS_FAILED } = SharedActionTypes;
const { VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS } = ViewReservationActionTypes;
const { AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS } = AirCancelActionTypes;
const { CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS } = CheckInActionTypes;
const {
  SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  VIEW_MODAL,
  TRACK_SUBMIT_FORM,
  UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
  APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
  VIEW_TAB,
  PAGE_LOAD_COMPLETED,
  TRACK_CALENDAR_STRIP
} = AnalyticsActionTypes;
const { REPLACE } = RouteActionMethodConstants;

const sortByToEventNameMap = {
  departureTime: 'departure_time',
  startFromAmount: 'price',
  numberOfStops: 'number_of_stops',
  durationMinutes: 'duration'
};

const sharedRoutePageLoadBlackList = [
  /^\/my-account\/upcoming-trip-details\/[0-9]+[?]{1}.*$/,
  /^\/view-reservation\/trip-details\/[a-zA-Z0-9]{6}$/,
  /^\/blank/
];

const webViewPageLoadBlackList = [/^\/air\/booking\/shopping\/adult\/outbound\/results/];

export const fireAnalyticsEvents = (store) => (action) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY: {
      const {
        router: {
          location: { pathname }
        }
      } = store.getState();
      const pageIdentifier = transformPath(pathname);
      const sortEvent = `${pageIdentifier}_sort_by_${sortByToEventNameMap[action.sortBy]}`;

      _.set(window, 'data_a.events.sort', sortEvent);
      raiseEvent('sort');
      break;
    }
    case AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED: {
      raiseEvent('chaseBannerDisplayComplete');
      break;
    }
    case AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS: {
      const earlyBirdUpsell = _.get(action, 'response.results.earlyBirdUpsell');

      _.set(window, 'data_a.eboffered', earlyBirdUpsell ? '1' : '0');
      raiseEvent('chaseBannerDisplayComplete');
      break;
    }
    case AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS: {
      const earlyBirdUpsell = _.get(action, 'response.results.earlyBirdUpsell');

      _.set(window, 'data_a.eboffered', earlyBirdUpsell ? '1' : '0');
      break;
    }
    case SWITCH_EARLYBIRD_IN_PATH_BUTTON: {
      action.isEarlyBirdInPathButtonChecked ? raiseEvent('addedEarlyBird') : raiseEvent('removedEarlyBird');
      break;
    }
    case VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS: {
      raiseEvent('travelInformationSaved');
      break;
    }
    case SHARED__ROUTE_CHANGED: {
      const { pathname, search } = action.location;
      const routeMethod = action.method;
      const state = _.cloneDeep(store.getState());

      const isWebViewBlackListMatch = _isWebViewBlackListMatch(pathname, state, routeMethod);
      const isPopup = _.get(action, 'location.state.popup') === 'open';
      const isRedirectingPath = _.get(state, 'app.isRedirectingPath');

      !isPopup &&
        !_isBlackListMatch(pathname, search) &&
        !isWebViewBlackListMatch &&
        !isRedirectingPath &&
        _firePageLoadEvent(pathname, search);

      isRedirectingPath && store.dispatch(setIsRedirectingPath(false));
      break;
    }
    case PAGE_LOAD_COMPLETED: {
      const { pathname, search } = action.location;

      _firePageLoadEvent(pathname, search);
      break;
    }
    case VIEW_MODAL: {
      const modalName = action.name || '';
      const modalEvent = modalName.replace(/\s+/g, '-').toLowerCase();

      _.set(window, 'data_a.page.events.modalLoaded', modalEvent);
      raiseEvent('modalLoad');
      break;
    }
    case TRACK_SUBMIT_FORM: {
      const formName = action.formName || '';

      _.set(window, 'data_a.events.formSubmitted', formName);

      raiseEvent('formSubmit');
      break;
    }
    case VIEW_TAB: {
      const {
        router: {
          location: { pathname }
        }
      } = store.getState();
      const pageIdentifier = transformPath(pathname);
      const tabEvent = `${pageIdentifier}_${action.name.toString().toLowerCase()}`;

      _.set(window, 'data_a.events.panelLoaded', tabEvent);
      raiseEvent('panelLoad');
      break;
    }
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS: {
      const currentAmount = _.get(action, 'response.viewTravelFund[0].currentAmount');
      const fundsUnavailable = isCurrencyAmountZero(currentAmount);

      if (fundsUnavailable) {
        _.set(window, 'data_a.events.lookUpFundsSearchSuccess', 'funds search:funds unavailable');
        raiseSatelliteEvent('funds search:funds unavailable');
      } else {
        _.set(window, 'data_a.events.lookUpFundsSearchSuccess', 'funds search:funds available');
        raiseSatelliteEvent('funds search:funds available');
      }
      break;
    }
    case SHARED__CALC_FUNDS_SUCCESS: {
      const { travelFunds } = action.response;
      const lastSearchedFundData = _.get(window, 'data_a.stores.TravelFundsStore.lastSearchedFundData');
      const isRTF = !!_.get(lastSearchedFundData, 'confirmationNumber');
      const isLuvVoucher = !!_.get(lastSearchedFundData, 'voucherNumber');
      const isGiftCard = !!_.get(lastSearchedFundData, 'cardNumber');

      let lastSearchedFund;

      if (isRTF) {
        lastSearchedFund = _.get(lastSearchedFundData, 'confirmationNumber');
      } else if (isLuvVoucher) {
        lastSearchedFund = `X-${_.get(lastSearchedFundData, 'voucherNumber').slice(12, 16)}`;
      } else if (isGiftCard) {
        lastSearchedFund = `X-${_.get(lastSearchedFundData, 'cardNumber').slice(12, 16)}`;
      }

      _.forEach(travelFunds, (fund) => {
        const fundIdentifier = _.get(fund, 'fundIdentifier');

        if (_.includes(fundIdentifier, lastSearchedFund)) {
          const fundsUnavailable =
            isCurrencyAmountZero(_.get(fund, 'appliedAmount')) && isCurrencyAmountZero(_.get(fund, 'remainingAmount'));

          if (fundsUnavailable) {
            _.set(window, 'data_a.events.lookUpFundsSearchSuccess', 'funds search:funds unavailable');
            raiseSatelliteEvent('funds search:funds unavailable');
          } else {
            _.set(window, 'data_a.events.lookUpFundsSearchSuccess', 'funds search:funds available');
            raiseSatelliteEvent('funds search:funds available');
          }
        }
      });
      break;
    }
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED:
    case SHARED__CALC_FUNDS_FAILED: {
      const fundType = _.replace(_.get(window, 'data_a.stores.TravelFundsStore.lastSearchedFund'), '-', ' ');

      _.set(window, 'data_a.events.lookUpFundsSearchSuccess', `failed search:${fundType}`);
      raiseSatelliteEvent(`failed search:${fundType}`);
      break;
    }

    case UPDATE_CONCATENATED_CONTENT_BLOCK_IDS: {
      _.set(window, 'data_a.pageLoaded.contentBlockIds', action.payload);
      break;
    }

    case APPEND_CONCATENATED_CONTENT_BLOCK_IDS: {
      const currentContentBlockIds = _.get(window, 'data_a.pageLoaded.contentBlockIds');
      let newContentBlockIds = currentContentBlockIds;

      if (currentContentBlockIds) {
        if (action.payload && !currentContentBlockIds.includes(action.payload)) {
          newContentBlockIds = action.payload.concat(':', currentContentBlockIds);
        }
      } else {
        newContentBlockIds = action.payload;
      }

      _.set(window, 'data_a.pageLoaded.contentBlockIds', newContentBlockIds);
      break;
    }

    case AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS: {
      const remainingBounds = _.get(action.response.cancelBoundConfirmationPage, 'remainingBounds', []);
      const checkInButton = remainingBounds && remainingBounds.some((bound) => bound.checkInEligible);

      _.set(window, 'data_a.stores.AirViewReservationStore.details.checkInButton', checkInButton);
      break;
    }
    case TRACK_CALENDAR_STRIP: {
      _.set(window, 'data_a.events.calendarStrip', action.selectedDate);

      raiseEvent('calendarStripClicked');
      break;
    }
    case AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS: {
      const isUplift = _.get(action, 'response.flightConfirmationPage.billingInfo.cardType') === UPLIFT.key;
      const confirmationHeaderMessageKey = _.get(action, 'response.flightConfirmationPage.headerMessage.key');
      const ebSuccessfullyPurchased =
        confirmationHeaderMessageKey === 'BOOKING_EARLYBIRD_CONFIRMATION' ||
        confirmationHeaderMessageKey === 'BOOKING_EARLY_BIRD_PRICING_DIFFERENCE_CONFIRMATION';

      _.set(window, 'data_a.upliftpurchase', isUplift ? '1' : '0');
      ebSuccessfullyPurchased && raiseSatelliteEvent('event:eb-confirmed');
      break;
    }
    case AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS: {
      const ebAddedOnPrice = _.get(store.getState(), 'app.airBooking.earlyBirdSelected', false);

      _.set(window, 'data_a.ebaddedonprice', ebAddedOnPrice ? '1' : '0');
      break;
    }
    case AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY: {
      const earlyBirdEligibility = _.get(action, 'earlyBirdEligibility');
      const ebEligible = hasAnyEligibleEarlyBirdProducts(earlyBirdEligibility);
      const unitPriceInBound = _.get(transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[0]')), 'amount');
      const unitPriceOutBound = _.get(transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[1]')), 'amount');
      const adultProductsCount = _.get(earlyBirdEligibility, 'adultProductsCount');

      _.set(window, 'data_a.ebeligible', ebEligible ? '1' : '0');
      _.set(window, 'data_a.ebbound1_price', unitPriceInBound);
      _.set(window, 'data_a.ebbound2_price', unitPriceOutBound);
      _.set(window, 'data_a.ebeligiblebounds', adultProductsCount);

      break;
    }
    case AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED: {
      const earlyBirdSelected = _.get(action, 'earlyBirdSelected');

      earlyBirdSelected && raiseSatelliteEvent('toggle|eb selected');
      break;
    }
    case CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS: {
      raiseSatelliteEvent('BoardingPass Details');
      break;
    }
    default: {
      break;
    }
  }
};

const _isBlackListMatch = (pathname, search) => {
  const url = _.isEmpty(search) ? pathname : `${pathname}?${search}`;

  return !!_.find(sharedRoutePageLoadBlackList, (regexp) => regexp.test(url));
};

const _isWebViewBlackListMatch = (pathname, state, routeMethod) => {
  const isWebView = _.get(state, 'app.webView.isWebView');

  if (!isWebView) {
    return isWebView;
  }

  const persistentHistory = _.get(state, 'persistentHistory');
  const previousState = getPrevRouteState(persistentHistory);
  const previousPathName = _.get(previousState, 'pathname');

  const isFromBlankPage = matchPath(previousPathName, { path: '/blank', exact: true });
  const isFromHomePage = matchPath(previousPathName, { path: '/', exact: true });

  const isWebViewBlackList = !!_.find(webViewPageLoadBlackList, (regexp) => regexp.test(pathname));
  const isDuplicateRouteSentFromWebView = routeMethod === REPLACE && pathname === previousPathName;

  return isFromHomePage || isDuplicateRouteSentFromWebView || (isFromBlankPage && isWebViewBlackList);
};

const _firePageLoadEvent = (pathname, search) => {
  if (pathname) {
    const pageIdentifier = transformPath(pathname, search);

    _.set(window, 'data_a.events.pageView', pageIdentifier);
    _.set(window, 'data_a.page', pageIdentifier);
    _.unset(window, 'data_a.pageLoaded');
    raiseEvent('pageLoad');
  }
};
