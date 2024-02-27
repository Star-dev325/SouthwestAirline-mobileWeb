// @flow
import React from 'react';
import CalendarDateStrip from 'src/shared/components/calendar/calendarDateStrip';
import * as CalendarType from 'src/shared/components/calendar/constants/calendarType';
import CalendarConstants from 'src/shared/constants/calendarConstants';
import { Dayjs } from 'dayjs';

const { PICK_UP, RETURN, DEPART } = CalendarConstants;

type Props = {
  departureDate?: ?Dayjs,
  returningDate?: ?Dayjs,
  isCarBooking?: boolean,
  calendarType: string
};

class CalendarDateRow extends React.Component<Props> {
  _getDateStripLabel = (isReturn: boolean) => {
    if (isReturn) {
      return RETURN;
    } else {
      if (this.props.isCarBooking) {
        return PICK_UP;
      } else {
        return this.props.calendarType === CalendarType.RETURN ? RETURN : DEPART;
      }
    }
  };

  render() {
    const { departureDate, returningDate, isCarBooking, calendarType } = this.props;
    const isOnlyReturn = calendarType === CalendarType.RETURN;

    return (
      <div className="flex">
        <CalendarDateStrip
          className="flex6"
          label={this._getDateStripLabel(false)}
          date={departureDate}
          isReturnDate={isOnlyReturn}
          isCarBooking={isCarBooking}
        />
        {calendarType === CalendarType.BOTH && (
          <CalendarDateStrip
            className="flex6"
            label={this._getDateStripLabel(true)}
            date={returningDate}
            isReturnDate
            isCarBooking={isCarBooking}
            shouldDisplayDatePlaceholder={!departureDate}
          />
        )}
      </div>
    );
  }
}

export default CalendarDateRow;
