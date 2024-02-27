import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MyPromoCodesPanel from 'src/myAccount/components/myPromoCodesPanel';

describe('Promo Codes Panel Component', () => {
  let onClickMock;

  const clickCallOption = (container) => {
    fireEvent.click(container);
  };

  beforeEach(() => {
    const noop = () => {};

    onClickMock = jest.fn(noop);
  });

  it('should render correct component', () => {
    const promoCodePanelComponent = createComponent();

    expect(promoCodePanelComponent.baseElement).toMatchSnapshot();
  });

  it('should trigger click event when view promo codes button is clicked', () => {
    const promoCodePanelComponent = createComponent({ PROMO_CODE_IN_MY_ACCOUNT: true });
    const button = promoCodePanelComponent.getByText('view promo codes button');

    clickCallOption(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      PROMO_CODE_IN_MY_ACCOUNT: false,
      onClick: onClickMock,
      promoCodesContent: [
        { textContent: 'wcm placeholder text', type: 'div', props: { id: 'main-body' } },
        { textContent: 'wcm sub text', type: 'div', props: { id: 'sub-text' } },
        {
          textContent: 'view promo codes button',
          type: 'Link',
          props: { target: '/fake/path', id: 'learn-more-btn' }
        }
      ]
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(<MyPromoCodesPanel {...finalProps} />);
  };
});
