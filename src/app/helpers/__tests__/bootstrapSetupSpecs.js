import _ from 'lodash';
import { sandbox } from 'sinon';
import bootstrapSetup, { setUpI18nBootstrap } from 'src/app/helpers/bootstrapSetup';
import * as SwaUiLocale from '@swa-ui/locale';
import * as SwaUiBootstrap from '@swa-ui/bootstrap';

const sinon = sandbox.create();

describe('bootstrapSetup', () => {
  let setRetrievalFunctionStub;
  let setI18nRootStub;
  let getBootstrapDataStub;
  let warnStub;

  beforeEach(() => {
    setRetrievalFunctionStub = sinon.stub(SwaUiBootstrap, 'setRetrievalFunction');
    setI18nRootStub = sinon.stub(SwaUiLocale, 'setI18nRoot');
    getBootstrapDataStub = sinon.stub(SwaUiBootstrap, 'getBootstrapData');
    warnStub = sinon.stub(console, 'warn');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set retrieval function when provided', () => {
    bootstrapSetup(() => {});

    expect(setRetrievalFunctionStub).to.have.been.called;
    expect(warnStub).to.not.have.been.called;
  });

  it('should log a warning when retrieval function is missing', () => {
    bootstrapSetup(null);

    expect(setRetrievalFunctionStub).to.not.have.been.called;
    expect(warnStub).to.have.been.calledWith('Missing commonjs bootstrap modules');
  });

  context('setUpI18nBootstrap', () => {
    context('i18n', () => {
      it('should load i18n', () => {
        getBootstrapDataStub.returns({
          SOME_BOOTSTRAP_KEY: 'i18n-properties value'
        });

        setUpI18nBootstrap();

        const allData = setI18nRootStub.getCall(0).args[0];
        const data = _.pick(allData['en'], ['SHARED__HEADER_BUTTON__CANCEL', 'SOME_BOOTSTRAP_KEY']);

        expect(data).to.deep.equal({
          SHARED__HEADER_BUTTON__CANCEL: 'Cancel',
          SOME_BOOTSTRAP_KEY: 'i18n-properties value'
        });
      });

      it('should not override if i18n-properties was same text', () => {
        getBootstrapDataStub.returns({
          CANCEL: 'Cancel'
        });

        setUpI18nBootstrap();

        const allData = setI18nRootStub.getCall(0).args[0];
        const data = _.pick(allData['en'], ['CANCEL']);

        expect(data).to.deep.equal({
          CANCEL: 'Cancel'
        });
      });

      it('should properly override with bootstrap i18n-properties', () => {
        getBootstrapDataStub.returns({
          CANCEL: 'i18n-properties value'
        });

        setUpI18nBootstrap();

        const allData = setI18nRootStub.getCall(0).args[0];
        const data = _.pick(allData['en'], ['CANCEL']);

        expect(data).to.deep.equal({
          CANCEL: 'i18n-properties value'
        });
      });
    });
  });
});
