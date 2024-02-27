import dayjs from 'dayjs';
import { combineReducers } from 'redux';
import { sandbox } from 'sinon';
import * as AirBookingReducers from 'src/airBooking/reducers/airBookingReducers';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import { getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import sharedActionTypes from 'src/shared/actions/sharedActionTypes';

const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

const sinon = sandbox.create();

describe('airBookingReducers', () => {
  let reducers;
  const passengerDetailsPage = {
    firstName: 'Itest',
    middleName: null,
    lastName: 'Wang',
    dateOfBirth: '1979-01-01',
    gender: 'F',
    rapidRewardsNumber: '601418893',
    contactMethod: 'CALL_ME',
    contactPhone: { countryCode: '1', number: '8767555599' },
    contactEmail: null,
    emailReceiptTo: 'a@a.com',
    redressNumber: null,
    knownTravelerNumber: null
  };
  const firstTraveler = {
    frequentTravelerId: '1234',
    paxNumber: 0,
    addFrequentTravelerToggle: false,
    frequentTravelerToken: 'token0'
  };
  const secondTraveler = {
    frequentTravelerId: '12345',
    paxNumber: 1,
    addFrequentTravelerToggle: false,
    frequentTravelerToken: 'token1'
  };
  const selectedFrequentTravelerResponse = {
    frequentTravelerId: 'account',
    paxNumber: 0,
    addFrequentTravelerToggle: true,
    frequentTravelerToken: 'test token'
  };
  const passengerResponse = { passengerDetailsPage };

  beforeEach(() => {
    reducers = combineReducers({ ...AirBookingReducers });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should init state', () => {
    const expectedSearchRequest = {
      adultPassengersCount: 1,
      departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      returnDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
      origin: undefined,
      destination: undefined,
      numberOfAdults: 1,
      tripType: 'roundTrip',
      currencyType: 'USD',
      isRoundTrip: true,
      lapInfantPassengersCount: 0,
      promoCode: ''
    };

    expect(reducers(undefined, {})).to.deep.equal({
      accountInfo: null,
      chaseBannerConfig: {},
      chaseSessionId: null,
      confirmationPagePlacements: {},
      contactMethodInfo: {},
      contactTravelInfo: {},
      corporateBookingSwitchInfo: {},
      earlyBirdEligibility: null,
      earlyBirdPricingDifference: null,
      earlyBirdPricingToken: null,
      earlyBirdSelected: false,
      flightSelectFarePagePlacements: {},
      flightSelectPagePlacements: {},
      irnInfo: null,
      isEligibleForExpressCheckout: true,
      isExpressCheckout: false,
      isExpressCheckoutFromPassengerPage: false,
      isInternationalBooking: false,
      isPaymentOptionsAndPassengerInfoFetched: false,
      isSplitPayVisible: null,
      isUpliftVisible: null,
      passengerInfos: [],
      passengerValidationDetails: null,
      paymentInfo: {},
      pricePagePlacements: {},
      pricingPromoBannerConfig: {},
      purchasePagePlacements: {},
      resumeSplitPayAfterLogin: null,
      savePassengerCount: {
        adultCount: 1,
        lapChildCount: 0,
        valueUpdated: false
      },
      splitPay: null,
      searchRequest: expectedSearchRequest,
      selectedFlight: {},
      selectedFrequentTravelers: [],
      selectedIrn: null,
      selectedProducts: {},
      splitPayPagePlacements: {},
      splitPayTermsAndConditions: null,
      updateSavedCreditCardPage: null
    });
  });

  context('searchRequest', () => {
    it('should update search request', () => {
      const searchRequest = new SearchForFlightsRequestBuilder().build();

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
        searchRequest
      });

      expect(state.searchRequest).to.deep.equal(searchRequest);
    });

    it('should update search request when save shopping search form', () => {
      const searchRequest = new SearchForFlightsRequestBuilder().build();

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
        searchRequest
      });

      expect(state.searchRequest).to.deep.equal(searchRequest);
    });

    it('should resume search request when come/back from chase page', () => {
      const airBookingDataToResume = {
        searchRequest: 'searchRequest',
        selectedProducts: 'selectedProducts',
        flightShoppingPage: 'flightShoppingPage'
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
        airBookingDataToResume
      });

      expect(state.searchRequest).to.deep.equal(airBookingDataToResume.searchRequest);
    });

    it('should reset search request to default value', () => {
      const initialSearchRequest = {
        adultPassengersCount: 1,
        departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        returnDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
        origin: undefined,
        destination: undefined,
        numberOfAdults: 1,
        tripType: 'roundTrip',
        currencyType: 'USD',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        promoCode: ''
      };
      const searchRequest = new SearchForFlightsRequestBuilder().build();

      const state = reducers(searchRequest, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_SEARCH_REQUEST
      });

      expect(state.searchRequest).to.deep.equal(initialSearchRequest);
    });
  });

  context('accountInfo', () => {
    it('should save passengerInfo', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
        passengerDetailsPageResponse: passengerResponse
      });

      expect(state.accountInfo).to.deep.equal(passengerDetailsPage);
    });

    it('should clear accountInfo', () => {
      const state = reducers(passengerDetailsPage, {
        type: AirBookingActionTypes.AIR_BOOKING__CLEAR_ACCOUNT_INFO
      });

      expect(state.accountInfo).to.deep.equal({});
    });
  });

  context('selectedFlight', () => {
    it('should update the selected outbound flight if selected fight direction is outbound', () => {
      const expectedSelectedFlight = {
        outbound: {
          airportInfo: 'DAL-SEA'
        },
        inbound: {},
        currentDirection: 'outbound'
      };
      const state = reducers(
        {},
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_FLIGHT,
          selectedFlight: {
            flightDetails: {
              airportInfo: 'DAL-SEA'
            },
            currentDirection: 'outbound'
          }
        }
      );

      expect(state.selectedFlight).to.deep.equal(expectedSelectedFlight);
    });

    it('should update the selected inbound flight if selected fight direction is inbound', () => {
      const expectedSelectedFlight = {
        inbound: {
          airportInfo: 'DAL-SEA'
        },
        outbound: {},
        currentDirection: 'inbound'
      };
      const state = reducers(
        {},
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_FLIGHT,
          selectedFlight: {
            flightDetails: {
              airportInfo: 'DAL-SEA'
            },
            currentDirection: 'inbound'
          }
        }
      );

      expect(state.selectedFlight).to.deep.equal(expectedSelectedFlight);
    });
  });

  context('selectedProducts', () => {
    it('should update corresponding product id', () => {
      const expectedSelectedProducts = {
        adult: {
          outbound: {
            fareProductId: 'outbound-product-id',
            flightCardIndex: 0
          },
          inbound: {
            fareProductId: 'inbound-product-id',
            flightCardIndex: 0
          }
        }
      };
      const state = reducers(
        {
          selectedProducts: {
            adult: {
              outbound: {
                fareProductId: 'outbound-product-id',
                flightCardIndex: 0
              }
            }
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS,
          selectedProducts: expectedSelectedProducts
        }
      );

      expect(state.selectedProducts).to.deep.equal(expectedSelectedProducts);
    });

    it('should reset selectedProducts to empty when search flight', () => {
      const state = reducers(
        {
          selectedProducts: {
            adult: {
              outbound: {
                fareProductId: 'outbound-product-id',
                flightCardIndex: 0
              }
            }
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__RESET_SELECTED_PRODUCTS
        }
      );

      expect(state.selectedProducts).to.deep.equal({});
    });

    it('should resume selectedProducts when come/back from chase page', () => {
      const airBookingDataToResume = {
        searchRequest: 'searchRequest',
        selectedProducts: 'selectedProducts',
        flightShoppingPage: 'flightShoppingPage'
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
        airBookingDataToResume
      });

      expect(state.searchRequest).to.deep.equal(airBookingDataToResume.searchRequest);
    });
  });

  context('chase and promo banner', () => {
    let toDynamicPlacementStub;

    beforeEach(() => {
      toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement').returns({ key: 'response' });
    });

    it('should save chase and promo banner config content', () => {
      const chaseAndPromoBannerResponse = {
        key: 'chaseAndPromoBannerResponse',
        results: {
          fullChaseAd: 'test'
        }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
        response: {
          ...chaseAndPromoBannerResponse,
          isEligibleForDisplayingChaseBanner: true
        }
      });

      expect(toDynamicPlacementStub).to.be.called.exactly(5);
      expect(state.chaseBannerConfig).to.deep.equal({ key: 'response' });
      expect(state.pricingPromoBannerConfig.promoTop01).to.deep.equal({ key: 'response' });
      expect(state.pricingPromoBannerConfig.promoMiddle01).to.deep.equal({ key: 'response' });
      expect(state.pricingPromoBannerConfig.promoBottom01).to.deep.equal({ key: 'response' });
      expect(state.pricingPromoBannerConfig.promoBottom02).to.deep.equal({ key: 'response' });
    });

    it('should set chaseBannerConfig to null when calling for reset', () => {
      const state = reducers(undefined, {
        type: CreditCardActionTypes.CHASE__RESET_CHASE_BANNER_CONFIG
      });

      expect(state.chaseBannerConfig).to.deep.equal({});
    });
  });

  context('purchasePagePlacements', () => {
    context('bottomPromo1', () => {
      let toDynamicPlacementStub;

      beforeEach(() => {
        toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');
      });

      it('should return default state when state is undefined', () => {
        const action = { type: 'invalid-action' };

        const state = reducers(undefined, action);

        expect(toDynamicPlacementStub).to.not.have.been.called;
        expect(state.purchasePagePlacements.bottomPromo1).to.equal(undefined);
      });

      it('should return existing state when action is undefined', () => {
        const bottomPromo1 = { bottom: 'promo' };
        const existingState = { purchasePagePlacements: { bottomPromo1 } };

        const state = reducers(existingState, undefined);

        expect(toDynamicPlacementStub).to.not.have.been.called;
        expect(state.purchasePagePlacements.bottomPromo1).to.deep.equal(bottomPromo1);
      });

      it('should return existing state when action is invalid', () => {
        const action = { type: 'invalid-action' };

        const bottomPromo1 = { bottom: 'promo' };
        const existingState = { purchasePagePlacements: { bottomPromo1 } };

        const state = reducers(existingState, action);

        expect(toDynamicPlacementStub).to.not.have.been.called;
        expect(state.purchasePagePlacements.bottomPromo1).to.deep.equal(bottomPromo1);
      });

      it('should return undefined when transformer returns null', () => {
        const response = { key: 'value' };
        const action = {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
          response
        };

        toDynamicPlacementStub.returns(undefined);

        const state = reducers(undefined, action);

        expect(toDynamicPlacementStub).to.have.been.calledWith(response);
        expect(state.purchasePagePlacements.bottomPromo1).to.equal(undefined);
      });

      it('should return value when transformer returns value', () => {
        const response = { key: 'value' };
        const action = {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
          response
        };

        const dynamicPlacement = { dynamic: 'placement' };

        toDynamicPlacementStub.returns(dynamicPlacement);

        const state = reducers(undefined, action);

        expect(toDynamicPlacementStub).to.have.been.calledWith(response);
        expect(state.purchasePagePlacements.bottomPromo1).to.deep.equal(dynamicPlacement);
        expect(state.purchasePagePlacements.earlyBirdUpsell).to.deep.equal(dynamicPlacement);
        expect(state.purchasePagePlacements.upliftMessage).to.deep.equal(dynamicPlacement);
      });
    });
  });

  context('when pricePagePlacements', () => {
    let toDynamicPlacementStub;

    beforeEach(() => {
      toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');
    });

    it('should return value if action type is price page placement', () => {
      const response = { earlyBirdUpsell: 'value' };
      const action = {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
        response
      };
      const dynamicPlacement = { dynamic: 'placement' };

      toDynamicPlacementStub.returns(dynamicPlacement);
      const state = reducers(undefined, action);

      expect(toDynamicPlacementStub).to.have.been.calledWith(response);
      expect(state.pricePagePlacements.earlyBirdUpsell).to.deep.equal(dynamicPlacement);
    });

    it('should return existing state if action is undefined', () => {
      const earlyBirdUpsell = { earlyBirdEligibility: {} };
      const existingState = { pricePagePlacements: { earlyBirdUpsell } };
      const state = reducers(existingState, undefined);

      expect(toDynamicPlacementStub).to.not.have.been.called;
      expect(state.pricePagePlacements.earlyBirdUpsell).to.deep.equal(earlyBirdUpsell);
    });
  });

  context('when splitPayPagePlacements', () => {
    let toDynamicPlacementStub;

    beforeEach(() => {
      toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');
    });

    it('should return value if action type is split pay page placement', () => {
      const response = { paymentBanner: 'value' };
      const action = {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_SUCCESS,
        response
      };
      const dynamicPlacement = { paymentBanner: 'placement' };

      toDynamicPlacementStub.returns(dynamicPlacement);
      const state = reducers(undefined, action);

      expect(toDynamicPlacementStub).to.have.been.calledWith(response);
      expect(state.splitPayPagePlacements.paymentBanner).to.deep.equal(dynamicPlacement);
    });

    it('should return existing state if action is undefined', () => {
      const paymentBanner = { content: {} };
      const existingState = { splitPayPagePlacements: { paymentBanner } };

      const state = reducers(existingState, undefined);

      expect(toDynamicPlacementStub).to.not.have.been.called;
      expect(state.splitPayPagePlacements.paymentBanner).to.deep.equal(paymentBanner);
    });
  });

  context('confirmationPagePlacements', () => {
    it('should send null if content is missing', () => {
      const confirmationPagePlacementResponse = {
        results: { msg: 'No matching content was found.' }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
        response: confirmationPagePlacementResponse
      });

      expect(state.confirmationPagePlacements.bottomPromo1).to.equal(undefined);
    });

    it('should save confirmation page placements information on success', () => {
      const promoContent = {
        content: {
          displayType: 'web_hero',
          promoImageForeground: 'foregroundImageTop.jpg',
          linkType: 'link',
          imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
          promoImageBackground: 'backgroundImageTop.png',
          target: 'target',
          placementData: {
            contentBlockId: '3986'
          }
        }
      };
      const confirmationPagePlacementResponse = {
        results: {
          bottomPromo1: promoContent,
          promoTop01: promoContent,
          promoBottom01: promoContent,
          promoBottom02: promoContent,
          promoBottom03: promoContent,
          promoBottom04: promoContent
        }
      };
      const expectedPagePlacement = {
        linkType: 'link',
        imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
        promoImageBackground: 'backgroundImageTop.png',
        promoImageForeground: 'foregroundImageTop.jpg',
        target: 'target',
        contentBlockId: '3986',
        displayType: 'web_hero',
        isChaseCombo: false,
        isChasePrequal: false,
        isChasePlacement: false,
        shouldObserveViewPort: false,
        viewPortThreshold: 0.5,
        placementData: {
          contentBlockId: '3986'
        }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
        response: confirmationPagePlacementResponse
      });

      expect(state.confirmationPagePlacements.bottomPromo1).to.deep.equal(expectedPagePlacement);
      expect(state.confirmationPagePlacements.promoTop01).to.deep.equal(expectedPagePlacement);
      expect(state.confirmationPagePlacements.promoBottom01).to.deep.equal(expectedPagePlacement);
      expect(state.confirmationPagePlacements.promoBottom02).to.deep.equal(expectedPagePlacement);
      expect(state.confirmationPagePlacements.promoBottom03).to.deep.equal(expectedPagePlacement);
      expect(state.confirmationPagePlacements.promoBottom04).to.deep.equal(expectedPagePlacement);
    });
  });

  context('flightSelectPagePlacements', () => {
    it('should send undefined if content is missing', () => {
      const flightSelectPagePlacementResponse = {
        results: { msg: 'No matching content was found.' }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS,
        response: flightSelectPagePlacementResponse
      });

      expect(state.flightSelectPagePlacements.bottomPromo1).to.equal(undefined);
    });

    it('should save flight select page placements information on success', () => {
      const promoContent = {
        content: {
          displayType: 'web_hero',
          promoImageForeground: 'foregroundImageTop.jpg',
          linkType: 'link',
          imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
          promoImageBackground: 'backgroundImageTop.png',
          target: 'target',
          placementData: {
            contentBlockId: '3986'
          }
        }
      };
      const flightSelectPagePlacementResponse = {
        results: {
          promoBottom01: promoContent,
          promoTop01: promoContent
        }
      };
      const expectedPagePlacement = {
        linkType: 'link',
        imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
        promoImageBackground: 'backgroundImageTop.png',
        promoImageForeground: 'foregroundImageTop.jpg',
        target: 'target',
        contentBlockId: '3986',
        displayType: 'web_hero',
        isChaseCombo: false,
        isChasePrequal: false,
        isChasePlacement: false,
        shouldObserveViewPort: false,
        viewPortThreshold: 0.5,
        placementData: {
          contentBlockId: '3986'
        }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS,
        response: flightSelectPagePlacementResponse
      });

      expect(state.flightSelectPagePlacements.bottomPromo1).to.deep.equal(expectedPagePlacement);
      expect(state.flightSelectPagePlacements.promoTop01).to.deep.equal(expectedPagePlacement);
    });
  });

  context('flightSelectFarePagePlacements', () => {
    it('should send undefined if content is missing', () => {
      const flightSelectFarePagePlacementResponse = {
        results: { msg: 'No matching content was found.' }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_SUCCESS,
        response: flightSelectFarePagePlacementResponse
      });

      expect(state.flightSelectFarePagePlacements.bottomPromo1).to.equal(undefined);
    });

    it('should save flight select fare page placements information on success', () => {
      const promoContent = {
        content: {
          displayType: 'web_hero',
          promoImageForeground: 'foregroundImageTop.jpg',
          linkType: 'link',
          imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
          promoImageBackground: 'backgroundImageTop.png',
          target: 'target',
          placementData: {
            contentBlockId: '3986'
          }
        }
      };
      const flightSelectFarePagePlacementResponse = {
        results: {
          promoBottom01: promoContent,
          promoTop01: promoContent
        }
      };
      const expectedPagePlacement = {
        linkType: 'link',
        imageForegroundAltText: 'SOUTHWEST PAGE_PLACEMENT',
        promoImageBackground: 'backgroundImageTop.png',
        promoImageForeground: 'foregroundImageTop.jpg',
        target: 'target',
        contentBlockId: '3986',
        displayType: 'web_hero',
        isChaseCombo: false,
        isChasePrequal: false,
        isChasePlacement: false,
        shouldObserveViewPort: false,
        viewPortThreshold: 0.5,
        placementData: {
          contentBlockId: '3986'
        }
      };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_SUCCESS,
        response: flightSelectFarePagePlacementResponse
      });

      expect(state.flightSelectFarePagePlacements.bottomPromo1).to.deep.equal(expectedPagePlacement);
      expect(state.flightSelectFarePagePlacements.promoTop01).to.deep.equal(expectedPagePlacement);
    });
  });

  context('selectedFrequentTravelers', () => {
    it('should store paxNumber, frequentTravelerId, frequentTravelerToken', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
        ...selectedFrequentTravelerResponse
      });

      expect(state.selectedFrequentTravelers).to.deep.equal([selectedFrequentTravelerResponse]);
    });

    it('should update paxNumber, frequentTravelerId, frequentTravelerToken', () => {
      const state = reducers(
        {
          selectedFrequentTravelers: [firstTraveler, secondTraveler]
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
          ...selectedFrequentTravelerResponse
        }
      );

      expect(state.selectedFrequentTravelers).to.deep.equal([selectedFrequentTravelerResponse, secondTraveler]);
    });

    it('should update paxNumber, frequentTravelerId, frequentTravelerToken in store', () => {
      const state = reducers(
        {
          selectedFrequentTravelers: [firstTraveler]
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
          ...selectedFrequentTravelerResponse
        }
      );

      expect(state.selectedFrequentTravelers).to.deep.equal([selectedFrequentTravelerResponse]);
    });

    it('should clear selectedFrequentTravelers from store', () => {
      const state = reducers(
        {
          selectedFrequentTravelers: [secondTraveler]
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS
        }
      );

      expect(state.selectedFrequentTravelers).to.deep.equal([]);
    });

    it('should remove selected FrequentTraveler from store', () => {
      const selectedFrequentTravelersData = [firstTraveler, secondTraveler];
      const state = reducers(
        { selectedFrequentTravelers: selectedFrequentTravelersData },
        {
          type: AirBookingActionTypes.AIR_BOOKING__REMOVE_SELECTED_FREQUENT_TRAVELER_PAX_ID,
          paxNumber: 0
        }
      );

      expect(state.selectedFrequentTravelers).to.deep.equal([secondTraveler]);
    });
  });

  context('paymentInfo', () => {
    it('should save paymentInfo', () => {
      const state = reducers(
        {
          paymentInfo: {}
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO,
          paymentInfo: { fakePaymentInfo: 'someValue' }
        }
      );

      expect(state.paymentInfo).to.deep.equal({ fakePaymentInfo: 'someValue' });
    });

    it('should reset payment info when set saved credit cards', () => {
      const state = reducers(
        {
          paymentInfo: {}
        },
        {
          type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
          paymentSavedCreditCardsPage: new PaymentSavedCreditCardsBuilder().build(),
          passengerDetailsPageResponse: { passengerDetailsPage: 'fake passenger details' }
        }
      );

      expect(state.paymentInfo).to.deep.equal({});
    });

    it('should reset payment info when fetch saved credit cards and passenger info success', () => {
      const state = reducers(
        {
          paymentInfo: {}
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
          passengerDetailsPageResponse: passengerResponse
        }
      );

      expect(state.paymentInfo).to.deep.equal({});
    });

    it('should clear paymentInfo when reset payment info', () => {
      const state = reducers(
        {
          paymentInfo: { fakePaymentInfo: 'someValue' }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO
        }
      );

      expect(state.paymentInfo).to.deep.equal({});
    });
  });

  context('updateSavedCreditCardPage', () => {
    it('should set updateSavedCreditCardPage when fetch credit card by id success', () => {
      const state = reducers(
        {},
        {
          type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_SUCCESS,
          updateSavedCreditCardPage: 'updateSavedCreditCardPage'
        }
      );

      expect(state.updateSavedCreditCardPage).to.deep.equal('updateSavedCreditCardPage');
    });
  });

  context('splitPay method', () => {
    it('should save splitPay state when split pay call is success', () => {
      const response = { content: 'hbhjcb' };

      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST_SUCCESS,
        response
      });

      expect(state.splitPay).to.deep.equal(response);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SPLIT_PAY_OPTIONS_LIST,
        info: null
      });

      expect(state.splitPay).to.be.null;
    });

    it('should update splitPay state upon calc funds call is success', () => {
      const response = { content: 'hbhjcb' };

      const state = reducers(undefined, {
        type: sharedActionTypes.SHARED__CALC_FUNDS_SUCCESS,
        response
      });

      expect(state.splitPay).to.deep.equal(response);
    });
  });

  context('isInternationalBooking', () => {
    it('should set isInternationalBooking flag to be true when it is international booking', () => {
      const state = reducers(
        { isInternationalBooking: false },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG,
          response: {
            flightPricingPage: {
              _meta: {
                internationalBooking: true
              }
            }
          }
        }
      );

      expect(state.isInternationalBooking).to.be.true;
    });

    it('should set isInternationalBooking flag to be false when it is domestic booking', () => {
      const state = reducers(
        { isInternationalBooking: true },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG,
          response: {
            flightPricingPage: {
              _meta: {
                internationalBooking: false
              }
            }
          }
        }
      );

      expect(state.isInternationalBooking).to.be.false;
    });
  });

  context('contactMethodInfo', () => {
    it('should update contact method info', () => {
      const info = {
        email: undefined,
        contactMethod: 'CALL',
        phoneCountryCode: '1',
        phoneNumber: '123-456-7890'
      };
      const state = reducers(undefined, { type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_METHOD, info });

      expect(state.contactMethodInfo).to.deep.equal(info);
    });

    it('should update contact method when prefill passenger information', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
        passengerDetailsPage: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          contactMethod: 'EMAIL_ME',
          contactPhone: null,
          contactEmail: 'test@exam.com'
        }
      });

      expect(state.contactMethodInfo).to.deep.equal({
        contactMethod: 'EMAIL',
        email: 'test@exam.com',
        phoneNumber: undefined,
        phoneCountryCode: undefined,
        preferredLanguage: 'EN',
        declineNotifications: false,
        isNotificationsEnabled: true
      });
    });

    it('should clear contact method info', () => {
      const info = {
        email: undefined,
        contactMethod: 'CALL',
        phoneCountryCode: '1',
        phoneNumber: '123-456-7890'
      };
      const state = reducers(info, { type: AirBookingActionTypes.AIR_BOOKING__RESET_CONTACT_METHOD });

      expect(state.contactMethodInfo).to.deep.equal({});
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.contactMethodInfo).to.deep.equal({});
    });
  });

  describe('contact travel info', () => {
    it('should update contact travel info', () => {
      const info = {
        contactMethod: contactMethodKeys.CALL_ME,
        phoneCountryCode: '1',
        phoneNumber: '123-456-7890'
      };
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_TRAVEL_INFO_METHOD,
        info
      });

      expect(state.contactTravelInfo).to.deep.equal({
        contactMethod: contactMethodKeys.CALL_ME,
        contactPhone: {
          number: '123-456-7890',
          countryCode: '1'
        }
      });
    });
  });

  context('irnInfo', () => {
    it('should update irn when prefill passenger information is dispatched', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
        passengerDetailsPage: {
          irnInfo: {
            irnRequired: true,
            alternateIrnAllowed: false,
            preselectedInternalReferenceNumber: {
              name: 'IRN name',
              description: 'Description'
            },
            companyInternalReferenceNumbers: [
              {
                name: 'sadassad',
                description: 'sdaasddas'
              },
              {
                name: 'sadassad',
                description: 'sdaasddas'
              }
            ],
            travelerInternalReferenceNumbers: [
              {
                name: '253376',
                description: 'Legal Department'
              }
            ]
          }
        }
      });

      expect(state.irnInfo).to.deep.equal({
        irnRequired: true,
        alternateIrnAllowed: false,
        preselectedInternalReferenceNumber: {
          name: 'IRN name',
          description: 'Description'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'sadassad',
            description: 'sdaasddas'
          }
        ],
        travelerInternalReferenceNumbers: [
          {
            name: '253376',
            description: 'Legal Department'
          }
        ]
      });
    });

    it('should clear irn info', () => {
      const info = {
        irnRequired: true,
        alternateIrnAllowed: false,
        preselectedInternalReferenceNumber: {
          name: 'IRN name',
          description: 'Description'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'sadassad',
            description: 'sdaasddas'
          }
        ],
        travelerInternalReferenceNumbers: [
          {
            name: '253376',
            description: 'Legal Department'
          }
        ]
      };
      const state = reducers(info, { type: AirBookingActionTypes.AIR_BOOKING__RESET_CONTACT_METHOD });

      expect(state.irnInfo).to.deep.equal(null);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.irnInfo).to.deep.equal(null);
    });
  });

  context('corporateBookingSwitchInfo', () => {
    it('should save corporateBookingSwitchInfo', () => {
      const switchData = { switchInfo: {} };
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
        corporateBookingSwitchInfo: switchData
      });

      expect(state.corporateBookingSwitchInfo).to.deep.equal(switchData);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.corporateBookingSwitchInfo).to.deep.equal({});
    });
  });

  context('earlyBirdSelected', () => {
    it('should save earlyBirdSelected', () => {
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
        earlyBirdSelected: true
      });

      expect(state.earlyBirdSelected).to.be.true;
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.earlyBirdSelected).to.be.false;
    });
  });

  context('earlyBirdEligibility', () => {
    it('should set earlyBirdEligibility', () => {
      const earlyBirdEligibility = {
        bound: []
      };
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY,
        earlyBirdEligibility
      });

      expect(state.earlyBirdEligibility).to.deep.equal(earlyBirdEligibility);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.earlyBirdEligibility).to.be.null;
    });
  });

  context('earlyBirdPricingToken', () => {
    it('should set earlyBirdPricingToken', () => {
      const earlyBirdPricingToken = 'tokenValue';
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_TOKEN,
        earlyBirdPricingToken
      });

      expect(state.earlyBirdPricingToken).to.deep.equal(earlyBirdPricingToken);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.earlyBirdPricingToken).to.be.null;
    });
  });

  context('earlyBirdPricingDifference', () => {
    it('should set earlyBirdPricingDifference', () => {
      const earlyBirdPricingDifference = 'increase';
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_DIFFERENCE,
        earlyBirdPricingDifference
      });

      expect(state.earlyBirdPricingDifference).to.deep.equal(earlyBirdPricingDifference);
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.earlyBirdPricingDifference).to.be.null;
    });
  });

  context('selectedIrn', () => {
    it('should save selectedIrn', () => {
      const selectedIrn = 'SelectedIrnName';
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN,
        selectedIrn
      });

      expect(state.selectedIrn).to.deep.equal(selectedIrn);
    });

    it('should set pre-selected irn as selectedIrn', () => {
      const selectedIrn = 'SelectedIrnName';
      const passengerDetailsPage = {
        irnInfo: {
          irnRequired: true,
          alternateIrnAllowed: true,
          preselectedInternalReferenceNumber: {
            name: selectedIrn
          }
        }
      };
      const state = reducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
        passengerDetailsPage,
        isInternationalBooking: false
      });

      expect(state.selectedIrn).to.deep.equal({ name: selectedIrn, manuallyEntered: false });
    });

    it('should return empty object if type or action is null', () => {
      const state = reducers(undefined, { type: null, info: null });

      expect(state.selectedIrn).to.deep.equal(null);
    });
  });

  it('should prefill contact method info with hyphen when booking domestic flight', () => {
    const passengerDetailsPage = {
      contactMethod: 'CALL_ME',
      contactPhone: {
        countryCode: '1',
        number: '0123456789'
      },
      contactEmail: 'test@test.com'
    };
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
      passengerDetailsPage,
      isInternationalBooking: false
    });

    expect(state.contactMethodInfo).to.deep.equal({
      contactMethod: 'CALL',
      email: 'test@test.com',
      phoneNumber: '012-345-6789',
      phoneCountryCode: '1',
      preferredLanguage: 'EN',
      declineNotifications: false,
      isNotificationsEnabled: true
    });
  });

  it('should prefill contact method info without hyphen when booking domestic flight', () => {
    const passengerDetailsPage = {
      contactMethod: 'CALL_ME',
      contactPhone: {
        countryCode: '2',
        number: '0123456789'
      },
      contactEmail: 'test@test.com'
    };
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
      passengerDetailsPage,
      isInternationalBooking: false
    });

    expect(state.contactMethodInfo).to.deep.equal({
      contactMethod: 'CALL',
      email: 'test@test.com',
      phoneNumber: '0123456789',
      phoneCountryCode: '2',
      preferredLanguage: 'EN',
      declineNotifications: false,
      isNotificationsEnabled: true
    });
  });

  it('should not prefill contact method info when booking international flight', () => {
    const passengerDetailsPage = {
      contactMethod: 'CALL_ME',
      contactPhone: {
        countryCode: '86',
        number: '18388888888'
      },
      contactEmail: 'test@test.com'
    };
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
      passengerDetailsPage,
      isInternationalBooking: true
    });

    expect(state.contactMethodInfo).to.deep.equal({});
  });

  it('should set isEligibleForExpressCheckout when set ExpressCheckoutEligible', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
      isEligibleForExpressCheckout: false
    });

    expect(state.isEligibleForExpressCheckout).to.deep.equal(false);
  });

  it('should set isExpressCheckout when setIsExpressCheckout triggered', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT,
      isExpressCheckout: true
    });

    expect(state.isExpressCheckout).to.deep.equal(true);
  });

  it('should set isPaymentOptionsAndPassengerInfoFetched to true', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
      passengerDetailsPageResponse: passengerResponse
    });

    expect(state.isPaymentOptionsAndPassengerInfoFetched).to.deep.equal(true);
  });

  it('should set isPaymentOptionsAndPassengerInfoFetched to false', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED,
      passengerDetailsPageResponse: passengerResponse
    });

    expect(state.isPaymentOptionsAndPassengerInfoFetched).to.deep.equal(false);
  });

  it('should set isSplitPayVisible when setIsSplitPayVisible triggered', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SET_IS_SPLIT_PAY_VISIBLE,
      isSplitPayVisible: true
    });

    expect(state.isSplitPayVisible).to.deep.equal(true);
  });

  it('should set isUpliftVisible when setIsUpliftVisible triggered', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SET_IS_UPLIFT_VISIBLE,
      isUpliftVisible: true
    });

    expect(state.isUpliftVisible).to.deep.equal(true);
  });

  it('should set savePassengerCount method info when increasing or decreasing passengers count', () => {
    const passengerCount = {
      adultCount: 1,
      lapChildCount: 0,
      valueUpdated: false
    };
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
      passengerCount
    });

    expect(state.savePassengerCount).to.deep.equal({
      adultCount: 1,
      lapChildCount: 0,
      valueUpdated: false
    });
  });

  it('should set resumeSplitPayAfterLogin when splitPayResumeAfterLogin', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SPLIT_PAY_RESUME_AFTER_LOGIN,
      shouldResume: true
    });

    expect(state.resumeSplitPayAfterLogin).to.deep.equal(true);
  });

  it('should set split pay terms and conditions when save splitPayTermsAndConditions triggered', () => {
    const termsAndConditions = { splitPayTermsAndConditions: 'test terms and conditions' };
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS,
      termsAndConditions
    });

    expect(state.splitPayTermsAndConditions).to.deep.equal(termsAndConditions);
  });

  it('should reset split pay terms and conditions when reset splitPayTermsAndConditions triggered', () => {
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__RESET_SPLIT_PAY_TERMS_AND_CONDITIONS
    });

    expect(state.splitPayTermsAndConditions).to.equal(null);
  });

  it('should return passengerValidationDetails when AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS_SUCCESS is triggered', () => {
    const { passengerValidationDetails } = getPassengerValidationDetails();
    const state = reducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS_SUCCESS,
      response: { passengerValidationDetails }
    });

    expect(state.passengerValidationDetails).to.deep.equal(passengerValidationDetails);
  });
});
