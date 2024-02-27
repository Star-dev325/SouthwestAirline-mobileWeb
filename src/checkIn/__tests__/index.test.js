jest.mock('@swa-ui/encryption', () => ({
  EncryptionProvider: jest.fn().mockReturnValue({ EncryptionProvider: 'MockEncryptionProvider' }),
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import CheckIn from 'src/checkIn';

jest.mock('src/checkIn/pages/checkInLandingPage', ()=> () => <div>View CheckIn Page</div>);

describe('CheckIn', () => {
  it('should render CheckIn route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/check-in'
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
        <CheckIn {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};
