jest.mock('@swa-ui/encryption', () => ({
  EncryptionProvider: jest.fn().mockReturnValue({ EncryptionProvider: 'MockEncryptionProvider' }),
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ViewReservation from 'src/viewReservation';

jest.mock('src/viewReservation/pages/viewReservationPage', ()=> () => <div>View Reservation Page</div>);

describe('ViewReservation', () => {
  it('should render ViewReservation route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/view-reservation'
    }
  };
  const mergedProps = { ...defaultProps, ...props };
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
        <ViewReservation {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};
