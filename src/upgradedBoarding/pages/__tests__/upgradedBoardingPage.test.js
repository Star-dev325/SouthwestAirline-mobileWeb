import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { UpgradedBoardingPage } from 'src/upgradedBoarding/pages/upgradedBoardingPage';
import imagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('UpgradedBoardingPage', () => {
  it('should render default props', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  describe('component did mount', () => {
    it('should call loadUpgradedBoardingPagePlacementsFn', () => {
      const loadUpgradedBoardingPagePlacementsFnStub = jest.fn();

      createComponent({ loadUpgradedBoardingPagePlacementsFn: loadUpgradedBoardingPagePlacementsFnStub });

      expect(loadUpgradedBoardingPagePlacementsFnStub).toHaveBeenCalled();
    });

    it('should fire the analytics satellite event with "Upgraded Boarding Index"', () => {
      jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');

      createComponent();

      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('Upgraded Boarding Index');

      jest.clearAllMocks();
    });
  });

  it('should invoke getUpgradedBoardingReservationFn when submit', () => {
    const getUpgradedBoardingReservationFnStub = jest.fn();

    const { container } = createComponent({
      getUpgradedBoardingReservationFn: getUpgradedBoardingReservationFnStub
    });
    
    fireEvent.submit(container.querySelector('form'));

    expect(getUpgradedBoardingReservationFnStub).toHaveBeenCalled();
    expect(getUpgradedBoardingReservationFnStub).toHaveBeenCalledWith({
      body: { firstName: 'Joe', lastName: 'Rogan' },
      href: '/v1/mobile-air-operations/page/upgraded-boarding/D23M9T',
      method: 'POST'
    });
  });

  it('should not render header when in a webview', () => {
    const { container } = createComponent({ isWebView: true });

    expect(container).toMatchSnapshot();
  });

  describe('should handle placements', () => {
    const imagePlacement = new imagePlacementBuilder().build();

    it('and render promoTop01 if it exists', () => {
      const upgradedBoardingPagePlacements = { promoTop01: imagePlacement };

      const { container } = createComponent({ upgradedBoardingPagePlacements });

      expect(container.querySelector('[data-qa="promoTop01"]')).toMatchSnapshot();
    });

    it('and render contentModule1 if it exists', () => {
      const upgradedBoardingPagePlacements = { contentModule1: imagePlacement };

      const { container } = createComponent({ upgradedBoardingPagePlacements });

      expect(container.querySelector('[data-qa="contentModule1"]')).toMatchSnapshot();
    });

    it('and render promoBottom01 if it exists', () => {
      const upgradedBoardingPagePlacements = { promoBottom01: imagePlacement };

      const { container } = createComponent({ upgradedBoardingPagePlacements });

      expect(container.querySelector('[data-qa="promoTop01"]')).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      upgradedBoardingPagePlacements: {},
      loadUpgradedBoardingPagePlacementsFn: () => {},
      getUpgradedBoardingReservationFn: () => {},
      isWebView: false
    };

    const combinedProps = { ...defaultProps, ...props };

    const state = {
      app: {
        formData: {
          UPGRADED_BOARDING_FORM: {
            url: '/upgraded-boarding',
            data: {
              recordLocator: 'D23M9T',
              firstName: 'Joe',
              lastName: 'Rogan'
            }
          }
        }
      }
    };
    const store = configureMockStore()(state);

    return render(
      <Provider store={store}>
        <UpgradedBoardingPage {...combinedProps} />
      </Provider>
    );
  };
});
