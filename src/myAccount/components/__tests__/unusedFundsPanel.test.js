jest.mock('src/shared/helpers/browserObject', () => ({
  window: { open: jest.fn() }
}));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import UnusedFundsPanel from 'src/myAccount/components/unusedFundsPanel';
import BrowserObject from 'src/shared/helpers/browserObject';

describe('UnusedFundsPanel', () => {
  let onViewFundsBtnClickMock;

  beforeEach(() => {
    onViewFundsBtnClickMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UNUSED_FUNDS toggle OFF view funds link should open page WCM has defined', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.unused-funds-panel--view-funds-button'));

    expect(BrowserObject.window.open).toBeCalledWith('https://www.viewfunds.com');
  });

  it('UNUSED_FUNDS toggle ON view funds link should callback to landing page component', () => {
    const { container } = createComponent({ UNUSED_FUNDS: true });

    fireEvent.click(container.querySelector('.unused-funds-panel--view-funds-button'));

    expect(onViewFundsBtnClickMock).toHaveBeenCalled();
  });

  it('learn more link should open page WCM has defined', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.unused-funds-panel--learn-more-button'));

    expect(BrowserObject.window.open).toBeCalledWith('https://www.learnmore.com');
  });

  const createComponent = (props) => {
    const defaultProps = {
      onViewFundsBtnClick: onViewFundsBtnClickMock,
      unusedFundsContent: [
        {
          props: { id: 'main-body' },
          textContent: 'text content',
          type: 'div'
        },
        {
          props: { id: 'view-funds-btn', target: 'https://www.viewfunds.com' },
          textContent: 'text content',
          type: 'Link'
        },
        {
          props: { id: 'learn-more-btn', target: 'https://www.learnmore.com' },
          textContent: 'text content',
          type: 'Link'
        }
      ],
      UNUSED_FUNDS: false
    };
  
    const mergedProps = { ...defaultProps, ...props };
  
    return render(<UnusedFundsPanel {...mergedProps} />);
  };
});
