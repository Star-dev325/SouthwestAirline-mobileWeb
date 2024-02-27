import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { CompanionPricingPage } from 'src/companion/pages/companionPricingPage';
import CompanionFlightPricingPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionFlightPricingPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('companionPricingPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const { flightPricingPage } = new CompanionFlightPricingPageBuilder().build();

  describe('Render', () => {
    it('should render', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render pricing detail', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      expect(instance.current.props.flightPricingPage).toEqual(flightPricingPage);
    });
  });

  it('should transition to companion passenger page when click continue button', () => {
    const goToCompanionPassengerPageFnMock = jest.fn();
    const instance = React.createRef();

    createComponent({
      goToCompanionPassengerPageFn: goToCompanionPassengerPageFnMock,

      ref: instance
    });
    instance.current._onContinue();

    expect(goToCompanionPassengerPageFnMock).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      isInternationalBooking: false,
      goToCompanionPassengerPageFn: () => {}
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionPricingPage flightPricingPage={flightPricingPage} {...defaultProps} {...props} />
      </Provider>
    );
  };
});
