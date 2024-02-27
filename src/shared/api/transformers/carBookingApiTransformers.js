import _ from 'lodash';
import { getCurrencyFromDollarsToCents } from 'src/shared/api/helpers/currencyHelper';
import { typeToLabel } from 'src/carBooking/helpers/vehicleTypesHelper';

export const transformVendorResponse = (carVendorsMobile) => {
  const transformAcceptedDiscounts = (vendor) =>
    _.transform(
      vendor.promoCodes,
      (result, value, key) => {
        const camelCasedKey = key === 'FREQUENT_RENTER' ? 'frequentRenterNumber' : _.camelCase(key);

        result[camelCasedKey] = value ? { name: value } : value;
      },
      {}
    );

  return {
    vendors: _.map(carVendorsMobile.results.carVendors, (vendor) => ({
      name: vendor.displayName,
      vendorId: vendor.code,
      isRapidRewardsPartner: _.toBoolean(vendor.isRapidRewardsPartner),
      acceptedDiscounts: transformAcceptedDiscounts(vendor)
    }))
  };
};

export const transformLocationsResponse = (carStationsMobile) => ({
  locations: _.chain(carStationsMobile)
    .get('results.carStations')
    .map((carStation) => ({
      airport: {
        code: carStation.id,
        airportName: carStation.displayName
      },
      city: _.get(carStation, 'displayName').split(',')[0],
      state: carStation.stateFederalUnit
    }))
    .value()
});

export const transformShoppingResponse = (carProductsResponse) => {
  const { carProducts, ...others } = carProductsResponse;

  const transformedCarProducts = _.map(carProducts, (product) => {
    const { additionalCharges, price, ...otherProductInfo } = product;

    return {
      additionalCharges: _transformAdditionalCharges(additionalCharges),
      price: _transformPrice(price),
      ...otherProductInfo
    };
  });

  return {
    carProducts: transformedCarProducts,
    ...others
  };
};

const _transformAdditionalCharges = (additionalCharges) => {
  const {
    returnCharge,
    mileage: { amount, ...others },
    noShowFee
  } = additionalCharges;

  return {
    dropOffChargeCents: getCurrencyFromDollarsToCents(returnCharge),
    mileage: {
      cents: getCurrencyFromDollarsToCents(amount),
      ...others
    },
    noShowFeeCents: getCurrencyFromDollarsToCents(noShowFee)
  };
};

const _transformPrice = (price) => {
  const { dailyRate, rates, total, totalWithTaxes } = price;
  const transformRateToCurrencyType = (rate) => {
    const { value: amount, currencyCode } = rate;

    return {
      amount,
      currencyCode
    };
  };
  const dailyRateWithCurrencyCode = transformRateToCurrencyType(dailyRate);
  const totalWithCurrencyCode = transformRateToCurrencyType(total);
  const totalWithTaxesAndCurrencyCode = transformRateToCurrencyType(totalWithTaxes);

  return {
    dailyRateCents: getCurrencyFromDollarsToCents(dailyRate),
    rates: _.map(rates, (rate) => ({
      cents: getCurrencyFromDollarsToCents(dailyRate),
      ..._.omit(rate, 'amount')
    })),
    totalCents: getCurrencyFromDollarsToCents(total),
    totalCentsWithTaxes: getCurrencyFromDollarsToCents(totalWithTaxes),
    dailyRateWithCurrencyCode,
    totalWithCurrencyCode,
    totalWithTaxesAndCurrencyCode
  };
};

const _transformDropOffProperties = (anyObject) => {
  const { returnDateTime, returnLocation, ...others } = anyObject;

  return {
    ...others,
    dropOffDateTime: returnDateTime,
    dropOffLocation: returnLocation
  };
};

export const transformRetrieveCarPricingResponse = (carPricingResponse) => {
  const { price, additionalCharges } = carPricingResponse;

  const transformedPrice = _transformPrice(price);
  const transformedTaxes = _.map(price.taxes, (tax) => {
    const { type, amount } = tax;

    return {
      type,
      cents: getCurrencyFromDollarsToCents(amount)
    };
  });
  const transformedAdditionalCharges = _transformAdditionalCharges(additionalCharges);
  const transformedCarPricingResponse = _transformDropOffProperties(carPricingResponse);
  const transformedTaxesWithCurrencyCode = _.map(price.taxes, (tax) => {
    const {
      type,
      amount: { value, currencyCode }
    } = tax;

    return {
      type,
      taxWithCurrencyCode: {
        amount: value,
        currencyCode
      }
    };
  });

  return {
    ...transformedCarPricingResponse,
    price: {
      ...transformedPrice,
      taxes: transformedTaxes,
      taxesWithCurrencyCode: transformedTaxesWithCurrencyCode
    },
    additionalCharges: transformedAdditionalCharges,
    vehicleType: typeToLabel(carPricingResponse.vehicleType)
  };
};

export const transformCarReservationRequest = (request) => {
  const { extras } = request;

  return {
    ...request,
    extras: _.map(extras, ({ type }) => ({
      type,
      description: _.startCase(type.toLowerCase())
    }))
  };
};
