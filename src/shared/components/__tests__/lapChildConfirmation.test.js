import React from 'react';
import LapChildConfirmation from 'src/shared/components/lapChildConfirmation';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('LapChildConfirmation', () => {
  describe('render', () => {
    it('should render lap child booking confirmation', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  const defaultProps = {
    lapInfant: {
      name: 'Baby Bond'
    },
    body: 'A birth certificate or other government-issued identification bearing the birth date of each Lap Child is required upon request. <a href="https://www.southwest.com/faq/age-verified" target="_blank">Learn More</a>'
  };
  const store = configureMockStore()({
    app: {
      errorHeader: {
        hasError: false,
        errorMessage: null
      }
    },
    router: {
      location: {
        search: 'search'
      }
    }
  });

  const createComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <LapChildConfirmation {...defaultProps} {...props} />
      </Provider>
    );
});
