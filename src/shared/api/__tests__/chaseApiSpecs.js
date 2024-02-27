import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';

const CHASE_CHAPI = 'v1/mobile-misc/feature/chase';
const SPID = 'spid';
const CELL = 'some_cell';
const chaseSessionId = 'session:1234';
const isComboApp = true;
const GET = 'GET';
const applicationJson = 'application/json';
const json = 'json';

describe('Chase Instant Credit API', () => {
  let environment;
  let ChaseApi;

  beforeEach(() => {
    environment = require('src/shared/api/apiRoutes').default;
    environment.chapiMisc = 'https://the.mobile.com';
    ChaseApi = proxyquire('src/shared/api/chaseApi', {
      'src/shared/api/restClient': mockRestClient
    });
  });

  context('Get Application Info', () => {
    it('should call POST to get application info', (done) => {
      const returnToURL = 'return/url';
      const appendToDAOURL = { mcvid: 'mcvid', clk: 'clk', datachannel: 'datachannel' };
      const req = { SPID, CELL, chaseSessionId, returnToURL, isComboApp, appendToDAOURL };

      ChaseApi.getApplicationInfo(req)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.contain('/v2/chase/applications');
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.contentType).to.equal(applicationJson);
          expect(optionsSentToAjax.body).to.deep.equal({
            application: 'chase-offer',
            cell: CELL,
            chaseSessionId,
            returnToURL,
            isComboApp,
            site: 'southwest',
            spid: SPID,
            appendToDAOURL
          });
        })
        .done(done);
    });
  });

  context('Create session ID', () => {
    context('without encryptedRapidRewardsNumber', () => {
      it('should pass correct body to API', (done) => {
        const expectUrl = 'https://the.mobile.com/v1/mobile-misc/feature/chase/sessions';

        ChaseApi.createSession('http://localhost:3000/air/booking/pricing/summary', true)
          .then((requestObject) => {
            expect(requestObject.url).to.deep.equal(expectUrl);
            expect(requestObject.body).to.deep.equal({
              returnUrl: 'http://localhost:3000/air/booking/pricing/summary'
            });
          })
          .done(done);
      });
    });

    context('with encryptedRapidRewardsNumber', () => {
      it('should pass correct body to API', (done) => {
        const expectUrl = 'https://the.mobile.com/v1/mobile-misc/feature/chase/sessions';
        const encryptedRapidRewardsNumber = 'abc123';

        ChaseApi.createSession('http://localhost:3000/air/booking/pricing/summary', true, encryptedRapidRewardsNumber)
          .then((requestObject) => {
            expect(requestObject.url).to.deep.equal(expectUrl);
            expect(requestObject.body).to.deep.equal({
              encryptedRapidRewardsNumber,
              returnUrl: 'http://localhost:3000/air/booking/pricing/summary'
            });
          })
          .done(done);
      });
    });
  });

  context('Retrieve chase instant credit result', () => {
    it('should pass correct parameters to API', (done) => {
      ChaseApi.retrieveChaseInstantCreditResponse(chaseSessionId)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.contain(`${CHASE_CHAPI}/sessions/${chaseSessionId}/instant-credits`);
          expect(optionsSentToAjax.type).to.equal(GET);
          expect(optionsSentToAjax.contentType).to.equal(applicationJson);
          expect(optionsSentToAjax.dataType).to.equal(json);
        })
        .done(done);
    });
  });
});
