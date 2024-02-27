import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import * as AppSelector from 'src/shared/selectors/appSelector';
import RouterStore from 'src/shared/stores/routerStore';
import { defaultYoungTravelerParentConsent } from 'src/wcm/constants/wcmFallbackConstants';
import { YoungTravelerParentConsent } from 'src/wcm/pages/youngTravelerParentConsent';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('YoungTravelerParentConsent', () => {
  const TITLE = 'Young Traveler Parent Consent';
  let goBackStub;
  let pushStub;
  let retrieveYoungTravelerParentConsentFnStub;

  beforeEach(() => {
    goBackStub = jest.fn();
    pushStub = jest.fn();
    retrieveYoungTravelerParentConsentFnStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when loading wcm content', () => {
    it('should use default content if wcm call fails', () => {
      retrieveYoungTravelerParentConsentFnStub.mockReturnValueOnce(Promise.reject());

      const { container } = createComponent({
        overlay: defaultYoungTravelerParentConsent
      });

      expect(container).toMatchSnapshot();
    });

    it('should call wcm content endpoint', () => {
      createComponent();

      expect(retrieveYoungTravelerParentConsentFnStub).toHaveBeenCalled();
    });

    it('should use push if there is no history', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');

      const { container } = createComponent();

      fireEvent.click(container.querySelector('button'));

      expect(pushStub).toHaveBeenCalledWith(airBookingRoutes['index'].canonicalPath);
    });

    it('should use push if there is history', () => {
      jest.spyOn(RouterStore, 'getPrevState').mockReturnValue({ routeState: 'route' });

      const { container } = createComponent();

      fireEvent.click(container.querySelector('button'));

      expect(goBackStub).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      goBack: goBackStub,
      isWebView: false,
      overlay: {
        body: [],
        title: TITLE
      },
      push: pushStub,
      retrieveYoungTravelerParentConsentFn: retrieveYoungTravelerParentConsentFnStub
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <YoungTravelerParentConsent {...combinedProps} ref={props.ref} />
      </Provider>
    );
  };
});
