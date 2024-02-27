import companionReducers, {
  companionConfirmationPage,
  companionPassengerPage,
  companionPaymentPage,
  flightPricingPage,
  paymentInfo,
  earlyBirdEligibility,
  specialAssistance,
  travelFundsAddress
} from 'src/companion/reducers';
import CompanionActionTypes from 'src/companion/actions/companionActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import CompanionInformationPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder';
import i18n from '@swa-ui/locale';

const {
  COMPANION__FETCH_PAYMENT_PAGE_SUCCESS,
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
  COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
  COMPANION__PREFILL_PASSENGER_INFO,
  COMPANION__UPDATE_PASSENGER_INFO,
  COMPANION__UPDATE_CONTACT_METHOD,
  COMPANION__RESET_CONTACT_METHOD,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__RESET_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS
} = CompanionActionTypes;

describe('companionReducers', () => {
  it('should init state', () => {
    expect(companionReducers(undefined, {})).to.deep.equal({
      flightPricingPage: null,
      companionPassengerPage: {},
      contactMethodInfo: {},
      isInternationalBooking: false,
      companionPaymentPage: null,
      paymentInfo: {},
      earlyBirdEligibility: null,
      companionConfirmationPage: null,
      specialAssistance: null,
      applyTravelFundsPage: {
        currentlySelectedTab: 'travel-funds',
        response: {}
      },
      travelFundsAddress: {}
    });
  });

  context('flightPricingPage', () => {
    it('should save flightPricingPage response when fetch companion success', () => {
      expect(
        flightPricingPage(undefined, {
          type: COMPANION__FETCH_PRICING_PAGE_SUCCESS,
          response: 'flightPricingPage'
        })
      ).to.deep.equal('flightPricingPage');
    });

    it('should return default state when action is undefined', () => {
      expect(flightPricingPage()).to.deep.equal(null);
    });
  });

  context('earlyBirdEligibility', () => {
    it('should save earlyBirdEligibility response when fetch earlyBird price success', () => {
      expect(
        earlyBirdEligibility(undefined, {
          type: COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
          response: { earlyBirdEligibility: { adultProductsCount: 1 } }
        })
      ).to.deep.equal({ adultProductsCount: 1 });
    });

    it('should return default state when action is undefined', () => {
      expect(earlyBirdEligibility()).to.deep.equal(null);
    });

    it('should reset earlyBirdEligibility to null when start fetch earlyBird price', () => {
      expect(
        earlyBirdEligibility(
          { adultProductsCount: 1 },
          {
            type: COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO
          }
        )
      ).to.equal(null);
    });
  });

  context('companionPassengerPage', () => {
    it('should save companionPassengerPage response when fetch companion success', () => {
      expect(
        companionPassengerPage(undefined, {
          type: COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
          response: new CompanionInformationPageBuilder().build()
        })
      ).to.deep.equal({
        response: {
          companionDetailsPage: {
            name: 'Companion Fang',
            middleName: '',
            firstName: 'Companion',
            lastName: 'Fang',
            dateOfBirth: '1995-02-05',
            gender: 'F',
            contactMethod: 'CALL_ME',
            suffix: null,
            contactPhone: {
              countryCode: '1',
              number: '6549873215'
            },
            contactEmail: null,
            emailReceiptTo: 'aterris@example.com',
            redressNumber: null,
            knownTravelerNumber: null
          }
        },
        formData: {
          emailReceiptTo: 'aterris@example.com',
          redressNumber: null,
          knownTravelerNumber: null
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(companionPassengerPage()).to.deep.equal({});
    });

    it('should save companionPassengerPage when update passenger info', () => {
      expect(
        companionPassengerPage(
          {
            response: 'xxx',
            formData: { emailReceiptTo: 'x222796@wnco.com', redressNumber: null, knownTravelerNumber: null }
          },
          {
            type: COMPANION__UPDATE_PASSENGER_INFO,
            formData: {
              emailReceiptTo: 'x123456@wnco.com',
              shareItineraryEmail: '',
              redressNumber: '',
              knownTravelerNumber: '',
              contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (111111111)`
            }
          }
        )
      ).to.deep.equal({
        response: 'xxx',
        formData: {
          emailReceiptTo: 'x123456@wnco.com',
          shareItineraryEmail: '',
          redressNumber: '',
          knownTravelerNumber: '',
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (111111111)`
        }
      });
    });
  });

  context('isInternationalBooking', () => {
    it('should set isInternationalBooking flag to be true when it is international booking', () => {
      const state = companionReducers(
        { isInternationalBooking: false },
        {
          type: COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
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
      const state = companionReducers(
        { isInternationalBooking: true },
        {
          type: COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
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
      const state = companionReducers(undefined, { type: COMPANION__UPDATE_CONTACT_METHOD, info });

      expect(state.contactMethodInfo).to.deep.equal(info);
    });

    it('should update contact method when prefill passenger information', () => {
      const state = companionReducers(undefined, {
        type: COMPANION__PREFILL_PASSENGER_INFO,
        response: new CompanionInformationPageBuilder().withEmailMe().build()
      });

      expect(state.contactMethodInfo).to.deep.equal({
        contactMethod: 'EMAIL',
        email: '123@123.com',
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
      const state = companionReducers(info, { type: COMPANION__RESET_CONTACT_METHOD });

      expect(state.contactMethodInfo).to.deep.equal({});
    });

    it('should prefill contact method info with hyphen when user use US phone number', () => {
      const response = new CompanionInformationPageBuilder().build();
      const state = companionReducers(undefined, {
        type: COMPANION__PREFILL_PASSENGER_INFO,
        response,
        isInternationalBooking: false
      });

      expect(state.contactMethodInfo).to.deep.equal({
        contactMethod: 'CALL',
        email: null,
        phoneNumber: '654-987-3215',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: false,
        isNotificationsEnabled: true
      });
    });

    it('should prefill contact method info without hyphen when user use international phone number', () => {
      const response = new CompanionInformationPageBuilder().withInternationalCallMe().build();
      const state = companionReducers(undefined, {
        type: COMPANION__PREFILL_PASSENGER_INFO,
        response,
        isInternationalBooking: false
      });

      expect(state.contactMethodInfo).to.deep.equal({
        contactMethod: 'CALL',
        email: null,
        phoneNumber: '6549873215',
        phoneCountryCode: '2',
        preferredLanguage: 'EN',
        declineNotifications: false,
        isNotificationsEnabled: true
      });
    });

    it('should not prefill contact method info when booking international flight', () => {
      const response = new CompanionInformationPageBuilder().build();
      const state = companionReducers(undefined, {
        type: COMPANION__PREFILL_PASSENGER_INFO,
        response,
        isInternationalBooking: true
      });

      expect(state.contactMethodInfo).to.deep.equal({});
    });
  });

  context('Special Assistance', () => {
    it('should update the special assistance info', () => {
      const expectedState = {
        BLIND: true,
        DEAF: false,
        COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
        ASSISTANCE_ANIMAL: false,
        PEANUT_DUST_ALLERGY: true,
        PORTABLE_OXYGEN_CONCENTRATOR: false,
        WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
        WHEELCHAIR_STOWAGE: 'NONE',
        WET_BATTERIES: '2',
        DRY_BATTERIES: '0'
      };

      const state = specialAssistance(undefined, {
        type: CompanionActionTypes.COMPANION__UPDATE_SPECIAL_ASSISTANCE,
        specialAssistanceFormData: {
          BLIND: true,
          DEAF: false,
          COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
          ASSISTANCE_ANIMAL: false,
          PEANUT_DUST_ALLERGY: true,
          PORTABLE_OXYGEN_CONCENTRATOR: false,
          WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
          WHEELCHAIR_STOWAGE: 'NONE',
          WET_BATTERIES: '2',
          DRY_BATTERIES: '0'
        }
      });

      expect(state).to.deep.equal(expectedState);
    });

    it('should reset the special assistance info', () => {
      const expectedState = null;

      const state = specialAssistance(undefined, {
        type: CompanionActionTypes.COMPANION__RESET_SPECIAL_ASSISTANCE
      });

      expect(state).to.deep.equal(expectedState);
    });
  });

  context('companionPaymentPage', () => {
    it('should save companionPaymentPage response when fetch payment success', () => {
      expect(
        companionPaymentPage(undefined, {
          type: COMPANION__FETCH_PAYMENT_PAGE_SUCCESS,
          response: 'companionPaymentPage'
        })
      ).to.deep.equal('companionPaymentPage');
    });
  });

  context('companionConfirmationPage', () => {
    it('should save companionConfirmationPage response when purchase success', () => {
      const fakeFlightConfirmationPageResponse = {
        flightConfirmationPage: {
          key: 'value'
        }
      };

      expect(
        companionConfirmationPage(undefined, {
          type: COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
          response: fakeFlightConfirmationPageResponse
        })
      ).to.deep.equal({
        key: 'value'
      });
    });
  });

  context('paymentInfo', () => {
    it('should save paymentInfo', () => {
      expect(
        paymentInfo(
          {
            paymentInfo: {}
          },
          {
            type: COMPANION__SAVE_PAYMENT_INFO,
            paymentInfo: { fakePaymentInfo: 'someValue' }
          }
        )
      ).to.deep.equal({ fakePaymentInfo: 'someValue' });
    });

    it('should return null paymentInfo when fetch saved credit cards', () => {
      expect(
        paymentInfo(
          {
            paymentInfo: {}
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS,
            response: new PaymentSavedCreditCardsBuilder().build(),
            passengerDetailsPageResponse: { passengerDetailsPage: 'fake passenger details' }
          }
        )
      ).to.deep.equal({});
    });

    it('should reset paymentinfo when call reset payment info action', () => {
      expect(
        paymentInfo(undefined, {
          type: COMPANION__RESET_PAYMENT_INFO
        })
      ).to.deep.equal({});
    });
  });

  context('travelFundsAddress', () => {
    expect(
      travelFundsAddress(undefined, {
        type: COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS,
        travelFundsAddress: { billing: 'info' }
      })
    ).to.deep.equal({ billing: 'info' });
  });
});
