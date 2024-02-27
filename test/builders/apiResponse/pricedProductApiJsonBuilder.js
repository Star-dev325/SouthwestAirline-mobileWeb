import _ from 'lodash';
import { WAPI_DOLLARS, WAPI_POINTS } from 'src/shared/constants/currencyTypes';

function PricedProductApiJsonBuilder() {
  this.productId = 'productId';
  this.totalCents = 12345;
  this.segmentFees = [];
  this.pointsPriceDetails = undefined;
  this.fareValue = 24651;
  this.discountedFareValue = 24651;
  this.taxCents = 1849;
  this.currencyType = WAPI_DOLLARS;

  this.requestedAmountCents = 55550;
  this.requestedAmountPoints = 0;
  this.priceTotalAmountCents = 55548;
  this.priceTotalAmountPoints = 0;
  this.verifyPriceChange = true;

  this.withRequestedAmountCents = function(requestedAmountCents) {
    this.requestedAmountCents = requestedAmountCents;

    return this;
  };

  this.withRequestedAmountPoints = function(requestedAmountPoints) {
    this.requestedAmountPoints = requestedAmountPoints;

    return this;
  };

  this.withPriceTotalAmountCents = function(priceTotalAmountCents) {
    this.priceTotalAmountCents = priceTotalAmountCents;

    return this;
  };

  this.withPriceTotalAmountPoints = function(priceTotalAmountPoints) {
    this.priceTotalAmountPoints = priceTotalAmountPoints;

    return this;
  };

  this.withVerifyPriceChange = function(verifyPriceChange) {
    this.verifyPriceChange = verifyPriceChange;

    return this;
  };

  this.withProductId = function(productId) {
    this.productId = productId;

    return this;
  };

  this.withCurrencyType = function(newCurrencyType) {
    this.currencyType = newCurrencyType;

    return this;
  };

  this.withFareValue = function(fareValue) {
    this.fareValue = fareValue;

    return this;
  };

  this.withDiscountedFareValue = function(discountedBaseFare) {
    this.discountedFareValue = discountedBaseFare;

    return this;
  };

  this.withTotalCents = function(total) {
    this.totalCents = total;

    return this;
  };

  this.withTaxCents = function(taxes) {
    this.taxCents = taxes;

    return this;
  };

  this.withSegmentFees = function(passengerFacilityCharge, securityFee, segmentFee) {
    this.segmentFees.push({
      passengerFacilityChargeCents: passengerFacilityCharge,
      securityFeeCents: securityFee,
      segmentFeeCents: segmentFee
    });

    return this;
  };

  this.withDefaultPoints = function() {
    this.currencyType = WAPI_POINTS;
    this.totalCents = 560;
    this.fareValue = 44414;
    this.discountedFareValue = 44414;
    this.priceTotalAmountPoints = 49570;
    this.requestedAmountPoints = 49570;
    this.priceTotalAmountCents = 560;
    this.requestedAmountCents = 560;

    return this;
  };

  this.withDiscountedFareValue = function(discountedFareValue) {
    this.discountedFareValue = discountedFareValue;

    return this;
  };

  this.buildOneBound = function() {
    if (this.currencyType === WAPI_POINTS) {
      return {
        productId: this.productId,
        totalCents: this.totalCents,
        pointsPriceDetails: {
          discountedRedemptionPoints: this.discountedFareValue,
          redemptionPoints: this.fareValue,
          segmentFees: this.segmentFees
        }
      };
    } else {
      return {
        productId: this.productId,
        totalCents: this.totalCents,
        currencyPriceDetails: {
          baseFareCents: this.fareValue,
          taxCents: this.taxCents,
          discountedBaseFareCents: this.discountedFareValue,
          segmentFees: this.segmentFees
        }
      };
    }
  };

  this.buildPriceSearchTotals = function() {
    const priceDetails = { segmentFees: this.segmentFees };
    const result = {
      verifyPriceChange: this.verifyPriceChange,
      requestedAmountCents: this.requestedAmountCents,
      requestedAmountPoints: this.requestedAmountPoints,
      priceTotalAmountCents: this.priceTotalAmountCents,
      priceTotalAmountPoints: this.priceTotalAmountPoints
    };

    if (this.currencyType === WAPI_POINTS) {
      result.pointsPriceDetails = _.extend({
        redemptionPoints: this.fareValue,
        discountedRedemptionPoints: this.discountedFareValue
      }, priceDetails);
    } else {
      result.currencyPriceDetails = _.extend({
        baseFareCents: this.fareValue,
        taxCents: this.taxCents,
        discountedBaseFareCents: this.discountedFareValue
      }, priceDetails);
    }

    return result;
  };
}

export default PricedProductApiJsonBuilder;
