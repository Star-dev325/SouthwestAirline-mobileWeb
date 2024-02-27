// @flow
import React from 'react';
import cx from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import Month from 'src/shared/components/calendar/month';
import CalendarDateRow from 'src/shared/components/calendar/calendarDateRow';
import CalendarTitle from 'src/shared/components/calendar/constants/calendarTitle';
import i18n from '@swa-ui/locale';
import { BOTH } from 'src/shared/components/calendar/constants/calendarType';

import type { DateRangeType, SelectedDatesType } from 'src/shared/components/calendar/constants/calendarType';

const { CALENDAR, SELECT_DATES } = CalendarTitle;

type Props = {
  type: DateRangeType,
  maxReservationDate: Dayjs,
  minReservationDate: ?Dayjs,
  initDepartureDate: ?Dayjs,
  initReturningDate: ?Dayjs,
  onSelectionComplete: (SelectedDatesType) => void,
  onCancel: (void) => void,
  isCarBooking?: boolean,
  isWebView?: boolean,
  title?: string,
  calendarScheduleMessage?: string
};

type State = {
  isMultiSelectionEnabled: boolean,
  departureDate: ?Dayjs,
  returningDate: ?Dayjs,
  initDepartureDate: ?Dayjs,
  initReturningDate: ?Dayjs,
  doneSelect: boolean
};

class Calendar extends React.Component<Props, State> {
  static defaultProps = {
    minReservationDate: dayjs()
  };

  constructor(props: Props) {
    super(props);

    const isMultiSelectionEnabled = this.props.type === BOTH;

    this.state = {
      isMultiSelectionEnabled,
      departureDate: this.props.initDepartureDate,
      returningDate: isMultiSelectionEnabled ? this.props.initReturningDate : null,
      initDepartureDate: this.props.initDepartureDate,
      initReturningDate: this.props.initReturningDate,
      doneSelect: !isMultiSelectionEnabled
        ? !!this.props.initDepartureDate
        : !!this.props.initDepartureDate && !!this.props.initReturningDate
    };
  }

  componentDidMount() {
    const { initDepartureDate } = this.props;

    if (initDepartureDate) {
      const monthId = initDepartureDate.month();
      const elementToScrollTo = document.getElementById(`${monthId}`);
      const isNotCurrentMonth = dayjs().month() !== monthId;

      if (elementToScrollTo && isNotCurrentMonth) {
        elementToScrollTo.scrollIntoView && elementToScrollTo.scrollIntoView(true);
      }
    }
  }

  _renderMonths = () => {
    const monthDiv = [];

    const minDate = this.props.minReservationDate;
    const maxDate = this.props.maxReservationDate;

    let month = dayjs(minDate);

    while (month.isBefore(maxDate, 'months') || month.isSame(maxDate, 'months')) {
      monthDiv.push(
        <Month
          id={`${month.month()}`}
          date={month}
          type={this.props.type}
          isMultiSelectionEnabled={this.state.isMultiSelectionEnabled}
          lastBookableDate={this.props.maxReservationDate}
          earliestBookableDate={this.props.minReservationDate}
          key={`${month.year()}${month.month()}`}
          departureDate={this.state.departureDate}
          returningDate={this.state.returningDate}
          onClick={this._onDayClicked}
        />
      );
      month = dayjs(month).add(1, 'months');
    }

    return monthDiv;
  };

  _onDayClicked = (day: Dayjs) => {
    if (!this.state.departureDate || this.state.doneSelect) {
      this._setDepartureDay(day);
    } else {
      if (day.isBefore(this.state.departureDate)) {
        this._setDepartureDay(day);
      } else {
        this.setState({ returningDate: day, doneSelect: true });
      }
    }
  };

  _setDepartureDay = (day: Dayjs) => {
    this.setState({
      departureDate: day,
      doneSelect: !this.state.isMultiSelectionEnabled,
      returningDate: null
    });
  };

  _onReset = () => {
    this.setState({
      departureDate: null,
      returningDate: null,
      doneSelect: false
    });
  };

  _onDoneSelect = () => {
    if (!this.state.doneSelect) {
      this.props.onCancel();
    } else {
      this.props.onSelectionComplete({
        newOutboundDate: this.state.departureDate,
        newInboundDate: this.state.returningDate
      });
    }
  };

  _conditionallyShowResetLink = () =>
    (this.state.isMultiSelectionEnabled ? (
      <div className="reset-area">
        <div className="reset-area--link" onClick={this._onReset}>
          <span className="link-item reset">{i18n('SHARED__CALENDAR__RESET_THE_DATE')}</span>
        </div>
      </div>
    ) : null);

  render() {
    const { isCarBooking, type, isWebView, title, calendarScheduleMessage } = this.props;

    return (
      <div className="calendar">
        <div className="calendar-menu">
          {this._conditionallyShowResetLink()}

          <div className="calendar-title">{isWebView ? SELECT_DATES : title || CALENDAR}</div>
          <div className="done-area" onClick={this._onDoneSelect}>
            <span ref="done" data-qa="done-btn" className="link-item done">
              {this.state.doneSelect ? 'Done' : 'Cancel'}
            </span>
          </div>
        </div>

        <div className="calendar-main-content">
          <div className="calendar-header">
            <div className="bdb bdgray3 bgwhite flight-depart-returning-date">
              <CalendarDateRow
                departureDate={this.state.departureDate}
                returningDate={this.state.returningDate}
                calendarType={type}
                isCarBooking={isCarBooking}
              />
            </div>
          </div>

          <div className={cx('calendar-months')}>
            {!isCarBooking && calendarScheduleMessage && (
              <div className="calendar-schedule-message">{calendarScheduleMessage}</div>
            )}
            {this._renderMonths()}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
