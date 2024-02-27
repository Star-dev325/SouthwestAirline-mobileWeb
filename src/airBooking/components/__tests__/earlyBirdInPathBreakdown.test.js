import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdInPathBreakdown from 'src/airBooking/components/earlyBirdInPathBreakdown';
import EarlyBirdInPathApiResponseBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';

describe('EarlyBirdInPathBreakdown', () => {
  describe('one way', () => {
    it('should render early bird bound', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();
      const { container } = createComponent({ earlyBirdEligibility });

      expect(container).toMatchSnapshot();
    });

    describe('when EARLY_BIRD_AB_TESTING is true', () => {
      it('should render earlyBirdSelected value', () => {
        const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();
        const { container } = createComponent({
          EARLY_BIRD_AB_TESTING: true,
          earlyBirdSelected: true,
          earlyBirdEligibility
        });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('round trip', () => {
    it('should show early bird two bounds', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();

      earlyBirdEligibility.bounds = new EarlyBirdInPathApiResponseBuilder()
        .singleAdultRoundTripNotEligibleEarlyBird()
        .build().bounds;
      const { container } = createComponent({ earlyBirdEligibility });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when early bird is ineligible', () => {
    it('should show ineligibility reasons', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();

      earlyBirdEligibility.ineligibilityReasons = ['mock reason'];
      earlyBirdEligibility.bounds = new EarlyBirdInPathApiResponseBuilder()
        .singleAdultRoundTripNotEligibleEarlyBird()
        .build().bounds;

      const { container } = createComponent({ earlyBirdEligibility });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when earlyBirdEligibility is undefined', () => {
    it('should not show ineligibility reasons', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      isRadioButtonChecked: true,
      EARLY_BIRD_AB_TESTING: false,
      earlyBirdSelected: false
    };
    const finalProps= { ...defaultProps, ...props };

    return render(<EarlyBirdInPathBreakdown {...finalProps} />);
  };
});
