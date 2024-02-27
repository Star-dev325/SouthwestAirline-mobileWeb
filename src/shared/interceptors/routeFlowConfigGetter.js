import _ from 'lodash';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';

export default (store) => {
  const state = _.cloneDeep(store.getState());

  return {
    airBooking: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => store.dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.INITIAL)),
        flowStatusGetter: () => state?.app?.flowStatus?.airBooking,
        flowUrlRange: [
          getNormalizedRoute({ routeName: 'recent' }),
          '/airports',
          '/my-account/saved-flights',
          '/my-account/past-flights'
        ],
        includedInitialPages: [
          getNormalizedRoute({ routeName: 'recent' }),
          getNormalizedRoute({ routeName: 'selectCompany' }),
          getNormalizedRoute({ routeName: 'selectPassengers' })
        ],
        name: 'airBooking'
      }
    },
    airCancel: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'viewReservationIndex' }, true),
        exit: getNormalizedRoute({ routeName: 'refundSummary' }, true),
        flowStatusGetter: () => state?.app?.flowStatus?.airCancel,
        name: 'airCancel'
      }
    },
    airChange: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'viewReservationIndex' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => {
          store.dispatch(AirportInfoActions.resetSelectedAirportInfo());
          store.dispatch(FlowStatusActions.clearFlowStatus('airChange'));
        },
        flowStatusGetter: () => state?.app?.flowStatus?.airChange,
        name: 'airChange'
      }
    },
    carBooking: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => store.dispatch(CarBookingActions.startNewSessionFlow()),
        flowStatusGetter: () => state?.app?.flowStatus?.carBooking,
        flowUrlRange: [
          getNormalizedRoute({ routeName: 'recent' }),
          '/air/booking/confirmation',
          '/view-reservation/car-details',
          '/my-account/upcoming-trip-details',
          '/companion/confirmation'
        ],
        includedInitialPages: [getNormalizedRoute({ routeName: 'recent' }, true)],
        name: 'carBooking'
      }
    },
    carCancel: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'carReservationIndex' }, true),
        exit: getNormalizedRoute({ routeName: 'carCancelConfirmation' }, true),
        flowStatusGetter: () => state?.app?.flowStatus?.carCancel,
        name: 'carCancel'
      }
    },
    checkIn: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'checkInIndex' }, true),
        flowCleaner: () => store.dispatch(FlowStatusActions.clearFlowStatus('checkIn')),
        flowStatusGetter: () => state?.app?.flowStatus?.checkIn,
        flowUrlRange: [getNormalizedRoute({ routeName: 'refundSummary' })],
        includedInitialPages: ['/check-in/hazmat-declaration'],
        name: 'checkIn'
      }
    },
    companion: {
      flowConfig: {
        entry: '/view-reservation',
        exit: '/companion/confirmation',
        flowCleaner: () => store.dispatch(FlowStatusActions.clearFlowStatus('companion')),
        flowStatusGetter: () => state?.app?.flowStatus?.companion,
        name: 'companion'
      }
    },
    earlyBird: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => store.dispatch(FlowStatusActions.clearFlowStatus('earlyBird')),
        flowStatusGetter: () => state?.app?.flowStatus?.earlyBird,
        flowUrlRange: ['/air/booking/confirmation', '/companion/confirmation'],
        name: 'earlyBird'
      }
    },
    enroll: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => store.dispatch(FlowStatusActions.clearFlowStatus('enroll')),
        flowStatusGetter: () => state?.app?.flowStatus?.enroll,
        name: 'enroll'
      }
    },
    lookUpTravelFunds: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'transferConfirmation' }, true),
        flowCleaner: () => {
          store.dispatch(TravelFundsActions.resetLookupFlowData());
          store.dispatch(TravelFundsActions.clearAllLookUpForms());
          store.dispatch(FlowStatusActions.clearFlowStatus('lookUpTravelFunds'));
        },
        flowStatusGetter: () => state?.app?.flowStatus?.travelFunds,
        name: 'lookUpTravelFunds'
      }
    },
    sameDay: {
      flowConfig: {
        entry: '/view-reservation',
        exit: '/same-day/confirmation',
        flowStatusGetter: () => state?.app?.flowStatus?.sameDay,
        name: 'sameDay'
      }
    },
    standby: {
      flowConfig: {
        entry: '/view-reservation',
        exit: '/standby/cancel-confirmation',
        flowStatusGetter: () => state?.app?.flowStatus?.standby,
        name: 'standby'
      }
    },
    upgradedBoarding: {
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        exit: getNormalizedRoute({ routeName: 'confirmation' }, true),
        flowCleaner: () => {
          store.dispatch(FlowStatusActions.clearFlowStatus('upgradedBoarding'));
        },
        flowStatusGetter: () => state?.app?.flowStatus?.upgradedBoarding,
        name: 'upgradedBoarding'
      }
    },
    viewReservation: {
      car: {
        flowConfig: {
          entry: getNormalizedRoute({ routeName: 'carReservationIndexWithTab' }, true)
        }
      },
      flowConfig: {
        entry: getNormalizedRoute({ routeName: 'index' }, true),
        name: 'viewReservation'
      }
    }
  };
};
