import { sandbox } from 'sinon';

import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';
import removeCeptorModalInterceptor from 'src/shared/interceptors/removeCeptorModalInterceptor';

const sinon = sandbox.create();

describe('removeCeptorModalInterceptor', () => {
  let getExtensionStub;
  let removeInfoStub;

  beforeEach(() => {
    removeInfoStub = sinon.stub();
    getExtensionStub = sinon.stub(CeptorWrapper, 'getExtension').returns({ removeInfo: removeInfoStub });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should intercept and call remove stub when matching path', () => {
    const result = removeCeptorModalInterceptor('pathname1')({
      store: mockStore({
        state: {
          persistentHistory: ['pathname1']
        }
      })
    });

    result.interceptor();

    expect(getExtensionStub).to.have.been.called;
    expect(removeInfoStub).to.have.been.called;
  });

  it('should intercept and not call remove stub when UPLIFT_INSTALLMENT_PAYMENTS ON and not a matching path', () => {
    const result = removeCeptorModalInterceptor('pathname2')({
      store: mockStore({
        state: {
          app: {
            toggles: {
              UPLIFT_INSTALLMENT_PAYMENTS: true
            }
          },
          persistentHistory: ['pathname1']
        }
      })
    });

    result.interceptor();

    expect(getExtensionStub).to.have.been.called;
    expect(removeInfoStub).to.have.been.called;
  });
});
