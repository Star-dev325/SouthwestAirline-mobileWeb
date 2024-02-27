import { sandbox } from 'sinon';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import * as hazmatFlightsTransfomer from 'src/checkIn/transformers/hazmatFlightsTransfomer';
import BrowserObject from 'src/shared/helpers/browserObject';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import checkInBoardingPassInterceptor from 'src/shared/interceptors/checkInBoardingPassInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

const sinon = sandbox.create();
const boardingPassPagePath = '/check-in/boarding-pass';
const hazmatPagePath = '/check-in/hazmat-declaration';

describe('checkInBoardingPassInterceptor', () => {
  let store;
  let getCurrentRouteStateStub;
  let flights, pnr;
  let getPrevRouteStateStub, history, replaceStub;
  let hasAcceptedHazmatDeclarationsStub;
  let boardingPositionsPageRoute,
    checkInConfirmationPageRoute,
    chooseBoardingPassesPageRoute,
    upcomingtripDetailsRoute,
    upcomingTripRoute,
    viewReservationRoute;
  let getHazmatDeclarationKeysFromConfirmationPageStub;
  let getFlightDepartureAirportsAndDatesStub;
  let getHazmatDeclarationKeysFromMobileBoardingPassStub;

  beforeEach(() => {
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');
    BrowserObject.location = { pathname: '/check-in' };
    getCurrentRouteStateStub = sinon.stub(routeStateHelper, 'getCurrentRouteState').returns({
      pathname: '/check-in/boarding-pass',
      state: { ...pnr }
    });
    store = mockStore({
      state: {
        app: {
          checkIn: {
            checkInConfirmationPage: {
              flights: ['confirmationPage']
            }
          }
        }
      }
    });
    pnr = {
      recordLocator: 'PNR123',
      firstName: 'Fred',
      lastName: 'Flint'
    };
    getPrevRouteStateStub = sinon.stub(routeStateHelper, 'getPrevRouteState');
    replaceStub = sinon.stub();
    history = {
      replace: replaceStub
    };
    flights = [
      {
        flightDate: '2020-03-23',
        travelerId: '2301CE080000E0C0',
        travelerSegmentIdentifier: '2301DE080001538D'
      }
    ];
    getHazmatDeclarationKeysFromConfirmationPageStub = sinon
      .stub(hazmatFlightsTransfomer, 'getHazmatDeclarationKeysFromConfirmationPage')
      .returns(flights);
    getFlightDepartureAirportsAndDatesStub = sinon.stub(hazmatFlightsTransfomer, 'getFlightDepartureAirportsAndDates');
    getHazmatDeclarationKeysFromMobileBoardingPassStub = sinon.stub(
      hazmatFlightsTransfomer,
      'getHazmatDeclarationKeysFromMobileBoardingPass'
    );
    hasAcceptedHazmatDeclarationsStub = sinon.stub(CheckInLocalStorageHelper, 'hasAcceptedHazmatDeclarations');

    upcomingTripRoute = {
      pathname: '/my-account/upcoming-trips',
      state: { ...pnr }
    };
    upcomingtripDetailsRoute = {
      pathname: '/my-account/upcoming-trip-details/0',
      search: '?recordLocator=PNR123'
    };
    viewReservationRoute = {
      pathname: '/view-reservation/trip-details/PNR123'
    };
    checkInConfirmationPageRoute = {
      pathname: '/check-in/confirmation'
    };
    boardingPositionsPageRoute = {
      pathname: '/check-in/boarding-positions'
    };
    chooseBoardingPassesPageRoute = {
      pathname: '/check-in/choose-boarding-passes'
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should intercept when pathname is mobile boarding pass page path and has pnr in state', () => {
    const state = { recordLocator: 'ABCDEF', firstName: 'FUNFUN', lastName: 'LIU' };
    const pathname = '/check-in/boarding-pass';

    getCurrentRouteStateStub.returns({ pathname, state });

    const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store });

    expect(result.interceptor()).to.be.undefined;
  });

  it('should return undefined when pathname is mobile boarding pass page path but does not have pnr in state', () => {
    const state = undefined;
    const pathname = '/check-in/boarding-pass';

    getCurrentRouteStateStub.returns({ pathname, state });

    const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store });

    expect(result).to.be.undefined;
  });

  it('should return undefined when pathname is not mobile boarding pass page path', () => {
    getCurrentRouteStateStub.returns({ pathname: '/check-in/2/passportPage' });

    const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store });

    expect(result).to.be.undefined;
  });

  context('when checkInConfirmationPage.flight is not empty', () => {
    it('should call getFlightDepartureAirportsAndDates and getHazmatDeclarationKeysFromConfirmationPage', () => {
      getPrevRouteStateStub.returns(upcomingTripRoute);

      const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

      result.interceptor();

      expect(getFlightDepartureAirportsAndDatesStub).to.have.been.called;
      expect(getHazmatDeclarationKeysFromConfirmationPageStub).to.have.been.called;
      expect(getHazmatDeclarationKeysFromMobileBoardingPassStub).to.not.have.been.called;
    });
  });

  context('when checkInConfirmationPage.flight is empty', () => {
    it('should call getHazmatDeclarationKeysFromMobileBoardingPassStub', () => {
      store = mockStore({
        state: {
          app: {
            checkIn: {
              checkInViewBoardingPassPage: {
                mobileBoardingPassViewPage: {
                  mobileBoardingPassView: ['mobileBoardingPassView']
                }
              }
            }
          }
        }
      });

      getPrevRouteStateStub.returns(upcomingTripRoute);

      const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

      result.interceptor();

      expect(getFlightDepartureAirportsAndDatesStub).to.not.have.been.called;
      expect(getHazmatDeclarationKeysFromConfirmationPageStub).to.not.have.been.called;
      expect(getHazmatDeclarationKeysFromMobileBoardingPassStub).to.have.been.called;
    });
  });

  context('when logged in user is already checkedIn and coming via upcoming trips link on home page', () => {
    context('when user has not acked hazmat declaration', () => {
      beforeEach(() => {
        hasAcceptedHazmatDeclarationsStub.returns(false);
      });

      it('should redirect to hazmat declaration page when from is from UpcomingTripsPage', () => {
        getPrevRouteStateStub.returns(upcomingTripRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });

      it('should redirect to hazmat declaration page when from is from UpcomingtripDetails page', () => {
        getPrevRouteStateStub.returns(upcomingtripDetailsRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });

      it('should redirect to hazmat declaration page when from is from viewReservation page', () => {
        getPrevRouteStateStub.returns(viewReservationRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });

      it('should redirect to hazmat declaration page when from is from checkInConfirmationPage', () => {
        getPrevRouteStateStub.returns(checkInConfirmationPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });

      it('should redirect to hazmat declaration page when from is from boardingPositionsPage', () => {
        getPrevRouteStateStub.returns(boardingPositionsPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });

      it('should redirect to hazmat declaration page when from is from chooseBoardingPassesPage', () => {
        getPrevRouteStateStub.returns(chooseBoardingPassesPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.be.calledWith(hazmatPagePath, { flights, pnr });
      });
    });

    context('when user has acked hazmat declaration', () => {
      beforeEach(() => {
        hasAcceptedHazmatDeclarationsStub.returns(true);
      });
      it('should continue to boarding passes page when from is from UpcomingTripsPage', () => {
        getPrevRouteStateStub.returns(upcomingTripRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });

      it('should continue to boarding passes page when from is from UpcomingtripDetails page', () => {
        getPrevRouteStateStub.returns({
          pathname: '/my-account/upcoming-trip-details/0',
          search: '?recordLocator=PNR123',
          hash: '',
          state: {
            firstName: 'TEST',
            lastName: 'LAST'
          },
          action: 'push'
        });

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });

      it('should continue to boarding passes page when from is from ViewReservation page', () => {
        getPrevRouteStateStub.returns(viewReservationRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });

      it('should continue to boarding passes page when from is from checkInConfirmationPage', () => {
        getPrevRouteStateStub.returns(checkInConfirmationPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });

      it('should continue to boarding passes page when from is from boardingPositionsPage', () => {
        getPrevRouteStateStub.returns(boardingPositionsPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });

      it('should continue to boarding passes page when from is from chooseBoardingPassesPage', () => {
        getPrevRouteStateStub.returns(chooseBoardingPassesPageRoute);

        const result = checkInBoardingPassInterceptor(boardingPassPagePath)({ store, history });

        result.interceptor();

        expect(replaceStub).to.not.be.called;
      });
    });
  });
});
