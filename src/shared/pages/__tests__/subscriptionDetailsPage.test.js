import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { SubscriptionDetailsPage } from 'src/shared/pages/subscriptionDetailsPage';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('SubscriptionDetailsPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render SubscriptionDetailsPage correctly', () => {
      const component = createComponent();

      expect(component).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      subscriptionTitle: 'Test Title'
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <SubscriptionDetailsPage {...newProps} />
      </Provider>
    );
  };
});
