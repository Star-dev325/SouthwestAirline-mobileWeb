// @flow
import _ from 'lodash';
import { toFormattedPrice } from 'src/shared/helpers/currencyValueHelper';
import type { UpgradedBoardingSegment } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';
import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';

export const getPaxCountForSegment = (formData: *, segment: UpgradedBoardingSegment) => {
  let count = 0;
  const passengers = _.get(segment, 'passengers', []);

  passengers.map((pax) => {
    const productId = _.get(pax, '_meta.productId');

    if (_.get(formData, productId) === true) {
      count++;
    }
  });

  return count;
};

export const getUpgradedBoardingPriceTotal = (
  formData: *,
  upgradedBoardingSegment: ?Array<UpgradedBoardingSegment>
) => {
  const total = upgradedBoardingSegment
    ? upgradedBoardingSegment
      .map(
        (segment) =>
          parseFloat(_.get(segment, 'upgradedBoardingPrice.amount', '0')) * getPaxCountForSegment(formData, segment)
      )
      .reduce((result, val) => result + val, 0)
    : 0;

  return toFormattedPrice(total);
};

export const generateSegmentFormFieldName = (key: number) => (_.isNumber(key) ? `ubBoundCheckbox_${key}` : '');

export const getDefaultSelectedUpgradedBoardingProducts = (
  UPGRADED_BOARDING_BY_SEGMENT: boolean,
  upgradedBoardingSegments: Array<*>
) => {
  const productFormData = {};

  upgradedBoardingSegments.forEach((ubSegment, key) => {
    ubSegment.passengers.forEach((pax) => {
      const productId = _.get(pax, '_meta.productId');

      if (productId) {
        productFormData[productId] = true;
      }
    });

    if (UPGRADED_BOARDING_BY_SEGMENT) {
      productFormData[generateSegmentFormFieldName(key)] = true;
    }
  });

  return productFormData;
};

export const getUpgradedBoardingReservationLink = ({ firstName, lastName, recordLocator }: PassengerNameRecord) => ({
  href: `/v1/mobile-air-operations/page/upgraded-boarding/${recordLocator}`,
  body: { firstName, lastName },
  method: 'POST'
});
