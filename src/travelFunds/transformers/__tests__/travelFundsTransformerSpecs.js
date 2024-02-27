import {
  transformToRTFLookupRequest,
  transformToVoucherLookupRequest,
  transformToCardLookupRequest,
  transformToRTFCalculateRequest,
  transformToVoucherCalculateRequest,
  transformToCardCalculateRequest,
  transformToCalculatePassengersArray,
  transformToRemoveFundsRequest,
  transformToRefreshFundsRequest,
  transformToChangeTravelFundSummary,
  transformToTransferTravelFundsRequest
} from 'src/travelFunds/transformers/travelFundsTransformer';
import { getLapChildPassengerInfos } from 'test/builders/model/passengerInfosBuilder';

describe('TravelFundsTransformer', () => {
  context('Look Up Funds transformers', () => {
    it('transformToRTFLookupRequest should return data with correct structure for travel funds requests', () => {
      const travelFundsFormData = {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Firstname',
        passengerLastName: 'Lastname'
      };

      expect(transformToRTFLookupRequest(travelFundsFormData)).to.deep.equal({
        method: 'POST',
        href: '/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
        body: {
          travelFundIdentifier: 'ABC123',
          firstName: 'Firstname',
          lastName: 'Lastname'
        }
      });
    });

    it('transformToVoucherLookupRequest should return data with correct structure for luv voucher requests', () => {
      const luvVoucherFormData = {
        voucherNumber: '1234567890123456',
        securityCode: '1234'
      };

      expect(transformToVoucherLookupRequest(luvVoucherFormData)).to.deep.equal({
        method: 'POST',
        href: '/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
        body: {
          travelFundIdentifier: '1234567890123456',
          securityCode: '1234'
        }
      });
    });

    it('transformToCardLookupRequest should return data with correct structure for gift card requests', () => {
      const giftCardFormData = {
        cardNumber: '1234567890123456',
        securityCode: '1234'
      };

      expect(transformToCardLookupRequest(giftCardFormData)).to.deep.equal({
        method: 'POST',
        href: '/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
        body: {
          travelFundIdentifier: '1234567890123456',
          securityCode: '1234'
        }
      });
    });
  });

  context('Apply Funds transformers', () => {
    context('AirBooking and Companion', () => {
      it('transformToRTFCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const travelFundsFormData = {
          confirmationNumber: 'ABC123',
          passengerFirstName: 'Hank',
          passengerLastName: 'Hill'
        };

        expect(
          transformToRTFCalculateRequest(
            travelFundsFormData,
            [
              {
                type: 'adult',
                passengerReference: 1,
                passengerInfo: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  gender: 'M',
                  dateOfBirth: '1954-4-19',
                  rapidRewardsNumber: '1234567890'
                }
              }
            ],
            'funds-token',
            'itinerary-token'
          )
        ).to.deep.equal({
          href: '/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUNDS',
          method: 'POST',
          body: {
            travelFundIdentifier: 'ABC123',
            fundsAppliedToken: 'funds-token',
            firstName: 'Hank',
            lastName: 'Hill',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        });
      });

      it('transformToVoucherCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const luvVoucherFormData = {
          voucherNumber: '1234567890123456',
          securityCode: '1234'
        };

        expect(
          transformToVoucherCalculateRequest(
            luvVoucherFormData,
            [
              {
                type: 'adult',
                passengerReference: 1,
                passengerInfo: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  gender: 'M',
                  dateOfBirth: '1954-4-19',
                  rapidRewardsNumber: '1234567890'
                }
              }
            ],
            'funds-token',
            'itinerary-token'
          )
        ).to.deep.equal({
          href: '/v1/mobile-air-booking/page/calculate-funds/LUV_VOUCHER',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        });
      });

      it('transformToCardCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const giftCardFormData = {
          cardNumber: '1234567890123456',
          securityCode: '1234'
        };

        expect(
          transformToCardCalculateRequest(
            giftCardFormData,
            [
              {
                type: 'adult',
                passengerReference: 1,
                passengerInfo: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  gender: 'M',
                  dateOfBirth: '1954-4-19',
                  rapidRewardsNumber: '1234567890'
                }
              }
            ],
            'funds-token',
            'itinerary-token'
          )
        ).to.deep.equal({
          href: '/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        });
      });

      it('transformToCalculatePassengersArray should return a passengers array for the calculate request', () => {
        const passengerInfos = [
          {
            type: 'adult',
            passengerReference: 1,
            passengerInfo: {
              firstName: 'Hank',
              lastName: 'Hill',
              suffix: '',
              gender: 'M',
              dateOfBirth: '1954-4-19',
              rapidRewardsNumber: '1234567890'
            }
          }
        ];

        expect(transformToCalculatePassengersArray(passengerInfos)).to.deep.equal([
          {
            accountNumber: '1234567890',
            dateOfBirth: '1954-4-19',
            gender: 'M',
            passengerReference: 1,
            passengerType: 'ADULT',
            name: {
              firstName: 'Hank',
              lastName: 'Hill',
              middleName: null,
              suffix: null
            }
          }
        ]);
      });

      it('transformToCalculatePassengersArray should return a passengers array with lap child information', () => {
        expect(transformToCalculatePassengersArray(getLapChildPassengerInfos())).toMatchSnapshot();
      });

      it('transformToRemoveFundsRequest should return a RemoveFund request object for the remove request', () => {
        expect(
          transformToRemoveFundsRequest(
            '2',
            [
              {
                type: 'adult',
                passengerReference: 1,
                passengerInfo: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  gender: 'M',
                  dateOfBirth: '1954-4-19',
                  rapidRewardsNumber: '1234567890'
                }
              }
            ],
            'funds-token',
            'itinerary-token'
          )
        ).to.deep.equal({
          method: 'PUT',
          href: '/v1/mobile-air-booking/page/calculate-funds',
          body: {
            cashPointsPage: undefined,
            removalTravelFundId: '2',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        });
      });

      it('transformToRefreshFundsRequest should return a refresh funds request object for the refresh request', () => {
        expect(
          transformToRefreshFundsRequest(
            [
              {
                type: 'adult',
                passengerReference: 1,
                passengerInfo: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  gender: 'M',
                  dateOfBirth: '1954-4-19',
                  rapidRewardsNumber: '1234567890'
                }
              }
            ],
            'funds-token',
            'itinerary-token'
          )
        ).to.deep.equal({
          method: 'POST',
          href: '/v1/mobile-air-booking/page/calculate-funds',
          body: {
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        });
      });
    });

    context('AirChange', () => {
      const _moneyTotal = { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' };
      const _pointsCreditTotal = { item: 'Credit', amount: '8675', currencyCode: 'PTS', currencySymbol: null };
      const _pointsOweTotal = { item: 'Amount Due', amount: '8675', currencyCode: 'PTS', currencySymbol: null };

      it('transformToRTFCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const travelFundsFormData = {
          confirmationNumber: 'ABC123',
          passengerFirstName: 'Hank',
          passengerLastName: 'Hill'
        };

        expect(
          transformToRTFCalculateRequest(travelFundsFormData, null, 'funds-token', 'itinerary-token')
        ).to.deep.equal({
          href: '/v1/mobile-air-booking/page/change/calculate-funds/TRAVEL_FUNDS',
          method: 'POST',
          body: {
            travelFundIdentifier: 'ABC123',
            fundsAppliedToken: 'funds-token',
            firstName: 'Hank',
            lastName: 'Hill',
            itineraryPricingToken: 'itinerary-token'
          }
        });
      });

      it('transformToVoucherCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const luvVoucherFormData = {
          voucherNumber: '1234567890123456',
          securityCode: '1234'
        };

        expect(
          transformToVoucherCalculateRequest(luvVoucherFormData, null, 'funds-token', 'itinerary-token')
        ).to.deep.equal({
          href: '/v1/mobile-air-booking/page/change/calculate-funds/LUV_VOUCHER',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          }
        });
      });

      it('transformToCardCalculateRequest should return data with correct structure for apply funds calculate requests', () => {
        const giftCardFormData = {
          cardNumber: '1234567890123456',
          securityCode: '1234'
        };

        expect(transformToCardCalculateRequest(giftCardFormData, null, 'funds-token', 'itinerary-token')).to.deep.equal(
          {
            href: '/v1/mobile-air-booking/page/change/calculate-funds/GIFT_CARD',
            method: 'POST',
            body: {
              travelFundIdentifier: '1234567890123456',
              securityCode: '1234',
              fundsAppliedToken: 'funds-token',
              itineraryPricingToken: 'itinerary-token'
            }
          }
        );
      });

      it('transformToRemoveFundsRequest should return a RemoveFund request object for the remove request', () => {
        expect(transformToRemoveFundsRequest('2', null, 'funds-token', 'itinerary-token')).to.deep.equal({
          method: 'PUT',
          href: '/v1/mobile-air-booking/page/change/calculate-funds',
          body: {
            cashPointsPage: undefined,
            removalTravelFundId: '2',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          }
        });
      });

      it('transformToRefreshFundsRequest should return a refresh funds request object for the refresh request', () => {
        expect(transformToRefreshFundsRequest(null, 'funds-token', 'itinerary-token')).to.deep.equal({
          method: 'POST',
          href: '/v1/mobile-air-booking/page/change/calculate-funds',
          body: {
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          }
        });
      });

      it('transformToChangeTravelFundSummary should return data in the right structure without points', () => {
        const priceTotal = {
          totals: {
            moneyTotal: _moneyTotal,
            pointsTotal: null
          }
        };

        expect(transformToChangeTravelFundSummary(priceTotal)).to.deep.equal({
          owe: {
            item: 'Amount due',
            fare: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
            tax: null
          },
          refund: null
        });
      });

      it('transformToChangeTravelFundSummary should return data in the right structure with points credit', () => {
        const priceTotal = {
          totals: {
            moneyTotal: _moneyTotal,
            pointsTotal: _pointsCreditTotal
          }
        };

        expect(transformToChangeTravelFundSummary(priceTotal)).to.deep.equal({
          owe: {
            item: 'Amount due',
            fare: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
            tax: null
          },
          refund: {
            item: 'Credit',
            fare: { amount: '8675', currencyCode: 'PTS', currencySymbol: null },
            tax: null
          }
        });
      });

      it('transformToChangeTravelFundSummary should return data in the right structure with points due', () => {
        const priceTotal = {
          totals: {
            moneyTotal: _moneyTotal,
            pointsTotal: _pointsOweTotal
          }
        };

        expect(transformToChangeTravelFundSummary(priceTotal)).to.deep.equal({
          owe: {
            item: 'Amount due',
            fare: { amount: '8675', currencyCode: 'PTS', currencySymbol: null },
            tax: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' }
          },
          refund: null
        });
      });
    });
  });

  context('transformToTransferTravelFundsRequest', () => {
    const validateFundsRequest = {
      _links: {
        transferFund: {
          href: '/travel-funds',
          method: 'POST',
          body: {
            fundSearchToken: 'fundSearchToken'
          }
        }
      },
      transferAmount: 'transferAmount'
    };

    it('should transform validate funds request and mock data', () => {
      const formData = {
        firstName: 'Chandler',
        lastName: 'Bing',
        rapidRewardsNumber: '601940404',
        recipientEmailAddress: 'chandler@bing.com',
        personalMessage: 'personal message',
        additionalReceipt: 'monica@geller.com'
      };

      const expectedResult = {
        body: {
          fundSearchToken: 'fundSearchToken',
          recipientFirstName: 'Chandler',
          recipientLastName: 'Bing',
          recipientAccountNumber: '601940404',
          recipientEmailAddress: 'chandler@bing.com',
          personalMessage: 'personal message',
          receiptEmailAddress: 'monica@geller.com',
          transferAmount: 'transferAmount'
        },
        href: '/travel-funds',
        method: 'POST'
      };

      expect(transformToTransferTravelFundsRequest(validateFundsRequest, formData)).to.deep.equal(expectedResult);
    });

    it('should send null for receiptEmailAddress if additionalReceipt is empty', () => {
      const formData = {
        firstName: 'Chandler',
        lastName: 'Bing',
        rapidRewardsNumber: '601940404',
        recipientEmailAddress: 'chandler@bing.com',
        personalMessage: 'personal message',
        additionalReceipt: ''
      };

      const expectedResult = {
        body: {
          fundSearchToken: 'fundSearchToken',
          recipientFirstName: 'Chandler',
          recipientLastName: 'Bing',
          recipientAccountNumber: '601940404',
          recipientEmailAddress: 'chandler@bing.com',
          personalMessage: 'personal message',
          receiptEmailAddress: null,
          transferAmount: 'transferAmount'
        },
        href: '/travel-funds',
        method: 'POST'
      };

      expect(transformToTransferTravelFundsRequest(validateFundsRequest, formData)).to.deep.equal(expectedResult);
    });
  });
});
