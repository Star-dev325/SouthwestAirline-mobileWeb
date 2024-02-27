import priceSearchTotalsHelper from 'src/shared/helpers/priceSearchTotalsHelper';
import PricedProductApiJsonBuilder from 'test/builders/apiResponse/pricedProductApiJsonBuilder';
import { WAPI_POINTS } from 'src/shared/constants/currencyTypes';

describe('priceSearchTotalsHelper', () => {
  let priceSearchTotals;

  context('Dollar', () => {
    beforeEach(() => {
      priceSearchTotals = new PricedProductApiJsonBuilder()
        .withSegmentFees(10, 20, 30)
        .withTaxCents(100)
        .withPriceTotalAmountCents(1000)
        .withRequestedAmountCents(1002)
        .withFareValue(800)
        .withDiscountedFareValue(400)
        .buildPriceSearchTotals();
    });

    it('should sum the exciseTaxesCents', () => {
      const exciseTaxesCents = priceSearchTotalsHelper.sumExciseTaxesCents(priceSearchTotals);

      expect(exciseTaxesCents).to.equal(40);
    });

    it('should sum the total fare cents', () => {
      const totalFareCents = priceSearchTotalsHelper.sumTotalFareCents(priceSearchTotals);

      expect(totalFareCents).to.equal(1000);
    });

    it('should sum segmentFeeCents', () => {
      const segmentFeeCents = priceSearchTotalsHelper.sumSegmentFeeCents(priceSearchTotals);

      expect(segmentFeeCents).to.equal(30);
    });

    it('should sum securityFeeCents', () => {
      const securityFeeCents = priceSearchTotalsHelper.sumSecurityFeeCents(priceSearchTotals);

      expect(securityFeeCents).to.equal(20);
    });

    it('should sum passengerFacilityChargeCents', () => {
      const passengerFacilityChargeCents = priceSearchTotalsHelper.sumPassengerFacilityChargeCents(priceSearchTotals);

      expect(passengerFacilityChargeCents).to.equal(10);
    });

    it('should sum base fare value', () => {
      const baseFareValue = priceSearchTotalsHelper.sumBaseFareValue(priceSearchTotals);

      expect(baseFareValue).to.equal(800);
    });

    it('should sum discounted base fare value', () => {
      const discountedFareValue = priceSearchTotalsHelper.sumDiscountedFareValue(priceSearchTotals);

      expect(discountedFareValue).to.equal(400);
    });
  });

  context('Points', () => {
    beforeEach(() => {
      priceSearchTotals = new PricedProductApiJsonBuilder()
        .withCurrencyType(WAPI_POINTS)
        .withSegmentFees(0, 60, 0)
        .withRequestedAmountPoints(1002)
        .withRequestedAmountCents(62)
        .withPriceTotalAmountPoints(1000)
        .withPriceTotalAmountCents(60)
        .withFareValue(900)
        .withDiscountedFareValue(100)
        .buildPriceSearchTotals();
    });

    it('should sum the exciseTaxesCents', () => {
      const exciseTaxesCents = priceSearchTotalsHelper.sumExciseTaxesCents(priceSearchTotals);

      expect(exciseTaxesCents).to.equal(0);
    });

    it('should sum the total fare cents', () => {
      const totalFareCents = priceSearchTotalsHelper.sumTotalFareCents(priceSearchTotals);

      expect(totalFareCents).to.equal(60);
    });

    it('should sum the total fare points', () => {
      const totalFareCents = priceSearchTotalsHelper.sumTotalFarePoints(priceSearchTotals);

      expect(totalFareCents).to.equal(1000);
    });

    it('should sum segmentFeeCents', () => {
      const segmentFeeCents = priceSearchTotalsHelper.sumSegmentFeeCents(priceSearchTotals);

      expect(segmentFeeCents).to.equal(0);
    });

    it('should sum securityFeeCents', () => {
      const securityFeeCents = priceSearchTotalsHelper.sumSecurityFeeCents(priceSearchTotals);

      expect(securityFeeCents).to.equal(60);
    });

    it('should sum passengerFacilityChargeCents', () => {
      const passengerFacilityChargeCents = priceSearchTotalsHelper.sumPassengerFacilityChargeCents(priceSearchTotals);

      expect(passengerFacilityChargeCents).to.equal(0);
    });

    it('should sum base fare value', () => {
      const baseFareValue = priceSearchTotalsHelper.sumBaseFareValue(priceSearchTotals);

      expect(baseFareValue).to.equal(900);
    });

    it('should sum discounted base fare value', () => {
      const discountedFareValue = priceSearchTotalsHelper.sumDiscountedFareValue(priceSearchTotals);

      expect(discountedFareValue).to.equal(100);
    });
  });
});
