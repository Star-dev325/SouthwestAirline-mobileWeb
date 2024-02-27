import mockRestClient from 'test/unit/helpers/mockRestClient';
import Q from 'q';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import { splitPnrLinkObjWithSelectedIdsAndEmail } from 'test/builders/model/selectPassengersPageBuilder';

const sinon = sandbox.create();

describe('ReservationApi', () => {
  let ReservationApi;
  let mockEnvironment;
  let transformToViewReservationResponseStub;

  beforeEach(() => {
    mockEnvironment = {
      mobile: 'http://notSet',
      chapiMisc: 'https://the.car.com',
      chapiAirBooking: 'https://the.air.booking'
    };

    transformToViewReservationResponseStub = sinon.stub();

    ReservationApi = proxyquire('src/shared/api/reservationApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment },
      'src/shared/api/transformers/reservationApiTransformer': {
        transformToViewReservationResponse: transformToViewReservationResponseStub
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when retrieving a reservation', () => {
    it('should give isLoggedIn false when user is not logged in', () => {
      sinon.stub(mockRestClient, 'ajax').returns(Q());

      return ReservationApi.retrieveReservation(
        {
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'G875E641231'
        },
        false
      ).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];
        const isLoggedIn = mockRestClient.ajax.lastCall.args[1];

        expect(ajaxCallParameter.url).to.deep.equal(
          `${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/view-reservation/G875E641231`
        );
        expect(ajaxCallParameter.body).to.deep.equal({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'G875E641231'
        });
        expect(isLoggedIn).to.be.false;
      });
    });

    it('should give isLoggedIn true when user is logged in', () => {
      sinon.stub(mockRestClient, 'ajax').returns(Q());

      return ReservationApi.retrieveReservation(
        {
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'G875E641231'
        },
        true
      ).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];
        const isLoggedIn = mockRestClient.ajax.lastCall.args[1];

        expect(ajaxCallParameter.url).to.deep.equal(
          `${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/view-reservation/G875E641231`
        );
        expect(ajaxCallParameter.body).to.deep.equal({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'G875E641231'
        });
        expect(isLoggedIn).to.be.true;
      });
    });

    it('should specify optional params when specified', () => {
      sinon.stub(mockRestClient, 'ajax').returns(Q());
      const passengerSearchToken = '123456789abcdefg';

      return ReservationApi.retrieveReservation(
        {
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'G875E641231',
          hasEditedName: true,
          passengerSearchToken
        },
        true
      ).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];

        expect(ajaxCallParameter.url).to.deep.equal(
          `${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/view-reservation/G875E641231`
        );
        expect(ajaxCallParameter.body).to.deep.equal({
          firstName: 'Bruce',
          lastName: 'Wayne',
          hasEditedName: true,
          passengerSearchToken: passengerSearchToken,
          recordLocator: 'G875E641231'
        });
      });
    });
  });

  context('when retrieving a car reservation', () => {
    beforeEach(() => {
      mockEnvironment.car = 'https://the.car.com';

      const CarReservationBuilder = require('test/builders/apiResponse/v1/mobile-misc/feature/cars/reservations/confirmation-number/carReservationBuilder');

      sinon.stub(mockRestClient, 'ajax').returns(Q(new CarReservationBuilder().build()));
    });

    it('should use the car url with confirmation number appended', () =>
      ReservationApi.retrieveCarReservation({
        firstName: 'Bruce',
        lastName: 'Wayne',
        confirmationNumber: 'G875E641231',
        pickupDate: '2016-03-15'
      }).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];

        expect(ajaxCallParameter.url).to.deep.equal(
          `${mockEnvironment.car}/v1/mobile-misc/feature/cars/reservations/G875E641231`
        );
      }));

    it('should use the car url with default value as confirmation number appended with searchToken', () =>
      ReservationApi.retrieveCarReservation({
        searchToken: 'aee!asfasdgagdsgasdgagsadgasg'
      }).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];

        expect(ajaxCallParameter.url).to.deep.equal(
          `${mockEnvironment.car}/v1/mobile-misc/feature/cars/reservations/CARRECLOCAT`
        );
      }));

    it('should pass query parameters to API', () =>
      ReservationApi.retrieveCarReservation({
        firstName: 'Bruce',
        lastName: 'Wayne',
        confirmationNumber: 'G875E641231',
        pickupDate: '2016-03-15'
      }).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];

        expect(ajaxCallParameter.query).to.deep.equal({
          'first-name': 'Bruce',
          'last-name': 'Wayne',
          'pickup-date': '2016-03-15'
        });
      }));

    it('should pass searchToken as query parameters to API', () =>
      ReservationApi.retrieveCarReservation({
        searchToken: 'aee!asfasdgagdsgasdgagsadgasg'
      }).then(() => {
        const ajaxCallParameter = mockRestClient.ajax.lastCall.args[0];

        expect(ajaxCallParameter.query).to.deep.equal({
          'car-search-token': 'aee!asfasdgagdsgasdgagsadgasg'
        });
      }));
  });

  context('retrieve travel information', () => {
    it('should call chapi api with correct data', () => {
      const requestParamenters = {
        href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
        method: 'GET',
        query: { 'first-name': 'Some', 'last-name': 'One', 'passenger-reference': '2' }
      };

      return ReservationApi.retrieveTravelInformation(requestParamenters).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: 'https://the.air.booking/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          type: 'GET',
          dataType: 'json',
          query: {
            'first-name': 'Some',
            'last-name': 'One',
            'passenger-reference': '2'
          }
        });
      });
    });
  });

  context('retrieve day of travel contact information', () => {
    it('should call chapi api with correct data', () => {
      const request = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
        method: 'GET',
        query: {
          'passenger-search-token':
            'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
        }
      };

      return ReservationApi.retrieveDayOfTravelContactInformation(request).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: `https://the.air.booking${request.href}`,
          type: request.method,
          query: request.query,
          dataType: 'json',
          contentType: 'application/json'
        });
      });
    });
  });

  context('update day of travel contact information', () => {
    it('should call chapi api with correct data', () => {
      const request = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
        method: 'POST',
        body: {
          contactInformation: {
            passengerSearchToken:
              '9N-2TiodX6GUHo0qf9tvob0Ygx_V0iMDEX1pXIkre9S7r7NKn4wAk_GUdhULuxXcKxaykabXzQnV_DnjDja9rn7bZU_RXy28p5R8Y1zMO7P9lFE2BMj0y22ajFkSNzprt8tjbyWEBhOOVYGrVA==',
            contactInfoToken:
              'eyJjb250YWN0RW1haWxFeGlzdHMiOmZhbHNlLCJjb250YWN0UGhvbmVFeGlzdHMiOmZhbHNlLCJjb250YWN0VGV4dE1lc3NhZ2VQaG9uZUV4aXN0cyI6dHJ1ZX0=',
            contactEmail: null,
            contactPhone: null,
            contactTextMessagePhone: {
              countryCode: '1',
              number: '4694893989',
              preferredLanguage: 'EN'
            },
            internationalDeclineNotifications: false
          }
        }
      };

      return ReservationApi.updateDayOfTravelContactInformation(request).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: `https://the.air.booking${request.href}`,
          type: request.method,
          contentType: 'application/json',
          dataType: 'json',
          body: request.body
        });
      });
    });
  });

  context('update travel information', () => {
    it('should call chapi api with correct data', () => {
      const body = {
        'first-name': 'Some',
        'last-name': 'One',
        'passenger-reference': '2',
        passportInformation: {
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2022-10-29',
          countryOfResidence: 'US'
        },
        emergencyContact: {
          name: 'Someone Else',
          contactPhone: {
            countryCode: 'US',
            number: '469-422-3678'
          }
        },
        accountNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerId: '123456789012345'
      };
      const requestParamenters = {
        href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
        method: 'POST',
        body
      };

      return ReservationApi.updateTravelInformation(requestParamenters, 'PPUWKZ').then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: 'https://the.air.booking/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          type: 'POST',
          contentType: 'application/json',
          body: {
            editPNRPassengerUpdate: body
          }
        });
      });
    });
  });

  context('contact tracing', () => {
    it('should send link to retrieve contact tracing', () => {
      const link = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-tracing/2TFCMB',
        method: 'GET',
        query: 'N/A'
      };

      return ReservationApi.retrieveContactTracing(link).then((request) => {
        expect(request).to.be.deep.equal({
          url: `https://the.air.booking${link.href}`,
          type: link.method,
          query: link.query,
          dataType: 'json'
        });
      });
    });

    it('should send link and updated passenger to update contact tracing', () => {
      const link = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-tracing/2TFCMB',
        method: 'POST',
        query: 'N/A',
        contactTracingUpdateBody: {
          passengerSearchToken: 'EPEBX6Wntm5ojZ2Tg8FHv2vIHtlbCeewsZnVzLULYw'
        }
      };
      const passenger = {
        contactEmail: 'example@wncom.com'
      };

      return ReservationApi.updateContactTracing(link, passenger).then((request) => {
        expect(request).to.be.deep.equal({
          url: `https://the.air.booking${link.href}`,
          type: link.method,
          query: link.query,
          contentType: 'application/json',
          body: {
            passengerSearchToken: 'EPEBX6Wntm5ojZ2Tg8FHv2vIHtlbCeewsZnVzLULYw',
            passengers: [passenger]
          }
        });
      });
    });
  });

  describe('retrieve split pnr reservation', () => {
    it('should call chapi api with correct data', () =>
      ReservationApi.retrieveSplitPnrReservation(splitPnrLinkObjWithSelectedIdsAndEmail).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: 'https://the.air.booking/v1/mobile-air-booking/page/flights/change/split-pnr/PPUWKZ',
          type: 'PUT',
          contentType: 'application/json',
          dataType: 'json',
          body: {
            passengerSearchToken: 'testToken',
            passengerIds: ['id1'],
            receiptEmail: 'test@test.com'
          }
        });
      }));
  });

  describe('retrieveReservationChangeable', () => {
    it('should make correct retrieveReservationChangeable GET call', () => {
      const requestParamenters = {
        href: '/api/mobile-air-booking/v1/mobile-air-booking/page/flights/change/current/2UEYJB',
        method: 'GET',
        query: { 'first-name': 'Bruce', 'last-name': 'Wayne', 'passenger-search-token': 'test12345' }
      };

      ReservationApi.retrieveReservationChangeable(requestParamenters).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: 'https://the.air.booking/api/mobile-air-booking/v1/mobile-air-booking/page/flights/change/current/2UEYJB',
          type: 'GET',
          contentType: 'application/json',
          dataType: 'json',
          query: {
            'first-name': 'Bruce',
            'last-name': 'Wayne',
            'passenger-search-token': 'test12345'
          }
        });
      });
    });

    it('should make correct retrieveReservationChangeable POST call', () => {
      const requestParamenters = {
        href: '/api/mobile-air-booking/v1/mobile-air-booking/page/flights/change/current/2UEYJB',
        method: 'POST',
        body: { 'firstName': 'Bruce', 'lastName': 'Wayne', 'passengerSearchToken': 'test12345' }
      };

      ReservationApi.retrieveReservationChangeable(requestParamenters).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.be.deep.equal({
          url: 'https://the.air.booking/api/mobile-air-booking/v1/mobile-air-booking/page/flights/change/current/2UEYJB',
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          body: {
            firstName: 'Bruce',
            lastName: 'Wayne',
            passengerSearchToken: 'test12345'
          }
        });
      });
    });
  });
});
