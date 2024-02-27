import {
  splitPayOptionsSecureRequestObj,
  transformToCalculateSplitPayCalcFundsRequest
} from 'src/airBooking/transformers/applyRapidRewardsTransformer.js';
import AirBookingApplyRapidRewardsPageApiJsonBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageApiJsonBuilder';
import SplitPayCalcFundsApiJsonBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/splitPayCalcFundsApiJsonBuilder';

describe('applyRapidRewardsTransformer', () => {
  let passengers, splitPayLinksObjMock, splitPayRequestObject;

  beforeEach(() => {
    splitPayRequestObject = new AirBookingApplyRapidRewardsPageApiJsonBuilder().build();
    splitPayLinksObjMock = {
      body: {
        itineraryPricingToken: 'itinerary-token',
        offerId: '3204890832666624',
        promoCodeToken: 'promoCodeToken'
      },
      href: '/v1/mobile-air-booking/feature/split-pay-options-secure',
      method: 'POST'
    };
  });

  it('should create splitPay options request object', () => {
    passengers = [
      {
        passengerInfo: {
          dateOfBirth: '10-2-1987',
          firstName: 'Fred',
          frequentTravelerId: 'ACCOUNT',
          gender: 'M',
          lastName: 'Flintstone',
          middleName: 'john',
          rapidRewardsNumber: '1234567890',
          shareItineraryEmail: '?string',
          suffix: 'Mr.'
        },
        passengerReference: 1,
        type: 'adult'
      }
    ];
    const result = splitPayOptionsSecureRequestObj('funds-token', passengers, splitPayLinksObjMock);

    expect(result).toEqual(splitPayRequestObject);
  });

  describe('should transformToCalculateSplitPayCalcFundsRequest', () => {
    let splitPayCalcFundsRequestObject;

    beforeEach(() => {
      splitPayCalcFundsRequestObject = new SplitPayCalcFundsApiJsonBuilder().build();
    });

    it('should return data with correct structure', () => {
      const formData = {
        selectedRadioOption: 'ABC123'
      };

      const userNameInfo = {
        firstName: 'Fred',
        lastName: 'Flintstone'
      };

      passengers = [
        {
          passengerInfo: {
            dateOfBirth: '1954-4-19',
            firstName: 'Fred',
            frequentTravelerId: 'ACCOUNT',
            gender: 'M',
            lastName: 'Flintstone',
            middleName: null,
            rapidRewardsNumber: '1234567890',
            shareItineraryEmail: '?string',
            suffix: 'Mr.'
          },
          passengerReference: 1,
          type: 'adult'
        }
      ];

      expect(
        transformToCalculateSplitPayCalcFundsRequest(
          formData,
          'funds-token',
          'itinerary-token',
          passengers,
          userNameInfo
        )
      ).toEqual(splitPayCalcFundsRequestObject);
    });
  });
});
