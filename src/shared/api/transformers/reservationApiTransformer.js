import { getCurrencyFromDollarsToCents } from 'src/shared/api/helpers/currencyHelper';

export const transformToRetrieveCarReservationResponse = (chapiResponse) => {
  const {
    returnDatetime,
    returnLocation,
    price: { dailyRate, total, totalWithTaxes },
    tax,
    mileage,
    ...others
  } = chapiResponse;

  return {
    returnDatetime,
    returnLocation,
    dropoffDatetime: returnDatetime,
    dropoffLocation: returnLocation,
    price: {
      dailyRateCents: getCurrencyFromDollarsToCents(dailyRate),
      totalCents: getCurrencyFromDollarsToCents(total),
      totalCentsWithTaxes: getCurrencyFromDollarsToCents(totalWithTaxes),
      dailyRate,
      total,
      totalWithTaxes
    },
    taxCents: getCurrencyFromDollarsToCents(tax),
    tax,
    mileage: _getMileage(mileage),
    ...others
  };
};

const _getMileage = (mileage) => {
  const { freeMileage, per, amount } = mileage;

  return freeMileage === null
    ? 'Unlimited'
    : {
      cents: getCurrencyFromDollarsToCents(amount),
      freeMileage,
      per
    };
};
