// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import Calendar from 'src/shared/components/calendar/calendar';

import { getLowFareCalendar } from 'src/airBooking/actions/airBookingActions';
import { getDayjsDateFromString, today } from 'src/shared/helpers/dateHelper';
import { BOTH, DEPART } from 'src/shared/components/calendar/constants/calendarType';

import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import type { SelectedDatesType } from 'src/shared/components/calendar/constants/calendarType';

type Props = {
  goBack: () => void,
  searchRequest: FlightProductSearchRequest,
  lowFareCalendarSelectedDates?: { inboundDate?: string, outboundDate?: string },
  getLowFareCalendarFn: (
    searchRequest: FlightProductSearchRequest,
    path: ?string,
    isInitialSearch: boolean
  ) => Promise<*>,
  lastBookableDate?: string
};

export const LowFareCalendarDateSelectPage = (props: Props) => {
  const _getCalendarType = () => {
    const {
      searchRequest: { departureDate, returnDate }
    } = props;

    if (departureDate && returnDate) {
      return BOTH;
    } else {
      return DEPART;
    }
  };

  const { goBack, searchRequest, getLowFareCalendarFn, lowFareCalendarSelectedDates, lastBookableDate } = props;

  const _onSelectionComplete = (selectedDates: SelectedDatesType) => {
    const previouslySelectedDeparture = _.get(
      lowFareCalendarSelectedDates,
      'outboundDate',
      searchRequest.departureDate
    );
    const previouslySelectedReturn = _.get(lowFareCalendarSelectedDates, 'inboundDate', searchRequest.returnDate);
    const departureDate = selectedDates.newOutboundDate
      ? selectedDates.newOutboundDate.format('YYYY-MM-DD')
      : previouslySelectedDeparture;
    const returnDate = selectedDates.newInboundDate
      ? selectedDates.newInboundDate.format('YYYY-MM-DD')
      : previouslySelectedReturn;
    const newSearchRequest = _.merge({}, searchRequest, {
      departureDate,
      returnDate
    });

    getLowFareCalendarFn(newSearchRequest, undefined, false).then(() => goBack());
  };

  const selectedOutboundDate = _.get(lowFareCalendarSelectedDates, 'outboundDate');
  const selectedInboundDate = _.get(lowFareCalendarSelectedDates, 'inboundDate');

  return (
    <div className="low-fare-calendar-date-select-page">
      <Calendar
        type={_getCalendarType()}
        initDepartureDate={selectedOutboundDate ? getDayjsDateFromString(selectedOutboundDate) : null}
        initReturningDate={
          selectedInboundDate && selectedOutboundDate ? getDayjsDateFromString(selectedInboundDate) : null
        }
        maxReservationDate={getDayjsDateFromString(lastBookableDate)}
        minReservationDate={today()}
        onSelectionComplete={_onSelectionComplete}
        onCancel={() => goBack()}
        title="Select Dates"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  lastBookableDate: _.get(state, 'app.lastBookableDate'),
  lowFareCalendarSelectedDates: _.get(state, 'app.airBooking.lowFareCalendar.selectedDates'),
  searchRequest: _.get(state, 'app.airBooking.searchRequest')
});

const mapDispatchToProps = {
  getLowFareCalendarFn: getLowFareCalendar
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(LowFareCalendarDateSelectPage);
