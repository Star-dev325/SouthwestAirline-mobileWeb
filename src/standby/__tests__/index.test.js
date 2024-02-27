jest.mock('src/standby/actions/standbyActions');

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import StandbyRoute from 'src/standby/index';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('StandbyRoute', () => {
  beforeEach(() => {
    StandbyActions.checkEnhancedStandbyNearAirport.mockImplementation(() => ({ type: 'test' }));
  });

  it('should render enhanced standby Route page', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should render old standby Route page', () => {
    const { container } = createComponent(
      {},
      {
        app: {
          toggles: { ENHANCED_STANDBY_LIST: false }
        }
      }
    );

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      match: { params: '' },
      location: {
        search: 'search',
        href: '#'
      }
    };
    const defaultState = {
      app: {
        toggles: { ENHANCED_STANDBY_LIST: true }
      },
      router: {
        location: {
          search: 'search',
          href: '#'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <StandbyRoute {...mergedProps} />
        </BrowserRouter>
      </Provider>
    );
  };
});
