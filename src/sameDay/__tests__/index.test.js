import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SameDay from 'src/sameDay';
import { BrowserRouter } from 'react-router-dom';

describe('SameDay', () => {
  it('Should render SameDay route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {}
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

  const mergedProps = { ...defaultProps, ...props };

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <SameDay {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};
