// @flow
import React from 'react';
import _ from 'lodash';
import LabelContainer from 'src/shared/components/labelContainer';
import FlightTime from 'src/shared/components/flightTime';
import AirportInfo from 'src/shared/components/airportInfo';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  pickUpTime: string,
  dropOffTime: string,
  pickUpDate: string,
  dropOffDate: string,
  pickUpAirport: {
    airportCode: string,
    airportName: string,
    cityName: string,
    cityState: string
  },
  dropOffAirport: {
    airportCode: string,
    airportName: string,
    cityName: string,
    cityState: string
  }
};

const CarReservationItinerary = ({
  pickUpDate,
  dropOffDate,
  pickUpAirport,
  dropOffAirport,
  pickUpTime,
  dropOffTime
}: Props) => (
  <div className="car-reservation-itinerary">
    <div className="car-reservation-itinerary--pick-up">
      <div className="pick-up--icon">
        <Icon type="car" className="white p4 circle table-cell align-middle large icon-wrapper_black" />
        <div className="line--vertical line--vertical_top" />
      </div>
      <div className="line-wrapper">
        <div className="line--horizontal" />
      </div>
      <LabelContainer labelText={i18n('CAR_BOOKING__CAR_RESERVATION__PICK_UP')} className="pick-up--date">
        <FlightTime timeString={pickUpTime} isNextDay={false} />
      </LabelContainer>
      <LabelContainer labelText={pickUpDate} className="pick-up--location">
        <AirportInfo airportInfo={_.omit(pickUpAirport, 'cityName')} showDetail />
      </LabelContainer>
    </div>
    <div className="car-reservation-itinerary--return">
      <div className="return--icon">
        <Icon type="car" className="white p4 circle table-cell align-middle large icon-wrapper_green" />
        <div className="line--vertical line--vertical_bottom" />
      </div>
      <div className="line-wrapper">
        <div className="line--horizontal" />
      </div>
      <LabelContainer labelText={i18n('CAR_BOOKING__CAR_RESERVATION__RETURN')} className="return--date">
        <FlightTime timeString={dropOffTime} isNextDay={false} />
      </LabelContainer>
      <LabelContainer labelText={dropOffDate} className="return--location">
        <AirportInfo airportInfo={_.omit(dropOffAirport, 'cityName')} showDetail />
      </LabelContainer>
    </div>
  </div>
);

export default CarReservationItinerary;
