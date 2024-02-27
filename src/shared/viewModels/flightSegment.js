import _ from 'lodash';
import dayjs from 'dayjs';
import { isWithin24Hours } from 'src/shared/helpers/dateHelper';
import BoardingInfoMessage from 'src/viewReservation/constants/boardingInfoMessage';
import { getAirportFromCode } from 'src/airports/helpers/airportsHelpers';

const { WITHIN_ONE_HOUR_DEPARTURE, TOO_CLOSE_TO_DEPARTURE } = BoardingInfoMessage.CHECKIN_DOCUMENT_REASON;
let allAirports = [];

class FlightSegment {
  constructor(segmentResponse, apiPassengerList, airports = []) {
    allAirports = airports;
    this._apiPassengerList = apiPassengerList;
    this.departureAirport = segmentResponse.originationAirportCode || segmentResponse.departureAirport;
    this.arrivalAirport = segmentResponse.destinationAirportCode || segmentResponse.arrivalAirport;
    this.destinationDescription = segmentResponse.destinationDescription;
    this.flightNumber = segmentResponse.operatingCarrierInfo.flightNumber;
    this.operatingCarrierCode = segmentResponse.operatingCarrierInfo.carrierCode;
    this.wifiAvailable = segmentResponse.wifiAvailable;
    this.aircraftInfo = segmentResponse.aircraftInfo;
    this.flightStatus = segmentResponse.flightStatus;
    this.departureDateTime = segmentResponse.departureDateTime;
    this.departureDate = dayjs(segmentResponse.departureDateTime).format('YYYY-MM-DD');
    this.arrivalDateTime = segmentResponse.arrivalDateTime;
    this.durationMinutes = dayjs
      .duration(dayjs(segmentResponse.arrivalDateTime).diff(dayjs(segmentResponse.departureDateTime)))
      .asMinutes();
    this.stopAirports = _.map(segmentResponse.stopAirportCodes, this._getStopAirport);
    this.isWithin24Hours = isWithin24Hours(this.departureDateTime);
    this.segmentId = segmentResponse.segmentId;
    this.isWithinOneHour = this._isFlightWithinOneHour();
    this.isWithin90Minutes = this._isFlightWithIn90Minutes();
    this.hasCheckedIn = this._doesAnyPassengerHaveBoardingInfo();
  }

  _getStopAirport(stopAirportCode) {
    return getAirportFromCode(allAirports, stopAirportCode);
  }

  _doesAnyPassengerHaveBoardingInfo() {
    if (!this._apiPassengerList) {
      return;
    }

    return _.some(this._checkInEligibilities(), 'boardingGroup');
  }

  _getCheckinDocumentReason() {
    return _.map(this._checkInEligibilities(), 'checkinDocumentReason');
  }

  _isFlightWithinOneHour() {
    return _.some(
      this._getCheckinDocumentReason(),
      (checkinDocumentReason) => checkinDocumentReason === WITHIN_ONE_HOUR_DEPARTURE
    );
  }

  _isFlightWithIn90Minutes() {
    return _.some(
      this._getCheckinDocumentReason(),
      (checkinDocumentReason) => checkinDocumentReason === TOO_CLOSE_TO_DEPARTURE
    );
  }

  _checkInEligibilities() {
    const allCheckInEligibilities = _.chain(this._apiPassengerList)
      .map('checkinEligibilities')
      .flatten()
      .compact()
      .value();

    return _.filter(allCheckInEligibilities, (x) => this.segmentId === x.segmentId);
  }
}

export default FlightSegment;
