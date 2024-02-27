import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';

describe('Car Cancel API', () => {
  let CarCancelApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {};

    CarCancelApi = proxyquire('src/shared/api/carCancelApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  it('should pass correct query parameters to API', () => {
    mockEnvironment.chapiMisc = 'https://the.reservations.com';
    const expectQueryUrl = 'https://the.reservations.com/v1/mobile-misc/feature/cars/reservations/61805258COUNT';

    return CarCancelApi.cancelCarReservation({
      confirmationNumber: '61805258COUNT',
      firstName: 'HX',
      lastName: 'Lin',
      pickUpDate: '2016-05-09'
    }).then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.deep.equal(expectQueryUrl);
      expect(optionsSentToAjax.query).to.deep.equal({
        'first-name': 'HX',
        'last-name': 'Lin',
        'pickup-date': '2016-05-09'
      });
    });
  });

  it('should pass searchToken as query parameters to API', () => {
    mockEnvironment.chapiMisc = 'https://the.reservations.com';
    const expectQueryUrl = 'https://the.reservations.com/v1/mobile-misc/feature/cars/reservations/CARRECLOCAT';

    return CarCancelApi.cancelCarReservation({
      searchToken: 'asdf!fasdfadgasdggasdgadgsd'
    }).then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.deep.equal(expectQueryUrl);
      expect(optionsSentToAjax.query).to.deep.equal({
        'car-search-token': 'asdf!fasdfadgasdggasdgadgsd'
      });
    });
  });
});
