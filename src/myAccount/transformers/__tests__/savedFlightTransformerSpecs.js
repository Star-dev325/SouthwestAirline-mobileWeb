import transformToCHAPICheckPriceRequest from 'src/myAccount/transformers/savedFlightTransformer';
import ChapiSavedFlightBuilder from 'test/builders/model/chapiSavedFlightBuilder';

describe('savedFlightTransformer', () => {
  let savedFlight;

  before(() => {
    savedFlight = new ChapiSavedFlightBuilder().build();
  });

  it('transformToCHAPICheckPriceRequest', () => {
    expect(transformToCHAPICheckPriceRequest(savedFlight)).to.deep.equal({
      tripType: 'oneWay',
      origin: 'HOU',
      destination: 'DAL',
      departureDate: '2015-04-07',
      returnDate: null,
      numberOfAdults: 1,
      currencyType: 'USD',
      promoCode: ''
    });
  });
});
