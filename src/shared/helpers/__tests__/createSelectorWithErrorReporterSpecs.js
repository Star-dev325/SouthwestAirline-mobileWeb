import sinonModule from 'sinon';
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const sinon = sinonModule.sandbox.create();

describe('SelectorErrorReporter', () => {
  let errorLogStub;

  beforeEach(() => {
    errorLogStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return selector when there is no error', () => {
    const selectorParamsMock = [[], () => 'testData'];

    expect(createSelector(...selectorParamsMock)()).to.be.equal('testData');
  });

  it('should report error when catch the error', () => {
    const mockError = new Error();
    const selectorParamsMock = [
      [],
      () => {
        throw mockError;
      }
    ];

    expect(createSelector(...selectorParamsMock)).to.throw(mockError);
    expect(errorLogStub).to.be.calledWith(mockError);
  });

  it('should inherit resultFunc of selector', () => {
    const getterMock = _.noop;
    const selectorParamsMock = [getterMock, (data) => data];

    expect(createSelector(...selectorParamsMock).resultFunc('testData')).to.be.equal('testData');
  });
});
