import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import { toNumberFromFormattedString, toFormattedStringFromNumber } from 'src/shared/helpers/currencyValueHelper';
import { POINTS } from 'src/shared/constants/currencyTypes';

export const flattenUpgradeBounds = (upgradeBounds) =>
  upgradeBounds.reduce((flattenedBounds, upgradeBound) => {
    const { boundSelectionDataList = [], upgradeablePricingDataList = [] } = flattenedBounds;

    const {
      arrivalAirportCode,
      arrivalTime,
      boundType,
      departureAirportCode,
      departureDate,
      departureDayOfWeek,
      departureTime,
      flight,
      isOvernight,
      isNextDayArrival,
      numberOfPassengers,
      upgradeFare: {
        upgradePrice = null,
        upgradeTotalPrice = null,
        upgradeMessage: { header: upgradeMessageHeader, body: upgradeMessageBody },
        _meta: { productId, canUpgrade }
      }
    } = upgradeBound;

    const boundSelectionData = {
      arrivalAirportCode,
      arrivalTime,
      boundType,
      canUpgrade,
      departureAirportCode,
      departureDate,
      departureDayOfWeek,
      departureTime,
      isOvernight,
      isNextDayArrival,
      productId,
      upgradeMessageBody,
      upgradeMessageHeader
    };

    const pricingData = {
      arrivalAirportCode,
      boundType,
      canUpgrade,
      departureAirportCode,
      flight,
      isSelected: false,
      numberOfPassengers,
      productId,
      upgradePrice,
      upgradeTotalPrice
    };

    return {
      boundSelectionDataList: [...boundSelectionDataList, boundSelectionData],
      upgradeablePricingDataList: canUpgrade ? [...upgradeablePricingDataList, pricingData] : upgradeablePricingDataList
    };
  }, {});

export const updateSelectedPricingData = (pricingDataList, { productId, isSelected }) =>
  pricingDataList.map((pricingData) =>
    (pricingData.productId === productId ? { ...pricingData, isSelected } : pricingData)
  );

export const addPoints = (...arrayOfCurrencyType) => {
  const { currencyCode = POINTS, currencySymbol = '', amount: unformattedAmount } = addCurrency(...arrayOfCurrencyType);
  const amountAsNumber = toNumberFromFormattedString(unformattedAmount);
  const amount = toFormattedStringFromNumber(amountAsNumber);

  return {
    currencyCode,
    currencySymbol,
    amount
  };
};
