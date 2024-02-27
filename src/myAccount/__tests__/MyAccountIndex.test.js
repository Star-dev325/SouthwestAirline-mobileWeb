jest.mock('@swa-ui/encryption', () => ({
  EncryptionProvider: jest.fn().mockReturnValue({ EncryptionProvider: 'MockEncryptionProvider' }),
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));

import React from 'react';
import MyAccount from '../index';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();
const store = {};

describe('myAccount Index', () => {
  it('should render default props', () => {
    const myAccountWrapper = createComponent();

    expect(myAccountWrapper.baseElement).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      match: {
        url: 'my-account'
      }
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={mockStore(store)}>
        <BrowserRouter>
          <MyAccount {...combinedProps} />
        </BrowserRouter>
      </Provider>
    );
  };
});