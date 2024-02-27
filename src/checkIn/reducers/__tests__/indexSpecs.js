import reducers from 'src/checkIn/reducers/index';

describe('CheckIn index', () => {
  it('should init the check in state', () => {
    const state = reducers(undefined, { type: '@@INIT' });

    expect(state).to.deep.equal({
      checkInFlowData: {
        boardingPassInfoForSharing: null,
        checkInSessionToken: null,
        passengers: [],
        pnr: null,
        recordLocator: null,
        reservationDetailLinks: null,
        saveEmergencyContactForAll: null,
        travelDocuments: []
      },
      recentTripSearches: [],
      checkInConfirmationPage: null,
      checkInViewBoardingPassPage: null,
      checkInViewReservationPage: null,
      shouldShowShareLink: false,
      checkInConfirmationPagePlacements: {},
      prefillPassengerAPISDocuments: null
    });
  });

  it('should reset check in flow data when CHECK_IN__RESET_FLOW_DATA action triggered', () => {
    const state = reducers(
      {
        checkInFlowData: {
          travelDocuments: ['travelDocuments']
        },
        recentTripSearches: ['recentTrip'],
        checkInConfirmationPage: 'checkInConfirmationPage',
        checkInViewBoardingPassPage: 'checkInViewBoardingPassPage',
        checkInViewReservationPage: 'checkInViewReservationPage',
        shouldShowShareLink: true
      },
      { type: 'CHECK_IN__RESET_FLOW_DATA' }
    );

    expect(state).to.deep.equal({
      checkInFlowData: {
        boardingPassInfoForSharing: null,
        checkInSessionToken: null,
        passengers: [],
        pnr: null,
        recordLocator: null,
        reservationDetailLinks: null,
        saveEmergencyContactForAll: null,
        travelDocuments: []
      },
      recentTripSearches: [],
      checkInConfirmationPage: null,
      checkInViewBoardingPassPage: null,
      checkInViewReservationPage: null,
      shouldShowShareLink: false,
      checkInConfirmationPagePlacements: {},
      prefillPassengerAPISDocuments: null
    });
  });
});
