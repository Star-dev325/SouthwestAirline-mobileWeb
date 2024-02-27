import _ from 'lodash';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('FlightSegment', () => {
  let SegmentApiJsonBuilder;
  let FlightSegment;
  let flightSegment;
  let UpcomingFlightsPassengerApiJsonBuilder;
  let AirportsHelpers;
  const HOUSTON_AIRPORT = {
    code: 'HOU',
    someOtherStuff: 'that is on airports'
  };

  beforeEach(() => {
    SegmentApiJsonBuilder = require('test/builders/apiResponse/segmentApiJsonBuilder');
    FlightSegment = require('src/shared/viewModels/flightSegment').default;
    UpcomingFlightsPassengerApiJsonBuilder = require('test/builders/apiResponse/upcomingFlightsPassengerApiJsonBuilder');
    AirportsHelpers = require('src/airports/helpers/airportsHelpers');
    sinon.stub(AirportsHelpers, 'getAirportFromCode').returns(HOUSTON_AIRPORT);
  });

  it('should return two flight segments when response json contains two segments', () => {
    const segments = [
      new SegmentApiJsonBuilder().setOperatingFlightNumber('1234').setWifiAvailable(true).build(),

      new SegmentApiJsonBuilder().setOperatingFlightNumber('5678').setWifiAvailable(false).build()
    ];
    const flightSegments = _.map(segments, (x) => new FlightSegment(x));

    expect(flightSegments[0].wifiAvailable).to.be.true;
    expect(flightSegments[0].flightNumber).to.equal('1234');

    expect(flightSegments[1].wifiAvailable).to.be.false;
    expect(flightSegments[1].flightNumber).to.equal('5678');
  });

  it('should populate departure and arrival times on segments', () => {
    const segments = [
      new SegmentApiJsonBuilder()
        .setDepartureDateTime('2015-05-13T06:20')
        .setArrivalDateTime('2015-06-13T08:00')
        .build()
    ];

    const flightSegments = _.map(segments, (x) => new FlightSegment(x));

    expect(flightSegments[0].departureDateTime).to.deep.equal('2015-05-13T06:20');
    expect(flightSegments[0].arrivalDateTime).to.deep.equal('2015-06-13T08:00');
  });

  it('should populate stop airports on segments', () => {
    const segments = [new SegmentApiJsonBuilder().setStopAirportCodes(['HOU']).build()];

    const flightSegments = _.map(segments, (x) => new FlightSegment(x));

    expect(flightSegments[0].stopAirports).to.deep.equal([HOUSTON_AIRPORT]);
  });

  it('should show flight status on segments', () => {
    const segmentResponse = new SegmentApiJsonBuilder()
      .setFlightStatus({
        departureActualTime: '15:30:00.000',
        arrivalActualTime: '16:35:00.000',
        arrivalGate: null,
        departureGate: null,
        arrivalStatus: 'On Time',
        departureStatus: 'On Time',
        willAdviseArrival: false,
        willAdviseDeparture: false,
        wifiOnBoard: 'false',
        marketingFlightNumber: '37',
        destinationAirportCode: 'HOU',
        originationAirportCode: 'DAL',
        departureDate: '2016-03-02',
        marketingCarrierCode: 'WN',
        operatingCarrierCode: 'WN',
        operatingFlightNumber: '37',
        departureScheduledTime: '15:30:00.000',
        arrivalScheduledTime: '16:35:00.000',
        equipmentType: '733'
      })
      .build();

    const segment = new FlightSegment(segmentResponse);

    expect(segment.flightStatus.departureStatus).to.deep.equal('On Time');
  });

  describe('check in information', () => {
    let apiSegment;

    beforeEach(() => {
      apiSegment = new SegmentApiJsonBuilder().setSegmentId('12345').build();
    });

    context('when no passengers have a boarding group/position', () => {
      it('hasCheckedIn should be false', () => {
        const passengersWithoutBoardingGroupAndPosition = [
          new UpcomingFlightsPassengerApiJsonBuilder()
            .withCheckInEligibilities({
              boardingGroup: '',
              boardingPosition: '',
              segmentId: '12345'
            })
            .build()
        ];

        const flightSegment = new FlightSegment(apiSegment, passengersWithoutBoardingGroupAndPosition);

        expect(flightSegment).to.have.property('hasCheckedIn', false);
      });
    });

    context('when any passengers have a boarding group/position', () => {
      it('hasCheckedIn should be true', () => {
        const passengersWithBoardingGroupAndPosition = [
          new UpcomingFlightsPassengerApiJsonBuilder()
            .withCheckInEligibilities({
              boardingGroup: 'B',
              boardingPosition: '39',
              segmentId: '12345'
            })
            .build()
        ];

        const flightSegment = new FlightSegment(apiSegment, passengersWithBoardingGroupAndPosition);

        expect(flightSegment).to.have.property('hasCheckedIn', true);
      });
    });

    context('when no passengers are given', () => {
      beforeEach(() => {
        flightSegment = new FlightSegment(apiSegment, undefined);
      });

      it('hasCheckedIn should be undefined', () => {
        expect(flightSegment).to.have.property('hasCheckedIn', undefined);
      });
    });

    context('when no passengers have a boarding group/position for this segment, but do for other segments', () => {
      beforeEach(() => {
        const someSegmentsCheckedInButSomeNot = [
          new UpcomingFlightsPassengerApiJsonBuilder()
            .withCheckInEligibilities(
              {
                boardingGroup: 'A',
                boardingPosition: '19',
                segmentId: 'some other segment'
              },
              {
                boardingGroup: '',
                boardingPosition: '',
                segmentId: '12345'
              }
            )
            .build()
        ];

        flightSegment = new FlightSegment(apiSegment, someSegmentsCheckedInButSomeNot);
      });

      it('hasCheckedIn should be false', () => {
        expect(flightSegment).to.have.property('hasCheckedIn', false);
      });
    });

    context('when one passenger has boarding info for this segment, but one other passenger does not', () => {
      it('hasCheckedIn should be true', () => {
        const passengerWithBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: 'B',
            boardingPosition: '39',
            segmentId: '12345'
          })
          .build();

        const passengerWithoutBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: '',
            boardingPosition: '',
            segmentId: '12345'
          })
          .build();

        const passengers = [passengerWithoutBoardingInfo, passengerWithBoardingInfo];

        const flightSegment = new FlightSegment(apiSegment, passengers);

        expect(flightSegment).to.have.property('hasCheckedIn', true);
      });
    });

    context('when one passenger has a flight departure within one hour', () => {
      it('isWithinOneHour should be true', () => {
        const passengerWithBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: 'B',
            boardingPosition: '39',
            segmentId: '12345'
          })
          .build();

        const passengerWithoutBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: '',
            boardingPosition: '',
            segmentId: '12345',
            checkinDocumentType: 'boardingPass',
            checkinDocumentReason: 'withinOneHourBeforeDeparture'
          })
          .build();

        const flightSegment = new FlightSegment(apiSegment, [passengerWithBoardingInfo, passengerWithoutBoardingInfo]);

        expect(flightSegment).to.have.property('isWithinOneHour', true);
      });
    });

    context('when one passenger has a flight departure within 90 minutes', () => {
      it('isWithin90Minutes should be true', () => {
        const passengerWithBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: 'B',
            boardingPosition: '39',
            segmentId: '12345'
          })
          .build();

        const passengerWithoutBoardingInfo = new UpcomingFlightsPassengerApiJsonBuilder()
          .withCheckInEligibilities({
            boardingGroup: '',
            boardingPosition: '',
            segmentId: '12345',
            checkinDocumentType: 'boardingPass',
            checkinDocumentReason: 'tooCloseToDeparture'
          })
          .build();

        const flightSegment = new FlightSegment(apiSegment, [passengerWithBoardingInfo, passengerWithoutBoardingInfo]);

        expect(flightSegment).to.have.property('isWithin90Minutes', true);
      });
    });
  });
});
