import _ from 'lodash';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import {
  getHazmatDeclarationKeysFromConfirmationPage,
  getFlightDepartureAirportsAndDates,
  getHazmatDeclarationKeysFromMobileBoardingPass
} from 'src/checkIn/transformers/hazmatFlightsTransfomer';

describe('hazmatFlightsTransformer', () => {
  context('getFlightDepartureAirportsAndDates', () => {
    it('should handle empty mobileBoardingPasses', () => {
      expect(getFlightDepartureAirportsAndDates([])).to.deep.equal([]);
    });

    it('should transform mobileBoardingPasses to a list of flight numbers and departure airports', () => {
      const mobileBoardingPasses = new CheckInRetrieveBoardingPassBuilder().withMultipleBoardingPasses().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView;

      expect(getFlightDepartureAirportsAndDates(mobileBoardingPasses)).to.deep.equal([
        {
          departureDate: '2018-07-13',
          originAirportCode: 'DAL'
        },
        {
          departureDate: '2018-07-13',
          originAirportCode: 'BOS'
        }
      ]);
    });
  });

  context('getHazmatDeclarationKeysFromMobileBoardingPass', () => {
    it('should translate empty mobileBoardingPasses to an empty hazmat declaration list', () => {
      expect(getHazmatDeclarationKeysFromMobileBoardingPass([])).to.deep.equal([]);
    });

    it('should translate mobileBoardingPasses with multiple pax and multiple flights to a hazmat declaration list', () => {
      const mobileBoardingPasses = new CheckInRetrieveBoardingPassBuilder().withMultipleBoardingPasses().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView;

      expect(getHazmatDeclarationKeysFromMobileBoardingPass(mobileBoardingPasses)).to.deep.equal([
        {
          flightDate: '2018-07-13',
          travelerId: 'travelerId-01',
          travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01'
        },
        {
          flightDate: '2018-07-13',
          travelerId: 'travelerId-02',
          travelerSegmentIdentifier: 'travelerSegmentIdentifier-02-01'
        }
      ]);
    });
  });

  context('getHazmatDeclarationKeysFromConfirmationPage', () => {
    it('should translate empty flights and empty flightAirportsAndDates to empty hazmat declaration', () => {
      expect(getHazmatDeclarationKeysFromConfirmationPage([], [])).to.deep.equal([]);
    });

    it('should translate flights and flightAirportsAndDates with multiple pax', () => {
      const flightAirportsAndDates = [
        {
          originAirportCode: 'DAL',
          departureDate: '2020-10-09'
        }
      ];
      const { flights } = new CheckInConfirmationBuilder().withPassengersByCount(2).build().checkInConfirmationPage;

      const result = getHazmatDeclarationKeysFromConfirmationPage(flights, flightAirportsAndDates);

      expect(result).to.deep.equal([
        {
          flightDate: '2020-10-09',
          travelerId: '0000000000000001',
          travelerSegmentIdentifier: '2301DC520002823E'
        },
        {
          flightDate: '2020-10-09',
          travelerId: '0000000000000002',
          travelerSegmentIdentifier: '2301DC5200028240'
        }
      ]);
    });

    it('should translate flights and flightAirportsAndDates with multiple flights', () => {
      const flightAirportsAndDates = [
        {
          originAirportCode: 'DAL',
          departureDate: '2020-10-09'
        },
        {
          originAirportCode: 'AUS',
          departureDate: '2020-10-10'
        }
      ];
      const { flights } = new CheckInConfirmationBuilder().withMultipleFlights().build().checkInConfirmationPage;

      const result = getHazmatDeclarationKeysFromConfirmationPage(flights, flightAirportsAndDates);

      expect(result).to.deep.equal([
        {
          flightDate: '2020-10-09',
          travelerId: '0000000000000001',
          travelerSegmentIdentifier: '2301DC520002823E'
        },
        {
          flightDate: '2020-10-10',
          travelerId: '0000000000000001',
          travelerSegmentIdentifier: '2301DC520002823E'
        }
      ]);
    });

    it('should translate flights and flightAirportsAndDates with multiple flights and multiple pax', () => {
      const flightAirportsAndDates = [
        {
          originAirportCode: 'DAL',
          departureDate: '2020-10-09'
        },
        {
          originAirportCode: 'AUS',
          departureDate: '2020-10-10'
        }
      ];

      const { flights } = new CheckInConfirmationBuilder().withMultipleFlights().build().checkInConfirmationPage;

      const departingPassengerList = [
        {
          name: 'Passenger 1',
          travelerID: '0000000001',
          travelerSegmentIdentifier: 'travelSegment01A'
        },
        {
          name: 'Passenger 2',
          travelerID: '0000000002',
          travelerSegmentIdentifier: 'travelSegment01B'
        }
      ];

      const returningPassengerList = [
        {
          name: 'Passenger 1',
          travelerID: '0000000001',
          travelerSegmentIdentifier: 'travelSegment01C'
        },
        {
          name: 'Passenger 2',
          travelerID: '0000000002',
          travelerSegmentIdentifier: 'travelSegment01D'
        }
      ];

      _.set(flights, '[0].passengers', departingPassengerList);
      _.set(flights, '[1].passengers', returningPassengerList);

      const result = getHazmatDeclarationKeysFromConfirmationPage(flights, flightAirportsAndDates);

      expect(result).to.deep.equal([
        {
          flightDate: '2020-10-09',
          travelerId: '0000000001',
          travelerSegmentIdentifier: 'travelSegment01A'
        },
        {
          flightDate: '2020-10-09',
          travelerId: '0000000002',
          travelerSegmentIdentifier: 'travelSegment01B'
        },
        {
          flightDate: '2020-10-10',
          travelerId: '0000000001',
          travelerSegmentIdentifier: 'travelSegment01C'
        },
        {
          flightDate: '2020-10-10',
          travelerId: '0000000002',
          travelerSegmentIdentifier: 'travelSegment01D'
        }
      ]);
    });
  });
});
