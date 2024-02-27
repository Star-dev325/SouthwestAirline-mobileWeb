// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import CorporateBookingSelection from 'src/airBooking/components/corporateBookingSelection';
import Button from 'src/shared/components/button';
import { BOTH, DEPART } from 'src/shared/components/calendar/constants/calendarType';
import Fields from 'src/shared/components/fields';
import Icon from 'src/shared/components/icon';
import Segment from 'src/shared/components/segment';
import Segments from 'src/shared/components/segments';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import TripTypes from 'src/shared/constants/tripTypes';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import AirportSelectorField from 'src/shared/form/fields/airportSelectorField';
import FormCalendarField from 'src/shared/form/fields/formCalendarField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import FormInputField from 'src/shared/form/fields/formInputField';
import MoneyOrPointsSwitchButtonField from 'src/shared/form/fields/moneyOrPointsSwitchButtonField';
import PassengerAmountField from 'src/shared/form/fields/passengerAmountField';
import TabBarField from 'src/shared/form/fields/tabBarField';
import shoppingSearchFormValidator from 'src/shared/form/formValidators/airBookingShoppingSearchFormValidator';

import type {
  AirBookingShoppingSearchFormDataType,
  CorporateBookingSwitchInfo, FlightProductSearchRequest, PassengerCountValue
} from 'src/airBooking/flow-typed/airBooking.types';
import type { AirportType, MultiSelectGroup } from 'src/shared/flow-typed/shared.types';

const { ONE_WAY, ROUND_TRIP } = TripTypes;
const MAX_PASSENGER_COUNT = 8;
const MIN_PASSENGER_COUNT = 1;

type Props = {
  allAirports: Array<AirportType>,
  analyticsTrackViewTabFn: (string) => void,
  calendarScheduleMessage: string,
  corporateBookingSwitchInfo: ?CorporateBookingSwitchInfo,
  formData: AirBookingShoppingSearchFormDataType,
  formId: string,
  isLoggedIn: boolean,
  isMultiSelectGroupEnabled: boolean,
  isWebView: boolean,
  lastBookableDate: string,
  multiSelectGroup: MultiSelectGroup,
  MWEB_HOMEPAGE_REDESIGN: boolean,
  onDestinationSelectorClicked?: () => void,
  onSelectPassengerClicked: () => void,
  onSubmit: (*) => void,
  passengerCountValue: PassengerCountValue,
  recentlySearched: Array<AirportType>,
  searchRequest: FlightProductSearchRequest,
  updateFormDataValueFn: (string, *) => {},
  updateFormFieldFn: (string, string, *) => void,
  updateSelectedAirportInfoFn: (airportInfo: *) => void
};

export class AirBookingShoppingSearchForm extends React.Component<Props> {
  UNSAFE_componentWillUpdate(props: Props) {
    const {
      formData: { promoCode, useLowFareCalendar },
      updateFormFieldFn,
      formId
    } = props;

    if (useLowFareCalendar && promoCode && promoCode.length >= 1) updateFormFieldFn(formId, 'promoCode', '');
  }

  componentDidMount = () => {
    const { formId, multiSelectGroup, updateFormDataValueFn } = this.props;
    const { isSelected, origin, destination } = multiSelectGroup || {};

    if (isSelected) {
      if (origin) {
        updateFormDataValueFn(formId, {
          ['origin']: origin.join(',')
        });
      }

      if (destination) {
        updateFormDataValueFn(formId, {
          ['destination']: destination.join(',')
        });
      }
    }
  }

  _renderAirportSelectors = () => {
    const {
      allAirports,
      recentlySearched,
      updateSelectedAirportInfoFn,
      onDestinationSelectorClicked,
      MWEB_HOMEPAGE_REDESIGN,
      isMultiSelectGroupEnabled,
      multiSelectGroup
    } = this.props;
    const selectAirportText = MWEB_HOMEPAGE_REDESIGN
      ? i18n('SHARED__AIRPORT_SELECTOR__DESCRIPTION')
      : i18n('AIR_BOOKING__AIRPORT_SELECTOR__DESCRIPTION');

    return (
      <Fields type="grouped" className="search-fields py2">
        <AirportSelectorField
          name="origin"
          modalId="from"
          dataForE2E="from"
          iconType=""
          disabled={false}
          placeholder="From"
          description={selectAirportText}
          fieldClassName="search-fields--left"
          allAirports={allAirports}
          recentlySearched={recentlySearched}
          updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
          usingNativeStyle
          horizontalLayout
          MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
          isMultiSelectGroupEnabled={isMultiSelectGroupEnabled}
          multiSelectGroup={multiSelectGroup}
        />
        <Icon type="airplane" className="airport-icon" />
        <AirportSelectorField
          name="destination"
          modalId="to"
          dataForE2E="to"
          iconType=""
          disabled={false}
          placeholder="To"
          description={selectAirportText}
          fieldClassName="search-fields--right"
          allAirports={allAirports}
          recentlySearched={recentlySearched}
          updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
          usingNativeStyle
          horizontalLayout
          onClick={onDestinationSelectorClicked}
          MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
          isMultiSelectGroupEnabled={isMultiSelectGroupEnabled}
          multiSelectGroup={multiSelectGroup}
        />
      </Fields>
    );
  };

  _onTripTypeChange = (tripType: string) => {
    const {
      formId,
      updateFormFieldFn,
      formData: { departureAndReturnDate }
    } = this.props;
    const { departureDate, returnDate } = departureAndReturnDate;
    const updatedDepartureAndReturnDate =
      tripType === ROUND_TRIP.value
        ? {
          departureDate,
          returnDate: _.isEmpty(returnDate)
            ? dayjs(departureDate, MEDIUM_DATE_FORMAT).add(3, 'day').format(MEDIUM_DATE_FORMAT)
            : returnDate
        }
        : {
          departureDate,
          returnDate: ''
        };

    updateFormFieldFn(
      formId,
      'departureAndReturnDate',
      _.merge({}, departureAndReturnDate, updatedDepartureAndReturnDate)
    );
  };

  _renderCorporateBookingSelection = () => {
    const { corporateBookingSwitchInfo, isLoggedIn, isWebView, formData: { numberOfLapInfants = 0 } = {} } = this.props;
    const hasLapChild = numberOfLapInfants > 0;

    return isLoggedIn && !isWebView ? (
      <Fields className="py4" type="grouped">
        <CorporateBookingSelection corporateBookingSwitchInfo={corporateBookingSwitchInfo} hasLapChild={hasLapChild} />
      </Fields>
    ) : null;
  };

  render() {
    const {
      formId,
      onSubmit,
      lastBookableDate,
      formData: { numberOfAdults, departureAndReturnDate, tripType, useLowFareCalendar },
      analyticsTrackViewTabFn,
      isWebView,
      calendarScheduleMessage,
      MWEB_HOMEPAGE_REDESIGN,
      onSelectPassengerClicked,
      passengerCountValue,
      multiSelectGroup
    } = this.props;

    const calendarType = tripType === ROUND_TRIP.value ? BOTH : DEPART;
    
    const tabs = [
      {
        name: i18n('AIR_BOOKING__SEARCH_FLIGHTS__ROUND_TRIP'),
        value: ROUND_TRIP.value
      },
      {
        name: i18n('AIR_BOOKING__SEARCH_FLIGHTS__ONE_WAY'),
        value: ONE_WAY.value
      }
    ];

    const adultsPlusChildrenCount = passengerCountValue?.adultCount + passengerCountValue?.lapChildCount || 1;
    const disableMinus = numberOfAdults <= MIN_PASSENGER_COUNT;
    const disablePlus = numberOfAdults >= MAX_PASSENGER_COUNT;

    return (
      <Form
        formId={formId}
        name="air-booking-shopping-search"
        className={`book-flight-form ${MWEB_HOMEPAGE_REDESIGN ? 'homepage-redesign' : ''}`}
        onSubmit={onSubmit}
        isWidget
      >
        <TabBarField
          name="tripType"
          tabs={tabs}
          onChange={this._onTripTypeChange}
          analyticsTrackViewTabFn={analyticsTrackViewTabFn}
          MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
        />
        {this._renderAirportSelectors()}
        <Fields type="grouped">
          <FormCalendarField
            name="departureAndReturnDate"
            type={calendarType}
            value={departureAndReturnDate}
            lastBookableDate={dayjs(lastBookableDate)}
            usingNativeStyle
            calendarScheduleMessage={calendarScheduleMessage}
            MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
          />
        </Fields>
        <Fields type="grouped" className={MWEB_HOMEPAGE_REDESIGN ? 'py4 flex' : 'py6'}>
          <PassengerAmountField
            name="numberOfAdults"
            fieldClassName={MWEB_HOMEPAGE_REDESIGN ? 'halfwidth' : ''}
            adultsPlusChildrenCount={adultsPlusChildrenCount}
            paxType={'Passenger'}
            disablePlus={disablePlus}
            disableMinus={disableMinus}
            MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
            onSelectPassengerClicked={onSelectPassengerClicked}
            passengerCountValue={passengerCountValue}
          />
          {MWEB_HOMEPAGE_REDESIGN && (
            <MoneyOrPointsSwitchButtonField
              name="currencyType"
              fieldClassName="show-fares-field"
              MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
            />
          )}
        </Fields>
        {!isWebView && !multiSelectGroup?.isSelected && (
          <Fields type="grouped" className="py4">
            <FormCheckboxField
              name="useLowFareCalendar"
              size="large"
              className="checkbox-button low-fare-calendar--container"
              checkBoxClassName="low-fare-calendar--checkbox"
              childrenClassName="low-fare-calendar--label"
            >
              <p className={`low-fare-calendar-text${useLowFareCalendar ? ' low-fare-calendar-text_selected' : ''}`}>
                {i18n('AIR_BOOKING__LOW_FARE_CALENDAR')}
              </p>
            </FormCheckboxField>
          </Fields>
        )}
        {this._renderCorporateBookingSelection()}
        <Segments>
          <Segment transparent verticalFill>
            <Fields className="book-flight-form--prompt-code">
              <FormInputField
                name="promoCode"
                fieldClassName="promo-code-field"
                className={cx({ 'disabled-field': useLowFareCalendar })}
                size="small"
                placeholder={i18n('AIR_BOOKING__SEARCH_FLIGHTS__PROMO_CODE')}
                fluid
                disabled={useLowFareCalendar}
              />
              {!MWEB_HOMEPAGE_REDESIGN && (
                <MoneyOrPointsSwitchButtonField name="currencyType" fieldClassName="show-fares-field" />
              )}
            </Fields>
          </Segment>
          <Segment transparent>
            <Button size="larger" color="yellow" type="submit" role="submit" fluid>
              {i18n('AIR_BOOKING__SEARCH_FLIGHTS__FIND_FLIGHTS')}
            </Button>
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  defaultValues: ({ searchRequest: { departureDate, returnDate, ...rest }, formData }: Props) => ({
    departureAndReturnDate: {
      departureDate,
      returnDate,
      isDateChanged: rest.origin ? true : _.get(formData, 'departureAndReturnDate.isDateChanged', false)
    },
    ...rest
  }),
  formValidator: shoppingSearchFormValidator
})(AirBookingShoppingSearchForm);
