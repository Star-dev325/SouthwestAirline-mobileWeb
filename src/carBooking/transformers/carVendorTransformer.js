import _ from 'lodash';
import { PROMO_CODE } from 'src/carBooking/constants/carBookingMessages';
import i18n from '@swa-ui/locale';

const { PROMO_TYPE_MAP } = PROMO_CODE;

export const transformToCarShoppingResultObject = (carVendorList) => {
  const rapidRewardsPartners = [];
  const allOthers = [];

  _.forEach(carVendorList, (vendor) => {
    vendor.isRapidRewardsPartner ? rapidRewardsPartners.push(vendor.name) : allOthers.push(vendor.name);
  });

  return {
    rapidRewardsPartners,
    allOthers
  };
};

export const transformToCarPromotionSelectOption = (carVendorList) =>
  _.chain(carVendorList)
    .sortBy('name')
    .map((carVendor) => {
      const promoTypeList = _getPromoTypeList(carVendor.acceptedDiscounts);

      return !_.isEmpty(promoTypeList)
        ? {
          carCompany: { label: carVendor.name, value: carVendor.vendorId },
          promoTypeList
        }
        : null;
    })
    .compact()
    .value();

const _getPromoTypeList = (acceptedDiscounts) =>
  _.chain(acceptedDiscounts)
    .reduce((promoTypeList, value, key) => {
      _.isObject(value) &&
        promoTypeList.push({
          label: _.get(value, 'name'),
          value: PROMO_TYPE_MAP[key]
        });

      return promoTypeList;
    }, [])
    .compact()
    .value();

export const transformToCarCompanyViewValue = (carVendorList, value) => {
  const arrayFromString = _.isArray(value) ? _.map(value, 'vendorId') : value.split(',');
  const rapidRewardsPartnersIDList = _.map(_.filter(carVendorList, { isRapidRewardsPartner: true }), 'vendorId');
  const allOthersIDList = _.map(_.filter(carVendorList, { isRapidRewardsPartner: false }), 'vendorId');

  if (!_.isEmpty(arrayFromString) && arrayFromString[0] === i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT')) {
    return i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
  } else if (_isArrayEqual(arrayFromString, rapidRewardsPartnersIDList)) {
    return i18n('CAR_BOOKING__CAR_VENDOR__RR_PARTNERS');
  } else if (_isArrayEqual(arrayFromString, allOthersIDList)) {
    return i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OTHERS_HINT');
  } else if (arrayFromString.length === 1) {
    return _.head(_.filter(carVendorList, { vendorId: arrayFromString[0] }))?.name;
  } else {
    return _.template(i18n('CAR_BOOKING__N_SELECTED'))({ number: arrayFromString.length });
  }
};

export const transformToCarCompanyList = (carVendorList, selectedVendorIdValues) => {
  const sortedCarVendorList = _.sortBy(carVendorList, 'name');

  const selectedVendors = _.isArray(selectedVendorIdValues)
    ? _.map(selectedVendorIdValues, 'vendorId')
    : selectedVendorIdValues.split(',');
  const shopAll = [{ name: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OPTION'), isSelected: false }];
  const rapidRewardsPartners = [];
  const allOthers = [];

  const rapidRewardsPartnersIDList = _.map(_.filter(sortedCarVendorList, { isRapidRewardsPartner: true }), 'vendorId');
  const allOthersIDList = _.map(_.filter(sortedCarVendorList, { isRapidRewardsPartner: false }), 'vendorId');
  const isShopAll =
    !_.isEmpty(selectedVendors) && selectedVendors[0] === i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
  const isRRPartners = _isArrayEqual(
    _.intersection(selectedVendors, rapidRewardsPartnersIDList),
    rapidRewardsPartnersIDList
  );
  const isAllOther = _isArrayEqual(_.intersection(selectedVendors, allOthersIDList), allOthersIDList);

  if (isShopAll) {
    return _allCarVendorSelect(sortedCarVendorList);
  }

  rapidRewardsPartners.push({
    name: i18n('CAR_BOOKING__CAR_VENDOR__RAPID_REWARDS_PARTNERS'),
    isSelected: isRRPartners
  });
  allOthers.push({ name: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OTHERS_OPTION'), isSelected: isAllOther });

  _.forEach(sortedCarVendorList, (vendor) => {
    const isSelected = _.includes(selectedVendors, vendor.vendorId);
    const carVendor = {
      name: vendor.name,
      vendorId: vendor.vendorId,
      isSelected
    };

    vendor.isRapidRewardsPartner ? rapidRewardsPartners.push(carVendor) : allOthers.push(carVendor);
  });

  return [shopAll, rapidRewardsPartners, allOthers];
};

const _isArrayEqual = (array1, array2) => _.isEmpty(_.xor(array1, array2));

const _allCarVendorSelect = (carVendorList) => {
  const rapidRewardsPartners = [];
  const allOthers = [];
  const shopAll = [{ name: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OPTION'), isSelected: true }];

  rapidRewardsPartners.push({ name: i18n('CAR_BOOKING__CAR_VENDOR__RAPID_REWARDS_PARTNERS'), isSelected: true });
  allOthers.push({ name: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OTHERS_OPTION'), isSelected: true });

  _.forEach(carVendorList, (vendor) => {
    const carVendor = {
      name: vendor.name,
      vendorId: vendor.vendorId,
      isSelected: true
    };

    vendor.isRapidRewardsPartner ? rapidRewardsPartners.push(carVendor) : allOthers.push(carVendor);
  });

  return [shopAll, rapidRewardsPartners, allOthers];
};
