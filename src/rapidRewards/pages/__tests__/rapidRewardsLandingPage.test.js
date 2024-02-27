jest.mock('src/shared/helpers/wcmTransitionHelper', () => jest.fn());
jest.mock('src/airBooking/helpers/amcvCookieHelper', () => ({ addMvcidToChaseUrl: jest.fn() }));

import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import React from 'react';
import { Provider } from 'react-redux';
import { addMvcidToChaseUrl } from 'src/airBooking/helpers/amcvCookieHelper';
import { RapidRewardsLandingPage } from 'src/rapidRewards/pages/rapidRewardsLandingPage';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import createMockStore from 'test/unit/helpers/createMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';
import waitFor from 'test/unit/helpers/waitFor';

const richNavItemSelector = '.rr-page-promotions--item';
const richNavItemAnchorSelector = `${richNavItemSelector} a`;
const TODAY = '2022-12-31';

describe('RapidRewardsLandingPage', () => {
  const chaseUrl = 'https://creditcards.chase.com/a1/southwest/PlusCP30AEP?REF=MWEB&CELL=630Q&clk=2522092';
  let pushStub, retrievePromotionsFnStub;

  beforeEach(() => {
    FakeClock.setTimeTo(TODAY);
    pushStub = jest.fn();
    retrievePromotionsFnStub = jest.fn();
    addMvcidToChaseUrl.mockImplementation(() => chaseUrl);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    expect(createComponent()).toMatchSnapshot();
  });

  describe('Promotions', () => {
    it('should call RapidRewardsActions', () => {
      createComponent();

      expect(retrievePromotionsFnStub).toHaveBeenCalledWith(5000);
    });

    it('should set promotional items on page from store', (done) => {
      const { container } = createComponent();
      const richNavItems = container.querySelectorAll(richNavItemSelector);

      waitFor.untilAssertPass(() => {
        expect(richNavItems).toHaveLength(3);
      }, done);
    });
  });

  it('should push to enroll when click the enroll now', () => {
    createComponent();

    fireEvent.click(screen.getByText('Enroll Now'));

    expect(pushStub).toHaveBeenCalledWith('/enroll');
  });

  it('should call addMvcidToChaseUrl when click the chase card offer', () => {
    const navData = { link_type: 'webview', target: chaseUrl };
    const { container } = createComponent();
    const lastNavItemAnchor = container.querySelectorAll(richNavItemAnchorSelector)[2];

    fireEvent.click(lastNavItemAnchor);

    expect(addMvcidToChaseUrl).toHaveBeenCalledWith(chaseUrl, false);
    expect(wcmTransitionTo).toHaveBeenCalledWith(navData);
  });

  it('should show PageFooterWcmSourced by default', () => {
    const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;
    const { container } = createComponent({ footerLinkRows });

    expect(container.querySelector('.rr-page-footer')).toMatchSnapshot();
  });

  it('should not show PageFooterWcmSourced when in a webview', () => {
    const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;
    const { container } = createComponent({ footerLinkRows, isWebView: true });

    expect(container.querySelector('.rr-page-footer')).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      push: pushStub,
      retrievePromotionsFn: retrievePromotionsFnStub,
      MWEB_ADOBE_TARGET_TIMEOUT_MS: 5000,
      promotions: [
        {
          alt: 'About Rapid Rewards',
          description: 'We make it fast and easy to earn reward flights and more!',
          image: '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
          link_type: 'app',
          target: 'rrabout',
          title: 'About Rapid Rewards®'
        },
        {
          alt: 'enroll in Rapid Rewards',
          description: 'Start earning towards your first reward flight today!',
          image: '/content/mkt/images/promotions/enroll_icon.png',
          link_type: 'app',
          target: 'rrenroll',
          title: 'Enroll Today'
        },
        {
          alt: 'Chase Rapid Rewards Credit Card',
          description: 'Learn how to earn the benefit that lets you fly with a friend plus 30,000 points.',
          image: '/content/mkt/images/promotions/CC_Signup.png',
          link_type: 'webview',
          target: chaseUrl,
          title: 'Earn Companion Pass.'
        }
      ],
      footerLinkRows: []
    };

    return render(
      <Provider store={createMockStore()()}>
        <RapidRewardsLandingPage {..._.merge(defaultProps, props)} />
      </Provider>
    );
  };
});
