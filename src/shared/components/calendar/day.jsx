// @flow
import React from 'react';
import cx from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { RETURN } from 'src/shared/components/calendar/constants/calendarType';

import type { DateRangeType } from 'src/shared/components/calendar/constants/calendarType';

type Props = {
  displayValue: ?string,
  date: string,
  isFirstDayOfSelection: ?boolean,
  isLastDayOfSelection: ?boolean,
  isPartOfSelectedRange: ?boolean,
  isToday: ?boolean,
  isSelectable: ?boolean,
  isVisible: ?boolean,
  onClick: (day: Dayjs) => void,
  type: DateRangeType,
  className: ?string
};

class Day extends React.Component<Props> {
  _onClick = () => {
    if (!this.props.isSelectable) return;
    this.props.onClick(dayjs(this.props.date));
  };

  render() {
    const { props } = this;
    const isReturnType = this.props.type === RETURN;

    return (
      <div
        className={cx(props.className, {
          'prev-month': this.props.isVisible,
          'departure-date-bg': this.props.isFirstDayOfSelection && this.props.isPartOfSelectedRange,
          'returning-date-bg': !isReturnType && this.props.isLastDayOfSelection && !this.props.isFirstDayOfSelection,
          'between-date-bg': this.props.isPartOfSelectedRange && !this.props.isFirstDayOfSelection
        })}
        onClick={this._onClick}
      >
        <div
          ref="innerDateCell"
          className={cx({
            'date-cell-inner': true,
            'disabled-date': !this.props.isSelectable,
            today: this.props.isToday,
            'departure-date': !isReturnType && this.props.isFirstDayOfSelection,
            'returning-date': isReturnType ? this.props.isFirstDayOfSelection : this.props.isLastDayOfSelection
          })}
        >
          <span ref="dataNumber" className="data-number">
            {this.props.displayValue}
          </span>
        </div>
      </div>
    );
  }
}

export default Day;
