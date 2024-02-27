// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import CalendarTitle from 'src/shared/components/calendar/constants/calendarTitle';
import { Dayjs } from 'dayjs';

const { SELECT_DATE } = CalendarTitle;

type Props = {
  className: string,
  label: string,
  date: ?Dayjs,
  isCarBooking?: boolean,
  isReturnDate?: boolean,
  isMultiSelectionEnabled?: boolean,
  shouldDisplayDatePlaceholder?: boolean
};

class CalendarDateStrip extends React.Component<Props> {
  _renderCalendarIcon = (isCarBooking: ?boolean, isDepartIcon: boolean) => {
    const className = isCarBooking ? 'calender--car-icon' : 'calender--flight-icon';
    const iconType = isCarBooking ? 'car' : isDepartIcon ? 'airplane-depart' : 'airplane-return';

    return (
      <div className={className}>
        <Icon className={cx('white circle bggray3 p3 xlarge')} type={iconType} title={iconType} />
      </div>
    );
  };

  _getDateOrSelectDate = (date: ?Dayjs) => (date ? date.format('M/DD/YY') : SELECT_DATE);

  render() {
    const { isReturnDate, date, label, shouldDisplayDatePlaceholder } = this.props;
    const containerClass = isReturnDate ? ['bdl', 'bdgray3'] : '';
    const haveDateValue = !!date;
    const selectedClass = haveDateValue
      ? {
        'calendar--flight-return_selected': isReturnDate,
        'calendar--flight-departure_selected': !isReturnDate
      }
      : null;

    const colorClassByType = haveDateValue
      ? {
        green: isReturnDate,
        pdkblue: !isReturnDate
      }
      : null;

    const getDateOrSelectDate =
      isReturnDate && shouldDisplayDatePlaceholder ? (
        <span className="gray3">- / - / -</span>
      ) : (
        this._getDateOrSelectDate(date)
      );

    return (
      <div className={cx('flex gray3 p4', containerClass, selectedClass, colorClassByType, this.props.className)}>
        {this._renderCalendarIcon(this.props.isCarBooking, !isReturnDate)}
        <LabelContainer labelText={label}>
          <span
            className={cx('xlarge nowrap', {
              'depart-flight-day': !isReturnDate,
              'return-flight-day': isReturnDate,
              bold: !_.isEmpty(date)
            })}
          >
            {getDateOrSelectDate}
          </span>
        </LabelContainer>
      </div>
    );
  }
}

export default CalendarDateStrip;
