// @flow

import React from 'react';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import AirportSelectorField from 'src/shared/form/fields/airportSelectorField';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import { flightStatusSearchFormValidator } from 'src/shared/form/formValidators/flightStatusSearchFormValidator';
import {
  yesterday,
  today,
  tomorrow,
  formatDayjsToYYYYMMDD,
  formatDayjsToMonthDay
} from 'src/shared/helpers/dateHelper';
import type { AirportType } from 'src/shared/flow-typed/shared.types';

const formName = 'flight-status-search';

type Props = {
  formId: string,
  onSubmit: (*) => void,
  allAirports: Array<AirportType>,
  recentlySearched: Array<AirportType>,
  updateSelectedAirportInfoFn: (airportInfo: *) => void,
  isWebView?: boolean
};

class FlightStatusSearchForm extends React.Component<Props> {
  static _getDateOptions(searchDates: *) {
    return [
      {
        label: `Yesterday, ${searchDates.yesterdayDisplayFormat}`,
        value: searchDates.yesterdayValueFormat
      },
      {
        label: `Today, ${searchDates.todayDisplayFormat}`,
        value: searchDates.todayValueFormat
      },
      {
        label: `Tomorrow, ${searchDates.tomorrowDisplayFormat}`,
        value: searchDates.tomorrowValueFormat
      }
    ];
  }

  render() {
    const searchDates = getSearchDates();
    const { formId, isWebView, allAirports, recentlySearched, updateSelectedAirportInfoFn } = this.props;

    return (
      <div className="search-flights">
        <Form
          name={formName}
          formId={formId}
          data-qa="flight-status-search"
          className="search-flights--form"
          onSubmit={this.props.onSubmit}
          isWidget
        >
          <AirportSelectorField
            name="originAirport"
            modalId="originAirport"
            placeholder="From"
            description="Select Airport"
            iconType="pin"
            clickableClassName="flight-status--clickable"
            containerClassName="search-flights--form-input"
            dataForE2E="fromAirport"
            allAirports={allAirports}
            recentlySearched={recentlySearched}
            updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
            usingNativeStyle
            isWebView={isWebView}
          />

          <AirportSelectorField
            allAirports={allAirports}
            clickableClassName="flight-status--clickable"
            containerClassName="search-flights--form-input"
            dataForE2E="toAirport"
            description="Select Airport"
            iconType="pin"
            isWebView={isWebView}
            modalId="destinationAirport"
            name="destinationAirport"
            placeholder="To"
            recentlySearched={recentlySearched}
            updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
            usingNativeStyle
          />

          <FormInputField
            containerClassName="search-flights--form-input"
            data-qa="flightNumber"
            iconType="airplane-depart"
            name="flightNumber"
            pattern="[0-9]*"
            placeholder="Flight # (optional)"
            type="tel"
            usingNativeStyle
            {...getMaskProps({ rule: '9', repeat: 4 })}
          />

          <FormSelectField
            containerClassName="search-flights--form-input"
            defaultSelected
            iconType="calender"
            name="selectedDate"
            options={FlightStatusSearchForm._getDateOptions(searchDates)}
            usingNativeStyle
          />

          <Segment>
            <Button ref="submitButton" size="larger" color="yellow" fluid type="submit" role="submit">
              Search
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

const getSearchDates = () => {
  const todayDayjs = today();
  const yesterdayDayjs = yesterday();
  const tomorrowDayjs = tomorrow();

  return {
    yesterdayDisplayFormat: formatDayjsToMonthDay(yesterdayDayjs),
    todayDisplayFormat: formatDayjsToMonthDay(todayDayjs),
    tomorrowDisplayFormat: formatDayjsToMonthDay(tomorrowDayjs),
    yesterdayValueFormat: formatDayjsToYYYYMMDD(yesterdayDayjs),
    todayValueFormat: formatDayjsToYYYYMMDD(todayDayjs),
    tomorrowValueFormat: formatDayjsToYYYYMMDD(tomorrowDayjs)
  };
};

export default withForm({
  autoClearFormData: false,
  formValidator: flightStatusSearchFormValidator,
  defaultValues: () => ({
    destinationAirport: '',
    originAirport: '',
    flightNumber: '',
    selectedDate: getSearchDates().todayValueFormat
  })
})(FlightStatusSearchForm);
