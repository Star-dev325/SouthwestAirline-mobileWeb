import _ from 'lodash';

function _isUsingPoints(priceSearchTotals) {
  return _.get(priceSearchTotals, 'pointsPriceDetails') !== undefined;
}

function _sumFareCents(priceSearchTotals) {
  return _.get(priceSearchTotals, 'currencyPriceDetails.baseFareCents', 0);
}

function _sumFarePoints(priceSearchTotals) {
  return _.get(priceSearchTotals, 'pointsPriceDetails.redemptionPoints', 0);
}

function _sumDiscountedFareCents(priceSearchTotals) {
  return _.get(priceSearchTotals, 'currencyPriceDetails.discountedBaseFareCents', 0);
}

function _sumDiscountedFarePoints(priceSearchTotals) {
  return _.get(priceSearchTotals, 'pointsPriceDetails.discountedRedemptionPoints', 0);
}

function sumExciseTaxesCents(priceSearchTotals) {
  if (_isUsingPoints(priceSearchTotals)) {
    return 0;
  }

  const taxCents = _.get(priceSearchTotals, 'currencyPriceDetails.taxCents', 0);
  const securityFeeCents = sumSecurityFeeCents(priceSearchTotals);
  const passengerFacilityChargeCents = sumPassengerFacilityChargeCents(priceSearchTotals);
  const segmentFeeCents = sumSegmentFeeCents(priceSearchTotals);

  return taxCents - (passengerFacilityChargeCents + securityFeeCents + segmentFeeCents);
}

function sumTotalFareCents(priceSearchTotals) {
  return _.get(priceSearchTotals, 'priceTotalAmountCents', 0);
}

function sumTotalFarePoints(priceSearchTotals) {
  return _.get(priceSearchTotals, 'priceTotalAmountPoints', 0);
}

function sumBaseFareValue(priceSearchTotals) {
  return _isUsingPoints(priceSearchTotals) ? _sumFarePoints(priceSearchTotals) : _sumFareCents(priceSearchTotals);
}

function sumDiscountedFareValue(priceSearchTotals) {
  return _isUsingPoints(priceSearchTotals)
    ? _sumDiscountedFarePoints(priceSearchTotals)
    : _sumDiscountedFareCents(priceSearchTotals);
}

function sumSegmentFeeCents(priceSearchTotals) {
  return _isUsingPoints(priceSearchTotals)
    ? _.get(priceSearchTotals, 'pointsPriceDetails.segmentFees[0].segmentFeeCents', 0)
    : _.get(priceSearchTotals, 'currencyPriceDetails.segmentFees[0].segmentFeeCents', 0);
}

function sumSecurityFeeCents(priceSearchTotals) {
  return _isUsingPoints(priceSearchTotals)
    ? _.get(priceSearchTotals, 'pointsPriceDetails.segmentFees[0].securityFeeCents', 0)
    : _.get(priceSearchTotals, 'currencyPriceDetails.segmentFees[0].securityFeeCents', 0);
}

function sumPassengerFacilityChargeCents(priceSearchTotals) {
  return _isUsingPoints(priceSearchTotals)
    ? _.get(priceSearchTotals, 'pointsPriceDetails.segmentFees[0].passengerFacilityChargeCents', 0)
    : _.get(priceSearchTotals, 'currencyPriceDetails.segmentFees[0].passengerFacilityChargeCents', 0);
}

export default {
  sumExciseTaxesCents,
  sumTotalFareCents,
  sumTotalFarePoints,
  sumDiscountedFareValue,
  sumSegmentFeeCents,
  sumSecurityFeeCents,
  sumPassengerFacilityChargeCents,
  sumBaseFareValue
};
