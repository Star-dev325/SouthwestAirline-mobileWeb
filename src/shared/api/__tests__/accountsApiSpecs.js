import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import CreditCardApiRequestBuilder from 'test/builders/apiRequest/creditCardApiRequestBuilder';

const sinon = sandbox.create();
const passengerBasicInfo = {
  firstName: 'Judy',
  middleName: '',
  lastName: 'SFSDF',
  accountNumber: '123123'
};

describe('AccountsApi', () => {
  let AccountApi;
  let mockEnvironment;
  let mockSavedCreditCardTransformer;

  beforeEach(() => {
    mockEnvironment = {
      chapiMisc: 'http://chapi'
    };
    mockSavedCreditCardTransformer = {
      transformToUpdateCreditCardApiRequestForChapi: sinon.stub()
    };
    AccountApi = proxyquire('src/shared/api/accountsApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment },
      'src/shared/transformers/savedCreditCardTransformer': mockSavedCreditCardTransformer,
      'src/myAccount/transformers/parseUpcomingTrips': (response) => response
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get security questions', (done) => {
    AccountApi.getSecurityQuestions()
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal('http://chapi/v1/mobile-misc/feature/accounts/security-questions');
        expect(optionsSentToAjax.dataType).to.deep.equal('json');
      })
      .finally(done);
  });

  describe('enroll', () => {
    const mockEmailSubscriptions = { optInForEmailSubscriptions: true };

    it('should call chapi url to enroll', (done) => {
      AccountApi.createAccount({ userName: 'Test' })
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.match(/chapi\/v1\/mobile-misc\/feature\/accounts\/enroll/);
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal({ userName: 'Test' });
        })
        .finally(done);
    });

    it('should call CHAPI to enroll RR for existing customer', (done) => {
      AccountApi.updateRapidRewards(mockEmailSubscriptions)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.contain('/v1/mobile-misc/feature/my-account/enroll-customer');
          expect(optionsSentToAjax.body).to.deep.equal(mockEmailSubscriptions);
          expect(optionsSentToAjax.type).to.deep.equal('PUT');
        })
        .finally(done);
    });
  });

  describe('promo codes', () => {
    it('should call chapi url to fetch promo codes', (done) => {
      AccountApi.fetchPromoCodes()
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.contain('v1/mobile-misc/page/my-account/promo-codes');
          expect(optionsSentToAjax.url).to.match(/v1\/mobile-misc\/page\/my-account\/promo-codes/);
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.url).to.not.contain('?');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
        })
        .finally(done);
    });
  });

  describe('past flights', () => {
    it('should get past flights using chapi api and no parameters', (done) => {
      AccountApi.fetchPastFlights()
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.match(/v1\/mobile-misc\/page\/my-account\/past-flights/);
          expect(optionsSentToAjax.url).to.not.contain('?');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
        })
        .finally(done);
    });
  });

  describe('saved flight', () => {
    it('should get saved flight using chapi', () =>
      AccountApi.fetchSavedFlights().then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.match(/v1\/mobile-misc\/page\/my-account\/saved-flights/);
        expect(optionsSentToAjax.dataType).to.deep.equal('json');
      }));
  });

  it('should look up account number', (done) => {
    AccountApi.accountNumberLookup(passengerBasicInfo)
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.contain('v1/mobile-misc/feature/accounts/lookup');
        expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
        expect(optionsSentToAjax.body).to.deep.equal(passengerBasicInfo);
        expect(optionsSentToAjax.type).to.deep.equal('POST');
      })
      .finally(done);
  });

  it('should look up account number when passenger is frequent traveler using secure endpoint', () => {
    const passengerInfo = {
      ...passengerBasicInfo,
      frequentTravelerId: '1-ABCDE',
      frequentTravelerToken: 'ABCDEF'
    };

    AccountApi.accountNumberLookup(passengerInfo, true).then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.contain('v1/mobile-misc/feature/accounts/x-lookup');
      expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
      expect(optionsSentToAjax.body).to.deep.equal(passengerInfo);
      expect(optionsSentToAjax.type).to.deep.equal('POST');
    });
  });

  it('should retrieve saved credit card by correct url', (done) => {
    mockEnvironment.chapiMisc = 'https://chapi.com';
    AccountApi.fetchSavedCreditCardsById('abcdefg').then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.equal(
        'https://chapi.com/v1/mobile-misc/page/air-booking/payment-option/abcdefg'
      );
      done();
    });
  });

  it('should retrieve all payment options by correct url', () => {
    mockEnvironment.chapiMisc = 'https://chapi.com';

    return AccountApi.fetchPaymentOptions().then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.equal('https://chapi.com/v1/mobile-misc/page/air-booking/payment-options');
    });
  });

  describe('fetchAccountInfo', () => {
    it('should call new end point to get the account information', (done) => {
      AccountApi.fetchAccountInfo()
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.deep.equal('http://chapi/v1/mobile-misc/feature/my-account');
        })
        .finally(done);
    });
  });

  describe('saveCC', () => {
    beforeEach(() => {
      mockEnvironment.chapiMisc = 'https://api-mobile-misc.mobile.com';
    });

    it('should call new end point to get the saved credit card information', (done) =>
      AccountApi.fetchNewSavedCreditCards()
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.deep.equal(
            'https://api-mobile-misc.mobile.com/v1/mobile-misc/feature/my-account/credit-cards'
          );
        })
        .done(done));

    it('should pass the correct parameters and use old endpoint when delete credit card', (done) => {
      const creditCards = ['someCreditCard'];

      AccountApi.deleteCreditCards(creditCards)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.type).to.deep.equal('DELETE');
          expect(optionsSentToAjax.query).to.deep.equal({
            savedCreditCardId: ['someCreditCard']
          });
          expect(optionsSentToAjax.url).to.match(/v1\/mobile-misc\/feature\/my-account\/credit-cards/);
        })
        .finally(done);
    });

    it('should pass the correct parameters to ajax and use CHAPI endpoint when make credit card as primary', (done) => {
      const creditCardId = 'creditCardId';

      AccountApi.makeCreditCardPrimary(creditCardId)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
          expect(optionsSentToAjax.type).to.deep.equal('POST');
          expect(optionsSentToAjax.body).to.deep.equal({ savedCreditCardId: 'creditCardId' });
          expect(optionsSentToAjax.url).to.deep.equal(
            'https://api-mobile-misc.mobile.com/v1/mobile-misc/feature/my-account/credit-cards/primary'
          );
        })
        .finally(done);
    });

    it('should call transformToUpdateCreditCardApiRequestForChapi to transform the request to body and pass the correct parameters to ajax and use CHAPI endpoint when update credit card', (done) => {
      mockSavedCreditCardTransformer.transformToUpdateCreditCardApiRequestForChapi.returns('transformedForChapi');
      const updateCreditCardRequest = CreditCardApiRequestBuilder.getUpdateCreditCardRequest();

      AccountApi.updateCreditCard(updateCreditCardRequest).then((optionsSentToAjax) => {
        expect(mockSavedCreditCardTransformer.transformToUpdateCreditCardApiRequestForChapi).to.have.been.calledWith(
          updateCreditCardRequest
        );
        expect(optionsSentToAjax.contentType).to.equal('application/json');
        expect(optionsSentToAjax.type).to.equal('PUT');
        expect(optionsSentToAjax.body).to.equal('transformedForChapi');
        expect(optionsSentToAjax.url).to.equal(
          'https://api-mobile-misc.mobile.com/v1/mobile-misc/feature/my-account/credit-cards'
        );
        done();
      });
    });
  });

  describe('registerPromotion', () => {
    it('should register promotion using chapi api when feature toggle is on', (done) => {
      const url = '/api/my-account/register-promotion';
      const requestData = createRequestDataWithUrl(url);

      AccountApi.registerPromotion(requestData)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.match(/chapi\/api\/my-account\/register-promotion/);
          expect(optionsSentToAjax.contentType).to.deep.equal('application/json');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
          expect(optionsSentToAjax.body).to.deep.equal({ promotionId: 'id' });
        })
        .finally(done);
    });

    function createRequestDataWithUrl(url) {
      return {
        href: url,
        method: 'POST',
        body: { promotionId: 'id' }
      };
    }
  });

  describe('fetchPromotionDetails', () => {
    it('should pass the correct parameters to ajax', (done) => {
      const requestData = {
        href: '/page/my-account/promotion-details/promotionId',
        method: 'GET'
      };

      AccountApi.fetchPromotionDetails(requestData)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.contain('chapi/page/my-account/promotion-details/promotionId');
          expect(optionsSentToAjax.type).to.deep.equal('GET');
          expect(optionsSentToAjax.dataType).to.deep.equal('json');
        })
        .finally(done);
    });
  });

  it('should call getUpcomingTrips with Page API url', (done) => {
    AccountApi.getUpcomingTrips()
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.contain('v1/mobile-misc/page/upcoming-trips');
        expect(optionsSentToAjax.type).to.deep.equal('GET');
        expect(optionsSentToAjax.dataType).to.deep.equal('json');
      })
      .finally(done);
  });

  describe('Save contact method', () => {
    beforeEach(() => {
      mockEnvironment.chapiMisc = 'https://api-mobile-misc.mobile.com';
    });

    it('should pass correct params to call save contact method', () =>
      AccountApi.saveContactMethod({
        contactMethodUpdate: {
          contactMethod: 'TEXT_ME',
          otherFields: 'ingore'
        }
      }).then((options) => {
        expect(options.url).to.equal(
          'https://api-mobile-misc.mobile.com/v1/mobile-misc/feature/my-account/contact-method'
        );
        expect(options.type).to.equal('PUT');
        expect(options.contentType).to.equal('application/json');
        expect(options.body).to.deep.equal({
          contactMethodUpdate: {
            contactMethod: 'TEXT_ME',
            otherFields: 'ingore'
          }
        });
      }));
  });
});
