// @flow
import i18n from '@swa-ui/locale';
import { Dayjs } from 'dayjs';
import React from 'react';
import AirChangeShoppingSearchARNKLayout from 'src/airChange/components/airChangeShoppingSearchARNKLayout';
import Button from 'src/shared/components/button';
import { BOTH, DEPART, RETURN } from 'src/shared/components/calendar/constants/calendarType';
import Fields from 'src/shared/components/fields';
import Segment from 'src/shared/components/segment';
import TripTypes from 'src/shared/constants/tripTypes';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import AirportSelectorField from 'src/shared/form/fields/airportSelectorField';
import FormCalendarField from 'src/shared/form/fields/formCalendarField';
import airChangeShoppingSearchFormValidator from 'src/shared/form/formValidators/airChangeShoppingSearchFormValidator';
import type { SearchOptionsType, SelectedBounds, FormDataType } from 'src/airChange/flow-typed/airChange.types';
import type { AirportType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  allAirports: Array<AirportType>,
  allowARNKPnrs: boolean,
  earliestBookableDate?: Dayjs,
  formData: FormDataType,
  formId: string,
  hasUnaccompaniedMinor: boolean,
  isReaccomCoTerminalEligible: boolean,
  isRoundTrip: boolean,
  lastBookableDate: Dayjs,
  onSubmit: (formData: FormData) => void,
  recentlySearched: Array<AirportType>,
  searchOptions: SearchOptionsType,
  selectedBounds: SelectedBounds,
  updateSelectedAirportInfoFn: (airportInfo: *) => void
};

const getCalendarType = (searchOptions) => {
  if (searchOptions.tripType === TripTypes.ONE_WAY.value) {
    if (searchOptions.departureBoundDisabled && !searchOptions.returnBoundDisabled) {
      return RETURN;
    } else {
      return DEPART;
    }
  } else {
    return BOTH;
  }
};

export const AirChangeShoppingSearchForm = (props: Props) => {
  const {
    allAirports,
    allowARNKPnrs,
    earliestBookableDate,
    formData,
    formId,
    hasUnaccompaniedMinor,
    isReaccomCoTerminalEligible,
    isRoundTrip,
    lastBookableDate,
    onSubmit,
    recentlySearched,
    searchOptions,
    searchOptions: { reaccomCoTerminalDates, reaccomCoTerminalDepartureAirports, reaccomCoTerminalReturnAirports },
    selectedBounds: { firstbound, secondbound },
    updateSelectedAirportInfoFn
  } = props;
  const areBothBoundsSelected = firstbound && secondbound;
  const { isInvalidDepartureDate, isInvalidReturnDate } = formData?.departureAndReturnDate ?? {};
  const isDepartureBoundAirportSelectorFieldDisabled = hasUnaccompaniedMinor || searchOptions.departureBoundDisabled || (isReaccomCoTerminalEligible && !reaccomCoTerminalDepartureAirports);
  const isReturnBoundAirportSelectorFieldDisabled = hasUnaccompaniedMinor || searchOptions.returnBoundDisabled || (isReaccomCoTerminalEligible && !reaccomCoTerminalReturnAirports);
  const reaccomCoTerminalEligibleProps = isReaccomCoTerminalEligible
    ? {
      isInvalidDepartureDate,
      isInvalidReturnDate,
      isReaccomCoTerminalEligible: true,
      isRoundTrip,
      reaccomCoTerminalDates,
      usingNativeStyle: true
    }
    : {};

  return (
    <Form formId={formId} name="air-change-flight-search" className="book-flight-form" onSubmit={onSubmit} isWidget>
      {allowARNKPnrs && areBothBoundsSelected ? (
        <AirChangeShoppingSearchARNKLayout />
      ) : (
        <>
          <Fields type="grouped">
            <AirportSelectorField
              allAirports={reaccomCoTerminalDepartureAirports || allAirports}
              dataForE2E="from"
              disabled={isDepartureBoundAirportSelectorFieldDisabled}
              iconType="airplane-depart"
              isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
              modalId="from"
              name="from"
              placeholder="From"
              recentlySearched={isReaccomCoTerminalEligible ? [] : recentlySearched}
              updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
            />
          </Fields>
          <Fields type="grouped">
            <AirportSelectorField
              allAirports={reaccomCoTerminalReturnAirports || allAirports}
              dataForE2E="to"
              disabled={isReturnBoundAirportSelectorFieldDisabled}
              iconType="airplane-return"
              isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
              modalId="to"
              name="to"
              placeholder="To"
              recentlySearched={isReaccomCoTerminalEligible ? [] : recentlySearched}
              updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
            />
          </Fields>
          <Fields type="grouped">
            <FormCalendarField
              departureDateDisabled={searchOptions.departureBoundDisabled}
              earliestBookableDate={earliestBookableDate}
              lastBookableDate={lastBookableDate}
              name="departureAndReturnDate"
              returnDateDisabled={searchOptions.returnBoundDisabled}
              type={getCalendarType(searchOptions)}
              {...reaccomCoTerminalEligibleProps}
            />
          </Fields>
          <Segment transparent>
            <Button size="larger" color="yellow" type="submit" role="submit" fluid>
              {i18n('AIR_CHANGE__SHOPPING_SEARCH_PAGE__FIND_FLIGHTS_BUTTON')}
            </Button>
          </Segment>
        </>
      )}
    </Form>
  );
};

export default withForm({
  autoClearFormData: false,
  formValidator: airChangeShoppingSearchFormValidator
})(AirChangeShoppingSearchForm);
