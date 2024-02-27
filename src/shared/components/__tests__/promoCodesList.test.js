import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import PromoCodesList from 'src/shared/components/promoCodesList';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('PromoCodesList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render PromoListItem component for active promo codes', () => {
    const { container } = createComponent();
    const PromoListItem = container.querySelector('[data-qa="active-promo-codes"]');

    expect(PromoListItem).toMatchSnapshot();
  });

  it('should render PromoListItem component for used promo codes', () => {
    const { container } = createComponent();
    const PromoListItem = container.querySelector('[data-qa="used-promo-codes"]');

    expect(PromoListItem).toMatchSnapshot();
  });

  it('should render PromoListItem component for expired promo codes', () => {
    const { container } = createComponent();
    const PromoListItem = container.querySelector('[data-qa="expired-promo-codes"]');

    expect(PromoListItem).toMatchSnapshot();
  });

  it('should not filter the array in the component', () => {
    const { container } = createComponent({ promoCodesList: [] });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        webView: {
          isWebView: false
        }
      },
      router: {
        location: '?_modal=PROMO_CODES_MODAL_ID'
      }
    };
    const defaultProps = {
      promoCodesList: [
        {
          promoCode: 'E53QJE8UVM',
          promotion: '20% Off',
          promoType: 'REDEMPTION',
          description: 'This is a promo code',
          termsAndConditions: 'These terms and conditions are mere suggestions.',
          expirationDateString: 'Expiration: 08/28/2022',
          used: false,
          expired: true
        },
        {
          promoCode: 'ABCDEFGHI',
          promotion: '20% Off',
          promoType: 'revenue',
          description: 'This is a promo code',
          termsAndConditions: 'These terms and conditions are mere suggestions.',
          expirationDateString: 'Expiration: 11/01/2022',
          used: false,
          expired: false
        },
        {
          promoCode: 'ABCDEFGHI',
          promotion: '20% Off',
          promoType: 'both',
          description: 'This is a promo code',
          termsAndConditions: 'These terms and conditions are mere suggestions.',
          expirationDateString: 'Expiration: 11/01/2022',
          used: true,
          expired: false
        }
      ],
      ...props
    };

    return render(
      <Provider store={mockStore(state)}>
        <PromoCodesList {...defaultProps} />
      </Provider>
    );
  };
});
