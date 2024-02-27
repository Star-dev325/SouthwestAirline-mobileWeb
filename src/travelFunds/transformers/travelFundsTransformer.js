// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import type {
  CalcFundsPassengerType,
  CalcFundsRequestType,
  RefreshFundsRequestType,
  RemoveFundRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';
import { otherPassengerReference } from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import type { PassengerInfos, TotalsType } from 'src/shared/flow-typed/shared.types';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';
import type {
  LookUpCardFundType,
  LookUpFundRequestType,
  LookUpRTFFundType,
  LookUpVoucherFundType,
  TransferTravelFundsFormData,
  ValidateTransferPageResponse
} from 'src/travelFunds/flow-typed/travelFunds.types';

const { LAPCHILD } = PassengerTypes;

export const transformToRTFLookupRequest = (rtfFormData: LookUpRTFFundType): LookUpFundRequestType => ({
  method: 'POST',
  href: '/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
  body: {
    travelFundIdentifier: rtfFormData.confirmationNumber,
    firstName: rtfFormData.passengerFirstName,
    lastName: rtfFormData.passengerLastName
  }
});

export const transformToVoucherLookupRequest = (voucherFormData: LookUpVoucherFundType): LookUpFundRequestType => ({
  method: 'POST',
  href: '/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
  body: {
    travelFundIdentifier: voucherFormData.voucherNumber,
    securityCode: voucherFormData.securityCode
  }
});

export const transformToCardLookupRequest = (cardFormData: LookUpCardFundType): LookUpFundRequestType => ({
  method: 'POST',
  href: '/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
  body: {
    travelFundIdentifier: cardFormData.cardNumber,
    securityCode: cardFormData.securityCode
  }
});

export const transformToRTFCalculateRequest = (
  rtfFormData: LookUpRTFFundType,
  passengerInfos: ?PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
): CalcFundsRequestType => {
  if (!passengerInfos) {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/change/calculate-funds/TRAVEL_FUNDS',
      body: {
        travelFundIdentifier: rtfFormData.confirmationNumber,
        firstName: rtfFormData.passengerFirstName,
        lastName: rtfFormData.passengerLastName,
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  } else {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUNDS',
      body: {
        travelFundIdentifier: rtfFormData.confirmationNumber,
        firstName: rtfFormData.passengerFirstName,
        lastName: rtfFormData.passengerLastName,
        passengers: transformToCalculatePassengersArray(passengerInfos),
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  }
};

export const transformToVoucherCalculateRequest = (
  voucherFormData: LookUpVoucherFundType,
  passengerInfos: ?PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
): CalcFundsRequestType => {
  if (!passengerInfos) {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/change/calculate-funds/LUV_VOUCHER',
      body: {
        travelFundIdentifier: voucherFormData.voucherNumber,
        securityCode: voucherFormData.securityCode,
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  } else {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/calculate-funds/LUV_VOUCHER',
      body: {
        travelFundIdentifier: voucherFormData.voucherNumber,
        securityCode: voucherFormData.securityCode,
        passengers: transformToCalculatePassengersArray(passengerInfos),
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  }
};

export const transformToCardCalculateRequest = (
  cardFormData: LookUpCardFundType,
  passengerInfos: ?PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
): CalcFundsRequestType => {
  if (!passengerInfos) {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/change/calculate-funds/GIFT_CARD',
      body: {
        travelFundIdentifier: cardFormData.cardNumber,
        securityCode: cardFormData.securityCode,
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  } else {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
      body: {
        travelFundIdentifier: cardFormData.cardNumber,
        securityCode: cardFormData.securityCode,
        passengers: transformToCalculatePassengersArray(passengerInfos),
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  }
};

export const transformToChangeTravelFundSummary = (priceTotal: { totals: ?TotalsType }) => {
  const moneyTotal = get(priceTotal, 'totals.moneyTotal');
  const pointsTotal = get(priceTotal, 'totals.pointsTotal');
  let refundable = null;
  const amountDue = { item: i18n('SHARED__PRICE_LINE_TITLES__AMOUNT_DUE'), fare: null, tax: null };

  if (pointsTotal) {
    if (pointsTotal.item === 'Credit') {
      refundable = {
        item: i18n('SHARED__PRICE_LINE_TITLES__CREDIT'),
        fare: {
          amount: pointsTotal.amount,
          currencyCode: pointsTotal.currencyCode,
          currencySymbol: pointsTotal.currencySymbol
        },
        tax: null
      };
      amountDue.fare = moneyTotal;
    } else if (pointsTotal.item === 'Amount Due') {
      delete pointsTotal.item;
      amountDue.fare = pointsTotal;
      amountDue.tax = moneyTotal;
    }
  } else {
    amountDue.fare = moneyTotal;
  }

  return { owe: amountDue, refund: refundable };
};

export const transformToCalculatePassengersArray = (passengerInfos: PassengerInfos): CalcFundsPassengerType =>
  _.map(passengerInfos, (passenger) => {
    const passengerInfo = get(passenger, 'passengerInfo');
    const suffix = get(passengerInfo, 'suffix', null);
    const { type, passengerReference } = passenger;
    const isLapChild = type === LAPCHILD;

    return {
      name: {
        firstName: get(passengerInfo, 'firstName'),
        middleName: get(passengerInfo, 'middleName', null),
        lastName: get(passengerInfo, 'lastName'),
        suffix: suffix !== '' ? suffix : null
      },
      gender: get(passengerInfo, 'gender'),
      dateOfBirth: get(passengerInfo, 'dateOfBirth'),
      accountNumber: get(passengerInfo, 'rapidRewardsNumber'),
      passengerType: isLapChild ? 'LAP_INFANT' : get(passenger, 'type').toUpperCase(),
      passengerReference,
      ...(isLapChild
        ? {
          otherPassengerReference: otherPassengerReference(
            type,
            passengerReference,
            get(passengerInfo, 'associatedAdult')
          )
        }
        : {})
    };
  });

export const transformToRemoveFundsRequest = (
  removalTravelFundId: string,
  passengerInfos: ?PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string,
  cashPointsPage: ?boolean
): RemoveFundRequestType => {
  if (!passengerInfos) {
    return {
      method: 'PUT',
      href: '/v1/mobile-air-booking/page/change/calculate-funds',
      body: {
        removalTravelFundId,
        fundsAppliedToken,
        itineraryPricingToken,
        cashPointsPage
      }
    };
  } else {
    return {
      method: 'PUT',
      href: '/v1/mobile-air-booking/page/calculate-funds',
      body: {
        removalTravelFundId,
        passengers: transformToCalculatePassengersArray(passengerInfos),
        fundsAppliedToken,
        itineraryPricingToken,
        cashPointsPage
      }
    };
  }
};

export const transformToRemoveAllTravelFundRequest = (
  passengerInfos: PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
) => ({
  method: 'PUT',
  href: '/v1/mobile-air-booking/page/calculate-funds',
  body: {
    fundsAppliedToken,
    itineraryPricingToken,
    passengers: transformToCalculatePassengersArray(passengerInfos),
    removeAll: true,
    removalTravelFundId: '0'
  }
});

export const transformToRefreshFundsRequest = (
  passengerInfos: ?PassengerInfos,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
): RefreshFundsRequestType => {
  if (!passengerInfos) {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/change/calculate-funds',
      body: {
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  } else {
    return {
      method: 'POST',
      href: '/v1/mobile-air-booking/page/calculate-funds',
      body: {
        passengers: transformToCalculatePassengersArray(passengerInfos),
        fundsAppliedToken,
        itineraryPricingToken
      }
    };
  }
};

export const transformToTransferTravelFundsRequest = (
  validateFunds: ValidateTransferPageResponse,
  formData: TransferTravelFundsFormData
) => {
  const transferFund = get(validateFunds, '_links.transferFund');

  const transferTravelFundsRequest = {
    body: transformToTravelFundsRequestBody(validateFunds, formData),
    href: get(transferFund, 'href'),
    method: get(transferFund, 'method')
  };

  return transferTravelFundsRequest;
};

const transformToTravelFundsRequestBody = (
  validateFunds: ValidateTransferPageResponse,
  formData: TransferTravelFundsFormData = {}
) => ({
  fundSearchToken: get(validateFunds, '_links.transferFund.body.fundSearchToken'),
  recipientFirstName: formData.firstName,
  recipientLastName: formData.lastName,
  recipientAccountNumber: formData.rapidRewardsNumber,
  recipientEmailAddress: formData.recipientEmailAddress,
  personalMessage: formData.personalMessage,
  receiptEmailAddress: !isEmpty(formData.additionalReceipt) ? formData.additionalReceipt : null,
  transferAmount: get(validateFunds, 'transferAmount')
});
