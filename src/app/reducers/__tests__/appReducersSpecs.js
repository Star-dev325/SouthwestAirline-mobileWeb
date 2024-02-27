import dayjs from 'dayjs';
import appReducers from 'src/app/reducers/appReducers';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import PayPalActionTypes from 'src/shared/actions/payPalActionTypes';
import { initialFlowStatus } from 'src/shared/reducers/flowStatusReducer';
import { MenuListData } from 'src/homeAndNav/constants/menuListData';
import toggles from 'src/shared/featureToggle/featureToggleState';

describe('appReducers', () => {
  context('initialState', () => {
    let initialState;

    before(() => {
      initialState = appReducers(undefined, {});
    });

    it('should init globalHeader state', () => {
      expect(initialState.globalHeader).to.be.deep.equal({
        buttonState: 'LOGIN_SHOW_LONG_TEXT',
        showGlobalHeader: true,
        editMode: false
      });
    });

    it('should init airportInfo state', () => {
      expect(initialState.airportInfo).to.deep.equal({});
    });

    it('should init appReady state', () => {
      expect(initialState.appReady).to.be.equal(false);
    });

    it('should init flowStatus state', () => {
      expect(initialState.flowStatus).to.deep.equal(initialFlowStatus);
    });

    it('should init will last bookable date with 6 months later', () => {
      const sixMonthLater = dayjs().add(6, 'months').format('YYYY-MM-DD');

      expect(initialState.lastBookableDate).to.be.equal(sixMonthLater);
    });

    it('should init toggle state', () => {
      expect(initialState.toggles).to.deep.equal(toggles);
    });

    it('should init wcm content state', () => {
      expect(initialState.wcmContent).to.exist;
    });

    it('should init enroll state', () => {
      expect(initialState.enroll).to.deep.equal({ securityQuestions: null });
    });

    it('should init check in state', () => {
      expect(initialState.checkIn).to.deep.equal({
        recentTripSearches: [],
        checkInFlowData: {
          boardingPassInfoForSharing: null,
          checkInSessionToken: null,
          travelDocuments: [],
          passengers: [],
          pnr: null,
          recordLocator: null,
          reservationDetailLinks: null,
          saveEmergencyContactForAll: null
        },
        checkInViewReservationPage: null,
        checkInConfirmationPage: null,
        checkInViewBoardingPassPage: null,
        shouldShowShareLink: false,
        checkInConfirmationPagePlacements: {},
        prefillPassengerAPISDocuments: null
      });
    });

    it('should init flightStatus in state', () => {
      expect(initialState.flightStatus).to.deep.equal({
        flightSchedulesPage: {
          response: {}
        },
        flightStatusDetailsPage: {
          response: {}
        },
        flightStatusRecentPage: {
          searches: []
        },
        selectedRecentSearchRequest: null
      });
    });

    it('should init upcomingTrips in state', () => {
      expect(initialState.upcomingTrips).to.deep.equal({});
    });

    it('should init reLoginModal in state', () => {
      expect(initialState.reLoginModal).to.deep.equal({
        isActive: false,
        isReLoginPointsBooking: false,
        reLoginCallbackFunctions: {},
        reLoginLocation: '',
        reLoginModalOptions: {},
        retryFunctions: []
      });
    });

    it('should init carBooking state', () => {
      expect(initialState.carBooking).to.deep.equal({
        carLocations: [],
        carVendors: [],
        carShoppingResultsPage: {
          response: {},
          searchRequest: null,
          carResults: null
        },
        carPricingPage: {
          carReservation: {},
          response: {},
          selectedCar: {},
          selectedExtras: []
        },
        selectedSearchRequest: null,
        recentSearchRequests: [],
        userInfo: {
          driverInfo: null,
          contactInfo: null
        },
        carBookingConfirmationPage: {},
        carVendorTermsAndConditions: []
      });
    });

    it('should init travelFunds state', () => {
      expect(initialState.travelFunds).to.deep.equal({
        lookUpTravelFundsPage: {
          viewTravelFund: { retrievedFunds: [] },
          message: null,
          currentlySelectedTab: 'travel-funds',
          validateFunds: {},
          transferTravelFundsConfirmation: {},
          associateFundsMessage: {},
          previousTravelFundsSearch: {},
          resumeAfterLogin: {},
          placements: []
        }
      });
    });

    it('should init myAccountPages state', () => {
      expect(initialState.myAccountPages).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should init standby state', () => {
      expect(initialState.standby).to.deep.equal({
        cancelStandbyListConfirmationPage: {},
        standbyPage: {
          response: {}
        },
        isRevenue: null
      });
    });

    it('should init sameDay state', () => {
      expect(initialState.sameDay).to.deep.equal({
        sameDayConfirmationPage: {
          response: {},
          placement: {}
        },
        sameDayPaymentPage: {},
        sameDayPricingPage: {},
        sameDayRefundPage: {},
        sameDaySelectFarePage: {},
        sameDayShoppingPage: {
          sameDayFlightDetails: {},
          sameDayShoppingInformation: {}
        }
      });
    });

    it('should init homeAndNav state', () => {
      expect(initialState.homeAndNav).to.deep.equal({
        drawer: {
          isDrawerOpen: false,
          scrollDrawerToTop: false
        },
        homePage: {
          entertainmentPortalUrl: undefined,
          homeBanners: [],
          heroContents: [],
          homepagePromotions: [],
          trip: null,
          upcomingTripsCount: 0
        },
        menuList: {
          activeMenuIndex: 1,
          listData: MenuListData
        },
        offersPage: {
          placements: [],
          templateData: {}
        }
      });
    });

    it('should init applePay state', () => {
      expect(initialState.applePay).to.deep.equal({
        applePayAvailability: {
          paymentMethod: '',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: false
        },
        applePayCard: null
      });
    });

    it('should init uplift state', () => {
      expect(initialState.uplift).to.deep.equal({
        upliftAvailability: {
          paymentMethod: '',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: false
        },
        upliftCard: null
      });
    });

    it('should init externalPayment state', () => {
      expect(initialState.externalPayment).to.deep.equal({
        requestedAFPParams: null,
        displayButton: false,
        tokenAvailability: {
          isAvailable: false
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(initialState.appReady).to.be.equal(false);
    });

    it('should return default state for isJourneyBannerDisplayed when action is undefined', () => {
      expect(initialState.isJourneyBannerDisplayed).to.be.equal(false);
    });
  });

  it('should change lastBookableDate state when fetch last bookable date update is called', () => {
    const state = appReducers(undefined, {
      type: SharedActionTypes.SHARED__UPDATE_LAST_BOOKABLE_DATE,
      lastBookableDate: '2017-10-10'
    });

    expect(state.lastBookableDate).to.be.equal('2017-10-10');
  });

  it('should change productDefinitions state when fetch product definitions update is called', () => {
    const state = appReducers(undefined, {
      type: SharedActionTypes.SHARED__UPDATE_PRODUCT_DEFINITIONS,
      productDefinitions: { product: 'definitions' }
    });

    expect(state.productDefinitions).to.deep.equal({ product: 'definitions' });
  });

  it('should update appReady when trigger by set appReady action', () => {
    const state = appReducers(undefined, {
      type: SharedActionTypes.SHARED__SET_APP_READY
    });

    expect(state.appReady).to.be.equal(true);
  });

  it('should handle SHARED__SAVE_APP_STATE', () => {
    const existingState = {
      toggles: {
        key: 'value'
      }
    };

    const stateToUpdate = {
      app: {
        airBooking: {
          flightShoppingPage: { response: 'new-flightShoppingPage' },
          flightPricingPage: { response: 'new-flightPricingPage' },
          flightConfirmationPage: { response: 'new-flightConfirmationPage' }
        }
      }
    };

    const action = {
      type: SharedActionTypes.SHARED__SAVE_APP_STATE,
      state: stateToUpdate
    };

    const state = appReducers(existingState, action);

    expect(state.airBooking.flightShoppingPage.response).to.deep.equal(
      stateToUpdate.app.airBooking.flightShoppingPage.response
    );
    expect(state.airBooking.flightPricingPage.response).to.deep.equal(
      stateToUpdate.app.airBooking.flightPricingPage.response
    );
    expect(state.airBooking.flightConfirmationPage.response).to.deep.equal(
      stateToUpdate.app.airBooking.flightConfirmationPage.response
    );
    expect(state.toggles).to.deep.equal(existingState.toggles);
  });

  it('should update isJourneyBannerDisplayed to true when trigger by set journey banner toggle action with payload true', () => {
    const state = appReducers(undefined, {
      type: SharedActionTypes.SHARED__SET_JOURNEY_BANNER_TOGGLE,
      payload: true
    });

    expect(state.isJourneyBannerDisplayed).to.deep.equal(true);
  });

  it('should update isJourneyBannerDisplayed to false when trigger by set journey banner toggle action with payload false', () => {
    const existingState = {
      isJourneyBannerDisplayed: true
    };
    const state = appReducers(existingState, {
      type: SharedActionTypes.SHARED__SET_JOURNEY_BANNER_TOGGLE,
      payload: false
    });

    expect(state.isJourneyBannerDisplayed).to.deep.equal(false);
  });

  context('paypal', () => {
    it('should resume app tree from paypal', () => {
      const fakeAppTree = {
        app: {
          airBooking: {
            flightConfirmationPage: {
              response: 'response'
            }
          }
        }
      };
      const action = {
        type: PayPalActionTypes.PAYPAL__RESUME_APP_STATE,
        payload: {
          state: fakeAppTree
        }
      };

      expect(appReducers(undefined, action).airBooking.flightConfirmationPage).to.be.deep.equal({
        response: 'response'
      });
    });

    it('should assign the resume data to the previous state', () => {
      const fakeAppTree = {
        app: {
          airBooking: {
            flightConfirmationPage: {
              response: 'response'
            }
          }
        }
      };

      const prevState = {
        spinner: {
          asyncActionCount: 0,
          showSpinner: false
        }
      };

      const action = {
        type: PayPalActionTypes.PAYPAL__RESUME_APP_STATE,
        payload: {
          state: fakeAppTree
        }
      };

      const updateState = appReducers(prevState, action);

      expect(updateState.spinner).to.be.deep.equal(prevState.spinner);
      expect(updateState.airBooking.flightConfirmationPage).to.be.deep.equal(
        fakeAppTree.app.airBooking.flightConfirmationPage
      );
    });
  });
});
