jest.mock('src/shared/helpers/browserObject', () => ({
  location: {
    search: ''
  }
}));

import { airBookingOldRoutes, airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import { airCancelOldRoutes, airCancelRoutes } from 'src/airCancel/constants/airCancelRoutes';
import { airChangeOldRoutes, airChangeRoutes } from 'src/airChange/constants/airChangeRoutes';
import { airReaccomOldRoutes, airReaccomRoutes } from 'src/airChange/constants/airReaccomRoutes';
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { carCancelOldRoutes, carCancelRoutes } from 'src/carCancel/constants/carCancelRoutes';
import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { companionOldRoutes, companionRoutes } from 'src/companion/constants/companionRoutes';
import { earlyBirdOldRoutes, earlyBirdRoutes } from 'src/earlyBird/constants/earlyBirdRoutes';
import { enrollOldRoutes, enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import { flightStatusOldRoutes, flightStatusRoutes } from 'src/flightStatus/constants/flightStatusRoutes';
import { myAccountOldRoutes, myAccountRoutes } from 'src/myAccount/constants/myAccountRoutes';
import { sameDayRoutes } from 'src/sameDay/constants/sameDayRoutes';
import BrowserObject from 'src/shared/helpers/browserObject';
import {
  getNormalizedPageId,
  getNormalizedRoute,
  getQueryStringParameterByKey,
  isOnOldRoute,
  mergeQuery,
  param,
  removeInitialForwardSlash,
  removeQueryByKey,
  updateQueryStringParameter
} from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { travelFundsOldRoutes, travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { upgradedBoardingOldRoutes, upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

const { location } = BrowserObject;

describe('urlHelper', () => {
  let browserObjectLocation;

  beforeEach(() => {
    browserObjectLocation = BrowserObject.location;
  });

  afterEach(() => {
    location.href = 'http://example.com';
    BrowserObject.location = browserObjectLocation;
    jest.clearAllMocks();
  });

  describe('removeInitialForwardSlash', () => {
    it('should return the stripped down link if it starts with a slash `/`', () => {
      const result = removeInitialForwardSlash('/test/url');

      expect(result).toEqual('test/url');
    });

    it('should return the link if it does not starts with a slash `/`', () => {
      const result = removeInitialForwardSlash('test/url');

      expect(result).toEqual('test/url');
    });
  });

  describe('getNormalizedPageId', () => {
    it('should return pageId,that is derived from pathaname', () => {
      BrowserObject.location = { pathname: '/air/booking/' };

      const pageId = getNormalizedPageId();

      expect(pageId).toEqual('air-booking');
    });
  });

  describe('isOnOldRoute', () => {
    it('should return false if url is not normalized', () => {
      BrowserObject.location = { pathname: '/air/booking/' };

      expect(isOnOldRoute()).toEqual(false);
    });

    it('should return the true if path is normalized', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      BrowserObject.location = { pathname: '/air/booking/shopping' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return true if path is my-account', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
      BrowserObject.location = { pathname: '/my-account' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return true if path is my-account', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
      BrowserObject.location = { pathname: '/air/cancel/' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return the true if path is normalized', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
      BrowserObject.location = { pathname: '/air/upgrade' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return true if path is carbooking old route', async () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
      BrowserObject.location = { pathname: carBookingOldRoutes['index'] };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return true if path is flight-status', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
      BrowserObject.location = { pathname: flightStatusOldRoutes['index'] };

      const pageRoute = isOnOldRoute();

      expect(pageRoute).toEqual(true);
    });

    it('should return true if path is carbooking old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
      BrowserObject.location = { pathname: '/view-reservation/car-details' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return false if path is view reservation new route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('view-reservation');
      BrowserObject.location = { pathname: '/viewReservation/car-details' };

      expect(isOnOldRoute()).toEqual(false);
    });

    it('should return false if path is air/flight-status', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
      BrowserObject.location = { pathname: '/air/flight-status/' };

      const pageRoute = isOnOldRoute();

      expect(pageRoute).toEqual(false);
    });

    it('should return true if path is car cancel old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
      BrowserObject.location = { pathname: '/car/cancel' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return false if path is car cancel new route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
      BrowserObject.location = { pathname: '/car/cancel-reservation/summary.html' };

      expect(isOnOldRoute()).toEqual(false);
    });

    it('should return true if path is check-in old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
      BrowserObject.location = { pathname: '/check-in' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return true if path is check-in new route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
      BrowserObject.location = { pathname: '/air/check-in/index.html' };

      expect(isOnOldRoute()).toEqual(false);
    });

    it('should return true if path is travel funds old route', async () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
      BrowserObject.location = { pathname: '/travel-funds/look-up' };

      expect(isOnOldRoute()).toEqual(true);
    });

    it('should return false if path is travel funds new route', async () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
      BrowserObject.location = { pathname: '/travel-funds/' };

      expect(isOnOldRoute()).toEqual(false);
    });

    it('should return true if path is companion old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('companion');
      BrowserObject.location = { pathname: '/companion/passenger' };

      const pageIsOnOldRoute = isOnOldRoute();

      expect(pageIsOnOldRoute).toEqual(true);
    });

    it('should return false if path is earlybird new route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
      BrowserObject.location = { pathname: '/earlybird/index.html' };

      const pageIsOnOldRoute = isOnOldRoute();

      expect(pageIsOnOldRoute).toEqual(false);
    });

    it('should return true if path is earlybird old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin' };

      const pageIsOnOldRoute = isOnOldRoute();

      expect(pageIsOnOldRoute).toEqual(true);
    });

    it('should return false if path is upgraded-boarding new route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding/index.html' };

      const pageIsOnOldRoute = isOnOldRoute();

      expect(pageIsOnOldRoute).toEqual(false);
    });

    it('should return true if path is upgraded-boarding old route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding' };

      const pageIsOnOldRoute = isOnOldRoute();

      expect(pageIsOnOldRoute).toEqual(true);
    });
  });

  describe('getNormalizedRoute', () => {
    describe('airBooking', () => {
      it('should return airBooking old route if route is an array', () => {
        airBookingOldRoutes.index = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/shopping' };

        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airBookingOldRoutes['index'].canonicalPath);
      });

      it('should return airBooking old route if route is an array an `includeAllRoutes` is true', () => {
        airBookingOldRoutes.index = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/shopping' };

        const pageRoute = getNormalizedRoute({ routeName: 'index' }, true);
  
        expect(pageRoute).toEqual(airBookingOldRoutes['index']);
      });
  
      it('should return airBooking old route if route is an string', () => {
        airBookingOldRoutes.index = '/air/booking';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/shopping' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airBookingOldRoutes['index']);
      });
  
      it('should return the airBooking normalized route if route is a string', () => {
        airBookingRoutes.index = '/air/booking';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airBookingRoutes['index']);
      });
  
      it('should return the airBooking normalized route if route is a array', () => {
        airBookingRoutes.index = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airBookingRoutes['index'].canonicalPath);
      });

      it('should return the airBooking normalized route if route is a array and `canonicalPath` property is not set in the routes', () => {
        airBookingRoutes.index = {
          normalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airBookingRoutes['index'].normalPath);
      });

      it('should return the airBooking normalized route if route is a array and `includeAllRoutes` is true', () => {
        airBookingRoutes.index = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
        BrowserObject.location = { pathname: '/air/booking/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' }, true);
  
        expect(pageRoute).toEqual(airBookingRoutes['index']);
      });
    });

    describe('airCancel', () => {
      it('should return the airBooking old route if path is air/cancel if route is a string', () => {
        airCancelOldRoutes.airBookingIndex = '/air/booking/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        BrowserObject.location = { pathname: '/air/cancel' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'airBookingIndex' });
  
        expect(pageRoute).toEqual(airCancelOldRoutes['airBookingIndex']);
      });
  
      it('should return the airBooking old route if path is air/cancel if route is a array', () => {
        airCancelOldRoutes.airBookingIndex = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        BrowserObject.location = { pathname: '/air/cancel' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'airBookingIndex' });
  
        expect(pageRoute).toEqual(airCancelOldRoutes['airBookingIndex'].canonicalPath);
      });

      it('should return the airBooking new route if path is air/cancel if route is a string', () => {
        airCancelRoutes.airBookingIndex = '/air/booking/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        BrowserObject.location = { pathname: '/air/cancel-reservation/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'airBookingIndex' });
  
        expect(pageRoute).toEqual(airCancelRoutes['airBookingIndex']);
      });
  
      it('should return the airBooking new route if path is air/cancel if route is a array', () => {
        airCancelRoutes.airBookingIndex = {
          canonicalPath: '/air/booking/',
          htmlPath: '/air/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        BrowserObject.location = { pathname: '/air/cancel-reservation/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'airBookingIndex' });
  
        expect(pageRoute).toEqual(airCancelRoutes['airBookingIndex'].canonicalPath);
      });
    });

    describe('airChange', () => {
      it('should return the airChange old route if path is air/change if route is a string', () => {
        airChangeOldRoutes.view = '/air/change/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
        BrowserObject.location = { pathname: '/air/change' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });

        expect(pageRoute).toEqual(airChangeRoutes['view'].canonicalPath);
      });
  
      it('should return the airChange old route if path is air/change if route is a array', () => {
        airChangeOldRoutes.view = {
          canonicalPath: '/air/change/',
          htmlPath: '/air/change/view'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
        BrowserObject.location = { pathname: '/air/change/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airChangeOldRoutes['view'].canonicalPath);
      });

      it('should return the airChange old route if path is air/change if route is a array and the `canonicalPath` does not exist', () => {
        airChangeOldRoutes.view = {
          normalPath: '/air/change/',
          htmlPath: '/air/change/view'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
        BrowserObject.location = { pathname: '/air/change/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airChangeOldRoutes['view'].normalPath);
      });

      it('should return the airChange new route if path is air/change if route is a string', () => {
        airChangeOldRoutes.view = '/air/change';
        airChangeRoutes.view = '/air/change/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
        BrowserObject.location = { pathname: '/air/change/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airChangeRoutes['view']);
      });
  
      it('should return the airChange new route if path is air/change if route is a array', () => {
        airChangeOldRoutes.view = '/air/change';
        airChangeRoutes.view = {
          canonicalPath: '/air/change/',
          htmlPath: '/air/change/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
        BrowserObject.location = { pathname: '/air/change/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airChangeRoutes['view'].canonicalPath);
      });
    });

    describe('airReaccom', () => {
      it('should return the airReaccom old route if path is air/reaccom if route is a string', () => {
        airReaccomOldRoutes.view = '/air/change';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/reaccom');
        BrowserObject.location = { pathname: '/air/change' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });

        expect(pageRoute).toEqual(airReaccomOldRoutes['view']);
      });
  
      it('should return the airReaccom old route if path is air/reaccom if route is a array', () => {
        airReaccomOldRoutes.view = {
          canonicalPath: '/air/change',
          htmlPath: '/air/change/view'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/reaccom');
        BrowserObject.location = { pathname: '/air/change' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airReaccomOldRoutes['view'].canonicalPath);
      });

      it('should return the airReaccom new route if path is air/reaccom if route is a string', () => {
        airReaccomRoutes.view = '/air/reaccom/view.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/reaccom');
        BrowserObject.location = { pathname: '/air/reaccom/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airReaccomRoutes['view']);
      });
  
      it('should return the airReaccom new route if path is air/reaccom if route is a array', () => {
        airReaccomRoutes.view = {
          canonicalPath: '/air/reaccom',
          htmlPath: '/air/reaccom/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/reaccom');
        BrowserObject.location = { pathname: '/air/reaccom/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'view' });
  
        expect(pageRoute).toEqual(airReaccomRoutes['view'].canonicalPath);
      });
    });

    describe('airUpgrade', () => {
      it('should return the airUpgrade old route if path is air/upgrade if route is a string', () => {
        airUpgradeOldRoutes.index = '/air/upgrade';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
        BrowserObject.location = { pathname: '/air/upgrade' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(airUpgradeOldRoutes['index']);
      });
  
      it('should return the airUpgrade old route if path is air/upgrade if route is a array', () => {
        airUpgradeOldRoutes.index = {
          canonicalPath: '/air/upgrade/',
          htmlPath: '/air/upgrade/view'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
        BrowserObject.location = { pathname: '/air/upgrade/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airUpgradeOldRoutes['index'].canonicalPath);
      });

      it('should return the airUpgrade new route if path is air/upgrade if route is a string', () => {
        airUpgradeRoutes.index = '/air/upgrade/view.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
        BrowserObject.location = { pathname: '/air/upgrade/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airUpgradeRoutes['index']);
      });
  
      it('should return the airUpgrade new route if path is air/upgrade if route is a array', () => {
        airUpgradeRoutes.index = {
          canonicalPath: '/air/upgrade/',
          htmlPath: '/air/upgrade/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
        BrowserObject.location = { pathname: '/air/upgrade/view.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(airUpgradeRoutes['index'].canonicalPath);
      });
    });

    describe('carBooking', () => {
      it('should return the carBooking old route if path is car/booking if route is a string', () => {
        carBookingOldRoutes.index = '/car/booking';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
        BrowserObject.location = { pathname: '/car/booking' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(carBookingOldRoutes['index']);
      });
  
      it('should return the carBooking old route if path is car/booking if route is a array', () => {
        carBookingOldRoutes.index = {
          canonicalPath: '/car/booking/',
          htmlPath: '/car/booking/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
        BrowserObject.location = { pathname: '/car/booking' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(carBookingOldRoutes['index'].canonicalPath);
      });

      it('should return the carBooking new route if path is car/booking if route is a string', () => {
        carBookingRoutes.index = '/car/booking/index.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
        BrowserObject.location = { pathname: '/car/booking/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(carBookingRoutes['index']);
      });
  
      it('should return the carBooking new route if path is car/booking if route is a array', () => {
        carBookingRoutes.index = {
          canonicalPath: '/car/booking/',
          htmlPath: '/car/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
        BrowserObject.location = { pathname: '/car/booking/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(carBookingRoutes['index'].canonicalPath);
      });
    });

    describe('carCancel', () => {
      it('should return the carCancel old route if path is car/cancel if route is a string', () => {
        carCancelOldRoutes.carBookingIndex = '/car/booking';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
        BrowserObject.location = { pathname: '/car/cancel/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });

        expect(pageRoute).toEqual(carCancelOldRoutes['carBookingIndex']);
      });
  
      it('should return the carCancel old route if path is car/cancel if route is a array', () => {
        carCancelOldRoutes.carBookingIndex = {
          canonicalPath: '/car/booking',
          htmlPath: '/car/booking/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
        BrowserObject.location = { pathname: '/car/cancel/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(carCancelOldRoutes['carBookingIndex'].canonicalPath);
      });

      it('should return the carCancel new route if path is car/cancel if route is a string', () => {
        carCancelRoutes.carBookingIndex = '/car/booking/index.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
        BrowserObject.location = { pathname: '/car/cancel-reservation/summary.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(carCancelRoutes['carBookingIndex']);
      });
  
      it('should return the carCancel new route if path is car/cancel if route is a array', () => {
        carCancelRoutes.carBookingIndex = {
          canonicalPath: '/car/booking/',
          htmlPath: '/car/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/cancel');
        BrowserObject.location = { pathname: '/car/cancel-reservation/summary.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(carCancelRoutes['carBookingIndex'].canonicalPath);
      });
    });

    describe('checkIn', () => {
      it('should return the checkIn old route if path is check-in if route is a string', () => {
        checkInOldRoutes.checkInIndex = '/check-in';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
        BrowserObject.location = { pathname: '/check-in' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'checkInIndex' });

        expect(pageRoute).toEqual(checkInOldRoutes['checkInIndex']);
      });
  
      it('should return the checkIn old route if path is check-in if route is a array', () => {
        checkInOldRoutes.checkInIndex = {
          canonicalPath: '/check-in',
          htmlPath: '/check-in/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
        BrowserObject.location = { pathname: '/check-in' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'checkInIndex' });
  
        expect(pageRoute).toEqual(checkInOldRoutes['checkInIndex'].canonicalPath);
      });

      it('should return the checkIn new route if path is check-in if route is a string', () => {
        checkInRoutes.checkInIndex = '/air/check-in/index.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
        BrowserObject.location = { pathname: '/air/check-in' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'checkInIndex' });
  
        expect(pageRoute).toEqual(checkInRoutes['checkInIndex']);
      });
  
      it('should return the checkIn new route if path is check-in if route is a array', () => {
        checkInRoutes.checkInIndex = {
          canonicalPath: '/air/check-in/',
          htmlPath: '/air/check-in/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
        BrowserObject.location = { pathname: '/air/check-in/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'checkInIndex' });
  
        expect(pageRoute).toEqual(checkInRoutes['checkInIndex'].canonicalPath);
      });
    });

    describe('companion', () => {
      it('should return the companion old route if path is companion if route is a string', () => {
        companionOldRoutes.carBookingIndex = '/car/booking';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('companion');
        BrowserObject.location = { pathname: '/companion/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });

        expect(pageRoute).toEqual(companionOldRoutes['carBookingIndex']);
      });
  
      it('should return the companion old route if path is companion if route is a array', () => {
        companionOldRoutes.carBookingIndex = {
          canonicalPath: '/car/booking',
          htmlPath: '/car/booking/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('companion');
        BrowserObject.location = { pathname: '/companion/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(companionOldRoutes['carBookingIndex'].canonicalPath);
      });

      it('should return the companion new route if path is companion if route is a string', () => {
        companionRoutes.carBookingIndex = '/car/booking/index.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('companion');
        BrowserObject.location = { pathname: '/car/booking/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(companionRoutes['carBookingIndex']);
      });
  
      it('should return the companion new route if path is companion if route is a array', () => {
        companionRoutes.carBookingIndex = {
          canonicalPath: '/car/booking/',
          htmlPath: '/car/booking/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('companion');
        BrowserObject.location = { pathname: '/car/booking/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'carBookingIndex' });
  
        expect(pageRoute).toEqual(companionRoutes['carBookingIndex'].canonicalPath);
      });
    });

    describe('earlybird', () => {
      it('should return the earlybird old route if path is earlybird if route is a string', () => {
        earlyBirdOldRoutes.index = '/earlybird/checkin';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
        BrowserObject.location = { pathname: '/earlybird/checkin' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(earlyBirdOldRoutes['index']);
      });
  
      it('should return the earlybird old route if path is earlybird if route is a array', () => {
        earlyBirdOldRoutes.index = {
          canonicalPath: '/earlybird/checkin',
          htmlPath: '/earlybird/checkin/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
        BrowserObject.location = { pathname: '/earlybird/checkin' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(earlyBirdOldRoutes['index'].canonicalPath);
      });

      it('should return the earlybird new route if path is earlybird if route is a string', () => {
        earlyBirdRoutes.index = '/earlybird/index.html';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
        BrowserObject.location = { pathname: '/earlybird/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(earlyBirdRoutes['index']);
      });
  
      it('should return the earlybird new route if path is earlybird if route is a array', () => {
        earlyBirdRoutes.index = {
          canonicalPath: '/earlybird/',
          htmlPath: '/earlybird/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('earlybird');
        BrowserObject.location = { pathname: '/earlybird/booking/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(earlyBirdRoutes['index'].canonicalPath);
      });
    });

    describe('enroll', () => {
      it('should return the enroll old route if path is enroll if route is a string', () => {
        enrollOldRoutes.index = '/enroll';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('enroll');
        BrowserObject.location = { pathname: '/enroll' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(enrollOldRoutes['index']);
      });
  
      it('should return the enroll old route if path is enroll if route is a array', () => {
        enrollOldRoutes.index = {
          canonicalPath: '/enroll',
          htmlPath: '/enroll/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('enroll');
        BrowserObject.location = { pathname: '/enroll' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(enrollOldRoutes['index'].canonicalPath);
      });

      it('should return the enroll new route if path is enroll if route is a string', () => {
        enrollRoutes.index = '/account/enroll/enroll-member';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('enroll');
        BrowserObject.location = { pathname: '/account/enroll/enroll-member/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(enrollRoutes['index']);
      });
  
      it('should return the enroll new route if path is enroll if route is a array', () => {
        enrollRoutes.index = {
          canonicalPath: '/account/enroll/enroll-member',
          htmlPath: '/account/enroll/enroll-member/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('enroll');
        BrowserObject.location = { pathname: '/account/enroll/enroll-member/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(enrollRoutes['index'].canonicalPath);
      });
    });

    describe('flightStatus', () => {
      it('should return the flight-status old route if path is flight-status if route is a string', () => {
        flightStatusOldRoutes.index = '/flight-status';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
        BrowserObject.location = { pathname: '/flight-status' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(flightStatusOldRoutes['index']);
      });
  
      it('should return the flight-status old route if path is flight-status if route is a array', () => {
        flightStatusOldRoutes.index = {
          canonicalPath: '/flight-status',
          htmlPath: '/flight-status/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
        BrowserObject.location = { pathname: '/flight-status' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(flightStatusOldRoutes['index'].canonicalPath);
      });

      it('should return the flight-status new route if path is flight-status if route is a string', () => {
        flightStatusRoutes.index = '/air/flight-status/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
        BrowserObject.location = { pathname: '/air/flight-status/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(flightStatusRoutes['index']);
      });
  
      it('should return the flight-status new route if path is flight-status if route is a array', () => {
        flightStatusRoutes.index = {
          canonicalPath: '/air/flight-status/',
          htmlPath: '/air/flight-status/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('flight-status');
        BrowserObject.location = { pathname: '/air/flight-status/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(flightStatusRoutes['index'].canonicalPath);
      });
    });

    describe('myAccount', () => {
      it('should return the account old route if path is account if route is a string', () => {
        myAccountOldRoutes.index = '/my-account';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
        BrowserObject.location = { pathname: '/my-account' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(myAccountOldRoutes['index']);
      });
  
      it('should return the account old route if path is account if route is a array', () => {
        myAccountOldRoutes.index = {
          canonicalPath: '/my-account',
          htmlPath: '/my-account/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
        BrowserObject.location = { pathname: '/my-account' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(myAccountOldRoutes['index'].canonicalPath);
      });

      it('should return the account new route if path is account if route is a string', () => {
        myAccountRoutes.index = '/myaccount';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
        BrowserObject.location = { pathname: '/myaccount' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(myAccountRoutes['index']);
      });
  
      it('should return the account new route if path is account if route is a array', () => {
        myAccountRoutes.index = {
          canonicalPath: '/myaccount',
          htmlPath: '/myaccount/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('account');
        BrowserObject.location = { pathname: '/myaccount' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(myAccountRoutes['index'].canonicalPath);
      });
    });

    describe('sameDay', () => {
      it('should return the same-day new route if path is same-day if route is a string', () => {
        sameDayRoutes.confirmation = '/same-day/confirmation';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('same-day');
        BrowserObject.location = { pathname: '/same-day/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'confirmation' });
  
        expect(pageRoute).toEqual(sameDayRoutes['confirmation']);
      });
  
      it('should return the same-day new route if path is same-day if route is a array', () => {
        sameDayRoutes.confirmation = {
          canonicalPath: '/same-day/confirmation',
          htmlPath: '/same-day/confirmation/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('same-day');
        BrowserObject.location = { pathname: '/same-day/confirmation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'confirmation' });
  
        expect(pageRoute).toEqual(sameDayRoutes['confirmation'].canonicalPath);
      });
    });

    describe('travelFunds', () => {
      it('should return the travelFunds old route if path is travelFunds if route is a string', () => {
        travelFundsOldRoutes.index = '/travel-funds/look-up';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
        BrowserObject.location = { pathname: '/travel-funds/look-up' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(travelFundsOldRoutes['index']);
      });
  
      it('should return the travelFunds old route if path is travelFunds if route is a array', () => {
        travelFundsOldRoutes.index = {
          canonicalPath: '/travel-funds/look-up',
          htmlPath: '/travel-funds/look-up/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
        BrowserObject.location = { pathname: '/travel-funds/look-up' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(travelFundsOldRoutes['index'].canonicalPath);
      });

      it('should return the travelFunds new route if path is travelFunds if route is a string', () => {
        travelFundsRoutes.index = '/travel-funds/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
        BrowserObject.location = { pathname: '/travel-funds/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(travelFundsRoutes['index']);
      });
  
      it('should return the travelFunds new route if path is travelFunds if route is a array', () => {
        travelFundsRoutes.index = {
          canonicalPath: '/travel-funds/',
          htmlPath: '/travel-funds/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
        BrowserObject.location = { pathname: '/travel-funds/' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(travelFundsRoutes['index'].canonicalPath);
      });
    });

    describe('upgradedBoarding', () => {
      it('should return the upgradedBoarding old route if path is upgradedBoarding if route is a string', () => {
        upgradedBoardingOldRoutes.index = '/upgraded-boarding';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
        BrowserObject.location = { pathname: '/upgraded-boarding' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(upgradedBoardingOldRoutes['index']);
      });
  
      it('should return the upgradedBoarding old route if path is upgradedBoarding if route is a array', () => {
        upgradedBoardingOldRoutes.index = {
          canonicalPath: '/upgraded-boarding',
          htmlPath: '/upgraded-boarding/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
        BrowserObject.location = { pathname: '/upgraded-boarding' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(upgradedBoardingOldRoutes['index'].canonicalPath);
      });

      it('should return the upgradedBoarding new route if path is upgradedBoarding if route is a string', () => {
        upgradedBoardingRoutes.index = '/upgraded-boarding/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
        BrowserObject.location = { pathname: '/upgraded-boarding/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(upgradedBoardingRoutes['index']);
      });
  
      it('should return the upgradedBoarding new route if path is upgradedBoarding if route is a array', () => {
        upgradedBoardingRoutes.index = {
          canonicalPath: '/upgraded-boarding/',
          htmlPath: '/upgraded-boarding/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
        BrowserObject.location = { pathname: '/upgraded-boarding/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(upgradedBoardingRoutes['index'].canonicalPath);
      });
    });

    describe('viewReservation', () => {
      it('should return the reservation old route if path is reservation if route is a string', () => {
        viewReservationOldRoutes.index = '/view-reservation';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
        BrowserObject.location = { pathname: '/view-reservation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });

        expect(pageRoute).toEqual(viewReservationOldRoutes['index']);
      });
  
      it('should return the reservation old route if path is reservation if route is a array', () => {
        viewReservationOldRoutes.index = {
          canonicalPath: '/view-reservation',
          htmlPath: '/view-reservation/index'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
        BrowserObject.location = { pathname: '/view-reservation' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(viewReservationOldRoutes['index'].canonicalPath);
      });

      it('should return the reservation new route if path is reservation if route is a string', () => {
        viewReservationRoutes.index = '/air/manage-reservation/';
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
        BrowserObject.location = { pathname: '/upgraded-boarding/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(viewReservationRoutes['index']);
      });
  
      it('should return the reservation new route if path is reservation if route is a array', () => {
        viewReservationRoutes.index = {
          canonicalPath: '/air/manage-reservation/',
          htmlPath: '/air/manage-reservation/index.html'
        };
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
        BrowserObject.location = { pathname: '/upgraded-boarding/index.html' };
  
        const pageRoute = getNormalizedRoute({ routeName: 'index' });
  
        expect(pageRoute).toEqual(viewReservationRoutes['index'].canonicalPath);
      });
    });

    it('should return if the currentOldRoutes is undefined', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('TEST');
      BrowserObject.location = { pathname: '/air/booking/' };

      const pageRoute = getNormalizedRoute({ routeName: 'index' });

      expect(pageRoute).toEqual('/');
    });

    it('should return if the currentOldRoutes is undefined', () => {
      delete airBookingRoutes.index;
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      BrowserObject.location = { pathname: '/air/booking/' };

      const pageRoute = getNormalizedRoute({ routeName: 'index' });

      expect(pageRoute).toEqual('/');
    });
  });

  describe('update query string', () => {
    describe('when given a new key', () => {
      it('should add a `?` between path and query parameter', () => {
        const originUrl = 'http://www.example.com';

        const newUrl = updateQueryStringParameter(originUrl, 'name1', 'test1');

        expect(newUrl).toEqual('http://www.example.com?name1=test1');
      });

      it('should add a `&` between other parameter and current parameter', () => {
        const originUrl = 'http://www.example.com?name1=test1';

        const newUrl = updateQueryStringParameter(originUrl, 'name2', 'test2');

        expect(newUrl).toEqual('http://www.example.com?name1=test1&name2=test2');
      });
    });

    describe('when update a exist key', () => {
      it('should update the value of the key', () => {
        const originUrl = 'http://www.example.com?name1=test1';

        const newUrl = updateQueryStringParameter(originUrl, 'name1', 'jelly');

        expect(newUrl).toEqual('http://www.example.com?name1=jelly');
      });
    });
  });

  describe('removeQueryByKey', () => {
    it('should remove the given query when the url only has one query param', () => {
      const originUrl = 'http://www.example.com?_modal=airBookingCalendar';

      const newUrl = removeQueryByKey('_modal', originUrl);

      expect(newUrl).toEqual('http://www.example.com');
    });

    it('should remove the given query when the url has two query params and modal is first', () => {
      const originUrl = 'http://www.example.com?_modal=airBookingCalendar&from=somewhere';

      const newUrl = removeQueryByKey('_modal', originUrl);

      expect(newUrl).toEqual('http://www.example.com?from=somewhere');
    });

    it('should remove the given query when the url has two query params and modal is last', () => {
      const originUrl = 'http://www.example.com?from=somewhere&_modal=airBookingCalendar';

      const newUrl = removeQueryByKey('_modal', originUrl);

      expect(newUrl).toEqual('http://www.example.com?from=somewhere');
    });
  });

  describe('get query string value', () => {
    it('should get the value for an existing key', () => {
      const originUrlQuery = '/?name1=test1';

      const value = getQueryStringParameterByKey('name1', originUrlQuery);

      expect(value).toEqual('test1');
    });

    it('should get null when the key is not existed', () => {
      const originUrlQuery = '/?name1=test1';

      const value = getQueryStringParameterByKey('name2', originUrlQuery);

      expect(value).toBeNull();
    });

    it('should get query from `window.location.search` when urlSearch is not provided', () => {
      BrowserObject.location = { search: '/?name1=test1' };

      const value = getQueryStringParameterByKey('name1');

      expect(value).toEqual('test1');
    });

    it('should get empty string when key existed but does not have value', () => {
      const originUrlSearch = '/?name1';

      const value = getQueryStringParameterByKey('name1', originUrlSearch);

      expect(value).toEqual('');
    });
  });

  describe('merge query string with new query object', () => {
    it('should add query when url does not have query string', () => {
      expect(mergeQuery({ foo: 1 }, '')).toEqual({ foo: 1 });
    });

    it('should keep actual query param and add the new query at the end of url', () => {
      expect(mergeQuery({ foo: 1 }, '?bar=2')).toEqual({ bar: '2', foo: 1 });
    });

    it('should replace query when url has query string', () => {
      expect(mergeQuery({ foo: 1 }, '?foo=2')).toEqual({ foo: 1 });
    });
  });

  describe('param', () => {
    it('should convert object key/value to query string', () => {
      const requestObj = {
        'first-name': 'Amber',
        'last-name': 'Awesome',
        'spec Symbol': '[value]'
      };

      const result = param(requestObj);

      expect(result).toEqual('first-name=Amber&last-name=Awesome&spec%20Symbol=%5Bvalue%5D');
    });

    it('should convert array to special url for swa mobile facade api', () => {
      // for parameter trip=[{key1: value1, key2, value2}, {key1: value1, key2, value2}]
      // $.param() will convert to:
      // trip[0][key1]=value1&..&trip[1][key1]=value1&...
      // but right now facade api treat 'trip[][key1]' is the key of parameter.
      const requestObj = {
        trip: [
          {
            key1: 'value1',
            key2: 'value2'
          },
          {
            key1: 'other value1',
            key2: 'other value2'
          }
        ]
      };
      const result = param(requestObj);

      expect(result).toEqual(
        'trip%5B%5D%5Bkey1%5D=value1&trip%5B%5D%5Bkey2%5D=value2&trip%5B%5D%5Bkey1%5D=other%20value1&trip%5B%5D%5Bkey2%5D=other%20value2'
      );
    });

    it('should convert array to special url for swa mobile facade api', () => {
      const requestObj = {
        trip: [
          'value1',
          'value2'
        ]
      };
      const result = param(requestObj);

      expect(result).toEqual('trip%5B%5D=value1&trip%5B%5D=value2');
    });

    it('should convert object by each field', () => {
      const requestObj = {
        query: {
          'first-name': 'Amber',
          'last-name': 'Awesome',
          array: ['value']
        }
      };

      const result = param(requestObj);

      expect(result).toEqual('query%5Bfirst-name%5D=Amber&query%5Blast-name%5D=Awesome&query%5Barray%5D%5B%5D=value');
    });

    it('should filter the invalid field', () => {
      const requestObj = {
        value: 'valid',
        invalid1: undefined,
        invalid2: null
      };

      const result = param(requestObj);

      expect(result).toEqual('value=valid');
    });
  });
});
