// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import cx from 'classnames';
import { formatDayjsToYYYYMMDD, today, isPastDate } from 'src/shared/helpers/dateHelper';
import { convertToNumber } from 'src/shared/helpers/numberHelper';
import LowFarePriceBar from 'src/airBooking/components/lowFarePriceBar';
import LowFareDate from 'src/airBooking/components/lowFareDate';
import LowFarePointer from 'src/airBooking/components/lowFarePointer';
import LowFareDisplayMore from 'src/airBooking/components/lowFareDisplayMore';
import {
  getMinPrice,
  getMaxPrice,
  getLowFareDaysByMonth,
  getBarHeight,
  hasPricePoints,
  calculateCalendarScrollableBounds
} from 'src/airBooking/helpers/lowFareHelper';
import ToastDialog from 'src/shared/components/toastDialog';

import type { LowFareCalendarDaysType, LowFareByMonthArraysType } from 'src/airBooking/flow-typed/lowFare.types';

type Props = {
  boundClassName: string,
  selectedDate: ?string,
  otherBoundSelectedDate: ?string,
  onSelectDate: (date: string, el: HTMLElement) => void,
  lowFareCalendarDays: Array<LowFareCalendarDaysType>,
  isInbound?: boolean,
  showFetchPrev: boolean,
  showFetchNext: boolean,
  showLoadingPrev: boolean,
  showLoadingNext: boolean,
  boundRef: (element: *) => void,
  onClickGetPrevCalendar: () => void,
  onClickGetNextCalendar: () => void,
  onClickCalendarIconFn: () => void,
  shouldShowUnselectableBars: boolean,
  unselectableBarClickedMessage: string
};

type State = {
  minPrice: number,
  maxPrice: number,
  inboundCenterDate: string,
  outboundCenterDate: string,
  isToasterDialogVisible: boolean
};

class LowFareBound extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { lowFareCalendarDays } = this.props;
    const todayAsDate = formatDayjsToYYYYMMDD(today());

    this.state = {
      minPrice: getMinPrice(lowFareCalendarDays, todayAsDate),
      maxPrice: getMaxPrice(lowFareCalendarDays, todayAsDate),
      inboundCenterDate: '',
      outboundCenterDate: '',
      isToasterDialogVisible: false
    };

    this._setSpacerLeftRef = (element: *) => {
      this.spacerLeftRef = element;
    };
    this._setSpacerRightRef = (element: *) => {
      this.spacerRightRef = element;
    };
  }

  componentDidMount() {
    const outboundCalendar = document.querySelector('.low-fare-calendar');
    const inboundCalendar = document.querySelector('.low-fare-calendar--inbound');

    if (outboundCalendar) {
      outboundCalendar.addEventListener('scroll', () => {
        this._getCenteredDate(outboundCalendar, false);
      });
    }

    if (inboundCalendar) {
      inboundCalendar.addEventListener('scroll', () => {
        this._getCenteredDate(inboundCalendar, true);
      });
    }

    if (this.boundRef) {
      calculateCalendarScrollableBounds(this.boundRef, this.spacerLeftRef, this.spacerRightRef);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { lowFareCalendarDays } = this.props;
    const todayAsDate = formatDayjsToYYYYMMDD(today());

    if (!_.isEqual(lowFareCalendarDays, nextProps.lowFareCalendarDays)) {
      this.setState({
        minPrice: getMinPrice(nextProps.lowFareCalendarDays, todayAsDate),
        maxPrice: getMaxPrice(nextProps.lowFareCalendarDays, todayAsDate)
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { lowFareCalendarDays, showFetchNext, showFetchPrev } = prevProps;

    if (
      !_.isEqual(lowFareCalendarDays, this.props.lowFareCalendarDays) ||
      showFetchNext !== this.props.showFetchNext ||
      showFetchPrev !== this.props.showFetchPrev
    ) {
      this._updateBound();
    }
  }

  _updateBound = () => {
    const { boundClassName } = this.props;
    const isInbound = boundClassName === 'low-fare-inbound';
    const calendar = document.querySelector(`.${boundClassName} .low-fare-calendar`);

    if (this.boundRef) {
      calculateCalendarScrollableBounds(this.boundRef, this.spacerLeftRef, this.spacerRightRef);
    }

    if (calendar) {
      this._getCenteredDate(calendar, isInbound);
    }
  };

  _setSpacerLeftRef: (element: *) => void;
  _setSpacerRightRef: (element: *) => void;
  spacerLeftRef: *;
  spacerRightRef: *;
  boundRef: *;

  _getCenteredDate = (calendar: Element, isInbound: boolean) => {
    const windowCenter = window.innerWidth / 2;
    const calendarBars = calendar.getElementsByClassName('calendar-day');
    let barDate;

    _.forEach(calendarBars, (calendarBar) => {
      const barObject = calendarBar.getBoundingClientRect();
      const barStart = barObject.left;
      const barEnd = barObject.right;

      if (barStart - 3 <= windowCenter && barEnd + 3 >= windowCenter) {
        barDate = calendarBar.dataset.date;

        isInbound ? this.setState({ inboundCenterDate: barDate }) : this.setState({ outboundCenterDate: barDate });
      }
    });

    return barDate;
  };

  _isDateUnselectableForBoundType = (fareDate: string, selectedDate: string) => {
    const { isInbound } = this.props;

    return isInbound ? isPastDate(fareDate, selectedDate) : isPastDate(selectedDate, fareDate);
  };

  _isDateUnselectable = (fareDate: string, selectedDate: ?string) => {
    if (!selectedDate) {
      return false;
    }

    return fareDate !== selectedDate && this._isDateUnselectableForBoundType(fareDate, selectedDate);
  };

  _onClickedPriceBar = (date: string, el: HTMLElement) => {
    const { onSelectDate, otherBoundSelectedDate } = this.props;

    if (!this.state.isToasterDialogVisible && this._isDateUnselectable(date, otherBoundSelectedDate)) {
      this.setState({
        isToasterDialogVisible: true
      });
    } else {
      onSelectDate(date, el);
    }
  };

  _onDismissToasterCb = () => {
    this.setState({
      isToasterDialogVisible: false
    });
  };

  render() {
    const {
      boundClassName,
      lowFareCalendarDays,
      showFetchPrev,
      showFetchNext,
      showLoadingPrev,
      showLoadingNext,
      isInbound,
      selectedDate,
      onClickGetPrevCalendar,
      onClickGetNextCalendar,
      boundRef,
      onClickCalendarIconFn,
      shouldShowUnselectableBars,
      unselectableBarClickedMessage,
      otherBoundSelectedDate
    } = this.props;
    const { isToasterDialogVisible, minPrice, maxPrice, inboundCenterDate, outboundCenterDate } = this.state;
    const lowFareDaysByMonthArrays: LowFareByMonthArraysType = getLowFareDaysByMonth(lowFareCalendarDays);
    const todayAsDate = formatDayjsToYYYYMMDD(today());
    const selectedScrollDate = isInbound ? inboundCenterDate || selectedDate : outboundCenterDate || selectedDate;

    return (
      <div className={`${boundClassName}`}>
        <ToastDialog
          message={unselectableBarClickedMessage}
          isVisible={isToasterDialogVisible}
          onDismissCb={this._onDismissToasterCb}
        />
        <LowFareDate
          flightDate={selectedScrollDate}
          isInbound={isInbound}
          onClickCalendarIconFn={onClickCalendarIconFn}
        />
        <LowFarePointer isInbound={isInbound} />
        <div
          className={cx('low-fare-calendar', { 'low-fare-calendar--inbound': isInbound })}
          ref={(ref) => {
            this.boundRef = ref;
            boundRef(ref);
          }}
        >
          <div className="low-fare-calendar--spacer-left" ref={this._setSpacerLeftRef} />
          {showFetchPrev && <LowFareDisplayMore showLoading={showLoadingPrev} onClick={onClickGetPrevCalendar} />}
          {lowFareDaysByMonthArrays.map((faresForMonth: Array<LowFareCalendarDaysType>, monthIndex: number) => {
            if (!_.isEmpty(faresForMonth)) {
              const showPricePoints = hasPricePoints(lowFareCalendarDays);
              const month = dayjs(faresForMonth[0].date).format('MMM').toUpperCase();

              return (
                <div className="calendar-month" key={monthIndex}>
                  <div className="month-indicator" data-qa="calendar-month-indicator">
                    {month}
                  </div>
                  <div className="calendar-days-container">
                    {faresForMonth.map((fare: LowFareCalendarDaysType, index: number) => {
                      const farePrice = convertToNumber(_.get(fare, 'lowestPrice.price.amount'));
                      const isDisabled = !fare.lowestPrice || isPastDate(fare.date, todayAsDate);
                      const barHeight = getBarHeight(farePrice, minPrice, maxPrice, showPricePoints);

                      return (
                        <LowFarePriceBar
                          key={`${month}-${index}`}
                          date={fare.date}
                          isSelected={selectedDate === fare.date}
                          onSelect={this._onClickedPriceBar}
                          lowestPrice={fare.lowestPrice}
                          barHeight={barHeight}
                          isDisabled={isDisabled}
                          showAsUnselectableBar={
                            shouldShowUnselectableBars && this._isDateUnselectable(fare.date, otherBoundSelectedDate)
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
          {showFetchNext && <LowFareDisplayMore showLoading={showLoadingNext} onClick={onClickGetNextCalendar} />}
          <div className="low-fare-calendar--spacer-right" ref={this._setSpacerRightRef} />
        </div>
        <div className="low-fare-calendar--menu-footer" />
      </div>
    );
  }
}

export default LowFareBound;
