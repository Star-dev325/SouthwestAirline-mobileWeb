import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';

describe('AirChangeApi', () => {
  let AirChangeApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      reservations: 'https://whatever.com',
      mobile: 'https://mobile.com',
      chapiAirBooking: 'https://mobile.com/'
    };

    AirChangeApi = proxyquire('src/shared/api/airChangeApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  context('call the air change purchase api', () => {
    const request = {
      href: '/href',
      xhref: '/xhref',
      method: 'POST',
      body: {
        changeSession: 'changeSession'
      }
    };

    it('should call air change confirmation api with right options when user is logged in', (done) => {
      AirChangeApi.changePurchase(request, true)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal('https://mobile.com/xhref');
          expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal(request.body);
        })
        .done(done);
    });

    it('should call air change confirmation api with right options when user is not logged in', (done) => {
      AirChangeApi.changePurchase(request, false)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal('https://mobile.com/href');
          expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal(request.body);
        })
        .done(done);
    });
  });

  context('flight shopping', () => {
    it('should make ajax request with correct parameters', (done) => {
      const request = {
        href: 'url',
        method: 'POST',
        body: {
          outbound: {
            boundReference: 'bbbbbbbb',
            date: '2018-05-02',
            'origin-airport': 'DAL',
            'destination-airport': 'AUS',
            isChangeBound: false
          },
          inbound: {
            boundReference: 'aaaaaaaaa',
            date: '2018-05-04',
            'origin-airport': 'AUS',
            'destination-airport': 'DAL',
            isChangeBound: false
          }
        }
      };

      AirChangeApi.findFlightProducts(request)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal('https://mobile.com/url');
          expect(optionsSentToAjax.contentType).to.equal('application/json');
          expect(optionsSentToAjax.dataType).to.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal(request.body);
        })
        .done(done);
    });
  });

  context('get pricing', () => {
    it('should call the pricing difference api', (done) => {
      const request = {
        href: 'url',
        method: 'POST',
        body: {
          changeRequests: [
            {
              productId: 'string',
              boundReference: 'string'
            }
          ]
        }
      };

      AirChangeApi.getPricing(request, true)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal('https://mobile.com/url');
          expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal(request.body);
        })
        .done(done);
    });
  });
});
