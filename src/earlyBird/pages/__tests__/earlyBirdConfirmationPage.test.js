import '@testing-library/jest-dom/extend-expect';
import { EarlyBirdConfirmationPage } from 'src/earlyBird/pages/earlyBirdConfirmationPage';
import EarlyBirdConfirmationResponseBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/earlyBird/earlyBirdConfirmationPageBuilder';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('earlyBirdConfirmationPage', () => {
  let saveCreditCardFnMock;

  beforeEach(() => {
    saveCreditCardFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component correctly', () => {
    const { container } = createComponentWrapper();

    expect(container).toMatchSnapshot();
  });

  describe('round trip', () => {
    it('should render two FlightSummaryCard components', () => {
      const earlyBirdConfirmationPage = new EarlyBirdConfirmationResponseBuilder().withRoundTrip().build();

      const { container } = createComponentWrapper({ earlyBirdConfirmationPage });

      expect(container.querySelectorAll('.flight-summary-card')).toHaveLength(2);
    });

    it('should render two EarlyBirdFlightSummaryCardFooter components when purchase EB for both bounds', () => {
      const earlyBirdConfirmationPage = new EarlyBirdConfirmationResponseBuilder().withRoundTrip().build();

      const { container } = createComponentWrapper({ earlyBirdConfirmationPage });

      expect(container.querySelectorAll('.early-bird-flight-summary-footer')).toHaveLength(2);
    });

    it('should render only one EarlyBirdFlightSummaryCardFooter when purchase EB for one bound', () => {
      const earlyBirdConfirmationPage = new EarlyBirdConfirmationResponseBuilder().withHalfRoundTrip().build();

      const { container } = createComponentWrapper({ earlyBirdConfirmationPage });

      expect(container.querySelectorAll('.early-bird-flight-summary-footer')).toHaveLength(1);
      expect(container.querySelector('.early-bird-flight-summary-footer--passenger-name').textContent).toEqual(
        'Kevin Thompson'
      );
    });
  });

  const createComponentWrapper = (props) => {
    const paymentInfo = getPaymentInfoForUseNewCreditCard();
    const defaultProps = {
      earlyBirdConfirmationPage: new EarlyBirdConfirmationResponseBuilder().build(),
      paymentInfo,
      saveCreditCardFn: saveCreditCardFnMock
    };

    return integrationRender()({}, EarlyBirdConfirmationPage, { ...defaultProps, ...props });
  };
});
