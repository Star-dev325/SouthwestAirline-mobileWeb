import _ from 'lodash';
import { PROMO_CODE } from 'src/carBooking/constants/carBookingMessages';

function transformToResultsPromoCodes(promoCodesFromSearchRequest, promoCodesFromApiResponse, vendors) {
  if (!promoCodesFromApiResponse) {
    return undefined;
  }

  const promoCodesFromSearchRequestWithUpperCaseCode = _.map(_.cloneDeep(promoCodesFromSearchRequest), (promoCode) => {
    promoCode = promoCode || {};
    promoCode.code = promoCode.code?.toUpperCase();

    return promoCode;
  });

  const filteredPromoCodesFromApiResponse = _.filter(_.cloneDeep(promoCodesFromApiResponse), (promoCode) => {
    const filterObject = {
      type: promoCode.type,
      code: promoCode.code.toUpperCase(),
      vendorName: _.capitalize(promoCode.vendor)
    };

    return _.some(promoCodesFromSearchRequestWithUpperCaseCode, filterObject);
  });

  const appliedPromoCodes = _.filter(filteredPromoCodesFromApiResponse, 'promoCodeApplied');
  const notAppliedPromoCodes = _.difference(filteredPromoCodesFromApiResponse, appliedPromoCodes);
  const { PROMO_TYPE_MAP } = PROMO_CODE;
  const promoCodeMapping = _.invert(PROMO_TYPE_MAP);

  const notAppliedPromoCodesString = _.chain(notAppliedPromoCodes)
    .map((notAppliedPromoCode) => {
      const { vendor, type, code } = notAppliedPromoCode;
      const fixedVendor = _.capitalize(vendor);

      const carVendor = _.find(vendors, ['name', fixedVendor]);
      const vendorName = carVendor.name;
      const typeOfPromoCode = promoCodeMapping[type];
      const promoCodeType = carVendor.acceptedDiscounts[typeOfPromoCode].name;
      const upperCaseCode = code.toUpperCase();

      const vendorFilter = _.merge(
        {},
        {
          type,
          code: upperCaseCode
        },
        { vendorName: fixedVendor }
      );

      return {
        message: `${vendorName}, ${promoCodeType}, ${code}`,
        numberOfPromoCode: _.findIndex(promoCodesFromSearchRequestWithUpperCaseCode, vendorFilter) + 1,
        vendor: carVendor.vendorId,
        code: notAppliedPromoCode.code
      };
    })
    .sortBy('numberOfPromoCode')
    .value();

  return {
    numberOfAppliedPromoCodes: appliedPromoCodes.length,
    notAppliedPromoCodes: notAppliedPromoCodesString,
    appliedPromoCodes
  };
}

export default {
  transformToResultsPromoCodes: _.curry(transformToResultsPromoCodes)
};
