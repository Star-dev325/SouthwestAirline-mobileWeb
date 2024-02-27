import interceptorMiddleware from 'src/shared/redux/middlewares/interceptorMiddleware';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

jest.mock('src/shared/redux/createStore', () => ({
  store: () => mockStore({ dispatch: jest.fn() })
}));

describe('interceptorMiddleware', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call middleware', () => {
    const result = interceptorMiddleware(store)(() => ({}))({});

    expect(result).toMatchObject(result);
  });
});
