import ChapiPastFlightBuilder from 'test/builders/model/chapiPastFlightBuilder';
import transformToSearchFlightRequest from 'src/myAccount/transformers/pastFlightTransformer';
import TripTypes from 'src/shared/constants/tripTypes';

describe('pastFlightTransformer', () => {
  it('transformToSearchFlightRequestForRoundTrip', () => {
    const pastFlight = new ChapiPastFlightBuilder().build();

    expect(transformToSearchFlightRequest(pastFlight)).to.be.deep.equal({
      destination: 'DAL',
      isRoundTrip: true,
      origin: 'HOU',
      tripType: 'roundTrip',
      departureDate: TripTypes.ROUND_TRIP.departureDate,
      returnDate: TripTypes.ROUND_TRIP.returnDate
    });
  });

  it('transformToSearchFlightRequestForOneWay', () => {
    const pastFlight = new ChapiPastFlightBuilder().withType('ONE_WAY').build();

    expect(transformToSearchFlightRequest(pastFlight)).to.be.deep.equal({
      destination: 'DAL',
      isRoundTrip: false,
      origin: 'HOU',
      tripType: 'oneWay',
      departureDate: TripTypes.ONE_WAY.departureDate,
      returnDate: ''
    });
  });
});
