import {
  transformToEarlyBirdPriceDetails,
  transformToUnitPrice
} from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';
import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';

import EarlyBirdInPathApiResponseBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';

describe('EB Transformers', () => {
  context('transformToEarlyBirdPriceDetails', () => {
    it('should handle empty earlyBirdEligibility.bounds', () => {
      const earlyBirdEligibility = {};

      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)).to.be.deep.equal([]);
    });

    it('should not throw exception if passenger reference is missing', () => {
      const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().withoutPassengerReference().build();

      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)).to.not.throw;
      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)[0].purchasedCount).to.be.equal(0);
    });

    it('should calculate purchaseCount with multiple passengers when EB purchased', () => {
      const earlyBirdEligibility = new EarlyBirdEligibilityBuilder()
        .withEarlyBirdEligibility('15.00', ['4', '5'])
        .build();

      const adultDetails = [
        {
          description: 'EarlyBird Check-in® (DAL - HOU)',
          purchasedCount: 2,
          total: {
            amount: '30.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          unitPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ];

      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)).to.be.deep.equal(adultDetails);
    });

    it('should have total price of 0.00 when did not purchase EB', () => {
      const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().withEarlyBirdEligibility('15.00', []).build();

      const details = [
        {
          description: 'EarlyBird Check-in® (DAL - HOU)',
          purchasedCount: 0,
          total: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          unitPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ];

      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)).to.be.deep.equal(details);
    });

    it('should have total price of 0.00 when not eligible to purchase EB', () => {
      const earlyBirdEligibility = new EarlyBirdEligibilityBuilder()
        .withEarlyBirdEligibilityNotEligibleToPurchase()
        .build();

      const details = [
        {
          description: 'EarlyBird Check-in® (DAL - HOU)',
          purchasedCount: 0,
          total: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          unitPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ];

      expect(transformToEarlyBirdPriceDetails(earlyBirdEligibility)).to.be.deep.equal(details);
    });
  });

  context('transformToUnitPrice', () => {
    it('should calculate unitPrice for single adult eligible for EB', () => {
      const firstBound = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build().bounds[0];
      const result = transformToUnitPrice(firstBound);

      expect(result).to.deep.equal({ amount: '15.00', currencySymbol: '$', currencyCode: 'USD' });
    });

    it('should calculate unitPrice as undefined for single adult not eligible for EB', () => {
      const firstBound = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayNotEligibleEarlyBird().build()
        .bounds[0];
      const result = transformToUnitPrice(firstBound);

      expect(result).to.be.undefined;
    });

    it('should calculate unitPrice as undefined for undefined bound or null bound', () => {
      expect(transformToUnitPrice(undefined)).to.be.undefined;
      expect(transformToUnitPrice(null)).to.be.undefined;
    });
  });
});
