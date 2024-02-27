import { render } from '@testing-library/react';
import { loginBanner } from 'mocks/flexPlacement/homepagePlacements';
import React from 'react';
import { Provider } from 'react-redux';
import LoginBanner from 'src/homeAndNav/components/loginBanner';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('LoginBannerClose', () => {
  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = () => {
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <LoginBanner content={loginBanner} />
      </Provider>
    );
  };
});
