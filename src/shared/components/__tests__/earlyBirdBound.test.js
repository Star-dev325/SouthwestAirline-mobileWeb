import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import EarlyBirdBound from 'src/shared/components/earlyBirdBound';
import EarlyBirdInPathApiResponseBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';

describe('EarlyBirdBound', () => {
  describe('flight info', () => {
    const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();

    it('should render props', () => {
      const { container } = createComponent(bounds);

      expect(container).toMatchSnapshot();
    });

    it('should show the origin destination', () => {
      const { container } = createComponent(bounds);

      expect(container.querySelector('[data-qa="early-bird-bound--flight-info"]').textContent).toMatchSnapshot();
    });

    it('should show flight number', () => {
      const { container } = createComponent(bounds);

      expect(container.querySelector('[data-qa="early-bird-bound--flight-number"]').textContent).toMatchSnapshot();
    });

    it('should show pax type', () => {
      const { container } = createComponent(bounds);

      expect(container.querySelector('[data-qa="early-bird-bound--pax-type"]').textContent).toMatchSnapshot();
    });

    it('should show fare product type', () => {
      const { container } = createComponent(bounds);

      expect(container.querySelector('[data-qa="early-bird-bound--fare-product-type"]').textContent).toMatchSnapshot();
    });
  });

  describe('early-bird eligibility', () => {
    describe('A-List icon', () => {
      it('should show A-List icon', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().multipleAdultOneWayPatialEligible().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('.icon_a-list')).toMatchSnapshot();
      });

      it('should not show A-List icon when a passenger is not A-list/A-list preferred ', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('.icon_a-list')).toMatchSnapshot();
      });
    });

    describe('passenger type', () => {
      it('should show passenger type when passenger is eligible', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('[data-qa="early-bird-bound--pax-type"]').textContent).toMatchSnapshot();
      });

      it('should show passenger eligibility reason when passenger is ineligible', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayNotEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('[data-qa="early-bird-bound--pax-type"]').textContent).toMatchSnapshot();
      });
    });

    describe('flight info', () => {
      it('should be disable with gray text when this bound is ineligible to buy early-bird', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayNotEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('[data-qa="early-bird-bound--flight-info"]')).toMatchSnapshot();
        expect(container.querySelector('.early-bird-bound--passenger_ineligible')).toMatchSnapshot();
      });

      it('should be available with blue text when this bound is eligible to buy early-bird', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('[data-qa="early-bird-bound--flight-info"]')).toMatchSnapshot();
        expect(container.querySelector('.early-bird-bound--passenger_ineligible')).toMatchSnapshot();
      });
    });

    describe('price of per passenger', () => {
      it('should have correct price when eligible to buy early-bird', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('.early-bird-bound--currency').textContent).toMatchSnapshot();
      });

      it('should have correct price when ineligible to buy early-bird', () => {
        const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayNotEligibleEarlyBird().build();
        const { container } = createComponent(bounds);

        expect(container.querySelector('.early-bird-bound--currency').textContent).toMatchSnapshot();
      });
    });
  });
});

function createComponent(bounds) {
  return render(<EarlyBirdBound bound={bounds[0]} />);
}
