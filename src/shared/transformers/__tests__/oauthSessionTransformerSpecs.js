import { transformToOauthLoginSession } from 'src/shared/transformers/oauthSessionTransformer';
import { sandbox } from 'sinon';
import dayjs from 'dayjs';
import proxyquire from 'proxyquire';

const sinon = sandbox.create();

describe('oauthSessionTransformer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('transformToOauthLoginSession', () => {
    it('should return a date and time when the token expired based on the api response', () => {
      const currentTime = dayjs();
      const createCurrentTime = () => currentTime.clone();
      const { transformToOauthLoginSession } = proxyquire('src/shared/transformers/oauthSessionTransformer', {
        dayjs: createCurrentTime
      });

      const date = createCurrentTime();
      const apiResponse = { expires_in: 1800 };
      const result = transformToOauthLoginSession(apiResponse);

      expect(result.expirationDate).to.equal(date.add(1800, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSS'));
    });

    it('should return the original fields from the api response', () => {
      const apiResponse = {
        access_token: 'access_token',
        expires_in: 1800,
        id_token: '',
        scope: 'scope',
        token_type: 'Bearer'
      };

      const result = transformToOauthLoginSession(apiResponse);

      expect(result.access_token).to.equal('access_token');
      expect(result.expires_in).to.equal(1800);
      expect(result.id_token).to.equal('');
      expect(result.scope).to.equal('scope');
      expect(result.token_type).to.equal('Bearer');
    });
  });
});
