import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Router } from 'react-router';
import Dialog from 'src/shared/components/dialog';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

export const integrationMount = ({ withDialog = false, location = '/', path = '/' } = {}) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: ['/previousPath', location],
    initialIndex: 1
  });

  return (state, Component, props = {}) => {
    const store = createMockStoreWithRouterMiddleware(memoryHistory)(state);

    return mount(
      <Router history={memoryHistory}>
        <div>
          <Provider store={store}>
            <div>
              {withDialog && <Dialog />}
              <Route
                render={routeProps => (
                  <Component
                    {...routeProps}
                    {...props}
                  />
                )}
                path={path}
              />
            </div>
          </Provider>
        </div>
      </Router>
    );
  };
};

export const mountWithMemoryRouter = (Component, memoryRouterProps, routePath, componentProps) => {
  if (routePath) {
    return mount(
      <MemoryRouter {...memoryRouterProps}>
        <Route
          render={props => (
            <Component
              {...props}
              {...componentProps}
            />
          )}
          path={routePath}
        />
      </MemoryRouter>);
  } else {
    return mount(
      <MemoryRouter {...memoryRouterProps}>
        <Component {...componentProps} />
      </MemoryRouter>);
  }
};

export const mountWithMemoryRouterAndState = (Component, memoryRouterProps, routePath, componentProps) => {
  if (routePath) {
    return mount(
      <MemoryRouter {...memoryRouterProps}>
        <Provider store={createMockStoreWithRouterMiddleware()()}>
          <Route
            render={props => (
              <Component
                {...props}
                {...componentProps}
              />
            )}
            path={routePath}
          />
        </Provider>
      </MemoryRouter>);
  } else {
    return mount(
      <MemoryRouter {...memoryRouterProps}>
        <Provider store={createMockStoreWithRouterMiddleware()()}>
          <Component {...componentProps} />
        </Provider>
      </MemoryRouter>);
  }
};

export const MockedFullScreenModal = (props) => props.children;

export const createComponent = (Component, { state, props = {} } = {}) => mount(
  <Provider store={createMockedFormStore(state)}>
    <Component {...props} />
  </Provider>
);

export const createComponentRender = (Component, { state, props = {} } = {}) => render(
  <Provider store={createMockedFormStore(state)}>
    <Component {...props} />
  </Provider>
);

export const createComponentWithMockedState = (Component, { props = {} } = {}) => mount(
  <Provider store={createMockStoreWithRouterMiddleware()()}>
    <Component {...props} />
  </Provider>
);

export const mockErrorHeaderContainer = (sandbox) => {
  const ErrorHeaderContainer = require('src/shared/components/errorHeader/errorHeaderContainer');

  sandbox.stub(ErrorHeaderContainer, 'default').value(() => (<div />));
};

export const mockConnectedSubComponent = (sandbox, path, options) => {
  const { pureSubComponentName, defaultProps = {} } = options;
  const ConnectedSubComponent = require(path);
  const PureSubComponent = pureSubComponentName ? ConnectedSubComponent[pureSubComponentName] : () => <div />;

  const MockedSubComponent = (props) => (
    <PureSubComponent {...defaultProps} {...props} />
  );

  sandbox.stub(ConnectedSubComponent, 'default').value(MockedSubComponent);
};

export const mockErrorHeaderContainerWithJest = (jest) => {
  jest.mock('src/shared/components/errorHeader/errorHeaderContainer', () => () => <div />);
};
