// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import { Dayjs } from 'dayjs';
import _ from 'lodash';
import React from 'react';
import {
  CAR_BOOKING_DATE_FORMAT,
  CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT
} from 'src/carBooking/constants/carBookingConstants';
import {
  transformSelectedSearchRequestToDiscountValue,
  transformVendorsIdsToVendorNameList
} from 'src/carBooking/transformers/promoCodesFormTransformer';
import Button from 'src/shared/components/button';
import Field from 'src/shared/components/field';
import Fields from 'src/shared/components/fields';
import Icon from 'src/shared/components/icon';
import Segment from 'src/shared/components/segment';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import CarBookingCitySelectorField from 'src/shared/form/fields/carBookingCitySelectorField';
import CarBookingCompanySelectorField from 'src/shared/form/fields/carBookingCompanySelectorField';
import CarBookingDateSelectorField from 'src/shared/form/fields/carBookingDateSelectorField';
import CarBookingPromoCodeSelectorField from 'src/shared/form/fields/carBookingPromoCodeSelectorField';
import CarBookingTimeSelector from 'src/shared/form/fields/carBookingTimeSelector';
import CarBookingVehicleSelector from 'src/shared/form/fields/carBookingVehicleSelector';
import carBookingSearchFormValidator from 'src/shared/form/formValidators/carBookingSearchFormValidator';
import { daysAfter, tomorrow } from 'src/shared/helpers/dateHelper';

import type {
  CarLocationResponseType,
  CarVendorType,
  PartialSearchRequestType
} from 'src/carBooking/flow-typed/carBooking.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  carLocations: Array<CarLocationResponseType>,
  carVendors: Array<CarVendorType>,
  formData: FormData,
  formId: string,
  isSubmitted?: boolean,
  isWebView?: boolean,
  lastBookableDate: Dayjs,
  onSubmit: () => void,
  retrieveCarLocationsFn: () => void,
  retrieveCarVendorsFn: () => void,
  selectedSearchRequest: ?PartialSearchRequestType
};

type State = {
  pickUpTimeSelected: boolean,
  dropOffTimeSelected: boolean
};

class CarBookingSearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pickUpTimeSelected: false,
      dropOffTimeSelected: false
    };
  }

  _onPickUpTimeClick = () => {
    this.setState({ pickUpTimeSelected: true });
  };

  _onDropOffTimeClick = () => {
    this.setState({ dropOffTimeSelected: true });
  };

  render() {
    const {
      carLocations,
      carVendors,
      formData,
      formId,
      isSubmitted,
      isWebView,
      lastBookableDate,
      onSubmit,
      retrieveCarLocationsFn,
      retrieveCarVendorsFn,
      selectedSearchRequest
    } = this.props;
    const { pickUpTimeSelected, dropOffTimeSelected } = this.state;

    return (
      <div>
        <Form
          formId={formId}
          className="book-flight-form car-booking-form rd3"
          name="car-booking-search-form"
          onSubmit={onSubmit}
          isWidget
        >
          <Fields type="grouped">
            <CarBookingCitySelectorField
              carLocations={carLocations}
              isWebView={isWebView}
              name="departureAndReturnCities"
              retrieveCarLocationsFn={retrieveCarLocationsFn}
              value={formData.departureAndReturnCities}
            />
          </Fields>

          <Fields type="grouped">
            <CarBookingDateSelectorField
              name="departureAndReturnDate"
              value={formData.departureAndReturnDate}
              lastBookableDate={lastBookableDate}
              isWebView={isWebView}
            />
          </Fields>

          <div className="car-booking-search-form--triptych flex flex-main-center flex-cross-center p5 bdb bdgray2">
            <div className="car-booking-search-form--triptych-side center">
              <CarBookingTimeSelector
                name="pickUpTime"
                value={formData.pickUpTime}
                placeholder={CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT}
                isClearValueOnFocusWhenHaveError={false}
                onClick={this._onPickUpTimeClick}
                className={cx({ clean: !pickUpTimeSelected && !selectedSearchRequest && !isSubmitted })}
                hint="Pick-up Time"
              />
            </div>
            <div className="car-booking-search-form--triptych-center sltblue xxxlarge">
              {<Icon type="car-booking-time" />}
            </div>
            <div className="car-booking-search-form--triptych-side center">
              <CarBookingTimeSelector
                name="dropOffTime"
                value={formData.dropOffTime}
                placeholder={CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT}
                isClearValueOnFocusWhenHaveError={false}
                onClick={this._onDropOffTimeClick}
                className={cx({ clean: !dropOffTimeSelected && !selectedSearchRequest && !isSubmitted })}
                hint="Return Time"
              />
            </div>
          </div>

          <Fields type="grouped" className="vehicle-type bdgray3 py4 pl5 pr5">
            <CarBookingVehicleSelector name="vehicleType" label={i18n('CAR_BOOKING__VEHICLE_TYPE')} />
          </Fields>
          <Fields type="grouped" className="car-vendor py4 pl5 pr5 bdgray3">
            <Field>
              <CarBookingCompanySelectorField
                carVendors={carVendors}
                isWebView={isWebView}
                name="carCompany"
                retrieveCarVendorsFn={retrieveCarVendorsFn}
                value={formData.carCompany}
              />
            </Field>
          </Fields>
          <Fields type="grouped" className="car-vendor py4 pl5 pr5 bdgray3">
            <Field>
              <CarBookingPromoCodeSelectorField
                name="discount"
                value={formData.discount}
                carVendors={carVendors}
                isWebView={isWebView}
              />
            </Field>
          </Fields>

          <Segment transparent>
            <Button size="larger" color="yellow" type="submit" role="submit" fluid>
              {i18n('CAR_BOOKING__FIND_CARS')}
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default withForm({
  formValidator: carBookingSearchFormValidator,
  defaultValues: (props: Props) => {
    const { carVendors, formData, selectedSearchRequest } = props;
    const vendors = formData?.carCompany || selectedSearchRequest?.vendors;
    const carCompanyDefaultValue =
      (!vendors || typeof vendors === 'string') && i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
    const carCompany = carCompanyDefaultValue || transformVendorsIdsToVendorNameList(vendors, carVendors);

    return {
      carCompany,
      departureAndReturnCities: {
        pickUp: _.get(selectedSearchRequest, 'pickUp', ''),
        dropOff: _.get(selectedSearchRequest, 'dropOff', '')
      },
      departureAndReturnDate: {
        pickUpDate: _.get(selectedSearchRequest, 'pickUpDate', tomorrow().format(CAR_BOOKING_DATE_FORMAT)),
        dropOffDate: _.get(
          selectedSearchRequest,
          'dropOffDate',
          daysAfter(3, tomorrow()).format(CAR_BOOKING_DATE_FORMAT)
        ),
        isDateChanged: !_.isEmpty(selectedSearchRequest)
      },
      discount: transformSelectedSearchRequestToDiscountValue(selectedSearchRequest),
      dropOffTime: _.get(selectedSearchRequest, 'dropOffTime', CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT),
      pickUpTime: _.get(selectedSearchRequest, 'pickUpTime', CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT),
      vehicleType: _.get(selectedSearchRequest, 'vehicleType', i18n('CAR_BOOKING__MID_SIZE'))
    };
  }
})(CarBookingSearchForm);
