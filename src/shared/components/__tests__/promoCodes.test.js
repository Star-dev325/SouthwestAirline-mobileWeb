jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import PromoCodes from 'src/shared/components/promoCodes';
import createMockStore from 'test/unit/helpers/configureMockStore';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import PromoCodesBuilder from 'test/builders/model/promoCodesBuilder';

const mockStore = createMockStore();

describe('PromoCodes', () => {
  const promoCodesList = new PromoCodesBuilder().build();
  let hideFullScreenModalFnMock, showFullScreenModalFnMock;

  beforeEach(() => {
    const noop = () => {};

    hideFullScreenModalFnMock = jest.fn(noop);
    showFullScreenModalFnMock = jest.fn(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component', () => {
    const { container } = createComponent();
    
    expect(container).toMatchSnapshot();
  });

  it('should display terms & conditions modal when clicked on content link', () => {
    const page = createComponent();

    jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(showFullScreenModalFnMock);

    const promoCodesModalBtn = page.container.querySelector('.promo-codes-terms-link');

    fireEvent.click(promoCodesModalBtn);

    expect(showFullScreenModalFnMock).toHaveBeenCalled();
  });

  it('should hide terms & conditions modal when clicked on cancel button', () => {
    const page = createComponent();

    jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(hideFullScreenModalFnMock);

    const promoCodesModalBtn = page.container.querySelector('.promo-codes-terms-link');

    fireEvent.click(promoCodesModalBtn);

    const termsAndConditionsCancelBtn = page.container.querySelector('.cancel');

    fireEvent.click(termsAndConditionsCancelBtn);

    expect(hideFullScreenModalFnMock).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        webView: {
          isWebView: false
        }
      },
      router: {
        location: {
          search: '?_modal=PROMO_CODES_MODAL_ID'
        }
      }
    };
    const defaultProps = {
      promoCode: promoCodesList[1],
      ...props
    };

    return render(
      <Provider store={mockStore(state)}>
        <PromoCodes {...defaultProps} />
      </Provider>
    );
  };
});
