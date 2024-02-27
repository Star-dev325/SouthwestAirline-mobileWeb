import sinonModule from 'sinon';
import BrowserObject from 'src/shared/helpers/browserObject';
import { forceDomUpdatesAndThenExecute, scrollToTop } from 'src/shared/helpers/uiHelper';
import waitFor from 'test/unit/helpers/waitFor';

const { document } = BrowserObject;

const sinon = sinonModule.sandbox.create();

describe('uiHelper', () => {
  const defaultRequestAnimationFrame = global.requestAnimationFrame;

  afterEach(() => {
    sinon.restore();
    global.requestAnimationFrame = defaultRequestAnimationFrame;
  });

  it('scrollToTop should  make appContent back to top when invoked', (done) => {
    const mockApp = {
      scrollTop: 755
    };

    sinon.stub(document, 'querySelector').withArgs('.app__contents').returns(mockApp);

    scrollToTop();
    waitFor.untilAssertPass(() => expect(document.querySelector('.app__contents').scrollTop).to.equal(0), done);
  });

  context('forceDomUpdatesAndThenExecute', () => {
    it('callbackFn should be called if dom updates are complete', (done) => {
      const callbackFnStub = sinon.stub();

      global.requestAnimationFrame = (cb) => setTimeout(() => cb(), 50);

      forceDomUpdatesAndThenExecute(callbackFnStub);

      waitFor.aMoment(150).then(() => {
        expect(callbackFnStub).to.have.been.called;
        done();
      });
    });

    it('callbackFn should not be called if dom updates are not complete', (done) => {
      const callbackFnStub = sinon.stub();

      global.requestAnimationFrame = (cb) => setTimeout(() => cb(), 50);

      forceDomUpdatesAndThenExecute(callbackFnStub);

      waitFor.aMoment(75).then(() => {
        expect(callbackFnStub).to.not.have.been.called;
        done();
      });
    });
  });
});
