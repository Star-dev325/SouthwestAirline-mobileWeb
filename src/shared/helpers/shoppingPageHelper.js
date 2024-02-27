// @flow
import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import SortingOptions from 'src/shared/constants/sortingOptions';
import { OUTBOUND } from 'src/shared/constants/flightBoundTypes';

import type { FlightProductCard } from 'src/shared/flow-typed/shared.types';
import type { PricingRequest, SelectedProducts } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  isOutbound: boolean,
  departDate: string,
  returnDate: string,
  lastBookableDate: string
};

type CalendarStrip = {
  defaultSelectedDate: string,
  popupDate: string,
  startDate: Dayjs,
  endDate: Dayjs
};

type CalendarReturnAndDepartureDate = {
  direction: string,
  newDate: string,
  isOverrideEndDate?: boolean,
  defaultReturnDate?: string
};

export const generateCalendarStrip = ({ isOutbound, departDate, returnDate, lastBookableDate }: Props): CalendarStrip =>
  (isOutbound
    ? {
      defaultSelectedDate: departDate,
      popupDate: returnDate,
      startDate: dayjs(),
      endDate: dayjs(lastBookableDate)
    }
    : {
      defaultSelectedDate: returnDate,
      popupDate: '',
      startDate: dayjs(departDate),
      endDate: dayjs(lastBookableDate)
    });

const buildRequestByBound = (boundReferences, boundType, selectedProducts) => {
  const boundReference = _.get(boundReferences, boundType === 'inbound' ? '1' : '0');

  if (!_.isEmpty(boundReference)) {
    let request = { boundReference };
    const selectedProduct = _.get(selectedProducts, boundType);

    if (selectedProduct) {
      request = _.merge({}, request, { productId: _.get(selectedProduct, 'fareProductId') });
    }

    return request;
  }
};

export const generatePricingRequest = (changePricingLink: Link, selectedProducts: SelectedProducts): PricingRequest => {
  const changeRequests = [];
  const boundReference = _.get(changePricingLink, 'body.boundReference');

  const outboundRequest = buildRequestByBound(boundReference, 'outbound', selectedProducts);

  outboundRequest && changeRequests.push(outboundRequest);

  const inboundRequest = buildRequestByBound(boundReference, 'inbound', selectedProducts);

  inboundRequest && changeRequests.push(inboundRequest);

  return _.merge({}, _.omit(changePricingLink, 'body.boundReference'), { body: { changeRequests } });
};

export const getCalendarReturnAndDepartureDate = ({
  direction,
  newDate,
  isOverrideEndDate = false,
  defaultReturnDate
}: CalendarReturnAndDepartureDate) => {
  if (direction === OUTBOUND) {
    return {
      departureDate: newDate,
      returnDate: isOverrideEndDate ? newDate : defaultReturnDate
    };
  }

  return {
    returnDate: newDate
  };
};

export const getCalendarReturnAndDepartureDateForReaccom = ({
  direction,
  newDate,
  isOverrideEndDate = false,
  defaultReturnDate
}: CalendarReturnAndDepartureDate) => {
  const reaccomProduct = { body: {} };

  if (direction === OUTBOUND) {
    _.set(reaccomProduct, 'body.outbound.date', newDate);
    const inboundDate = isOverrideEndDate ? newDate : defaultReturnDate;

    inboundDate && _.set(reaccomProduct, 'body.inbound.date', inboundDate);
  } else {
    _.set(reaccomProduct, 'body.inbound.date', newDate);
  }

  return reaccomProduct;
};

export const sortCardsBy = (cards: Array<FlightProductCard>, sortBy: string) => {
  const sortStrategies = [
    {
      key: `_meta.${sortBy}`,
      order: 'asc'
    },
    {
      key: `_meta.${SortingOptions.DEPARTURE_TIME}`,
      order: 'asc'
    }
  ];

  if (sortBy === SortingOptions.STARTING_FROM_AMOUNT) {
    sortStrategies.unshift({
      key: 'reasonIfUnavailable',
      order: 'desc'
    });
  }

  return _.orderBy(cards, _.map(sortStrategies, 'key'), _.map(sortStrategies, 'order'));
};
