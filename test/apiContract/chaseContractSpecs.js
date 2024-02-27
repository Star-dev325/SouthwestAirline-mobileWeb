const _ = require('lodash');
const contractTest = require('test/apiContract/contractTestMochaWrappers');

const ANY_DIGIT = /\d.\d/;
const baseChapiChaseUrl = 'https://api-mobile-misc.dev4.southwest.com/v1/mobile-misc/feature/chase';
const baseMockChaseUrl = 'https://xldadm01:4700';
const apiKey = 'l7xxbfc2e646cc724d3ab0fe30857157cec0';

describe('chase', () => {
  let chaseSessionId;

  describe('creates session id', () => {
    let responseBody;

    contractTest.before(() => chaseChapi
      .post('/sessions')
      .send({
        returnUrl: 'https://mobile.itest2.southwest.com/air/pricing/summary'
      })
      .then((response) => {
        responseBody = response.body;
        chaseSessionId = _.get(response, 'body.chaseSessionId');
      }));

    it('should have response body with chase session id', () => {
      expect(responseBody).to.have.property('chaseSessionId');
      expect(responseBody.chaseSessionId).to.not.be.empty;
    });
  });

  describe('chase instant credit result', () => {
    let responseBody;

    contractTest.before(() => chaseMockApi.post('/decision')
      .type('form')
      .send({
        redirectEnvironment: 'mweb_itest2',
        wapiEnvironment: 'dev4',
        returnPage: 'price',
        firstName: 'Test',
        middleName: 'T',
        lastName: 'Tester',
        addressLine1: '1234 Address',
        addressLine2: '21',
        city: 'City',
        state: 'TX',
        postalCode: '12345',
        countryCode: 'US',
        email: 'test@test.com',
        sessionId: chaseSessionId,
        customerId: '121212121212121212',
        decisionType: 'approved',
        accountNumber: '4012885922421881',
        expirationDate: '2019-02',
        creditLimit: 2000
      })
      .then(() => chaseChapi.get(`/sessions/${chaseSessionId}/instant-credits`)
        .then((response) => {
          responseBody = response.body;
        })));

    it('should not be null', () => {
      expect(responseBody).to.not.be.null;
    });

    it('should return the application status and credit limit', () => {
      expect(responseBody.creditLimit).to.equal('2000').and.match(ANY_DIGIT);
      expect(responseBody.creditStatus).to.equal('APPROVED');
    });

    it('should return the customer information', () => {
      expect(responseBody.customer).to.not.be.null;
      expect(responseBody.customer.firstName).to.equal('Test');
      expect(responseBody.customer.middleName).to.equal('T');
      expect(responseBody.customer.lastName).to.equal('Tester');
      expect(responseBody.customer.customerNumber).to.equal('121212121212121212');
      expect(responseBody.customer.primaryAddress.line1).to.equal('1234 Address');
      expect(responseBody.customer.primaryAddress.line2).to.equal('21');
      expect(responseBody.customer.primaryAddress.city).to.equal('City');
      expect(responseBody.customer.primaryAddress.state).to.equal('TX');
      expect(responseBody.customer.primaryAddress.zipOrPostalCode).to.equal('12345');
      expect(responseBody.customer.primaryAddress.countryCode).to.equal('US');
    });
  });
});

const chaseChapiMethods = ['get', 'post'];
const chaseChapi = _.zipObject(chaseChapiMethods, _.map(chaseChapiMethods, (method) => function(resource) {
  return chai.request(baseChapiChaseUrl)[method](resource)
    .set('X-API-Key', apiKey);
}));

const chaseMockApi = {
  post(resource) {
    return chai.request(baseMockChaseUrl)
      .post(resource);
  }
};
