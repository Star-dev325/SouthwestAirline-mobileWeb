import { store } from 'src/shared/redux/createStore';
import { sandbox } from 'sinon';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';
import * as dialogActions from 'src/shared/actions/dialogActions';

const sinon = sandbox.create();

describe('dispatchHideDialog', () => {
  beforeEach(() => {
    sinon.stub(store, 'dispatch').returns(new Promise((resolve) => resolve({ type: 'fakeType' })));
    sinon.stub(dialogActions, 'hideDialog').returns({ type: 'TOGGLE_DIALOG' });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('hide dialog', () => {
    it('should should dispatch the hide dialog', () => {
      dispatchHideDialog().then(() =>
        expect(store.dispatch).to.have.been.calledWith({
          type: 'TOGGLE_DIALOG'
        })
      );
    });
  });
});
