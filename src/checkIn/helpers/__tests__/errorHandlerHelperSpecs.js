import { sandbox } from 'sinon';

import { browserRefreshErrorHandler } from 'src/checkIn/helpers/checkInErrorHandlerHelper';
import BrowserObject from 'src/shared/helpers/browserObject';

const { location } = BrowserObject;

const sinon = sandbox.create();

describe('errorHandlerHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('browserRefreshErrorHandler', () => {
    it('should trigger location reload', () => {
      sinon.stub(location, 'reload');

      browserRefreshErrorHandler();

      expect(location.reload).to.have.been.called;
    });
  });
});
