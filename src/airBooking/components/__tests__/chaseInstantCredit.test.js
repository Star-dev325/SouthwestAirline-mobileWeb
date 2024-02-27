import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import chaseBannerConfigBuilder from 'test/builders/model/chaseBannerConfigBuilder';
import ChaseInstantCredit from 'src/airBooking/components/chase/chaseInstantCredit';

describe('Chase Instant Credit Component', () => {
  let chaseBannerConfig;
  let onClickStub;
  let handlePlacementLinkFnStub;

  beforeEach(() => {
    const noop = () => {};

    onClickStub = jest.fn(noop);
    handlePlacementLinkFnStub = jest.fn();
    chaseBannerConfig = new chaseBannerConfigBuilder().build();
  });

  it('should show original price when advertising chase offer', () => {
    const chaseInstantCreditWrapper = createComponent();

    expect(chaseInstantCreditWrapper.container.querySelector('.money-sign').textContent).toBe('$');
    expect(chaseInstantCreditWrapper.container.querySelector('[data-qa="total-amount"]').textContent).toBe('1,311.11');
  });

  it('should show statement credit when advertising chase offer', () => {
    const chaseInstantCreditWrapper = createComponent();

    expect(
      chaseInstantCreditWrapper.container.querySelector('.chase-instant-credit--statement-credit').textContent
    ).toBe('- $200.00');
  });

  it('should show total after statement credit when advertising chase offer', () => {
    const chaseInstantCreditWrapper = createComponent();

    expect(chaseInstantCreditWrapper.container.querySelectorAll('.money-sign')[2].textContent).toBe('$');
    expect(chaseInstantCreditWrapper.container.querySelectorAll('[data-qa="total-amount"]')[2].textContent).toBe(
      '1,111.11'
    );
  });

  it('should show total after statement credit when advertising chase offer', () => {
    const chaseInstantCreditWrapper = createComponent({
      totalFare: {
        amount: '111.11',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    });

    expect(
      chaseInstantCreditWrapper.container.querySelector(`div[data-qa='chase-adjusted-fare']`).childNodes[1].textContent
    ).toBe('- $88.89');
  });

  it('should render with WcmStyledPageImage', () => {
    const chaseInstantCreditWrapper = createComponent();

    expect(chaseInstantCreditWrapper.container.querySelector('img[data-qa="chase-banner"]').getAttribute('src')).toBe(
      '/partnerImage.png'
    );
  });

  it('should display correct button text', () => {
    const chaseInstantCreditWrapper = createComponent();

    expect(chaseInstantCreditWrapper.container.querySelector('button.chase-instant-credit--button').textContent).toBe(
      'Learn more'
    );
  });

  it('should show chase banner image when chase banner config has adType image', () => {
    chaseBannerConfig = new chaseBannerConfigBuilder().withAdTypeImage().build();

    const chaseInstantCreditWrapper = createComponent({ chaseBannerConfig });
    const ChaseInstantCreditImage = chaseInstantCreditWrapper.container.querySelector(
      'img[data-qa="chase-banner-img"]'
    );

    expect(ChaseInstantCreditImage).toBeDefined();
  });

  it('should render with placementLink', () => {
    const chaseInstantCreditWrapper = createComponent();
    const placementLink = chaseInstantCreditWrapper.container.querySelector('div[data-qa="placement-link"]');

    fireEvent.click(placementLink);

    expect(handlePlacementLinkFnStub).toHaveBeenCalledWith(
      expect.objectContaining({
        target: 'https://xldadm01:4700/?app=mWeb',
        linkType: 'webview',
        isChaseCombo: false,
        isChasePlacement: false,
        referrer: '',
        shouldRaiseSatelliteEvent: false,
        contentBlockId: '',
        pageId: ''
      })
    );
  });

  const createComponent = (props) => {
    const defaultProps = {
      totalFare: {
        amount: '1,311.11',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      returnUrl: 'returnUrl',
      onClick: onClickStub,
      handlePlacementLinkFn: handlePlacementLinkFnStub,
      shouldRaiseSatelliteEvent: false,
      ...chaseBannerConfig
    };

    return render(<ChaseInstantCredit {...defaultProps} {...props} />);
  };
});
