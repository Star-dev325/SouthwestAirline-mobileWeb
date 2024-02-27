import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import { shallow } from 'enzyme';
import EventEmitter from 'events';
import waitFor from 'test/unit/helpers/waitFor';
import createMockStore from 'test/unit/helpers/createMockStore';
import { forceHideDialog } from 'src/shared/actions/dialogActions';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import { history } from 'src/appHistory';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('DialogActions', () => {
  let store;
  let emitter;

  beforeEach(() => {
    store = mockStore({});
    emitter = new EventEmitter();

    history.location.pathname = 'mobile.southwest.com/testpath';
    history.location.search = '?testsearch=test';
    sinon.stub(history, 'push');
    sinon.stub(history, 'goBack');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('Dialog actions', () => {
    let DialogActions;
    let mockWindow;
    const options = {
      title: 'test title',
      onClose: 'test onclose',
      error: {
        responseJSON: {
          code: 400310589,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      }
    };

    beforeEach(() => {
      DialogActions = createDialogActions('Chrome', 'iOS');
    });

    afterEach(() => {
      global.event = {};
      sinon.restore();
    });

    it('should dispatch showDialog action for normal api error', async () => {
      await store.dispatch(DialogActions.showDialog(options));
      const contentView = shallow(options.contentView);

      expect(store.getActions()[0]).to.contains({
        isShowDialog: true,
        type: DialogActionTypes.TOGGLE_DIALOG
      });

      expect(store.getActions()[0].options).to.contains({
        title: 'message',
        onClose: 'test onclose'
      });
      expect(store.getActions()[0].options.error).to.deep.equal({
        responseJSON: {
          code: 400310589,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      });

      expect(contentView).to.have.text(`Error 400310589(mkddk90:mweb)`);
    });

    it('should dispatch showDialog action for customized api error', async () => {
      const options = {
        title: 'test title',
        onClose: 'test onclose',
        error: {
          responseJSON: {
            code: 400310589,
            message: 'message',
            requestId: 'mkddk90:mweb',
            httpStatusCode: '3008333'
          },
          $customized: true
        }
      };

      await store.dispatch(DialogActions.showDialog(options));

      expect(store.getActions()).to.deep.equal([
        {
          isShowDialog: true,
          type: DialogActionTypes.TOGGLE_DIALOG,
          options: {
            title: 'test title',
            onClose: 'test onclose',
            error: {
              responseJSON: {
                code: 400310589,
                message: 'message',
                requestId: 'mkddk90:mweb',
                httpStatusCode: '3008333'
              },
              $customized: true
            }
          }
        }
      ]);
    });

    it('should dispatch showDialog action for simple dialog', async () => {
      const options = {
        title: 'test title',
        onClose: 'test onclose'
      };

      await store.dispatch(DialogActions.showDialog(options));

      expect(store.getActions()).to.deep.equal([
        {
          isShowDialog: true,
          type: DialogActionTypes.TOGGLE_DIALOG,
          options
        }
      ]);
    });

    it('should merge in existing history location state when opening a popup', () => {
      DialogActions = createDialogActions('Chrome', 'Android');
      history.location.state = { firstName: 'Ben' };
      store.dispatch(DialogActions.showDialog(options));

      expect(history.push).to.have.been.calledWith({
        pathname: 'mobile.southwest.com/testpath',
        search: '?testsearch=test',
        state: {
          popup: 'open',
          firstName: 'Ben'
        }
      });
    });

    it('should dispatch hideDialog action', () =>
      store.dispatch(DialogActions.hideDialog()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isShowDialog: false,
            type: DialogActionTypes.TOGGLE_DIALOG,
            options: undefined
          }
        ]);
      }));

    it('should dispatch forceHideDialog action', () =>
      store.dispatch(forceHideDialog()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isShowDialog: false,
            type: 'TOGGLE_DIALOG',
            options: undefined
          }
        ]);
      }));

    context('browser back', () => {
      context('showDialog', () => {
        context('popstate event', () => {
          it('should hide dialog when popstate event is emitted and event state is not popup', (done) => {
            store.dispatch(DialogActions.showDialog(options));

            mockWindow.emit('popstate', { state: {} });

            waitFor.untilAssertPass(() => {
              expect(store.getActions()).to.deep.equal([
                {
                  isShowDialog: true,
                  type: DialogActionTypes.TOGGLE_DIALOG,
                  options
                },
                {
                  isShowDialog: false,
                  type: DialogActionTypes.TOGGLE_DIALOG,
                  options: undefined
                }
              ]);
            }, done);
          });

          it('should not hide dialog when popstate event is emitted but event state is popup', (done) => {
            store.dispatch(DialogActions.showDialog(options));

            mockWindow.emit('popstate', { state: { popup: 'open' } });

            waitFor.untilAssertPass(() => {
              expect(store.getActions()).to.deep.equal([
                {
                  isShowDialog: true,
                  type: DialogActionTypes.TOGGLE_DIALOG,
                  options
                }
              ]);
            }, done);
          });
        });

        context('browser & os type', () => {
          it('should not trigger history.pushState when is Chrome on iOS', () => {
            store.dispatch(DialogActions.showDialog(options));

            expect(history.push).to.have.not.been.called;
          });

          it('should trigger history.pushState with popup when is not Chrome on iOS', () => {
            DialogActions = createDialogActions('Safari', 'iOS');

            store.dispatch(DialogActions.showDialog(options));

            expect(history.push).to.have.been.calledWith({
              pathname: 'mobile.southwest.com/testpath',
              search: '?testsearch=test',
              state: { popup: 'open' }
            });
          });

          it('should trigger history.pushState with popup when is Chrome on Andriod', () => {
            DialogActions = createDialogActions('Chrome', 'Andriod');

            store.dispatch(DialogActions.showDialog(options));

            expect(history.push).to.have.been.calledWith({
              pathname: 'mobile.southwest.com/testpath',
              search: '?testsearch=test',
              state: { popup: 'open' }
            });
          });
        });
      });

      context('hideDialog', () => {
        let nextFn;

        beforeEach(() => {
          nextFn = sinon.stub();
        });

        context('history contain popstate', () => {
          it('should history.back be triggered when action is push', () => {
            DialogActions = createDialogActions('Safari', 'iOS', { popup: 'open' });
            store.dispatch(DialogActions.hideDialog()).then(nextFn);

            expect(store.getActions()).to.deep.equal([
              {
                isShowDialog: false,
                type: 'TOGGLE_DIALOG',
                options: undefined
              }
            ]);

            expect(history.goBack).to.have.been.called;
          });

          it('should not trigger history back when action is not push', () => {
            DialogActions = createDialogActions('Safari', 'iOS', { popup: 'open' }, 'POP');
            store.dispatch(DialogActions.hideDialog()).then(nextFn);

            expect(store.getActions()).to.deep.equal([
              {
                isShowDialog: false,
                type: DialogActionTypes.TOGGLE_DIALOG,
                options: undefined
              }
            ]);

            expect(history.goBack).to.have.not.been.called;
          });

          it('should nextFn be called when popstate is emitted', (done) => {
            DialogActions = createDialogActions('Safari', 'iOS', { popup: 'open' });
            store.dispatch(DialogActions.hideDialog()).then(nextFn);

            mockWindow.emit('popstate');

            waitFor.untilAssertPass(() => {
              expect(nextFn).to.have.been.called;
              expect(store.getActions()).to.deep.equal([
                {
                  isShowDialog: false,
                  type: 'TOGGLE_DIALOG',
                  options: undefined
                }
              ]);
            }, done);
          });
        });

        context('history not contain popstate', () => {
          it('should nextFn be called', (done) => {
            store.dispatch(DialogActions.hideDialog()).then(nextFn);

            waitFor.untilAssertPass(() => {
              expect(nextFn).to.have.been.called;
              expect(store.getActions()).to.deep.equal([
                {
                  isShowDialog: false,
                  type: DialogActionTypes.TOGGLE_DIALOG,
                  options: undefined
                }
              ]);
            }, done);
          });

          it('should hide dialog be triggered when is Chrome on iOS', () => {
            store.dispatch(DialogActions.hideDialog(nextFn));

            expect(store.getActions()).to.deep.equal([
              {
                isShowDialog: false,
                type: 'TOGGLE_DIALOG',
                options: undefined
              }
            ]);
          });

          it('should hide dialog when is not Chrome on iOS', () => {
            DialogActions = createDialogActions('Safari', 'iOS');

            store.dispatch(DialogActions.hideDialog(nextFn));

            expect(store.getActions()).to.deep.equal([
              {
                isShowDialog: false,
                type: 'TOGGLE_DIALOG',
                options: undefined
              }
            ]);
          });
        });
      });
    });

    function createDialogActions(browserName = 'Chrome', osName = 'iOS', historyState, historyAction = 'PUSH') {
      mockWindow = emitter;
      mockWindow.addEventListener = mockWindow.addListener;
      mockWindow.removeEventListener = mockWindow.removeListener;

      history.location.state = historyState;
      history.action = historyAction;

      return proxyquire('src/shared/actions/dialogActions', {
        'src/shared/helpers/deviceInfo': {
          default: {
            browser: {
              name: browserName
            },
            os: {
              name: osName
            }
          }
        },
        'src/shared/helpers/browserObject': {
          default: { window: mockWindow }
        },
        'src/appHistory': { history }
      });
    }
  });
});
