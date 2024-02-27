import * as ReservationDetailsTransformer from 'src/viewReservation/transformers/reservationDetailsTransformer';
import _ from 'lodash';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

const airport = {
  code: 'CAK',
  airportName: 'Akron-Canton',
  cityName: 'Akron',
  cityState: 'OH',
  marketingCarriers: ['WN'],
  countryCode: 'US',
  longitude: '-81.4422',
  latitude: '40.9161',
  airportSearchName: 'Ohio'
};

describe('reservationDetailsTransformer', () => {
  let mockResponse, retrieveReservationDetails;

  beforeEach(() => {
    mockResponse = require('src/viewReservation/transformers/__tests__/reservationsRecordLocatorMock').default;
    retrieveReservationDetails = ReservationDetailsTransformer.retrieveReservationDetails(() => airport);
  });

  context('retrieveReservationDetails', () => {
    context('flightSummaries', () => {
      it('should get a price Info', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        const priceInfo1 = reservationDetail.flightSummaries[0].priceInfo;
        const priceInfo2 = reservationDetail.flightSummaries[1].priceInfo;

        expect(priceInfo1.adultPriceInfo).to.deep.equal({
          fareType: 'Anytime',
          passengerCount: 1,
          passengerType: 'adult'
        });
        expect(priceInfo2.adultPriceInfo).to.deep.equal({
          fareType: 'Anytime',
          passengerCount: 1,
          passengerType: 'adult'
        });
      });

      it('should get a flight Info', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        const flighInfo1 = reservationDetail.flightSummaries[0].flightSummaryDetails.flightInfo;
        const flighInfo2 = reservationDetail.flightSummaries[1].flightSummaryDetails.flightInfo;

        expect(flighInfo1.segments).to.have.lengthOf(1);
        expect(flighInfo1.durationMinutes).to.equal(110);
        expect(flighInfo2.segments).to.have.lengthOf(2);
        expect(flighInfo2.durationMinutes).to.equal(95);
      });

      context('when there is no flight status', () => {
        beforeEach(() => {
          _.forEach(mockResponse.itinerary.originationDestinations, (originationDestination) => {
            _.forEach(originationDestination.segments, (segment) => {
              delete segment.flightStatus;
            });
          });
        });

        it('should get itinerary info', () => {
          const reservationDetail = retrieveReservationDetails(mockResponse);

          const itineraryInfo1 = reservationDetail.flightSummaries[0].flightSummaryDetails.itineraryInfo;
          const itineraryInfo2 = reservationDetail.flightSummaries[1].flightSummaryDetails.itineraryInfo;

          expect(itineraryInfo1.departureDetail.dateTime).to.equal('2015-12-08T19:10:00.000-06:00');
          expect(itineraryInfo1.arrivalDetail.dateTime).to.equal('2015-12-08T20:00:00.000-07:00');
          expect(itineraryInfo2.departureDetail.dateTime).to.equal('2015-12-12T10:25:00.000-07:00');
          expect(itineraryInfo2.arrivalDetail.dateTime).to.equal('2015-12-12T12:00:00.000-06:00');
        });

        it('should get flight departureDate', () => {
          const reservationDetail = retrieveReservationDetails(mockResponse);

          const departureDate1 = reservationDetail.flightSummaries[0].flightSummaryDetails.departureDateTime;
          const departureDate2 = reservationDetail.flightSummaries[1].flightSummaryDetails.departureDateTime;

          expect(departureDate1).to.equal('2015-12-08T19:10:00.000-06:00');
          expect(departureDate2).to.equal('2015-12-12T10:25:00.000-07:00');
        });
      });

      context('when there is a flight status for at least one departure detail', () => {
        it('should get itinerary info', () => {
          const reservationDetail = retrieveReservationDetails(mockResponse);

          const itineraryInfo1 = reservationDetail.flightSummaries[0].flightSummaryDetails.itineraryInfo;
          const itineraryInfo2 = reservationDetail.flightSummaries[1].flightSummaryDetails.itineraryInfo;

          expect(itineraryInfo1.departureDetail.dateTime).to.equal('2015-12-08T19:10:00.000-06:00');
          expect(itineraryInfo1.arrivalDetail.dateTime).to.equal('2015-12-08T20:00:00.000-07:00');
          expect(itineraryInfo2.departureDetail.dateTime).to.equal('2015-12-12T10:25:00.000-07:00');
          expect(itineraryInfo2.arrivalDetail.dateTime).to.equal('2015-12-12T12:00:00.000-06:00');

          expect(itineraryInfo1.departureDetail.actualTime).to.equal('19:10:00.000');
          expect(itineraryInfo1.arrivalDetail.actualTime).to.equal('20:00:00.000');
          expect(itineraryInfo2.departureDetail.actualTime).to.not.exist;
          expect(itineraryInfo2.arrivalDetail.actualTime).to.not.exist;
        });

        it('should get flight departureDate', () => {
          const reservationDetail = retrieveReservationDetails(mockResponse);

          const departureDate1 = reservationDetail.flightSummaries[0].flightSummaryDetails.departureDateTime;
          const departureDate2 = reservationDetail.flightSummaries[1].flightSummaryDetails.departureDateTime;

          expect(departureDate1).to.equal('2015-12-08T19:10:00.000-06:00');
          expect(departureDate2).to.equal('2015-12-12T10:25:00.000-07:00');
        });
      });

      it('should get itinerary stops info', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        const stops1 = reservationDetail.flightSummaries[0].flightSummaryDetails.itineraryInfo.stops;
        const stops2 = reservationDetail.flightSummaries[1].flightSummaryDetails.itineraryInfo.stops;

        expect(stops1).to.have.lengthOf(1);
        expect(stops1[0].layoverTimes).to.not.exist;
        expect(stops2).to.have.lengthOf(1);
        expect(stops2[0].layoverTimes.startTime).to.equal('2015-12-12T11:00:00.000-06:00');
      });

      it('should get isCancelled Info', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        expect(reservationDetail.flightSummaries[0].flightSummaryDetails.isCancelled).to.be.false;
        expect(reservationDetail.flightSummaries[1].flightSummaryDetails.isCancelled).to.be.false;
      });

      it('should get isReturning Info', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        expect(reservationDetail.flightSummaries[0].flightSummaryDetails.isReturning).to.be.false;
        expect(reservationDetail.flightSummaries[1].flightSummaryDetails.isReturning).to.be.true;
      });
    });

    context('isCancelled', () => {
      it('should return false', () => {
        const reservationDetail = retrieveReservationDetails(mockResponse);

        expect(reservationDetail.isCancelled).to.be.false;
      });
    });
  });

  context('transformHotelReservation', () => {
    it('should get the right room cost ', () => {
      const hotelReservation = {
        priceDetails: {
          totalCents: 36444,
          taxesAndFeesCents: 4404,
          hotelImposedFeesCents: 0
        }
      };
      const hotelDetails = ReservationDetailsTransformer.transformHotelReservation(hotelReservation);

      expect(hotelDetails.priceDetails.roomCost).to.equal(32040);
    });
  });

  context('transformRetrieveCarReservationApiResponse', () => {
    let apiResponse, carLocations, carVendorImages;

    beforeEach(() => {
      carLocations = [
        {
          airport: {
            code: 'ABI',
            airportName: 'Abilene, TX - ABI'
          },
          city: 'Abilene',
          state: 'TX'
        }
      ];

      apiResponse = {
        confirmationNumber: '61805283COUNT',
        driver: { firstName: 'H  X', lastName: 'LI  N', accountNumber: null },
        vendor: 'Advantage',
        vehicleType: 'Mid-size',
        pickupDatetime: '2016-05-26T11:30',
        returnDatetime: '2016-05-31T11:30',
        pickupLocation: 'ABI',
        returnLocation: 'ABI',
        numberOfDays: 5,
        price: {
          dailyRate: {
            value: '55.05',
            currencyCode: 'USD'
          },
          total: {
            value: '204.76',
            currencyCode: 'USD'
          },
          totalWithTaxes: {
            value: '275.25',
            currencyCode: 'USD'
          }
        },
        tax: {
          value: '70.49',
          currencyCode: 'USD'
        },
        mileage: 'Unlimited',
        extras: [],
        rentalDeskLocation: 'We are unable to provide the rental car location.',
        cancelled: false,
        name: '5DR LIFTBACK OR SIMILAR'
      };

      carVendorImages = [
        {
          vendorName: 'Advantage',
          logoImage: '/content/mkt/images/car_vendors/Advantage_Logo_results.png',
          logoImageAltText: 'Advantage'
        }
      ];
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return correct car reservation details', () => {
      const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
        apiResponse,
        carVendorImages,
        carLocations
      );

      expect(carReservation.manageCarReservationDetails).to.deep.equal({
        driver: {
          firstName: 'H  X',
          lastName: 'LI  N',
          accountNumber: null
        },
        confirmationNumber: '61805283COUNT',
        isCancelled: false
      });
      expect(carReservation.carReservationItinerary).to.deep.equal({
        pickUpTime: '2016-05-26T11:30',
        dropOffTime: '2016-05-31T11:30',
        pickUpDate: 'Thursday, May 26, 2016',
        dropOffDate: 'Tuesday, May 31, 2016',
        pickUpAirport: {
          airportCode: 'ABI',
          airportName: 'Abilene',
          cityName: 'Abilene',
          cityState: 'TX'
        },
        dropOffAirport: {
          airportCode: 'ABI',
          airportName: 'Abilene',
          cityName: 'Abilene',
          cityState: 'TX'
        },
        vendorImage: '/content/mkt/images/car_vendors/Advantage_Logo_results.png'
      });
      expect(carReservation.carReservationDetail).to.deep.equal({
        carType: 'Mid-size',
        baseRate: {
          amount: '204.76',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        dailyRate: {
          price: {
            amount: '55.05',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          perQuantity: '5 Days'
        },
        promoCodeApplied: false,
        selectedCarExtras: [],
        totalPrice: {
          amount: '275.25',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        showTotalPrice: true,
        vendorImage: '/content/mkt/images/car_vendors/Advantage_Logo_results.png',
        mileage: {
          cents: 0,
          freeMileage: 'Unlimited',
          per: ''
        },
        rentalDeskLocation: 'We are unable to provide the rental car location.'
      });
    });

    it('should return `Day` for perQuantity unit when numberOfDays is 1 ', () => {
      apiResponse.numberOfDays = 1;
      const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
        apiResponse,
        carVendorImages,
        carLocations
      );

      expect(carReservation.carReservationDetail.dailyRate.perQuantity).equals('1 Day');
    });

    it('should return `Days` for perQuantity unit when numberOfDays is greater than 1 ', () => {
      apiResponse.numberOfDays = 3;
      const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
        apiResponse,
        carVendorImages,
        carLocations
      );

      expect(carReservation.carReservationDetail.dailyRate.perQuantity).equals('3 Days');
    });

    it('should return correct car reservation details when mileage is limited', () => {
      apiResponse.mileage = {
        cents: 25,
        freeMileage: '900',
        per: 'Mile'
      };

      const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
        apiResponse,
        carVendorImages,
        carLocations
      );

      expect(carReservation.carReservationDetail).to.deep.equal({
        carType: 'Mid-size',
        baseRate: {
          amount: '204.76',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        dailyRate: {
          price: {
            amount: '55.05',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          perQuantity: '5 Days'
        },
        promoCodeApplied: false,
        selectedCarExtras: [],
        totalPrice: {
          amount: '275.25',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        showTotalPrice: true,
        vendorImage: '/content/mkt/images/car_vendors/Advantage_Logo_results.png',
        mileage: {
          cents: 25,
          freeMileage: '900',
          per: 'Mile'
        },
        rentalDeskLocation: 'We are unable to provide the rental car location.'
      });
    });

    context('promoCodeApplied', () => {
      it('should be true if the response has appliedDiscounts', () => {
        apiResponse.appliedDiscounts = [
          {
            type: 'PROMOTIONAL_CODE',
            code: 'Muzz017'
          }
        ];

        const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
          apiResponse,
          carVendorImages,
          carLocations
        );

        expect(carReservation.carReservationDetail.promoCodeApplied).to.be.true;
      });

      it('should be false if the response has no appliedDiscounts', () => {
        apiResponse.appliedDiscounts = undefined;

        const carReservation = ReservationDetailsTransformer.transformRetrieveCarReservationApiResponse(
          apiResponse,
          carVendorImages,
          carLocations
        );

        expect(carReservation.carReservationDetail.promoCodeApplied).to.be.false;
      });
    });
  });
});
