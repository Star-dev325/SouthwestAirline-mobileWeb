import {
  generatePassengers,
  generatePriceTotal,
  getReviewMessages,
  generateTripSummary,
  getContactInfoTravelManagerText,
  isValidAdultBirthDate,
  isValidYoungTravelerBirthDate,
  otherPassengerReference,
  transformToEarlybirdInPathRequest
} from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import { defaultLapChildCurrency } from 'src/shared/constants/currencyConstants';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';

describe('purchaseSummaryPageHelper', () => {
  context('generateTripSummary', () => {
    it('should convert to trip summary info from the air pricing api response', () => {
      const flightPricingPageResponse = new PricesBuilder().build();

      expect(generateTripSummary(flightPricingPageResponse)).to.deep.equal({
        bounds: [{
          arrivalAirportCode: 'ATL',
          arrivalTime: '09:30',
          departureAirportCode: 'DAL',
          departureDate: '2017-11-01',
          departureDayOfWeek: 'Wednesday',
          departureTime: '06:30',
          stops: [{
            airport: {
              code: 'HOU',
              country: null,
              name: 'Houston (Hobby)',
              state: 'TX'
            },
            arrivalTime: '15:35',
            changePlanes: true,
            departureTime: '16:25'
          }]
        }],
        currency: {
          amount: '233.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        passengerCountDescription: '1 Passenger Total'
      });
    });

    it('should convert to trip summary info from the air pricing api response when lap child is enabled', () => {
      const flightPricingPageResponse = new PricesBuilder().withLapChildEnabled().build();

      expect(generateTripSummary(flightPricingPageResponse)).to.deep.equal({
        bounds: [{
          arrivalAirportCode: 'ATL',
          arrivalTime: '09:30',
          departureAirportCode: 'DAL',
          departureDate: '2017-11-01',
          departureDayOfWeek: 'Wednesday',
          departureTime: '06:30',
          stops: [{
            airport: {
              code: 'HOU',
              country: null,
              name: 'Houston (Hobby)',
              state: 'TX'
            },
            arrivalTime: '15:35',
            changePlanes: true,
            departureTime: '16:25'
          }]
        }],
        currency: {
          amount: '233.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        defaultLapChildCurrency,
        lapChildCountDescription: '1 Lap Child Total',
        passengerCountDescription: '1 Passenger Total'
      });
    });

    it('should return currency with default value when moneyTotal and pointsTotal are all empty from the response', () => {
      const flightPricingPageResponse = new PricesBuilder().withMoneyTotal(undefined).build();

      expect(generateTripSummary(flightPricingPageResponse).currency).to.deep.equal({
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });
  });

  context('generatePassengers', () => {
    it('should convert the brief passenger info from the passengers details data', () => {
      const passengerInfos = getPassengerInfos();

      expect(generatePassengers(passengerInfos)).to.deep.equal([
        {
          name: 'Andrew Phillips',
          rapidRewardsNumber: '600597056'
        }
      ]);
    });
  });

  context('getContactInfoTravelManagerText', () => {
    it('should return the contact formatted phone number when contactMethod is CALL_ME', () => {
      const contactInfo = getContactInfoTravelManagerText({
        contactMethod: 'CALL_ME',
        contactPhone: { countryCode: '1', number: '1234567890' }
      });

      expect(contactInfo).to.equal('(1) 123-456-7890');
    });

    it('should return the contact email when contactMethod is EMAIL_ME', () => {
      const contactInfo = getContactInfoTravelManagerText({
        contactMethod: 'EMAIL_ME',
        contactEmail: 'whatever@email.com'
      });

      expect(contactInfo).to.equal('whatever@email.com');
    });

    it('should return empty when contactMethod is null', () => {
      const contactInfo = getContactInfoTravelManagerText({ contactMethod: null });

      expect(contactInfo).to.equal('');
    });
  });

  context('generatePriceTotal', () => {
    it('should return the price total info from the air pricing api response', () => {
      const flightPricingPageResponse = new PricesBuilder().build();

      expect(generatePriceTotal(flightPricingPageResponse)).to.deep.equal({
        totals: flightPricingPageResponse.flightPricingPage.totals
      });
    });
  });

  context('transformToEarlybirdInPathRequest', () => {
    it('should convert to EarlybirdInPathRequest from EarlyBirdPricing and passengerInfos', () => {
      const earlyBirdPricing = {
        body: {
          adultPassengers: {
            productIds: ['iwoeroiewur', 'djfskf']
          }
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      };
      const passengerInfos = [
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            firstName: 'bob',
            lastName: 'alex',
            middleName: 'john',
            gender: 'M',
            dateOfBirth: '2010-11-2',
            rapidRewardsNumber: '123123'
          }
        }
      ];

      expect(transformToEarlybirdInPathRequest(earlyBirdPricing, passengerInfos, 'USD')).to.deep.equal({
        body: {
          adultPassengers: {
            productIds: ['iwoeroiewur', 'djfskf'],
            passengers: [
              {
                name: {
                  firstName: 'bob',
                  lastName: 'alex',
                  middleName: 'john'
                },
                passengerReference: 1,
                accountNumber: '123123',
                gender: 'M',
                dateOfBirth: '2010-11-2'
              }
            ]
          },
          currency: 'USD'
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      });
    });

    it('should convert to EarlybirdInPathRequest from EarlyBirdPricing and passengerInfos when productIds exist ', () => {
      const earlyBirdPricing = {
        body: {
          adultPassengers: {
            productIds: ['sdkfsd', 'sdkfjdls']
          }
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      };
      const passengerInfos = [
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            firstName: 'bob',
            lastName: 'alex',
            middleName: 'john',
            gender: 'M',
            dateOfBirth: '2010-11-2',
            rapidRewardsNumber: '123123'
          }
        }
      ];

      expect(transformToEarlybirdInPathRequest(earlyBirdPricing, passengerInfos, 'USD')).to.deep.equal({
        body: {
          adultPassengers: {
            productIds: ['sdkfsd', 'sdkfjdls'],
            passengers: [
              {
                name: {
                  firstName: 'bob',
                  lastName: 'alex',
                  middleName: 'john'
                },
                passengerReference: 1,
                accountNumber: '123123',
                gender: 'M',
                dateOfBirth: '2010-11-2'
              }
            ]
          },
          currency: 'USD'
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      });
    });
  });

  context('earlyBirdPricingToken', () => {
    it('should convert to EarlybirdInPathRequest from EarlyBirdPricing and passengerInfos', () => {
      const earlyBirdPricing = {
        body: {
          adultPassengers: {
            productIds: ['iwoeroiewur', 'djfskf']
          }
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      };
      const passengerInfos = [
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            firstName: 'bob',
            lastName: 'alex',
            middleName: 'john',
            gender: 'M',
            dateOfBirth: '2010-11-2',
            rapidRewardsNumber: '123123',
            frequentTravelerId: '1234',
            frequentTravelerToken: '1234'
          }
        }
      ];

      expect(transformToEarlybirdInPathRequest(earlyBirdPricing, passengerInfos, 'USD', 'ebToken')).to.deep.equal({
        body: {
          adultPassengers: {
            productIds: ['iwoeroiewur', 'djfskf'],
            passengers: [
              {
                name: {
                  firstName: 'bob',
                  lastName: 'alex',
                  middleName: 'john'
                },
                passengerReference: 1,
                accountNumber: '123123',
                gender: 'M',
                dateOfBirth: '2010-11-2',
                frequentTravelerId: '1234',
                frequentTravelerToken: '1234'
              }
            ]
          },
          currency: 'USD',
          earlyBirdPricingToken: 'ebToken'
        },
        method: 'POST',
        href: '/v1/mobile-air-booking/feature/earlybird/prices'
      });
    });
  });

  context('earlyBirdPricingToken', () => {
    it('should convert to EarlybirdInPathRequest from EarlyBirdPricing and passengerInfos', () => {
      const flightPricingPageResponse = new PricesBuilder().withReviewMessages().build();

      expect(getReviewMessages(flightPricingPageResponse)).to.deep.equal(flightPricingPageResponse.flightPricingPage.reviewMessages);
    });
  });

  context('otherPassengerReference', () => {
    it('should return otherPassengerReference number', () => {
      expect(otherPassengerReference('lapChild', 3, '2')).to.equal(2);
    });
  });

  describe('isValidAdultBirthDate', () => {
    it('should return false if the birthDate is less than 18 years old on departureDate', () => {
      expect(isValidAdultBirthDate('2008-12-12', '2023-12-12')).to.be.false;
    });

    it('should return true if the birthDate is more than 18 years old on departureDate', () => {
      expect(isValidAdultBirthDate('2000-12-12', '2023-12-12')).to.be.true;
    });

    it('should return true if the birthDate is 18 years old on departureDate', () => {
      expect(isValidAdultBirthDate('2005-12-12', '2023-12-12')).to.be.true;
    });
  });

  describe('isValidYoungTravelerBirthDate', () => {
    it('should return false if the birthDate is less than 12 years old on departureDate', () => {
      expect(isValidYoungTravelerBirthDate('2013-12-12', '2023-12-12')).to.be.false;
    });

    it('should return false if the birthDate is more than 17 years old on departureDate', () => {
      expect(isValidYoungTravelerBirthDate('2000-12-12', '2023-12-12')).to.be.false;
    });

    it('should return true if the birthDate is more than 12 years old and less than 17 years old on departureDate ', () => {
      expect(isValidYoungTravelerBirthDate('2007-12-12', '2023-12-12')).to.be.true;
    });

    it('should return true if the birthDate is 12 years old on departureDate', () => {
      expect(isValidYoungTravelerBirthDate('2011-12-12', '2023-12-12')).to.be.true;
    });

    it('should return true if the birthDate is 17 years old on departureDate', () => {
      expect(isValidYoungTravelerBirthDate('2006-12-12', '2023-12-12')).to.be.true;
    });
  });
});
