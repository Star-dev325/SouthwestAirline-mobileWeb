// @flow
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import cx from 'classnames';

import Icon from 'src/shared/components/icon';
import { formatDate, isInSameDayIgnoreTimezone } from 'src/shared/helpers/dateHelper';

export type OnDateSelectedCallback = (isSelectionCanceled: boolean, selectedDate?: string) => void;

export type CalendarStripEvent = {
  previousDate: string
};

type Props = {
  defaultSelectedDate: string,
  startDate: Dayjs,
  endDate: Dayjs,
  disabled: boolean,
  onDateSelected: (newDate: string, onDateSelectedCallback: OnDateSelectedCallback, event: CalendarStripEvent) => void,
  verifyShouldHideWarningIcon?: (date: Dayjs) => boolean,
  trackCalendarStripFn: (string) => void
};

type State = {
  viewDate: Dayjs
};

class CalendarStrip extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this._getInitialState();
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({
      viewDate: dayjs(nextProps.defaultSelectedDate)
    });
  }

  _getInitialState = () => ({
    viewDate: dayjs(this.props.defaultSelectedDate)
  });

  _getDatesToDisplay = () => {
    const date = this.state.viewDate;
    const nextDay = dayjs(date).add(1, 'days');
    const prevDay = dayjs(date).subtract(1, 'days');

    return [prevDay, date, nextDay];
  };

  _prevDates = () => {
    this.setState({
      viewDate: this.state.viewDate.subtract(3, 'days')
    });
  };

  _nextDates = () => {
    this.setState({
      viewDate: this.state.viewDate.add(3, 'days')
    });
  };

  _dateIsDisabled = (date: Dayjs) =>
    (this.props.disabled && !isInSameDayIgnoreTimezone(date, this.state.viewDate)) ||
    !date.isBetween(this.props.startDate, this.props.endDate, 'day', '[]');

  _shouldShowNextLink = () => {
    const lastDayInStrip = this._getDatesToDisplay()[2];

    return !this.props.disabled && this.props.endDate.isAfter(lastDayInStrip);
  };

  _shouldShowPreviousLink = () => {
    const firstDayInStrip = this._getDatesToDisplay()[0];

    return !this.props.disabled && this.props.startDate.isBefore(firstDayInStrip);
  };

  _onClick = (date: Dayjs, isCurrentDate: boolean = false) => {
    if (this._dateIsDisabled(date) || isCurrentDate) {
      return;
    }

    const { onDateSelected, defaultSelectedDate } = this.props;
    const formattedSelectedDate = date.format('YYYY-MM-DD');

    onDateSelected(formattedSelectedDate, this._onDateSelectedCallback, {
      previousDate: defaultSelectedDate
    });
  };

  _onDateSelectedCallback = (isSelectionCanceled: boolean, selectedDate?: string) => {
    isSelectionCanceled ? this._onSelectionCanceled() : selectedDate && this._onSelectionConfirmed(selectedDate);
  };

  _onSelectionCanceled = () => {
    this.setState(this._getInitialState());
  };

  _onSelectionConfirmed = (selectedDate: string) => {
    this.props.trackCalendarStripFn(selectedDate);
  };

  _shouldHideWarningIcon = (date: Dayjs) => {
    const { verifyShouldHideWarningIcon } = this.props;

    return this._dateIsDisabled(date) || (verifyShouldHideWarningIcon ? verifyShouldHideWarningIcon(date) : true);
  };

  render() {
    return (
      <div className="relative px4 calendar-strip">
        {this._shouldShowPreviousLink() && (
          <span data-qa="calendar-strip-previous-dates" ref="previousButton" onClick={this._prevDates}>
            <Icon type="keyboard-arrow-left" className="yellow" />
          </span>
        )}
        <ul className="flex white bold calendar-strip--content">
          {this._getDatesToDisplay().map((date, index) => {
            const isCurrentDate = isInSameDayIgnoreTimezone(date, this.props.defaultSelectedDate);
            const displayDate = formatDate(date, 'ddd, MMM DD');
            const classes = cx('block center bgpblue calendar-strip--item', {
              'bgsdkblue white calendar-strip--item_active': isCurrentDate,
              'pdkblue calendar-strip--item_disabled': this._dateIsDisabled(date)
            });

            return (
              <li key={index} onClick={this._onClick.bind(null, date, isCurrentDate)} className={classes}>
                <p>{displayDate}</p>
                <Icon
                  data-qa="calendar-strip--warning-icon"
                  className={cx('sltblue', { hide: this._shouldHideWarningIcon(date) })}
                  type="travel-alert"
                />
              </li>
            );
          })}
        </ul>
        {this._shouldShowNextLink() && (
          <span data-qa="calendar-strip-next-dates" ref="nextButton" onClick={this._nextDates}>
            <Icon type="keyboard-arrow-right" className="yellow" />
          </span>
        )}
      </div>
    );
  }
}

export default CalendarStrip;
