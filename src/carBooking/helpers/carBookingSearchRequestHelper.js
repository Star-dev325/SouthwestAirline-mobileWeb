import _ from 'lodash';

export const compareSearchRequest = (requestOne, requestTwo) =>
  _.isEqual(removeExtraKeys(requestOne), removeExtraKeys(requestTwo));

export const removeExtraKeys = (target) => {
  const extraKeys = ['carCompany', 'discount', 'pickUpAirport', 'dropOffAirport'];

  return _.omit(target, extraKeys);
};

export const hasDuplicatePromoCode = (discounts) => {
  const hasTwoPromoCodes = discounts?.length === 2;
  const firstPromoCode = discounts?.[0];
  const secondPromoCode = discounts?.[1];
  const hasVendorAndTypeForFirstPromoCode = firstPromoCode?.vendor && firstPromoCode?.type;
  const hasSameVendorAndType =
    firstPromoCode?.vendor === secondPromoCode?.vendor && firstPromoCode?.type === secondPromoCode?.type;

  return !!hasTwoPromoCodes && !!hasVendorAndTypeForFirstPromoCode && !!hasSameVendorAndType;
};

export const getPromoTypeListOfSelectedVendor = (carPromoVendors, vendor) => {
  const selectedCarVendor = vendor
    ? carPromoVendors?.find((carPromoVendor) => carPromoVendor.carCompany.value === vendor)
    : {};

  return selectedCarVendor?.promoTypeList ? selectedCarVendor.promoTypeList : [];
};
