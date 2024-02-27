import { history } from 'src/appHistory';
import sinonModule from 'sinon';
import * as urlHelper from 'src/shared/helpers/urlHelper';
import {
  showFullScreenModal,
  hideFullScreenModal,
  hideModalAndUpdateFormField,
  getModalId
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

const sinon = sinonModule.sandbox.create();

describe('fullScreenModalHelperSpecs', () => {
  const id = 'from';

  beforeEach(() => {
    sinon.stub(history, 'push');
    sinon.stub(history, 'goBack');
    sinon.stub(urlHelper, 'getQueryStringParameterByKey').returns(id);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add modal id in url when no other full screen modal has shown', async () => {
    await showFullScreenModal('other id');
    expect(history.push).to.be.calledWith('?_modal=other%20id');
  });

  it('should add modal id in url when no other full screen modal has shown', async () => {
    await showFullScreenModal(id);
    expect(history.push).not.to.be.called;
  });

  it('should call goBack when hide full screen modal', () => {
    hideFullScreenModal(id);
    expect(history.goBack).to.be.called;
  });

  it('should not call goBack when url not contain modal', async () => {
    await hideFullScreenModal('other id');

    expect(history.goBack).not.to.be.called;
  });

  it('should get modal id', () => {
    const result = getModalId();

    expect(result).to.equal(id);
  });

  it('should hide modal and call onChange method', () => {
    const onChangeStub = sinon.stub();

    hideModalAndUpdateFormField(id, 'firstName', 'Ben', onChangeStub);
    expect(history.goBack).to.be.called;
    expect(onChangeStub).to.have.been.calledWith('firstName', 'Ben');
  });
});
