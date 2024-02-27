// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import Calendar from 'src/shared/components/calendar/calendar';
import { BOTH, DEPART, RETURN } from 'src/shared/components/calendar/constants/calendarType';
import ClickableDiv from 'src/shared/components/clickableDiv';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  showFullScreenModal,
  hideFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import Icon from 'src/shared/components/icon';
import withField from 'src/shared/form/enhancers/withField';
import { getDayjsDateFromString } from 'src/shared/helpers/dateHelper';
import type { ReaccomCoTerminalDatesType } from 'src/airChange/flow-typed/airChange.types';
import type { DateRangeType, SelectedDatesType } from 'src/shared/components/calendar/constants/calendarType';

const AIR_BOOKING_CALENDAR_MODAL_ID = 'airBookingCalendar';

type DepartureAndReturnDate = {
  departureDate: string,
  returnDate?: string,
  isDateChanged?: boolean
};

type Props = {
  calendarScheduleMessage: string,
  departureDateDisabled?: boolean,
  earliestBookableDate?: Dayjs,
  isInvalidDepartureDate?: boolean,
  isInvalidReturnDate?: boolean,
  isReaccomCoTerminalEligible?: boolean,
  isRoundTrip?: boolean,
  lastBookableDate: Dayjs,
  MWEB_HOMEPAGE_REDESIGN?: boolean,
  onChange: (*) => void,
  reaccomCoTerminalDates: ReaccomCoTerminalDatesType,
  returnDateDisabled?: boolean,
  type: DateRangeType,
  usingNativeStyle?: boolean,
  value: DepartureAndReturnDate
};

export class FormCalendarField extends React.Component<Props, *> {
  static defaultProps = {
    departureDateDisabled: false,
    returnDateDisabled: false,
    isRoundTrip: true,
    lastBookableDate: dayjs().add(6, 'months')
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isReaccomDepartureDateClicked: false,
      isReaccomReturnDateClicked: false,
      shouldSelectNewReaccomDepartureDate: false,
      shouldSelectNewReaccomReturnDate: false
    };
  }

  componentDidMount() {
    const { isInvalidDepartureDate, isInvalidReturnDate, isReaccomCoTerminalEligible, isRoundTrip } = this.props;

    if (isReaccomCoTerminalEligible && isRoundTrip) {
      if (isInvalidDepartureDate) {
        this.setState({ shouldSelectNewReaccomDepartureDate: true });
      } else if (isInvalidReturnDate) {
        this.setState({ shouldSelectNewReaccomReturnDate: true });
      }
    }
  }

  _onOpenCalender = () => {
    showFullScreenModal(AIR_BOOKING_CALENDAR_MODAL_ID);
  };

  _onSelection = (selectedDates: SelectedDatesType) => {
    const { isReaccomCoTerminalEligible, isRoundTrip } = this.props;
    const {
      isReaccomDepartureDateClicked,
      isReaccomReturnDateClicked,
      shouldSelectNewReaccomDepartureDate,
      shouldSelectNewReaccomReturnDate
    } = this.state;
    const departureDate = selectedDates.newOutboundDate ? selectedDates.newOutboundDate.format('YYYY-MM-DD') : '';
    const returnDate = selectedDates.newInboundDate ? selectedDates.newInboundDate.format('YYYY-MM-DD') : '';

    const departureAndReturnDate = {
      departureDate,
      isDateChanged: true,
      isInvalidDepartureDate: false,
      isInvalidReturnDate: false,
      returnDate
    };

    if (this.props.departureDateDisabled || this.state.isReaccomReturnDateClicked) {
      departureAndReturnDate.returnDate = departureDate;
      departureAndReturnDate.departureDate = this.props.value.departureDate;
    } else if (this.props.returnDateDisabled || this.state.isReaccomDepartureDateClicked) {
      departureAndReturnDate.returnDate = this.props.value.returnDate;
    }

    if (isReaccomCoTerminalEligible && isRoundTrip) {
      const setShouldSelectNewReaccomDatesStateToFalse = () => {
        this.setState({
          ...this.state,
          shouldSelectNewReaccomDepartureDate: false,
          shouldSelectNewReaccomReturnDate: false
        });
      };
      const setShouldSelectNewReaccomDatesStateTo = (value) => {
        this.setState({
          ...this.state,
          shouldSelectNewReaccomDepartureDate: value,
          shouldSelectNewReaccomReturnDate: !value
        });
      };

      if (isReaccomDepartureDateClicked) {
        const isDepartureAfterReturnDate = dayjs(selectedDates.newOutboundDate).isAfter(
          dayjs(this.props.value.returnDate)
        );

        if (isDepartureAfterReturnDate) {
          setShouldSelectNewReaccomDatesStateTo(false);
          departureAndReturnDate.isInvalidReturnDate = true;
        } else if (shouldSelectNewReaccomReturnDate || shouldSelectNewReaccomDepartureDate) {
          setShouldSelectNewReaccomDatesStateToFalse();
        }
      } else if (isReaccomReturnDateClicked) {
        const isReturnBeforeDepartureDate = dayjs(selectedDates.newOutboundDate).isBefore(
          dayjs(this.props.value.departureDate)
        );

        if (isReturnBeforeDepartureDate) {
          setShouldSelectNewReaccomDatesStateTo(true);
          departureAndReturnDate.isInvalidDepartureDate = true;
        } else if (shouldSelectNewReaccomReturnDate || shouldSelectNewReaccomDepartureDate) {
          setShouldSelectNewReaccomDatesStateToFalse();
        }
      }
    }

    this.props.onChange(departureAndReturnDate);

    hideFullScreenModal(AIR_BOOKING_CALENDAR_MODAL_ID);
  };

  _onCancel = (): void => {
    hideFullScreenModal(AIR_BOOKING_CALENDAR_MODAL_ID);
  };

  _getDisplayContent = (departureDate: string, returnDate?: string) => {
    const { departureDateDisabled, returnDateDisabled } = this.props;
    const formattedDepartureDate = dayjs(departureDate).format('M/DD/YY');
    const formattedReturnDate = returnDate ? dayjs(returnDate).format('M/DD/YY') : '';

    const dashString = returnDate ? ' - ' : '';

    if (departureDateDisabled) {
      return (
        <div>
          <span data-qa="disabled-date" className="gray4">
            {formattedDepartureDate}
          </span>
          <span className="gray4">{dashString}</span>
          <span>{formattedReturnDate}</span>
        </div>
      );
    } else if (returnDateDisabled) {
      return (
        <div>
          <span>{formattedDepartureDate}</span>
          <span className="gray4">{dashString}</span>
          <span data-qa="disabled-date" className="gray4">
            {formattedReturnDate}
          </span>
        </div>
      );
    } else {
      return formattedReturnDate ? `${formattedDepartureDate} - ${formattedReturnDate}` : formattedDepartureDate;
    }
  };

  _renderDisplayContent = ({ departureDate, returnDate }: { departureDate: string, returnDate?: string }) => (
    <ClickableDiv
      onClick={this._onOpenCalender}
      iconType="calender"
      childClassName="ellipsis py3 bold"
      dataQa="depart-and-return-dates"
    >
      {this._getDisplayContent(departureDate, returnDate)}
    </ClickableDiv>
  );

  _renderDateDescription = (isDateChanged?: boolean, date?: string, message?: string, isDeparture?: boolean) => {
    const { isReaccomCoTerminalEligible, MWEB_HOMEPAGE_REDESIGN } = this.props;
    const { shouldSelectNewReaccomDepartureDate, shouldSelectNewReaccomReturnDate } = this.state;

    if (
      (isDateChanged || isReaccomCoTerminalEligible) &&
      !MWEB_HOMEPAGE_REDESIGN &&
      ((!isDeparture && !shouldSelectNewReaccomReturnDate) || (isDeparture && !shouldSelectNewReaccomDepartureDate))
    ) {
      return (
        <div className={cx('form-calendar-field--date-description', { medium: isReaccomCoTerminalEligible })}>
          <span className="italic">{dayjs(date).format('ddd')}</span>
          <span>{`, ${dayjs(date).format('MMM DD, YYYY')}`}</span>
        </div>
      );
    }

    return !MWEB_HOMEPAGE_REDESIGN && <div className="form-calendar-field--description">{message}</div>;
  };

  _onReaccomDateClick = (reaccomDateClickedState: {
    isReaccomDepartureDateClicked: boolean,
    isReaccomReturnDateClicked: boolean
  }) => {
    this.setState(reaccomDateClickedState);

    this._onOpenCalender();
  };

  _renderDisplayContentWithNativeStyle = ({
    departureDate,
    returnDate,
    isDateChanged
  }: {
    departureDate: string,
    returnDate?: string,
    isDateChanged?: boolean
  }) => {
    const {
      departureDateDisabled,
      isReaccomCoTerminalEligible,
      isRoundTrip,
      MWEB_HOMEPAGE_REDESIGN,
      returnDateDisabled,
      type
    } = this.props;
    const { shouldSelectNewReaccomDepartureDate, shouldSelectNewReaccomReturnDate } = this.state;

    const departureDateDescriptionText = i18n(
      shouldSelectNewReaccomDepartureDate
        ? 'SHARED__CALENDAR__REACCOM_DATE_DESCRIPTION_TEXT'
        : 'SHARED__CALENDAR__DEPARTURE_DATE_DESCRIPTION_TEXT'
    );
    const formattedDepartureDate = shouldSelectNewReaccomDepartureDate
      ? i18n('SHARED__CALENDAR__REACCOM_DEPARTURE_DATE_TEXT')
      : departureDate
        ? dayjs(departureDate).format('M/DD')
        : '';
    const formattedReturnDate = shouldSelectNewReaccomReturnDate
      ? i18n('SHARED__CALENDAR__REACCOM_RETURN_DATE_TEXT')
      : returnDate
        ? dayjs(returnDate).format('M/DD')
        : '';
    const returnDateDescriptionText = i18n(
      shouldSelectNewReaccomReturnDate
        ? 'SHARED__CALENDAR__REACCOM_DATE_DESCRIPTION_TEXT'
        : 'SHARED__CALENDAR__RETURN_DATE_DESCRIPTION_TEXT'
    );

    return (
      <div
        data-qa="depart-and-return-dates"
        className={cx('form-calendar-field', {
          gray4: !isDateChanged && !isReaccomCoTerminalEligible,
          py3: isReaccomCoTerminalEligible
        })}
        onClick={() => !isReaccomCoTerminalEligible && showFullScreenModal(AIR_BOOKING_CALENDAR_MODAL_ID)}
      >
        <div
          className={cx('form-calendar-field--departure-date', {
            'form-calendar-field_disabled': departureDateDisabled
          })}
          onClick={() =>
            isReaccomCoTerminalEligible &&
            !departureDateDisabled &&
            this._onReaccomDateClick({ isReaccomDepartureDateClicked: true, isReaccomReturnDateClicked: false })
          }
        >
          <div
            className={cx('form-calendar-field--date', {
              bold: isDateChanged || MWEB_HOMEPAGE_REDESIGN || isReaccomCoTerminalEligible,
              xxlarge: isReaccomCoTerminalEligible
            })}
          >
            {formattedDepartureDate}
          </div>
          {this._renderDateDescription(isDateChanged, departureDate, departureDateDescriptionText, true)}
        </div>
        <Icon type="calender" className="form-calendar-field--icon" />
        {type === BOTH || (isReaccomCoTerminalEligible && isRoundTrip) ? (
          <div
            className={cx('form-calendar-field--return-date', { 'form-calendar-field_disabled': returnDateDisabled })}
            onClick={() =>
              isReaccomCoTerminalEligible &&
              !returnDateDisabled &&
              this._onReaccomDateClick({ isReaccomDepartureDateClicked: false, isReaccomReturnDateClicked: true })
            }
          >
            <div
              className={cx('form-calendar-field--date', {
                bold: isDateChanged || MWEB_HOMEPAGE_REDESIGN || isReaccomCoTerminalEligible,
                xxlarge: isReaccomCoTerminalEligible,
                green: shouldSelectNewReaccomReturnDate
              })}
            >
              {formattedReturnDate}
            </div>
            {this._renderDateDescription(isDateChanged, returnDate, returnDateDescriptionText, false)}
          </div>
        ) : (
          <div className="form-calendar-field--return-date" onClick={(e) => e.stopPropagation()} />
        )}
      </div>
    );
  };

  render() {
    const {
      calendarScheduleMessage,
      departureDateDisabled,
      earliestBookableDate,
      isInvalidDepartureDate,
      isInvalidReturnDate,
      isReaccomCoTerminalEligible,
      lastBookableDate,
      reaccomCoTerminalDates = {},
      type,
      usingNativeStyle,
      value
    } = this.props;
    const { departureDate, returnDate } = value;
    let initDepartureDate =
      departureDateDisabled || this.state.isReaccomReturnDateClicked
        ? getDayjsDateFromString(returnDate)
        : getDayjsDateFromString(departureDate);
    let reaccomCalenderType;
    let reaccomEarliestBookableDate;
    let reaccomLastBookableDate;

    if (isReaccomCoTerminalEligible) {
      const {
        departureEarliestBookableDate,
        departureLastBookableDate,
        returnEarliestBookableDate,
        returnLastBookableDate
      } = reaccomCoTerminalDates;

      reaccomCalenderType = this.state.isReaccomDepartureDateClicked
        ? DEPART
        : this.state.isReaccomReturnDateClicked
          ? RETURN
          : undefined;
      reaccomEarliestBookableDate = this.state.isReaccomDepartureDateClicked
        ? departureEarliestBookableDate
        : this.state.isReaccomReturnDateClicked
          ? returnEarliestBookableDate
          : undefined;
      reaccomLastBookableDate = this.state.isReaccomDepartureDateClicked
        ? departureLastBookableDate
        : this.state.isReaccomReturnDateClicked
          ? returnLastBookableDate
          : undefined;

      if (
        (this.state.isReaccomReturnDateClicked && isInvalidReturnDate) ||
        (this.state.isReaccomDepartureDateClicked && isInvalidDepartureDate)
      ) {
        initDepartureDate = undefined;
      }
    }

    return (
      <div>
        {usingNativeStyle ? this._renderDisplayContentWithNativeStyle(value) : this._renderDisplayContent(value)}
        <FullScreenModal id={AIR_BOOKING_CALENDAR_MODAL_ID}>
          <Calendar
            calendarScheduleMessage={calendarScheduleMessage}
            initDepartureDate={initDepartureDate}
            initReturningDate={getDayjsDateFromString(returnDate)}
            maxReservationDate={reaccomLastBookableDate || lastBookableDate}
            minReservationDate={reaccomEarliestBookableDate || earliestBookableDate}
            onCancel={this._onCancel}
            onSelectionComplete={this._onSelection}
            type={reaccomCalenderType || type}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withField()(FormCalendarField);
