import { mount } from 'enzyme';
import _ from 'lodash';
import proxyquire from 'proxyquire';
import Q from 'q';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { sandbox } from 'sinon';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { AIR_CANCEL_FLOW_NAME, AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { AIR_CHANGE_SPLIT_PNR_FLOW_NAME } from 'src/airChange/constants/airChangeConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import createMockStore from 'test/unit/helpers/createMockStore';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import waitFor from 'test/unit/helpers/waitFor';

const { AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE, AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE } = airChangeActionTypes;
const {
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_FAILED,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_FAILED,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS
} = airCancelActionTypes;
const { location } = BrowserObject;

const sinon = sandbox.create();

describe('withReservationDetailTransition', () => {
  let AirCancelApiStub;
  let AppSelector;
  let checkEnhancedStandbyNearAirportFnStub;
  let checkInActions;
  let checkInStub;
  let checkStandbyNearAirportFnStub;
  let CompanionActions;
  let ContactTracingActions;
  let EarlyBirdActions;
  let getReserveCheckInReservationStub;
  let goDirectlyToBoardingPassesFnStub;
  let openStub;
  let ReaccomApi;
  let ReservationApi;
  let ReservationDetailProps;
  let resetFlowDataStub;
  let resetSelectedAirportInfoStub;
  let retrieveRefundQuoteForCancelBoundFnStub, showDialogFnStub;
  let setCheckInFlowStatusStub;
  let setFlowStatusStub;
  let showShareLinkStub;
  let standbyQuery;
  let store;
  let transitToBoardingPositionStub;
  let ViewReservationActions;
  let withReservationDetailTransition;

  const fakeAsyncAction = (dispatch) => {
    dispatch({ type: 'FAKE_TYPE' });

    return Q();
  };

  beforeEach(() => {
    AppSelector = require('src/shared/selectors/appSelector');
    checkInActions = require('src/checkIn/actions/checkInActions');
    CompanionActions = require('src/companion/actions/companionActions');
    ContactTracingActions = require('src/contactTracing/actions/contactTracingActions');
    EarlyBirdActions = require('src/earlyBird/actions/earlyBirdActions');
    ReaccomApi = require('src/shared/api/airReaccomApi');
    ReservationApi = require('src/shared/api/reservationApi');
    ViewReservationActions = require('src/viewReservation/actions/viewReservationActions');

    AirCancelApiStub = sinon.stub();
    showDialogFnStub = sinon.stub().returns(fakeAsyncAction);
    retrieveRefundQuoteForCancelBoundFnStub = sinon.stub();
    proxyquire('src/airCancel/actions/airCancelActions', {
      'src/shared/api/airCancelApi': AirCancelApiStub
    });

    sinon.stub(checkInActions, 'checkInPassenger').returns(Q());
    sinon.stub(checkInActions, 'getReserveCheckInReservation').returns(Q());
    sinon.stub(checkInActions, 'setFlowStatus');
    sinon.spy(checkInActions, 'resetFlowData');
    sinon.spy(checkInActions, 'showShareLink');
    resetSelectedAirportInfoStub = sinon.stub().returns({ type: 'FAKE_TYPE' });
    resetFlowDataStub = sinon.stub().returns({ type: 'FAKE_TYPE' });
    checkInStub = sinon.stub().returns(fakeAsyncAction);
    transitToBoardingPositionStub = sinon.stub().returns(fakeAsyncAction);
    showShareLinkStub = sinon.stub().returns({ type: 'FAKE_TYPE' });
    getReserveCheckInReservationStub = sinon.stub().returns(fakeAsyncAction);
    setCheckInFlowStatusStub = sinon.stub().returns({ type: 'FAKE_TYPE' });
    setFlowStatusStub = sinon.stub().returns({ type: 'FAKE_TYPE' });
    checkStandbyNearAirportFnStub = sinon.stub().returns(fakeAsyncAction);
    checkEnhancedStandbyNearAirportFnStub = sinon.stub().returns(fakeAsyncAction);
    goDirectlyToBoardingPassesFnStub = sinon
      .stub(checkInActions, 'goDirectlyToBoardingPasses')
      .returns(fakeAsyncAction);
    openStub = sinon.stub();

    standbyQuery = {
      'arrival-time': '09:55',
      'carrier-code': 'WN',
      'departure-date': '2017-10-12',
      'departure-time': '09:00',
      'destination-airport': 'AUS',
      'first-name': 'ITEST',
      'flight-number': '726',
      'has-wifi': true,
      'last-name': 'WANG',
      'origin-airport': 'DAL',
      'record-locator': 'STMXQ6'
    };

    ReservationDetailProps = {
      hasUnaccompaniedMinor: false,
      isCheckInEligible: true,
      hasAnyCancelledFlights: false,
      date: '2017-11-02',
      isDynamicWaiver: false,
      pageHeader: 'fake pageHeader',
      destinationDescription: 'Houston',
      originAirport: 'Cabo San Lucas/Los Cabos, MX',
      destinationAirport: 'Houston (Hobby), TX',
      confirmationNumber: 'K9VJKX',
      shouldShowAddEarlyBirdButton: false,
      isInternational: false,
      isUserLoggedIn: false,
      retrieveRefundQuoteForCancelBoundFn: retrieveRefundQuoteForCancelBoundFnStub,
      bounds: [
        {
          arrivalAirport: {
            code: 'AUS',
            country: null,
            name: 'Austin',
            state: 'TX'
          },
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          arrivalTime: '09:55',
          boundType: 'DEPARTING',
          departureAirport: {
            code: 'DAL',
            country: null,
            name: 'Dallas (Love Field)',
            state: 'TX'
          },
          departureDate: '2017-10-12',
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          departureTime: '09:00',
          fareType: 'Anytime',
          flights: [
            {
              number: '726',
              wifiOnBoard: true
            }
          ],
          isNextDayArrival: false,
          passengerTypeCounts: {
            adult: 1,
            senior: 0
          },
          stops: [],
          travelTime: '0h 55m',
          standbyFlight: {
            arrivalAirportCode: 'AUS',
            arrivalTime: '09:55',
            departureTime: '09:00',
            flightNumber: '726',
            hasWifi: true,
            viewStandbyList: {
              href: '/v1/mobile-air-operations/page/standby',
              method: 'GET',
              query: standbyQuery
            }
          }
        }
      ],
      isNonRevPnr: false,
      passengers: [
        {
          name: 'AMBER AWESOME',
          isCheckedIn: false,
          hasCompletePassportInfo: false,
          accountNumber: '328329329',
          hasAnyEarlyBird: true,
          hasExtraSeat: false,
          passengerReference: '2'
        }
      ],
      standbyFlight: {
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:55',
        departureTime: '09:00',
        flightNumber: '726',
        hasWifi: true
      },
      _links: {
        addCompanion: {
          href: '/v1/mobile-air-booking/page/flights/prices/KHUXTC/companion',
          method: 'POST',
          body: { companionPricingRequestToken: 'token' }
        },
        viewStandbyList: {
          href: '/v1/mobile-air-operations/page/standby',
          method: 'GET',
          query: {
            'arrival-time': '09:55',
            'carrier-code': 'WN',
            'departure-date': '2017-10-12',
            'departure-time': '09:00',
            'destination-airport': 'AUS',
            'first-name': 'ITEST',
            'flight-number': '726',
            'has-wifi': true,
            'last-name': 'WANG',
            'origin-airport': 'DAL',
            'record-locator': 'STMXQ6'
          }
        },
        earlyBird: {
          href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
          method: 'GET',
          query: {
            ['first-name']: 'Mike',
            ['last-name']: 'Tangrila'
          }
        },
        contactTracing: {
          href: '/v1/mobile-air-booking/page/view-reservation/contact-tracing/2N9F9Y',
          labelText: 'Add/Edit Contact Tracing',
          method: 'GET'
        },
        viewBoardingPositions: null,
        checkIn: null,
        change: { href: 'change-link' },
        reaccom: { href: 'reaccom-link' },
        cancelBound: {
          href: '/v1/mobile-air-booking/page/flights/cancel-bound/TIEOQX',
          method: 'GET',
          query: {
            'passenger-search-token':
              'iVZ6TI3CbH5cPejNPJ0kqMWZvde82uFhVyfs9c2rjPK06KBXMxrcE7nksEkft7cNmILSzBsIqPkmn_OnPtGf_oPt4wft87424bzbg-_lSz3N94PluRm7nFrc9n5bIojurUaGXcocWOeQ0NGLcw=='
          }
        },
        contactInformation: null,
        editPNRPassengers: [
          {
            href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/OGQPTW',
            method: 'GET',
            query: {
              'first-name': 'QIANQIAN',
              'last-name': 'WANG',
              'passenger-reference': '2'
            }
          }
        ],
        viewBoardingPassIssuance: {
          body: {
            checkInSessionToken: null,
            firstName: 'STEVEN',
            lastName: 'JACKIE',
            recordLocator: 'ABC123',
            travelerID: ['123']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
          method: 'POST'
        }
      },
      companion: null,
      isVariableEarlyBird: false,
      checkInIneligibilityReason: null,
      toggles: {
        AIRCRAFT_TYPE_VIEWRES: false
      },
      dayOfTravelContactInfo: '',
      messages: [
        {
          key: 'REACCOM_VIEW_RESERVATION',
          icon: 'reaccomIcon',
          header: 'reaccomHeader',
          body: 'reaccomBody'
        }
      ],
      changeBlockedMessage: null,
      cancelBlockedMessage: null
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when render the FakeComponent with withReservationTransitionSpecs HOC', () => {
    let FakeComponent;

    beforeEach(() => {
      const wrapperComponent = createComponentWithButton();

      FakeComponent = wrapperComponent.find('FakeComponent');
    });

    it('the FakeComponent should have correct date', () => {
      expect(FakeComponent.props().date).to.equal('2017-11-02');
    });

    it('the FakeComponent should have correct pageHeader', () => {
      expect(FakeComponent.props().pageHeader).to.equal('fake pageHeader');
    });

    it('the FakeComponent should have correct destinationDescription', () => {
      expect(FakeComponent.props().destinationDescription).to.equal('Houston');
    });

    it('the FakeComponent should have correct originAirport', () => {
      expect(FakeComponent.props().originAirport).to.equal('Cabo San Lucas/Los Cabos, MX');
    });

    it('the FakeComponent should have correct destinationAirport', () => {
      expect(FakeComponent.props().destinationAirport).to.deep.equal('Houston (Hobby), TX');
    });

    it('the FakeComponent should have correct passenger', () => {
      expect(FakeComponent.props().passengers).to.deep.equal([
        {
          accountNumber: '328329329',
          hasAnyEarlyBird: true,
          hasCompletePassportInfo: false,
          hasExtraSeat: false,
          isCheckedIn: false,
          name: 'AMBER AWESOME',
          passengerReference: '2'
        }
      ]);
    });

    it('the FakeComponent should have correct confirmationNumber', () => {
      expect(FakeComponent.props().confirmationNumber).to.equal('K9VJKX');
    });

    it('the FakeComponent should have correct isDynamicWaiver', () => {
      expect(FakeComponent.props().isDynamicWaiver).to.be.false;
    });

    it('the FakeComponent should have correct hasAnyCancelledFlights', () => {
      expect(FakeComponent.props().hasAnyCancelledFlights).to.be.false;
    });

    it('the FakeComponent should have correct isInternational', () => {
      expect(FakeComponent.props().isInternational).to.be.false;
    });

    it('the FakeComponent should have correct standbyFlight', () => {
      expect(FakeComponent.props().standbyFlight).to.deep.equal({
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:55',
        departureTime: '09:00',
        flightNumber: '726',
        hasWifi: true
      });
    });

    it('the FakeComponent should have correct isNonRevPnr', () => {
      expect(FakeComponent.props().isNonRevPnr).to.be.false;
    });

    it('the FakeComponent should have correct shouldShowAddEarlyBirdButton', () => {
      expect(FakeComponent.props().shouldShowAddEarlyBirdButton).to.be.false;
    });

    it('the FakeComponent should have correct isUserLoggedIn', () => {
      expect(FakeComponent.props().isUserLoggedIn).to.be.false;
    });

    it('the FakeComponent should have correct bounds', () => {
      expect(FakeComponent.props().bounds).to.deep.equal(ReservationDetailProps.bounds);
    });
  });

  context('when click button should call correspond func', () => {
    /* eslint-disable react/prop-types */
    let button;

    context('when click the standbylist', () => {
      let wrapperComponent;

      context('when revenue passenger', () => {
        it('should update isRevenue with true to analytics store after fetch standbyList successfully', (done) => {
          const isNonRevPnr = false;

          wrapperComponent = createComponentWithStandby(isNonRevPnr);

          waitFor.untilAssertPass(() => {
            const actions = store.getActions();

            expect(actions).to.deep.equal([{ type: 'FAKE_TYPE' }]);
            expect(checkStandbyNearAirportFnStub).to.be.calledWith(standbyQuery, true, true);
          }, done);

          click(wrapperComponent.find('button'));
        });

        it('should use the enhanced standby link when toggle is on', (done) => {
          const enhancedStanbdyListToggle = true;
          const isNonRevPnr = false;
          const mockEnhancedLink = {
            href: '/v1/mobile-air-operations/page/standby/STMXQ6',
            method: 'POST',
            body: { standbyToken: 'abc.123.xyz' }
          };

          wrapperComponent = createComponentWithStandby(isNonRevPnr, enhancedStanbdyListToggle, mockEnhancedLink);

          click(wrapperComponent.find('button'));

          waitFor.untilAssertPass(() => {
            const actions = store.getActions();

            expect(actions).to.deep.equal([{ type: 'FAKE_TYPE' }]);
            expect(checkEnhancedStandbyNearAirportFnStub).to.be.calledWith(mockEnhancedLink, true, true);
          }, done);
        });

        it('should not use the enhanced standby link when toggle is on and enhanced link is null', (done) => {
          const enhancedStanbdyListToggle = true;
          const isNonRevPnr = false;
          const mockEnhancedLink = null;

          wrapperComponent = createComponentWithStandby(isNonRevPnr, enhancedStanbdyListToggle, mockEnhancedLink);

          click(wrapperComponent.find('button'));

          waitFor.untilAssertPass(() => {
            const actions = store.getActions();

            expect(actions).to.deep.equal([{ type: 'FAKE_TYPE' }]);
            expect(checkStandbyNearAirportFnStub).to.be.calledWith(standbyQuery, true, true);
          }, done);
        });
      });

      context('when non-revenue passenger', () => {
        it('should call checkStandbyNearAirport standby action', (done) => {
          const isNonRevPnr = true;

          wrapperComponent = createComponentWithStandby(isNonRevPnr);

          waitFor.untilAssertPass(() => {
            const actions = store.getActions();

            expect(actions).to.deep.equal([{ type: 'FAKE_TYPE' }]);
            expect(checkStandbyNearAirportFnStub).to.be.calledWith(standbyQuery, true, false);
          }, done);

          click(wrapperComponent.find('button'));
        });
      });
    });

    context('when clicking the change flight button', () => {
      let AirChangeActions;
      let retrieveReaccomFlightProductsStub;
      let FakeComponent;

      beforeEach(() => {
        AirChangeActions = require('src/airChange/actions/airChangeActions');
        retrieveReaccomFlightProductsStub = sinon
          .stub(AirChangeActions, 'retrieveReaccomFlightProducts')
          .returns(fakeAsyncAction);
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onChangeFlightClick} />
          </div>
        );
      });

      it('should nagivate to the reaccom page', (done) => {
        location.href = 'http://example.com/air/manage-reservation/view/3YQVVI';
        const wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(resetSelectedAirportInfoStub).to.be.called;
          expect(setFlowStatusStub).to.be.calledWith('airChange', STATUS.IN_PROGRESS);
          expect(retrieveReaccomFlightProductsStub).to.have.been.called;
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/air/reaccom/view.html');
        }, done);

        click(button);
      });
    });

    context('when click the early bird button', () => {
      let getEarlyBirdReservationStub;

      beforeEach(() => {
        getEarlyBirdReservationStub = sinon
          .stub(EarlyBirdActions, 'getEarlyBirdReservation')
          .returns({ type: 'fakeTYpe' });
      });

      it('should get early bird reservation when early bird', () => {
        const FakeComponent = (props) => (
          <div>
            <button onClick={props.onEarlyBirdButtonClick} />
          </div>
        );
        const wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));
        expect(getEarlyBirdReservationStub).to.have.been.calledWith(
          ReservationDetailProps._links.earlyBird,
          'K9VJKX',
          false
        );
      });
    });

    context('when click the contact tracing button', () => {
      let goToContactTracingFnStub;

      beforeEach(() => {
        goToContactTracingFnStub = sinon
          .stub(ContactTracingActions, 'goToContactTracing')
          .returns({ type: 'fakeTYpe' });
      });

      it('should get contact tracing data when contact tracing', () => {
        const FakeComponent = (props) => (
          <div>
            <button onClick={props.onContactTracingButtonClick} />
          </div>
        );
        const wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));
        expect(goToContactTracingFnStub).to.have.been.calledWith(
          ReservationDetailProps._links.contactTracing,
          'K9VJKX'
        );
      });
    });

    context('when click the check in button', () => {
      let FakeComponent;

      beforeEach(() => {
        FakeComponent = (props) => (
          <div>
            <button
              onClick={() => {
                props.onCheckInButtonClick({ query: { 'first-name': 'FUNFUN', 'last-name': 'LIU' } });
              }}
            />
          </div>
        );
      });

      it('when click the checkIn button', (done) => {
        const wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(getReserveCheckInReservationStub).to.have.been.calledWith(
            {
              firstName: 'FUNFUN',
              lastName: 'LIU',
              recordLocator: 'K9VJKX'
            },
            false
          );
        }, done);

        click(button);
      });
    });

    context('when click the passenger name', () => {
      let button;
      let FakeComponent;
      let retrieveTravelInformationStub;
      let wrapperComponent;

      beforeEach(() => {
        retrieveTravelInformationStub = sinon
          .stub(ViewReservationActions, 'retrieveTravelInformation')
          .returns({ type: 'fakeTYpe' });

        FakeComponent = (props) => (
          <div>
            <button
              onClick={() => {
                props.onPassengerNameClick(props.passengers[0].passengerReference);
              }}
            />
          </div>
        );
      });

      it('should trigger retrieveTravelInformation action', () => {
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');
        click(button);

        expect(retrieveTravelInformationStub).to.have.been.calledWith(
          ReservationDetailProps._links.editPNRPassengers[0],
          'K9VJKX',
          undefined,
          true
        );
      });

      it('should trigger retrieveTravelInformation action with searchToken', () => {
        const routeEntries = {
          pathname: '/air/manage-reservation/travelInformation.html',
          search: '?passenferReference=2&searchToken=2ew12e223',
          state: {
            firstName: 'FUNFUN',
            lastName: 'LIU'
          }
        };

        wrapperComponent = createComponentWithMemoryRouterEntry(ReservationDetailProps, FakeComponent, routeEntries);
        button = wrapperComponent.find('button');
        click(button);

        expect(retrieveTravelInformationStub).to.have.been.calledWith(
          ReservationDetailProps._links.editPNRPassengers[0],
          'K9VJKX',
          '2ew12e223',
          true
        );
      });
    });

    describe('when click the onSameDayButton', () => {
      it('should trigger retrieveSameDayBoundInformationFn action', () => {
        const ViewReservationActions = require('src/viewReservation/actions/viewReservationActions');
        const retrieveSameDayBoundInformationStub = sinon
          .stub(ViewReservationActions, 'retrieveSameDayBoundInformation')
          .returns({ type: 'mockType' });
        const mockComponent = (props) => (
          <div>
            <button
              onClick={() => {
                props.onSameDayButtonClick();
              }}
            />
          </div>
        );
        const SameDayInfoComponent = createComponentWithButton(ReservationDetailProps, mockComponent);
        const button = SameDayInfoComponent.find('button');

        click(button);

        expect(retrieveSameDayBoundInformationStub).to.have.been.called;
      });
    });

    context('when click the view boarding position', () => {
      let button, FakeComponent, wrapperComponent;

      beforeEach(() => {
        FakeComponent = (props) => (
          <div>
            <button
              onClick={() => {
                props.onViewBoardingPositionsButtonClick({
                  href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
                  method: 'POST',
                  body: {
                    recordLocator: 'XFXCDF',
                    firstName: 'Shelton',
                    lastName: 'Suen'
                  }
                });
              }}
            />
          </div>
        );
      });

      it('should call resetFlowData and checkIn actions', (done) => {
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        click(button);

        waitFor.untilAssertPass(() => {
          expect(resetFlowDataStub).to.have.been.called;
          expect(checkInStub).to.have.been.calledWith({
            body: { firstName: 'Shelton', lastName: 'Suen', recordLocator: 'XFXCDF' },
            href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
            isLoggedIn: false,
            method: 'POST'
          });
        }, done);
      });

      it('should call transitToBoardingPosition when the checkIn API is successful', (done) => {
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        click(button);

        waitFor.untilAssertPass(() => {
          expect(transitToBoardingPositionStub).to.have.been.called;
        }, done);
      });

      it('should not call transitToBoardingPosition when the checkIn API is failed', (done) => {
        checkInStub.returns((dispatch) => {
          dispatch({ type: 'FAKE_TYPE' });

          return Promise.reject();
        });
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        click(button);

        waitFor.untilAssertPass(() => {
          expect(transitToBoardingPositionStub).to.have.not.been.called;
        }, done);
      });
    });

    context('when click the view boarding pass', () => {
      let button, FakeComponent, wrapperComponent;

      beforeEach(() => {
        FakeComponent = (props) => (
          <div>
            <button
              onClick={() => {
                props.onViewBoardingPassButtonClickCb('SJZ9NZ');
              }}
            />
          </div>
        );
      });

      it('should call goDirectlyToBoardingPassesFnStub with viewBoardingPassIssuance', () => {
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));
        expect(goDirectlyToBoardingPassesFnStub).to.have.been.calledWith({
          viewBoardingPassesLink: ReservationDetailProps._links.viewBoardingPassIssuance,
          recordLocator: 'SJZ9NZ',
          firstName: undefined,
          lastName: undefined,
          queryParams: null
        });
      });

      it('should call goDirectlyToBoardingPassesFnStub with viewBoardingPassIssuance and set clk url param if labelText is "Security Document"', () => {
        ReservationDetailProps._links.viewBoardingPassIssuance.labelText = 'Security document';
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));
        expect(goDirectlyToBoardingPassesFnStub).to.have.been.calledWith({
          viewBoardingPassesLink: ReservationDetailProps._links.viewBoardingPassIssuance,
          recordLocator: 'SJZ9NZ',
          firstName: undefined,
          lastName: undefined,
          queryParams: { clk: 'secdoc_Itin_detail' }
        });
      });

      it('should call goDirectlyToBoardingPassesFnStub with viewBoardingPassIssuance and not set clk url param if labelText isn\'t "Security Document"', () => {
        ReservationDetailProps._links.viewBoardingPassIssuance.labelText = 'Boarding pass';
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));
        expect(goDirectlyToBoardingPassesFnStub).to.have.been.calledWith({
          viewBoardingPassesLink: ReservationDetailProps._links.viewBoardingPassIssuance,
          recordLocator: 'SJZ9NZ',
          firstName: undefined,
          lastName: undefined,
          queryParams: null
        });
      });

      it('should call resetFlowData, showShareLink and goDirectlyToBoardingPasses actions', (done) => {
        wrapperComponent = createComponentWithMemoryRouterEntry(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(resetFlowDataStub).to.have.been.called;
          expect(showShareLinkStub).to.have.been.called;

          expect(goDirectlyToBoardingPassesFnStub).to.have.been.calledWith({
            viewBoardingPassesLink: ReservationDetailProps._links.viewBoardingPassIssuance,
            recordLocator: 'SJZ9NZ',
            firstName: 'FUNFUN',
            lastName: 'LIU',
            queryParams: null
          });
        }, done);

        click(button);
      });
    });

    it('when click the add companion button', (done) => {
      const FakeComponent = (props) => (
        <div>
          <button onClick={props.onAddCompanionButtonClick} />
        </div>
      );

      const goToCompanionPricingPageStub = sinon
        .stub(CompanionActions, 'goToCompanionPricingPage')
        .returns({ type: 'whatever' });

      const wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
      const button = wrapperComponent.find('button');

      waitFor.untilAssertPass(() => {
        expect(goToCompanionPricingPageStub).to.have.been.calledWith({
          body: { companionPricingRequestToken: 'token' },
          href: '/v1/mobile-air-booking/page/flights/prices/KHUXTC/companion',
          method: 'POST'
        });
      }, done);

      click(button);
    });

    context('AirChange Flow', () => {
      let FakeComponent, wrapperComponent;

      beforeEach(() => {
        ReservationDetailProps._links.change = {
          href: '/air/change',
          query: { 'first-name': 'Test', 'last-name': 'Test' }
        };

        ReservationDetailProps._links.reaccom = null;

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onChangeFlightClick} />
          </div>
        );
      });

      it('should call redux actions and transition to air change flow', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        sinon.stub(ReservationApi, 'retrieveReservationChangeable').returns(Q());

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include({
            type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
            request: {
              href: '/air/change',
              query: { 'first-name': 'Test', 'last-name': 'Test' }
            },
            isFetching: true
          });
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/air/change/');
        }, done);

        click(wrapperComponent.find('button'));
      });

      it('should transition to air change flow with a searchToken if searchToken is present', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        sinon.stub(ReservationApi, 'retrieveReservationChangeable').returns(Q());

        ReservationDetailProps.query = {
          searchToken: 'abcde'
        };

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        click(wrapperComponent.find('button'));

        waitFor.untilAssertPass(() => {
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/air/change/');
          expect(wrapperComponent.instance().history.location.search).to.equal('?searchToken=abcde');
        }, done);
      });

      it('should set initial flow status for airChangeSplitPnr and transition to select passengers page when splitPnrDetails exists', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        sinon
          .stub(ReservationApi, 'retrieveReservationChangeable')
          .returns(Q({ changeFlightPage: { splitPnrDetails: { test: 'test' } } }));

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        waitFor.untilAssertPass(() => {
          expect(setFlowStatusStub).to.be.calledWith(AIR_CHANGE_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL);
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/air/change/select-passengers.html');
        }, done);

        click(wrapperComponent.find('button'));
      });

      it('should not transition to air change flow when failed to fetch api failed', (done) => {
        sinon.stub(ReservationApi, 'retrieveReservationChangeable').returns(Q.reject());

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include({
            type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
            request: {
              href: '/air/change',
              query: { 'first-name': 'Test', 'last-name': 'Test' }
            },
            isFetching: true
          });
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/');
        }, done);

        click(wrapperComponent.find('button'));
      });

      it('should display error dialog when changeBlockedMessage exists', (done) => {
        ReservationDetailProps.changeBlockedMessage = {
          key: 'ERROR_KEY',
          header: 'Header',
          body: 'change blocked message',
          icon: null,
          textColor: 'DEFAULT'
        };
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onChangeFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.be.calledWithMatch({
            name: 'ERROR_KEY',
            title: 'Header',
            message: 'change blocked message'
          });
        }, done);

        click(button);
      });

      it('should display error dialog when no change link and no changeBlockedMessage either', (done) => {
        ReservationDetailProps._links.change = null;
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onChangeFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.be.calledWithMatch({
            name: 'change-flight-ineligible',
            message:
              'We are unable to change this reservation online. Please contact a Southwest Airlines Customer Representative for assistance at 1-800-I-FLY-SWA (1-800-435-9792)'
          });
        }, done);

        click(button);
      });

      it('should display error dialog when cancelBlockedMessage exists', (done) => {
        ReservationDetailProps.cancelBlockedMessage = {
          key: 'ERROR_KEY',
          header: 'Header',
          body: 'cancel blocked message',
          icon: null,
          textColor: 'DEFAULT'
        };
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.be.calledWithMatch({
            name: 'ERROR_KEY',
            title: 'Header',
            message: 'cancel blocked message'
          });
        }, done);

        click(button);
      });

      it('should display error dialog when no cancelBound link and no cancelBlockedMessage either', (done) => {
        ReservationDetailProps._links.cancelBound = null;
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.be.calledWithMatch({
            name: 'cancel-flight-ineligible',
            message:
              'Please visit a ticket counter, gate agent, or call 1-800-I-FLY-SWA (1-800-435-9792) to cancel your flight.'
          });
        }, done);

        click(button);
      });

      it('should transition to air reaccom flow when reaccom link is defined and enabled', (done) => {
        location.href = 'http://example.com/air/manage-reservation/view/3YQVVI';
        ReservationDetailProps._links.change = null;
        ReservationDetailProps._links.reaccom = {
          href: '/air/reaccom',
          query: { 'first-name': 'Test', 'last-name': 'Test' }
        };
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onChangeFlightClick} />
          </div>
        );
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);

        sinon.stub(ReaccomApi, 'findFlightReaccomProducts').returns(Q());

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include({
            type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
            request: {
              href: '/air/reaccom',
              query: { 'first-name': 'Test', 'last-name': 'Test' }
            },
            isFetching: true
          });
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/air/reaccom/view.html');
        }, done);

        click(wrapperComponent.find('button'));
      });
    });

    context('when AirCancel', () => {
      let FakeComponent, wrapperComponent;

      beforeEach(() => {
        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );
      });

      it('should call cancelBound redux action and transition to air cancel select bound flow', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');

        const response = {
          viewForCancelBoundPage: {
            recordLocator: 'ABC123',
            _meta: {
              showBoundSelection: true
            }
          }
        };

        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q(response));

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members([
            {
              type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
              response,
              isFetching: false
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: { method: 'push', args: [
                {
                  pathname: '/air/cancel-reservation/',
                  search: '',
                  state: undefined
                }
              ] }
            }
          ]);
          expect(setFlowStatusStub).to.be.calledWith(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);
        }, done);

        click(button);
      });

      it('should call cancelBound redux action and transition to air cancel select bound flow with searchToken', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        ReservationDetailProps.query = {
          searchToken: 'ertvc1355'
        };

        const response = {
          viewForCancelBoundPage: {
            recordLocator: 'ABC123',
            _meta: {
              showBoundSelection: true
            }
          }
        };

        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q(response));

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members([
            {
              type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
              response,
              isFetching: false
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: { method: 'push', args: [
                {
                  pathname: '/air/cancel-reservation/',
                  search: '?searchToken=ertvc1355',
                  state: undefined
                }
              ] }
            }
          ]);
          expect(setFlowStatusStub).to.be.calledWith(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);
        }, done);

        click(button);
      });

      it('should call cancelBound redux action and transition to air cancel refund quote page directly', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/cancel');

        const response = {
          viewForCancelBoundPage: {
            recordLocator: 'ABC123',
            _meta: {
              showBoundSelection: false
            }
          }
        };

        const quoteResponse = {
          cancelRefundQuotePage: {
            recordLocator: 'ABC123',
            _meta: {
              showBoundSelection: false
            }
          }
        };

        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q(response));
        sinon.stub(AirCancelApiStub, 'retrieveRefundQuoteAndConfirmationForCancelBound').returns(Q(quoteResponse));

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members([
            {
              type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
              response: {
                cancelRefundQuotePage: {
                  recordLocator: 'ABC123',
                  _meta: {
                    showBoundSelection: false
                  }
                }
              },
              isFetching: false
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: {
                method: 'push',
                args: ['/air/cancel/ABC123']
              }
            }
          ]);
        }, done);
        click(button);
      });

      it('should handle failure on retrieveReservationForCancel the usual way', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q.reject('response'));

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members([
            {
              type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_FAILED,
              error: 'response',
              isFetching: false
            }
          ]);
        }, done);
        click(button);
      });

      it('should handle failure on retrieveRefundQuoteAndConfirmationForCancelBound the usual way', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');

        const response = {
          viewForCancelBoundPage: {
            recordLocator: 'ABC123',
            _meta: {
              showBoundSelection: false
            }
          }
        };

        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q(response));
        sinon.stub(AirCancelApiStub, 'retrieveRefundQuoteAndConfirmationForCancelBound').returns(Q.reject('response'));

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members([
            {
              type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_FAILED,
              error: 'response',
              isFetching: false
            }
          ]);
        }, done);
        click(button);
      });

      it('should not transition to air cancel flow when failed to fetch api', (done) => {
        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q.reject());

        FakeComponent = (props) => (
          <div>
            <button onClick={props.onCancelFlightClick} />
          </div>
        );

        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');

        waitFor.untilAssertPass(() => {
          expect(wrapperComponent.instance().history.location.pathname).to.equal('/');
        }, done);

        click(button);
      });

      it('should call setFlowStatusFn and transition to air cancel select passengers page when splitPnrDetails exists', (done) => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');

        const response = {
          viewForCancelBoundPage: {
            splitPnrDetails: {
              test: 'test'
            }
          }
        };

        sinon.stub(AirCancelApiStub, 'retrieveReservationForCancel').returns(Q(response));
        wrapperComponent = createComponentWithButton(ReservationDetailProps, FakeComponent);
        button = wrapperComponent.find('button');
        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions).to.deep.include.members(
            [
              {
                type: 'AIR_CANCEL__RESET_FLOW_DATA'
              },
              {
                isFetching: true,
                request: {
                  href: '/v1/mobile-air-booking/page/flights/cancel-bound/TIEOQX',
                  method: 'GET',
                  query: {
                    'passenger-search-token': 'iVZ6TI3CbH5cPejNPJ0kqMWZvde82uFhVyfs9c2rjPK06KBXMxrcE7nksEkft7cNmILSzBsIqPkmn_OnPtGf_oPt4wft87424bzbg-_lSz3N94PluRm7nFrc9n5bIojurUaGXcocWOeQ0NGLcw=='
                  }
                },
                type: 'AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND'
              },
              {
                type: 'FAKE_TYPE'
              },
              {
                type: 'FAKE_TYPE'
              },
              {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: { method: 'push', args: [
                  {
                    pathname: '/air/cancel-reservation/select-passengers.html',
                    search: '',
                    state: undefined
                  }
                ] }
              }
            ]
          );
          expect(setFlowStatusStub).to.be.calledWith(AIR_CANCEL_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL);
        }, done);

        click(button);
      });
    });

    it('should send the user to the check bags page in the same window when the button is clicked', () => {
      const mockHref = 'testHref';
      const FakeComponent = (props) => (
        <button data-test="checkBagsButton" onClick={() => props.onCheckBagsButtonClick(mockHref)} />
      );
      const wrapper = createComponentWithButton({}, FakeComponent);

      wrapper.find('[data-test="checkBagsButton"]').simulate('click');

      expect(openStub).to.have.been.calledWith(mockHref, '_self');
    });
    /* eslint-enable react/prop-types */
  });

  const FakeComponent = () => <div />;

  function createComponentWithButton(props = { isNonRevPnr: false }, fakeComponent = FakeComponent) {
    const defaultProps = ReservationDetailProps;

    store = createMockStore()({
      app: {
        account: {
          isLoggedIn: false
        }
      }
    });
    withReservationDetailTransition = proxyquire('src/shared/enhancers/withReservationDetailTransition', {
      'src/shared/helpers/browserObject': {
        default: { window: { open: openStub } }
      },
      'src/shared/actions/dialogActions': {
        showDialog: showDialogFnStub
      },
      'src/checkIn/actions/checkInActions': {
        resetFlowData: resetFlowDataStub,
        showShareLink: showShareLinkStub,
        getReserveCheckInReservation: getReserveCheckInReservationStub,
        setCheckInFlowStatus: setCheckInFlowStatusStub,
        checkIn: checkInStub,
        transitToBoardingPosition: transitToBoardingPositionStub,
        goDirectlyToBoardingPasses: goDirectlyToBoardingPassesFnStub
      },
      'src/airports/actions/airportInfoActions': {
        resetSelectedAirportInfo: resetSelectedAirportInfoStub
      },
      'src/shared/actions/flowStatusActions': {
        default: { setFlowStatus: setFlowStatusStub }
      },
      'src/standby/actions/standbyActions': {
        checkStandbyNearAirport: checkStandbyNearAirportFnStub,
        checkEnhancedStandbyNearAirport: checkEnhancedStandbyNearAirportFnStub
      },
      'src/shared/enhancers/withFeatureToggles': { default: (Component) => Component }
    }).default;
    const WithReservationDetailTransitionComponent = withReservationDetailTransition(fakeComponent);

    return mount(
      <MemoryRouter
        initialEntries={[
          {
            state: {}
          }
        ]}
      >
        <Provider store={store}>
          <WithReservationDetailTransitionComponent {..._.merge(defaultProps, props)} />
        </Provider>
      </MemoryRouter>
    );
  }

  function createComponentWithMemoryRouterEntry(props = {}, fakeComponent = FakeComponent, initialEntries = {}) {
    const defaultProps = ReservationDetailProps;
    const defaultInitialEntries = {
      pathname: '/my-account/upcoming-trip-details/1',
      search: '?recordLocator=SJZ9NZ',
      state: {
        firstName: 'FUNFUN',
        lastName: 'LIU'
      }
    };

    store = createMockStore()({
      app: {
        account: {
          isLoggedIn: false
        }
      }
    });
    withReservationDetailTransition = proxyquire('src/shared/enhancers/withReservationDetailTransition', {
      'src/checkIn/actions/checkInActions': {
        resetFlowData: resetFlowDataStub,
        showShareLink: showShareLinkStub
      },
      'src/shared/enhancers/withFeatureToggles': { default: (Component) => Component }
    }).default;
    const WithReservationDetailTransitionComponent = withReservationDetailTransition(fakeComponent);

    return mount(
      <MemoryRouter
        initialEntries={[{ ..._.merge(defaultInitialEntries, initialEntries) }]}
      >
        <Provider store={store}>
          <WithReservationDetailTransitionComponent {..._.merge(defaultProps, props)} />
        </Provider>
      </MemoryRouter>
    );
  }

  function createComponentWithStandby(isNonRevPnr, enhancedStanbdyListToggle = false, enhancedLink = null) {
    /* eslint-disable react/prop-types */
    const viewStandbyList = {
      href: '/v1/mobile-air-operations/page/standby',
      method: 'GET',
      query: {
        'arrival-time': '09:55',
        'carrier-code': 'WN',
        'departure-date': '2017-10-12',
        'departure-time': '09:00',
        'destination-airport': 'AUS',
        'first-name': 'ITEST',
        'flight-number': '726',
        'has-wifi': true,
        'last-name': 'WANG',
        'origin-airport': 'DAL',
        'record-locator': 'STMXQ6'
      }
    };
    const FakeComponent = (props) => (
      <div>
        <button
          data-test="standby-list-button"
          onClick={() =>
            props.onClickStandbyList({
              enhancedLink,
              isNonRevPnr,
              link: viewStandbyList
            })
          }
        />
      </div>
    );
    const mockProps = {
      ...ReservationDetailProps,
      toggles: {
        ...ReservationDetailProps.toggles,
        ENHANCED_STANDBY_LIST: enhancedStanbdyListToggle
      }
    };

    /* eslint-enable react/prop-types */
    return createComponentWithButton(mockProps, FakeComponent);
  }
});
