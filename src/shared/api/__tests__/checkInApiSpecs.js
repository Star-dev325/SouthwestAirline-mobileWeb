import proxyquire from 'proxyquire';
import _ from 'lodash';
import { sandbox } from 'sinon';
import mockRestClient from 'test/unit/helpers/mockRestClient';

const sinon = sandbox.create();

describe('CheckInApi', () => {
  let checkInApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      chapiAirOperations: 'http://someurl/'
    };

    checkInApi = proxyquire('src/shared/api/checkInApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('retrieveReservation', () => {
    it('should call the correct url with correct parameters (retrieveReservationDetail)', async () => {
      await checkInApi
        .retrieveReservationDetail({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'BAT789'
        })
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.url).to.equal(
            `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/BAT789`
          );
          expect(optionsSentToAjax.body).to.deep.equal({
            firstName: 'Bruce',
            lastName: 'Wayne',
            passengerSearchToken: '',
            recordLocator: 'BAT789'
          });
        });
    });

    it('should call the correct url with correct GET parameters (retrieveReservationDetailWithLink)', async () => {
      const requestQuery = {
        'first-name': 'TERESA',
        'last-name': 'KINTZEL',
        'passenger-search-token':
          'og7Gc2LKmSGVEXyiCoKYVkfuO07Thdh9H9r95D2PVFkdokZyOJ8CfZLBML_zQp2JH-DdBRFRsjcgKwWcRVnUq-PXW1q0J9R_FkkdHw3yr4JfZHTZ-mH97Q5CWcUu1oqEEJayVjTXDReNFRZG_doHMA=='
      };

      await checkInApi
        .retrieveReservationDetailWithLink({
          href: '/v1/mobile-air-operations/page/check-in/LKLMBO',
          method: 'GET',
          query: requestQuery
        })
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.type).to.equal('GET');
          expect(optionsSentToAjax.url).to.equal(
            `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/LKLMBO`
          );
          expect(optionsSentToAjax.query).to.deep.equal(requestQuery);
        });
    });

    it('should call the correct url with correct POST parameters (retrieveReservationDetailWithLink)', async () => {
      const requestBody = {
        firstName: 'Bruce',
        lastName: 'Wayne',
        passengerSearchToken:
          'og7Gc2LKmSGVEXyiCoKYVkfuO07Thdh9H9r95D2PVFkdokZyOJ8CfZLBML_zQp2JH-DdBRFRsjcgKwWcRVnUq-PXW1q0J9R_FkkdHw3yr4JfZHTZ-mH97Q5CWcUu1oqEEJayVjTXDReNFRZG_doHMA=='
      };

      await checkInApi
        .retrieveReservationDetailWithLink({
          body: requestBody,
          href: '/v1/mobile-air-operations/page/check-in/LKLMBW',
          method: 'POST'
        })
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.url).to.equal(
            `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/LKLMBW`
          );
          expect(optionsSentToAjax.body).to.deep.equal(requestBody);
        });
    });

    it('should call the correct url with no POST parameters (retrieveReservationDetail)', async () => {
      const requestBody = {};

      await checkInApi
        .retrieveReservationDetail({
          body: requestBody,
          href: '/v1/mobile-air-operations/page/check-in/RECLOC',
          method: 'POST'
        })
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.url).to.equal(
            `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/RECLOC`
          );
          expect(optionsSentToAjax.body).to.deep.equal({
            firstName: '',
            lastName: '',
            passengerSearchToken: '',
            recordLocator: 'RECLOC'
          });
        });
    });
  });

  context('when add travel document for passenger', () => {
    it('should POST to add travel document with correct request', async () => {
      const requestParams = {
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'whatever',
            travelerIdentifier: 'TRAVELER1',
            firstName: 'Chuck',
            lastName: 'Norris',
            checkInSessionToken: 'JWTSessionToken...',
            nationality: {
              passportInformation: {
                passportNumber: 12354567,
                passportIssuedBy: 'AU',
                nationality: 'AU',
                passportExpirationDate: '1999-01-01',
                countryOfResidence: 'AU'
              }
            },
            emergencyContact: null
          }
        }
      };

      await checkInApi.addTravelDocuments(requestParams).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.be.equal(
          `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/feature/check-in/travel-documents`
        );
        expect(optionsSentToAjax.body).to.deep.equal(requestParams.body);
      });
    });
  });

  it('should check in passenger when user is not logged in', async () => {
    await checkInApi
      .checkInPassenger({
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'R4ZGJ3',
          checkInSessionToken: 'token',
          firstName: 'BOBO',
          lastName: 'XU'
        }
      })
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.be.equal(
          `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in`
        );
        expect(optionsSentToAjax.type).to.be.equal('POST');
        expect(optionsSentToAjax.authentication).to.be.undefined;
        expect(optionsSentToAjax.body).to.be.deep.equal({
          recordLocator: 'R4ZGJ3',
          checkInSessionToken: 'token',
          firstName: 'BOBO',
          lastName: 'XU'
        });
      });
  });

  it('should check in passenger when user is logged in with authentication as true', () => {
    sinon.stub(mockRestClient, 'ajax');
    checkInApi.checkInPassenger({
      href: '/v1/mobile-air-operations/page/check-in',
      method: 'POST',
      body: {
        recordLocator: 'R4ZGJ3',
        checkInSessionToken: 'token',
        firstName: 'BOBO',
        lastName: 'XU'
      },
      isLoggedIn: true
    });

    expect(mockRestClient.ajax).to.have.been.calledWith(sinon.match.any, true);
  });

  it('should auto fill the request field when check in with pnr', async () => {
    await checkInApi
      .checkInPassenger({
        body: {
          recordLocator: 'R4ZGJ3',
          firstName: 'BOBO',
          lastName: 'XU'
        }
      })
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.be.equal(
          `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/view-boarding-details`
        );
        expect(optionsSentToAjax.type).to.be.equal('POST');
        expect(optionsSentToAjax.body).to.be.deep.equal({
          recordLocator: 'R4ZGJ3',
          firstName: 'BOBO',
          lastName: 'XU'
        });
      });
  });

  context('retrieveBoardingPass', () => {
    let link;

    beforeEach(() => {
      link = {
        href: '/v1/mobile-air-operations/page/check-in/mobile-issuance',
        method: 'POST',
        body: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/PH6SGI',
          method: 'POST',
          body: { firstName: 'Some', lastName: 'One', travelerID: ['2401DBD40000A874', '2401DBD40000ABCD'] }
        }
      };
    });

    it('should retrieve boarding passes ', async () => {
      await checkInApi.retrieveBoardingPass(link).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.deep.equal(
          `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/mobile-issuance`
        );
        expect(optionsSentToAjax.type).to.equal(link.method);
        expect(optionsSentToAjax.body).to.deep.equal(link.body);
      });
    });

    it('should retrieve boarding passes with traveler segment identifier', async () => {
      _.set(link, 'body.travelerSegmentIdentifier', ['2401DC1800025B57', '2401DC1800025B5A']);

      await checkInApi.retrieveBoardingPass(link).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.deep.equal(
          `${mockEnvironment.chapiAirOperations}v1/mobile-air-operations/page/check-in/mobile-issuance`
        );
        expect(optionsSentToAjax.type).to.equal(link.method);
        expect(optionsSentToAjax.body).to.deep.equal(link.body);
      });
    });
  });
});
