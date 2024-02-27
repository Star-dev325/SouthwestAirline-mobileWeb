// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import type {
  LowFareCalendarDaysType,
  LowFareByMonthArraysType,
  LowFareCalendarPageType
} from 'src/airBooking/flow-typed/lowFare.types';
import { convertToNumber } from 'src/shared/helpers/numberHelper';
import { isPastDate } from 'src/shared/helpers/dateHelper';

export const MIN_BAR_HEIGHT_WITH_TAXES = 4.5;
export const MIN_BAR_HEIGHT = 3.7;
export const MAX_BAR_HEIGHT = 19;

const SMOOTH_SCROLL_TIME = 300;
const REM_CONVERSION = 10;

export const hasPricePoints = (boundFlights: Array<LowFareCalendarDaysType>) =>
  !_.chain(boundFlights)
    .map((fare) => !_.isEmpty(_.get(fare, 'lowestPrice.pricePointsTax')))
    .uniq()
    .compact()
    .isEmpty()
    .value();

export const getMinPrice = (boundFlights: Array<LowFareCalendarDaysType>, todayAsDate: string) =>
  _.chain(boundFlights)
    .map((fare) => {
      const value = _.get(fare, 'lowestPrice.price.amount', undefined);
      const amount = convertToNumber(value);
      const min = isPastDate(fare.date, todayAsDate) ? undefined : amount;

      return min;
    })
    .min()
    .value() || 0;

export const getMaxPrice = (boundFlights: Array<LowFareCalendarDaysType>, todayAsDate: string) =>
  _.chain(boundFlights)
    .map((fare) => {
      const value = _.get(fare, 'lowestPrice.price.amount', 0);
      const amount = convertToNumber(value);

      return isPastDate(fare.date, todayAsDate) ? 0 : amount;
    })
    .max()
    .value() || 0;

const percentageInPriceRange = (farePrice: number, minPrice: number, maxPrice: number): number => {
  const denom: number = maxPrice - minPrice;

  if (denom === 0) {
    return 1;
  }

  return (farePrice - minPrice) / denom;
};

export const getBarHeight = (
  farePrice: ?number,
  minPrice: number,
  maxPrice: number,
  showPointsTax: boolean
): string => {
  const minBarHeight = showPointsTax ? MIN_BAR_HEIGHT_WITH_TAXES : MIN_BAR_HEIGHT;

  if (!maxPrice || !minPrice || farePrice === 0 || farePrice === undefined || farePrice === null) {
    return `${minBarHeight}rem`;
  }

  const percentage = percentageInPriceRange(farePrice, minPrice, maxPrice);
  const adjustedHeight = MAX_BAR_HEIGHT * percentage + minBarHeight * (1 - percentage);

  return `${adjustedHeight}rem`;
};

export const getLowFareDaysByMonth = (boundFares: Array<LowFareCalendarDaysType>): LowFareByMonthArraysType => {
  const lowFareDaysMonthMap = new Map();
  let faresInThisMonth: Array<LowFareCalendarDaysType> = [];
  let currentMonthYear: string; // 1 = Jan ... 12 = Dec  Ex. 1-2019

  _.forEach(boundFares, (fare: LowFareCalendarDaysType) => {
    const thisDate = dayjs(fare.date);

    currentMonthYear = thisDate.format('M-YYYY');

    faresInThisMonth = lowFareDaysMonthMap.get(currentMonthYear) || [];
    faresInThisMonth.push(fare);
    lowFareDaysMonthMap.set(currentMonthYear, faresInThisMonth);
  });

  const lowFareDaysMonthArray: LowFareByMonthArraysType = [];

  for (const value of lowFareDaysMonthMap.values()) {
    lowFareDaysMonthArray.push(value);
  }

  return lowFareDaysMonthArray;
};

export const calculateLfcSelectedDates = (searchRequest: *, response: LowFareCalendarPageType) => {
  const { departureDate, returnDate } = searchRequest;
  const outboundDays = _.get(response, 'lowFareCalendarPage.outboundPage.lowFareCalendarDays');
  const inboundDays = _.get(response, 'lowFareCalendarPage.inboundPage.lowFareCalendarDays');
  let selectedDepartureDate;
  let selectedReturnDate;

  if (
    departureDate &&
    outboundDays &&
    outboundDays.filter((d) => d.date === departureDate && d.lowestPrice).length > 0
  ) {
    selectedDepartureDate = departureDate;
  }

  if (returnDate && inboundDays && inboundDays.filter((d) => d.date === returnDate && d.lowestPrice).length > 0) {
    selectedReturnDate = returnDate;
  }

  return { selectedDepartureDate, selectedReturnDate };
};

export const calculateCalendarScrollableBounds = (calendar: *, leftSpacer: *, rightSpacer: *) => {
  const calDays = calendar.getElementsByClassName('calendar-day');
  const firstBar = calDays[0];
  const lastBar = calDays[calDays.length - 1];
  const outboundCalRefRect = calendar.getBoundingClientRect();
  const firstBarRect = firstBar.getBoundingClientRect();
  const lastBarRect = lastBar.getBoundingClientRect();
  const calMidPoint = outboundCalRefRect.left + outboundCalRefRect.width / 2;
  const diffLeftToCenter = Math.round(calMidPoint - (firstBar.offsetLeft + firstBarRect.width / 2));
  const diffRightToCenter = Math.round(
    calMidPoint - (calendar.scrollWidth - (lastBar.offsetLeft + lastBarRect.width / 2))
  );
  const calendarPaddingLeft = diffLeftToCenter / REM_CONVERSION;
  const calendarPaddingRight = diffRightToCenter / REM_CONVERSION;

  if (calendarPaddingLeft) {
    const currentPaddingLeft = leftSpacer.style['paddingLeft']
      ? parseFloat(leftSpacer.style['paddingLeft'].replace('rem', ''))
      : 0;

    leftSpacer.style['paddingLeft'] = `${currentPaddingLeft + calendarPaddingLeft}rem`;
  }

  if (calendarPaddingRight) {
    const currentPaddingRight = rightSpacer.style['paddingRight']
      ? parseFloat(rightSpacer.style['paddingRight'].replace('rem', ''))
      : 0;

    rightSpacer.style['paddingRight'] = `${currentPaddingRight + calendarPaddingRight}rem`;
  }
};

export const calendarScrollFunctions = {
  focusOnPriceBar: (lowFareCalendar: *, targetEl: HTMLElement, noAnimation?: boolean) => {
    if (lowFareCalendar) {
      const lfcClientRect = lowFareCalendar.getBoundingClientRect();
      const targetClientRect = targetEl.getBoundingClientRect();
      const differenceFromCenter = Math.round(
        targetClientRect.left + targetClientRect.width / 2 - (lfcClientRect.left + lfcClientRect.width / 2)
      );
      const positionToScrollTo = lowFareCalendar.scrollLeft + differenceFromCenter;
      const startTime = _.has(window, 'performance.now') ? performance.now() : new Date().getTime();

      calendarScrollFunctions.scrollToPriceBar(
        noAnimation,
        lowFareCalendar,
        positionToScrollTo,
        startTime,
        lowFareCalendar.scrollLeft
      );
    }
  },
  scrollToPriceBar: (
    skipAnimation: boolean = false,
    elementToScroll: HTMLElement = document.createElement('span'),
    positionToScrollTo: number = 0,
    startTime: number = 0,
    startPosition: number = 0
  ) => {
    if (skipAnimation) {
      elementToScroll.scrollLeft = positionToScrollTo;

      return;
    }

    const currentTime = _.has(window, 'performance.now') ? performance.now() : new Date().getTime();
    const progress = (currentTime - startTime) / SMOOTH_SCROLL_TIME;
    const percentageComplete = Math.min(1, progress);
    const newPosition = Math.ceil(
      easeOutQuad(percentageComplete) * (positionToScrollTo - startPosition) + startPosition
    );

    if (elementToScroll.scrollLeft === positionToScrollTo || isAtEndOfScroll(elementToScroll, percentageComplete)) {
      return; // end scrolling
    }

    elementToScroll.scrollLeft = newPosition;

    if (_.has(window, 'requestAnimationFrame')) {
      window.requestAnimationFrame(
        calendarScrollFunctions.scrollToPriceBar.bind(
          null,
          false,
          elementToScroll,
          positionToScrollTo,
          startTime,
          startPosition
        )
      );
    }
  }
};

const easeOutQuad = (t: number) => t * (2 - t);

const isAtEndOfScroll = (elementToScroll: HTMLElement, percentageComplete: number) => {
  if (percentageComplete !== 1) {
    return false;
  }

  return elementToScroll.scrollLeft === 0 ||
    elementToScroll.offsetWidth + elementToScroll.scrollLeft === elementToScroll.scrollWidth ||
    percentageComplete >= 1;
};
