// @flow
import React from 'react';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import withField from 'src/shared/form/enhancers/withField';
import CarLocations from 'src/carBooking/components/carLocations';
import ClickableDiv from 'src/shared/components/clickableDiv';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  showFullScreenModal,
  hideFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import {
  CAR_BOOKING_PICKUP_CITY_MODAL_ID,
  CAR_BOOKING_DROPOFF_CITY_MODAL_ID
} from 'src/carBooking/constants/carBookingConstants';
import i18n from '@swa-ui/locale';

import type { CarLocationResponseType } from 'src/carBooking/flow-typed/carBooking.types';

type PickUpAndDropOffCityType = {
  pickUp: string,
  dropOff: string
};

type Props = {
  carLocations: Array<CarLocationResponseType>,
  isWebView?: boolean,
  onChange: (*) => void,
  retrieveCarLocationsFn: () => void,
  value: PickUpAndDropOffCityType
};

export class CarBookingCitySelectorField extends React.Component<Props> {
  _onPickUpAirportSelect = (location: CarLocationResponseType) => {
    const {
      onChange,
      value: { dropOff }
    } = this.props;
    const pickUp = location.airport.code;
    const newDropOff = _.isEmpty(dropOff) ? location.airport.code : dropOff;
    const newValue = {
      pickUp,
      dropOff: newDropOff
    };

    onChange(newValue);

    hideFullScreenModal(CAR_BOOKING_PICKUP_CITY_MODAL_ID);
  };

  _onDropOffAirportSelect = (location: CarLocationResponseType) => {
    const {
      onChange,
      value: { pickUp }
    } = this.props;
    const newPickUp = _.isEmpty(pickUp) ? location.airport.code : pickUp;
    const dropOff = location.airport.code;
    const newValue = {
      pickUp: newPickUp,
      dropOff
    };

    onChange(newValue);

    hideFullScreenModal(CAR_BOOKING_DROPOFF_CITY_MODAL_ID);
  };

  _openSelectCarLocationModal = (modalId: string) => {
    const { carLocations, retrieveCarLocationsFn } = this.props;

    if (_.isEmpty(carLocations)) {
      retrieveCarLocationsFn && retrieveCarLocationsFn();
    }
    showFullScreenModal(modalId);
  };

  _getCarLocationFromCode = (carLocationCode: ?string) =>
    _.find(this.props.carLocations, (location) => location.airport.code === carLocationCode);

  _renderCity = (fieldName: string, carLocationCode: string, placeholder: string, modalId: string) => (
    <div className="car-city-selector center" data-qa={`car-${_.kebabCase(fieldName || '')}`}>
      <div className="center">
        <ClickableDiv
          childClassName="fullwidth"
          iconType="car"
          onClick={() => this._openSelectCarLocationModal(modalId)}
        >
          {this._renderCarCityLabel(carLocationCode, placeholder)}
        </ClickableDiv>
      </div>
    </div>
  );

  _renderCarCityLabel(carLocationCode: ?string, placeholder: ?string) {
    const carLocation = _.isEmpty(carLocationCode) ? {} : this._getCarLocationFromCode(carLocationCode);
    const formatCarCity = (location = {}) => {
      const { airport, city, state } = location;

      return !!airport && !!city ? `${city}, ${state}` : '';
    };

    if (carLocationCode && carLocation) {
      return (
        <div>
          <span className={'bold pdkblue xxxlarge block'}>{_.get(carLocation, 'airport.code')}</span>
          <span className={'gray4 large mt3 block word-wrap'}>{formatCarCity(carLocation)}</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className={'gray4 xxxlarge block'}>{placeholder}</span>
          <span className={'gray4 large mt3 block'}>{i18n('CAR_BOOKING__SELECT')}</span>
        </div>
      );
    }
  }

  render() {
    const {
      value: { pickUp, dropOff },
      carLocations,
      isWebView
    } = this.props;

    return (
      <div className="car-booking-search-form--triptych flex flex-main-center flex-cross-start p5 bdgray2">
        <div className="car-booking-search-form--triptych-side">
          {this._renderCity('pickUp', pickUp, 'Pick-up', CAR_BOOKING_PICKUP_CITY_MODAL_ID)}
        </div>
        <div className="car-booking-search-form--triptych-center flex-item-center sltblue xxxlarge m1">
          {<Icon type="car" />}
        </div>
        <div className="car-booking-search-form--triptych-side">
          {this._renderCity('dropOff', dropOff, 'Return', CAR_BOOKING_DROPOFF_CITY_MODAL_ID)}
        </div>
        <FullScreenModal id={CAR_BOOKING_PICKUP_CITY_MODAL_ID}>
          <CarLocations
            onCancel={() => hideFullScreenModal(CAR_BOOKING_PICKUP_CITY_MODAL_ID)}
            onAirportSelect={this._onPickUpAirportSelect}
            title="Select City"
            carLocations={carLocations}
            isWebView={isWebView}
          />
        </FullScreenModal>
        <FullScreenModal id={CAR_BOOKING_DROPOFF_CITY_MODAL_ID}>
          <CarLocations
            onCancel={() => hideFullScreenModal(CAR_BOOKING_DROPOFF_CITY_MODAL_ID)}
            onAirportSelect={this._onDropOffAirportSelect}
            title="Select City"
            carLocations={carLocations}
            isWebView={isWebView}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withField()(CarBookingCitySelectorField);
