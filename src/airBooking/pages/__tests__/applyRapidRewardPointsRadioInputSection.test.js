import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ApplyRapidRewardPointsRadioInputSection } from 'src/airBooking/pages/applyRapidRewardPointsRadioInputSection';
import SplitPayPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageResponseBuilder';

describe('ApplyRapidRewardPointsRadioInputSection component', () => {
  it('should render correct component', () => {
    const applyRapidRewardPointsRadioInputSectionComponent = createComponent();

    expect(applyRapidRewardPointsRadioInputSectionComponent.baseElement).toMatchSnapshot();
  });

  it('should not render radio input section when isWebView is true', () => {
    const { container } = createComponent({ isWebView: true });

    expect(container).toMatchSnapshot();
  });

  describe('splitPayRadioOptions list', () => {
    it('should not render radio section when splitPayPage is provided and splitPayOptions is empty', () => {
      const { container } = createComponent({
        splitPayRadioOptions: null
      });

      expect(container).toMatchSnapshot();
    });

    it('should show radio options if splitPayOptions array is available', () => {
      const splitPayRadioOptionsMock = new SplitPayPageBuilder().build().splitPayPage.splitPayOptions;

      const { container } = createComponent({
        splitPayRadioOptions: splitPayRadioOptionsMock
      });

      expect(container).toMatchSnapshot();
    });

    it('should trigger the onChange when clicked on radio', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onChange: clickStub,
        totalPointsApplied: null
      });

      fireEvent.click(container.querySelector('div[data-qa="rr-points-list-item"]'));

      expect(clickStub).toHaveBeenCalled();
    });

    it('should not trigger if totalPointsApplied exist', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onChange: clickStub,
        totalPointsApplied: {
          moneyApplied: '20$',
          pointsApplied: '2000 PTS'
        }
      });

      fireEvent.click(container.querySelector('div[data-qa="rr-points-list-item"]'));

      expect(clickStub).not.toHaveBeenCalled();
    });

    it('should check for selected radioOption when navigating back to split pay page', () => {
      const splitPayRadioOptionsMock = new SplitPayPageBuilder().build().splitPayPage.splitPayOptions;

      const { container } = createComponent({
        splitPayRadioOptions: splitPayRadioOptionsMock,
        selectedSplitPay: 6815
      });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      isWebView: false,
      selectedSplitPay: 686,
      splitPayRadioOptions: new SplitPayPageBuilder().build().splitPayPage.splitPayOptions,
      totalPointsApplied: null
    };

    return render(<ApplyRapidRewardPointsRadioInputSection {...{ ...defaultProps, ...props }} />);
  };
});
