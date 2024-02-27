import _ from 'lodash';
import EarlyBirdReservationApiJsonBuilder from 'test/builders/apiResponse/earlyBirdReservationApiJsonBuilder';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('flightSummariesTransformer', () => {
  let reservationResponse;
  let getTripDetail;
  let airportGetter;
  let FlightSummariesTransformer;

  beforeEach(() => {
    FlightSummariesTransformer = require('src/shared/transformers/flightSummariesTransformer').default;
    reservationResponse = new EarlyBirdReservationApiJsonBuilder().build();
    airportGetter = sinon.stub().returns({
      code: 'APC',
      airportName: 'Airport-City',
      displayName: 'Airport-City',
      cityName: 'AirportCity',
      shortDisplayName: 'AirCity',
      cityState: 'OH',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '40.9161',
      longitude: '-81.4422',
      airportSearchName: 'Airport'
    });

    getTripDetail = FlightSummariesTransformer.getTripDetail(airportGetter);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should transform to trip detail', () => {
    const tripDetail = getTripDetail(reservationResponse);

    expect(tripDetail.bounds[0]).to.deep.equal({
      fareType: 'Wanna Get Away',
      durationMinutes: 60,
      departureDetail: {
        dateTime: '2016-01-15T06:20:00.000-06:00',
        actualTime: undefined,
        flightStatus: undefined,
        airportCode: 'APC',
        airportName: 'Airport-City',
        cityState: 'OH'
      },
      arrivalDetail: {
        dateTime: '2016-01-15T07:20:00.000-06:00',
        actualTime: undefined,
        flightStatus: undefined,
        airportCode: 'APC',
        airportName: 'Airport-City',
        cityState: 'OH',
        arrivesNextDay: false
      },
      isCancelled: false,
      stops: [],
      segments: [
        {
          arrivalDateTime: '2016-01-15T07:20:00.000-06:00',
          departureDateTime: '2016-01-15T06:20:00.000-06:00',
          flightNumber: '1439',
          wifiAvailable: null
        }
      ],
      isReturning: false
    });
    expect(tripDetail.bounds[1].isReturning).to.be.true;
    expect(tripDetail.passengers).to.deep.equal(reservationResponse.passengers);
  });

  context('when transform to flightSummaries', () => {
    it('should contain 2 bounds', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(flightSummaries).to.have.lengthOf(2);
    });

    it('should contain adult price', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(_.get(flightSummaries[0], 'priceInfo.adultPriceInfo')).to.exist;
      expect(_.get(flightSummaries[1], 'priceInfo.adultPriceInfo')).to.exist;
    });

    it('should get flightInfo correctly', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      const flightInfo1 = flightSummaries[0].flightSummaryDetails.flightInfo;

      expect(flightInfo1.durationMinutes).to.equal(60);
      expect(flightInfo1.segments).to.have.lengthOf(1);
      const flightInfo2 = flightSummaries[1].flightSummaryDetails.flightInfo;

      expect(flightInfo2.durationMinutes).to.equal(55);
      expect(flightInfo2.segments).to.have.lengthOf(1);
    });

    it('should get itineraryInfo correctly', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      const itineraryInfo1 = flightSummaries[0].flightSummaryDetails.itineraryInfo;

      expect(itineraryInfo1.departureDetail.dateTime).to.equal('2016-01-15T06:20:00.000-06:00');
      expect(itineraryInfo1.arrivalDetail.dateTime).to.equal('2016-01-15T07:20:00.000-06:00');
      const itineraryInfo2 = flightSummaries[1].flightSummaryDetails.itineraryInfo;

      expect(itineraryInfo2.departureDetail.dateTime).to.equal('2016-01-20T22:20:00.000-06:00');
      expect(itineraryInfo2.arrivalDetail.dateTime).to.equal('2016-01-20T23:15:00.000-06:00');
    });

    it('should have actual time in departure and arrival when have flight status', () => {
      reservationResponse = require('mocks/templates/reservation/DELAYD/prices');

      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      const itineraryInfo1 = flightSummaries[0].flightSummaryDetails.itineraryInfo;

      expect(itineraryInfo1.departureDetail.dateTime).to.equal('2016-09-01T20:15:00.000-05:00');
      expect(itineraryInfo1.departureDetail.actualTime).to.equal('21:30:00.000');
      expect(itineraryInfo1.arrivalDetail.dateTime).to.equal('2016-09-01T23:20:00.000-05:00');
      expect(itineraryInfo1.arrivalDetail.actualTime).to.equal('23:59:00.000');
    });

    it('should get isCancelled Info', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(flightSummaries[0].flightSummaryDetails.isCancelled).to.be.false;
      expect(flightSummaries[1].flightSummaryDetails.isCancelled).to.be.false;
    });

    it('should get isReturning Info', () => {
      const tripDetail = getTripDetail(reservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(flightSummaries[0].flightSummaryDetails.isReturning).to.be.false;
      expect(flightSummaries[1].flightSummaryDetails.isReturning).to.be.true;
    });

    it('should get isReturning Info for Open Jaw Reservation', () => {
      const openJawReservationResponse = new EarlyBirdReservationApiJsonBuilder()
        .withOpenJawOriginationDestinations()
        .build();

      const tripDetail = getTripDetail(openJawReservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(flightSummaries[0].flightSummaryDetails.isReturning).to.be.false;
      expect(flightSummaries[1].flightSummaryDetails.isReturning).to.be.false;
    });

    it('should get isReturning Info for Connecting Flight Reservation', () => {
      const connectingFlightReservationResponse = new EarlyBirdReservationApiJsonBuilder()
        .withRoundTripConnectingFlightOriginationDestinations()
        .build();

      const tripDetail = getTripDetail(connectingFlightReservationResponse);

      const flightSummaries = FlightSummariesTransformer.retrieveFlightSummariesFromReservation(tripDetail);

      expect(flightSummaries[0].flightSummaryDetails.isReturning).to.be.false;
      expect(flightSummaries[1].flightSummaryDetails.isReturning).to.be.true;
    });
  });
});
