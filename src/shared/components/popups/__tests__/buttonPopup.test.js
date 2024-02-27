import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ButtonPopup from 'src/shared/components/popups/buttonPopup';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('buttonPopup', () => {
  let onClickStub;
  let store;
  const persistentHistory = 'persistentHistory';

  const mockStore = createMockStore();

  beforeEach(() => {
    onClickStub = jest.fn();
    store = mockStore({ persistentHistory });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render confirm button', () => {
    const { container, getByText } = createComponent();

    expect(container.querySelectorAll('button').length).toBe(2);
    expect(getByText('Return home')).toBeTruthy();
  });

  it('should render cancel button', () => {
    const { container, getByText } = createComponent();

    expect(container.querySelectorAll('button').length).toBe(2);
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('should render anchor tag', () => {
    const { container } = createComponent({
      buttons: [
        {
          label: 'Submit',
          href: 'test'
        }
      ]
    });

    expect(container.querySelectorAll('a').length).toBe(1);
  });

  it('should call confirm onclick handler when confirm button is clicked', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('button').length).toBe(2);
    fireEvent.click(container.querySelector('.confirm-button'));
    expect(onClickStub).toBeCalled();
  });

  const createComponent = (props = {}) => {
    const {
      active = true,
      title = 'title',
      message = 'message',
      buttons = [
        {
          label: 'Return home',
          onClick: onClickStub
        },
        {
          label: 'Cancel',
          onClick() {}
        }
      ]
    } = props;

    return render(
      <Provider store={store}>
        <ButtonPopup active={active} title={title} buttons={buttons}>
          <p>{message}</p>
        </ButtonPopup>
      </Provider>
    );
  };
});
