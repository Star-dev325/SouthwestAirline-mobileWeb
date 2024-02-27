import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { UpgradedBoarding } from 'src/upgradedBoarding/index.jsx';

describe('Upgraded Boarding Index', () => {
  it('should render a redirect when UPGRADED_BOARDING is false', () => {
    const { container } = createComponent();

    expect(container.querySelector('.upgraded-boarding')).not.toBeNull();
  });

  it('should render UB component routes when UPGRADED_BOARDING is true', () => {
    const { container } = createComponent({ UPGRADED_BOARDING: true });
    
    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      match: {
        url: 'upgraded-boarding'
      },
      UPGRADED_BOARDING: false
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };
    const store = configureMockStore()({
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });
  
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UpgradedBoarding {...combinedProps} />
        </BrowserRouter>
      </Provider>
    );
  };
});
