// @flow
import React from 'react';
import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import Day from 'src/shared/components/calendar/day';

import type { DateRangeType } from 'src/shared/components/calendar/constants/calendarType';

type Props = {
  isMultiSelectionEnabled: boolean,
  date: Dayjs,
  lastBookableDate: Dayjs,
  earliestBookableDate: ?Dayjs,
  departureDate: ?Dayjs,
  returningDate: ?Dayjs,
  id: string,
  onClick: (Dayjs) => void,
  type: DateRangeType
};

class Month extends React.Component<Props> {
  static defaultProps = {
    earliestBookableDate: dayjs()
  };

  _daysOfWeek = () => {
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(dayjs().weekday(i).format('dd').charAt(0));
    }

    return daysOfWeek;
  };

  _createDay = (params: { isVisible: boolean }) => ({
    displayValue: '',
    date: '',
    isFirstDayOfSelection: false,
    isPartOfSelectedRange: false,
    isLastDayOfSelection: false,
    isToday: false,
    isSelectable: false,
    isVisible: params.isVisible || false
  });

  _isFirstDayOfSelection = (day: Dayjs) => {
    const { departureDate } = this.props;

    return departureDate && day.isSame(departureDate, 'd');
  };

  _isLastDayOfSelection = (day: Dayjs) => {
    const { returningDate, isMultiSelectionEnabled } = this.props;

    return isMultiSelectionEnabled && returningDate ? day.isSame(returningDate, 'd') : false;
  };

  _isPartOfSelectedRange = (day: Dayjs) => {
    const { departureDate, returningDate, isMultiSelectionEnabled } = this.props;

    return (
      isMultiSelectionEnabled &&
      departureDate &&
      (day.isAfter(departureDate, 'd') || day.isSame(departureDate, 'd')) &&
      returningDate &&
      day.isBefore(returningDate, 'd')
    );
  };

  _isToday = (day: Dayjs) => day.isSame(dayjs(), 'd');

  _isSelectable = (day: Dayjs) => {
    const { earliestBookableDate, lastBookableDate } = this.props;

    return (
      earliestBookableDate &&
      lastBookableDate &&
      !day.isBefore(earliestBookableDate, 'd') &&
      !day.isAfter(lastBookableDate, 'd')
    );
  };

  _days = (currentDate: Dayjs) => {
    const days = [];
    const date = dayjs(currentDate).startOf('month');
    const diff = date.weekday();

    let day, i;

    for (i = 0; i < diff; i++) {
      days.push(this._createDay({ isVisible: false }));
    }

    const numberOfDays = date.daysInMonth();

    for (i = 1; i <= numberOfDays; i++) {
      day = dayjs([date.year(), date.month(), i]);
      days.push({
        displayValue: i.toString(),
        date: day.format(),
        isFirstDayOfSelection: this._isFirstDayOfSelection(day),
        isPartOfSelectedRange: this._isPartOfSelectedRange(day),
        isLastDayOfSelection: this._isLastDayOfSelection(day),
        isToday: this._isToday(day),
        isSelectable: this._isSelectable(day),
        isVisible: true
      });
    }

    i = 1;
    while (days.length % 7 !== 0) {
      days.push(this._createDay({ isVisible: false }));
      i++;
    }

    return days;
  };

  _renderDays = (date: Dayjs) => {
    const { type } = this.props;
    const weekRows = [];
    let weekDays = [];
    const days = this._days(date);

    _.forEach(days, (dayObject, index: number) => {
      weekDays.push(dayObject);
      const dayOfWeek = index + 1;
      const isTheLastDayOfTheWeek = dayOfWeek % 7 === 0;

      if (isTheLastDayOfTheWeek) {
        weekRows.push(weekDays);
        weekDays = [];
      }
    });

    return _.map(weekRows, (daysInWeek, index: number) => (
      <div className="date-row" key={index}>
        {_.map(daysInWeek, (weekDay, idx: number) => (
          <Day className="date-cell" {...weekDay} onClick={this.props.onClick} key={idx} type={type} />
        ))}
      </div>
    ));
  };

  render() {
    return (
      <div id={this.props.id} className="date-table">
        <div className="current-month-header">{this.props.date.format('MMMM YYYY')}</div>
        <div className="background-month-title">{this.props.date.format('MMM')}</div>
        <div className="date-grid">
          <div className="date-row date-header">
            {_.map(this._daysOfWeek(), (day, index: number) => (
              <div className="date-cell" key={`weekday-${index}`}>
                {day}
              </div>
            ))}
          </div>
          {this._renderDays(this.props.date)}
        </div>
      </div>
    );
  }
}

export default Month;
