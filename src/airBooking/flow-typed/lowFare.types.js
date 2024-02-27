// @flow

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

export type LowestPriceType = {
  price: CurrencyType,
  pricePointsTax: ?CurrencyType
}

export type LowFareCalendarDaysType = {
  date: string,
  lowestPrice: ?LowestPriceType
};

export type LowFareBoundType = {
  header: {
    airportInfo: string,
    selectedDate: string
  },
  lowFareCalendarDays: Array<LowFareCalendarDaysType>,
  _links: *
};

export type LowFareCalendarPageType = {
  outboundPage: LowFareBoundType,
  inboundPage?: LowFareBoundType
};

export type LowFareByMonthArraysType = Array<Array<LowFareCalendarDaysType>>;

export type LowFareMessage = {
  key: string,
  header: string | null,
  body: string,
  icon: string,
  textColor: string
}

export type LowFareCalendarData = { 
  priceoutselected: string, 
  pricereturnselected: string, 
  pointsoutselected: string, 
  pointsreturnselected: string 
};