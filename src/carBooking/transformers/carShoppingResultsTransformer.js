import _ from 'lodash';
import { allTypes, mapType } from 'src/carBooking/helpers/vehicleTypesHelper';
import i18n from '@swa-ui/locale';

export const transformCarResults = (apiResponse, carVendorImages, allCarVendors) => {
  const carTypeGrouping = _.chain(apiResponse.carProducts)
    .groupBy('vehicleType')
    .mapKeys((value, key) => mapType(key))
    .value();

  const allCarTypes = _.merge(_getAllCarType(), carTypeGrouping);

  _.forOwn(allCarTypes, (allAvailableVendorsForCarType, key) => {
    const transformedVehicleObjects = _transformVehicleObjects(
      allAvailableVendorsForCarType,
      carVendorImages,
      allCarVendors
    );
    const lowestPrice = _getLowestPricePerCategory(transformedVehicleObjects, true);
    const lowestPriceWithCurrencyCode = _getLowestPricePerCategory(transformedVehicleObjects);
    const isAllVendorUnavailable = _.isEmpty(allAvailableVendorsForCarType);

    allCarTypes[key] = {
      lowestPrice,
      allVehicles: transformedVehicleObjects,
      isAllVendorUnavailable,
      lowestPriceWithCurrencyCode
    };
  });

  return allCarTypes;
};

const _getLowestPricePerCategory = (value, inCents) => {
  const sortedProductsByDailyPrice = _.chain(value).filter({ isUnavailable: false }).sortBy('pricePerDayCents').value();

  return sortedProductsByDailyPrice.length > 0
    ? inCents
      ? sortedProductsByDailyPrice[0].pricePerDayCents
      : sortedProductsByDailyPrice[0].dailyRateWithCurrencyCode
    : 0;
};

const _transformVehicleObjects = (allAvailableVendorsForCarType, carVendorImages, allCarVendors) => {
  const availableCarProducts = _transformAvailableCarProducts(
    allAvailableVendorsForCarType,
    carVendorImages,
    allCarVendors.rapidRewardsPartners
  );

  const allCarVendorsName = _.flatten(_.values(allCarVendors));
  const namesOfTheAvailableCarVendors = _.map(availableCarProducts, 'vendorName');
  const unavailableCarVendors = _.difference(allCarVendorsName, namesOfTheAvailableCarVendors);
  const unavailableCarProducts = _transformUnavailableCarVendors(unavailableCarVendors, carVendorImages, allCarVendors);

  return availableCarProducts.concat(unavailableCarProducts);
};

const _transformAvailableCarProducts = (
  allAvailableVendorsForCarType,
  carVendorImages,
  rapidRewardPartnersCarVendors
) => {
  const availableCarProducts = _.map(allAvailableVendorsForCarType, (vendor) => {
    const imageForCarVendor = _findCarVendor(carVendorImages, vendor.vendor, 'vendorName') || {};
    const dailyRate = _findDailyRate(vendor);
    const pricePerDayCents = dailyRate ? dailyRate.cents : vendor.price.dailyRateCents;
    const isRapidRewardsPartner = rapidRewardPartnersCarVendors.indexOf(vendor.vendor) !== -1;
    const { dailyRateWithCurrencyCode = {}, totalWithTaxesAndCurrencyCode = {} } = vendor.price;

    return _createCarResultObject(
      vendor,
      pricePerDayCents,
      imageForCarVendor,
      isRapidRewardsPartner,
      false,
      dailyRateWithCurrencyCode,
      totalWithTaxesAndCurrencyCode
    );
  });

  return _.sortBy(availableCarProducts, [{ isRapidRewardsPartner: false }, 'pricePerDayCents']);
};

const _transformUnavailableCarVendors = (unavailableCarVendors, carVendorImages, allCarVendors) => {
  const unavailableCarProducts = _.map(unavailableCarVendors, (carVendor) => {
    const imageForCarVendor = _findCarVendor(carVendorImages, carVendor, 'vendorName') || {};
    const isRapidRewardsPartner = allCarVendors.rapidRewardsPartners.indexOf(carVendor) !== -1;

    return _createCarResultObject(
      {
        vendor: carVendor,
        price: { totalCentsWithTaxes: 0 }
      },
      0,
      imageForCarVendor,
      isRapidRewardsPartner,
      true
    );
  });

  return _.sortBy(unavailableCarProducts, [{ isRapidRewardsPartner: false }]);
};

function _createCarResultObject(
  vehicle,
  pricePerDayCents,
  imageForCarVendor,
  isRapidRewardsPartner,
  isUnavailable,
  dailyRateWithCurrencyCode,
  totalWithTaxesAndCurrencyCode
) {
  return {
    vendorName: vehicle.vendor,
    pricePerDayCents,
    totalCentsWithTaxes: vehicle.price.totalCentsWithTaxes,
    productId: vehicle.productId,
    imageUrl: imageForCarVendor.logoImage,
    incentiveText: imageForCarVendor.rrIncentiveText,
    isUnavailable,
    isRapidRewardsPartner,
    promoCodeApplied: !_.isEmpty(vehicle.appliedDiscounts),
    appliedDiscount: _.head(vehicle.appliedDiscounts),
    dailyRateWithCurrencyCode,
    totalWithTaxesAndCurrencyCode
  };
}

const _findCarVendor = (listWeAreLookingIn, vendorWeAreLookingFor, nameProperty) =>
  _.find(
    listWeAreLookingIn,
    (carVendor) => carVendor[nameProperty].toLowerCase() === vendorWeAreLookingFor.toLowerCase()
  );

const _findDailyRate = (vehicle) => _.find(vehicle.price.rates, (rate) => rate.per === 'DAY');

const _getAllCarType = () =>
  _.reduce(
    allTypes(),
    (result, type) => {
      result[type] = [];

      return result;
    },
    {}
  );

export const filterOutNonSelectedVendors = (selectedCarVendors, allCarVendors) => {
  if (selectedCarVendors !== i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT')) {
    const selectedCarVendorsArray = _.isArray(selectedCarVendors)
      ? _.map(selectedCarVendors, 'vendorId')
      : selectedCarVendors.split(',');

    return _.filter(allCarVendors, (carVendor) => selectedCarVendorsArray.indexOf(carVendor.vendorId) !== -1);
  }

  return allCarVendors;
};
