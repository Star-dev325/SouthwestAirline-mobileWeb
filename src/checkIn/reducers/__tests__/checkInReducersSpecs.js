import { sandbox } from 'sinon';
import {
  checkInConfirmationPage,
  checkInViewBoardingPassPage,
  checkInViewReservationPage,
  recentTripSearches,
  shouldShowShareLink,
  checkInConfirmationPagePlacements,
  prefillPassengerAPISDocuments
} from 'src/checkIn/reducers/checkInReducers';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import checkInReservationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInReservationBuilder';

const sinon = sandbox.create();

describe('CheckInReducers', () => {
  describe('recent trip searches', () => {
    it('should return the recentTripSearches when fetch recent trip search success and featureName is checkIn', () => {
      const state = recentTripSearches(null, {
        type: SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
        payload: {
          featureName: 'checkIn',
          recentTripSearches: [
            {
              firstName: 'Tom',
              lastName: 'Jones',
              recordLocator: 'UNGJ23'
            },
            {
              firstName: 'Andy',
              lastName: 'Thomas',
              recordLocator: 'UH2GHW'
            }
          ]
        }
      });

      expect(state).to.be.deep.equal([
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        },
        {
          firstName: 'Andy',
          lastName: 'Thomas',
          recordLocator: 'UH2GHW'
        }
      ]);
    });

    it('should return default state when action is undefined', () => {
      expect(recentTripSearches()).to.deep.equal([]);
    });

    it('should return the original value when fetch recent trip search success and featureName is not checkIn', () => {
      const state = recentTripSearches(
        [
          {
            firstName: 'Tim',
            lastName: 'Duncan',
            recordLocator: 'FX234X'
          }
        ],
        {
          type: SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
          payload: {
            featureName: 'noCheckIn',
            recentTripSearches: [
              {
                firstName: 'Tom',
                lastName: 'Jones',
                recordLocator: 'UNGJ23'
              },
              {
                firstName: 'Andy',
                lastName: 'Thomas',
                recordLocator: 'UH2GHW'
              }
            ]
          }
        }
      );

      expect(state).to.be.deep.equal([
        {
          firstName: 'Tim',
          lastName: 'Duncan',
          recordLocator: 'FX234X'
        }
      ]);
    });

    it('should return the default value when init', () => {
      const state = recentTripSearches(undefined, {});

      expect(state).to.be.deep.equal([]);
    });
  });

  describe('checkInViewReservationPage', () => {
    it('should return the checkInViewReservationPage when executing CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS', () => {
      const state = checkInViewReservationPage(null, {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
        response: {
          checkInSessionToken: 'token',
          checkInViewReservationPage: {
            hazmatText: 'hazmatText',
            pnr: 'pnr',
            cards: 'cards'
          },
          prefillPassengerAPISDocuments: null
        }
      });

      expect(state).to.be.deep.equal({
        hazmatText: 'hazmatText',
        pnr: 'pnr',
        cards: 'cards'
      });
    });

    it('should return the checkInViewReservationPage when executing CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS', () => {
      const state = checkInViewReservationPage(null, {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
        response: {
          checkInSessionToken: 'token',
          checkInViewReservationPage: {
            hazmatText: 'hazmatText',
            pnr: 'pnr',
            cards: 'cards'
          },
          prefillPassengerAPISDocuments: null
        }
      });

      expect(state).to.be.deep.equal({
        hazmatText: 'hazmatText',
        pnr: 'pnr',
        cards: 'cards'
      });
    });

    it('should return default value when init', () => {
      const state = checkInViewReservationPage(undefined, { type: '@@INIT' });

      expect(state).to.be.deep.equal(null);
    });

    it('should return default state when action is undefined', () => {
      expect(checkInViewReservationPage()).to.deep.equal(null);
    });
  });

  describe('prefillPassengerAPISDocuments', () => {
    const prefillPassengerAndLapChildAPISDocuments = new checkInReservationBuilder()
      .withPrefillPassengerAndLapChildAPISDocuments()
      .build();

    it('should return the prefillPassengerAPISDocuments when executing CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS', () => {
      const state = prefillPassengerAPISDocuments(null, {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
        response: {
          checkInSessionToken: 'token',
          checkInViewReservationPage: {
            hazmatText: 'hazmatText',
            pnr: 'pnr',
            cards: 'cards'
          },
          prefillPassengerAPISDocuments: prefillPassengerAndLapChildAPISDocuments
        }
      });

      expect(state).toMatchSnapshot();
    });

    it('should return the prefillPassengerAPISDocuments when executing CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS', () => {
      const state = prefillPassengerAPISDocuments(null, {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
        response: {
          checkInSessionToken: 'token',
          checkInViewReservationPage: {
            hazmatText: 'hazmatText',
            pnr: 'pnr',
            cards: 'cards'
          },
          prefillPassengerAPISDocuments: prefillPassengerAndLapChildAPISDocuments
        }
      });

      expect(state).toMatchSnapshot();
    });

    it('should return default value when init', () => {
      const state = prefillPassengerAPISDocuments(undefined, { type: '@@INIT' });

      expect(state).to.be.deep.equal(null);
    });

    it('should return default state when action is undefined', () => {
      expect(prefillPassengerAPISDocuments()).to.deep.equal(null);
    });
  });

  describe('checkInConfirmationPage', () => {
    it('should return the checkInConfirmationPage when fetch checkInConfirmationPage success', () => {
      const state = checkInConfirmationPage(null, {
        type: CheckInActionTypes.CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS,
        response: {
          checkInConfirmationPage: {
            flights: [{ boundIndex: 0 }],
            _links: { viewBoardingPassIssuance: {} },
            _v1_infoNeededToViewBoardingPasses: {}
          }
        }
      });

      expect(state).to.be.deep.equal({
        flights: [{ boundIndex: 0 }],
        _links: { viewBoardingPassIssuance: {} },
        _v1_infoNeededToViewBoardingPasses: {}
      });
    });

    it('should return the checkInConfirmationPage when fetch upgradedBoardingFetchReservation success', () => {
      const state = checkInConfirmationPage(null, {
        type: upgradedBoardingActionTypes.UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS,
        response: { upgradedBoardingReservation: {} }
      });

      expect(state).to.be.null;
    });

    it('should return default value when init', () => {
      const state = checkInConfirmationPage(undefined, { type: '@@INIT' });

      expect(state).to.be.deep.equal(null);
    });

    it('should clear checkInConfirmationPage when clearConfirmationPage action triggered', () => {
      const state = checkInConfirmationPage(
        { flights: [{ boundIndex: 0 }] },
        { type: 'CHECK_IN__CLEAR_CONFIRMATION_PAGE' }
      );

      expect(state).to.be.deep.equal(null);
    });

    it('should return default state when action is undefined', () => {
      expect(checkInConfirmationPage()).to.deep.equal(null);
    });
  });

  describe('checkInViewBoardingPassPage', () => {
    describe('fetch boarding pass is successfully and returns checkInViewBoardingPassPage', () => {
      it('should update state with checkInViewBoardingPassPage when action type CHECK_IN__FETCH_BOARDING_PASS_SUCCESS', () => {
        const response = new CheckInRetrieveBoardingPassBuilder().build();

        const state = checkInViewBoardingPassPage(null, {
          type: CheckInActionTypes.CHECK_IN__FETCH_BOARDING_PASS_SUCCESS,
          response: {
            checkInRetrieveBoardingPassPage: response
          }
        });

        expect(state).to.be.deep.equal(response);
      });
    });

    it('should return default value when init', () => {
      const state = checkInViewBoardingPassPage(undefined, { type: '@@INIT' });

      expect(state).to.be.deep.equal(null);
    });

    it('should clear mobileBoardingPasses when clearBoardingPass action triggered', () => {
      const state = checkInViewBoardingPassPage(
        {
          mobileBoardingPassViewPage: {
            mobileBoardingPassView: ['mbpUa']
          },
          destinationAirportCode: 'DAL'
        },
        {
          type: 'CHECK_IN__CLEAR_BOARDING_PASSES'
        }
      );

      expect(state).to.be.deep.equal({ destinationAirportCode: 'DAL' });
    });

    it('should return default state when action is undefined', () => {
      expect(checkInViewBoardingPassPage()).to.deep.equal(null);
    });
  });

  describe('shouldShowShareLink', () => {
    it('should trun on shouldShowShareLink when CHECK_IN__SHOW_SHARE_LINK triggered', () => {
      const state = shouldShowShareLink(null, {
        type: CheckInActionTypes.CHECK_IN__SHOW_SHARE_LINK
      });

      expect(state).to.be.equal(true);
    });

    it('should return default value when init', () => {
      const state = shouldShowShareLink(undefined, { type: '@@INIT' });

      expect(state).to.be.deep.equal(false);
    });

    it('should return default state when action is undefined', () => {
      expect(shouldShowShareLink()).to.deep.equal(false);
    });
  });
});

describe('checkInConfirmationPagePlacements', () => {
  it('should save check in confirmation page placements content', () => {
    const toDynamicPlacementStub = sinon
      .stub(WcmTransformer, 'toDynamicPlacement')
      .returns({ key: 'dynamicPlacement1' });
    const response = { checkInConfirmationPromoTop01: { key: 'dynamicPlacement1' } };
    const action = { type: CheckInActionTypes.CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS, response };
    const state = checkInConfirmationPagePlacements(undefined, action);

    expect(toDynamicPlacementStub).to.be.calledWith(response);
    expect(state.checkInConfirmationPromoTop01).to.deep.equal({ key: 'dynamicPlacement1' });

    sinon.restore();
  });

  it('should return default state when action is undefined', () => {
    expect(checkInConfirmationPagePlacements()).to.deep.equal({});
  });
});
