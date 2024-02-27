import { createMemoryHistory } from 'history';
import Dialog from 'src/shared/components/dialog';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Router } from 'react-router';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { render } from '@testing-library/react';

export const integrationRender = ({ withDialog = false, location = '/', path = '/' } = {}) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: ['/previousPath', location],
    initialIndex: 1
  });

  return (state, Component, props = {}) => {
    const store = createMockStoreWithRouterMiddleware(memoryHistory)(state);

    return render(
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
                    ref={props.instance}
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

export const createComponent = (Component, { state, props = {} } = {}) => render(
  <Provider store={createMockedFormStore(state)}>
    <Component ref={props.instance} {...props} />
  </Provider>
);

export const mountWithMemoryRouterAndState = (Component, memoryRouterProps, routePath, componentProps) => {
  if (routePath) {
    return render(
      <MemoryRouter {...memoryRouterProps}>
        <Provider store={createMockStoreWithRouterMiddleware()()}>
          <Route
            render={props => (
              <Component
                {...props}
                {...componentProps}
                ref={componentProps?.instance}
              />
            )}
            path={routePath}
          />
        </Provider>
      </MemoryRouter>);
  } else {
    return render(
      <MemoryRouter {...memoryRouterProps}>
        <Provider store={createMockStoreWithRouterMiddleware()()}>
          <Component {...componentProps} ref={componentProps?.instance} />
        </Provider>
      </MemoryRouter>);
  }
};
