import React from 'react';
import PriceDetails from 'src/airBooking/components/priceDetails';
import { render } from '@testing-library/react';
import PriceDetailsBuilder from 'test/builders/model/priceDetailsBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';

describe('PriceDetails', () => {
  const defaultProps = new PriceDetailsBuilder().build();

  describe('base fare with discount', () => {
    it('should render passenger base fare, discount, total base fare, multiple taxes and fees, and total per passenger', () => {
      const { container: priceDetailsComponent } = createComponent({ ...defaultProps });

      expect(priceDetailsComponent).toMatchSnapshot();
    });

    it('should render updated taxes and fees after applying split payment', () => {
      defaultProps.taxesAndFees = defaultProps.adultFare.taxesAndFees;
      
      const { container: priceDetailsComponent } = createComponent({ ...defaultProps });

      expect(priceDetailsComponent).toMatchSnapshot();
    });

    it('should not render total base fare when booking by points', () => {
      const mockProps = new PriceDetailsBuilder().withPoint().build();
      const { container: priceDetailsComponent } = createComponent(mockProps);
      const baseFareWrapper = priceDetailsComponent.querySelector('.price-details-segment');

      expect(baseFareWrapper.querySelector('.price-amount')).toBeNull();
    });
  });

  describe('base fare without discount', () => {
    let baseFareWrapper;

    beforeEach(() => {
      const mockProps = new PriceDetailsBuilder().withoutDiscount().withoutTotalBaseFare().build();
      const { container: priceDetailsComponent } = createComponent(mockProps);

      baseFareWrapper = priceDetailsComponent.querySelector('.price-details-segment');
    });

    it('should not render discount', () => {
      expect(baseFareWrapper.getElementsByClassName('price-line').length).toEqual(1);
    });

    it('should not render total base fare when it does not exist', () => {
      expect(baseFareWrapper.querySelector('.price-amount')).toBeNull();
    });
  });

  describe('total per passenger', () => {
    describe('for dollar', () => {
      let totalPerPassengerWrapper;

      beforeEach(() => {
        const { container: priceDetailsComponent } = createComponent({ ...defaultProps });

        totalPerPassengerWrapper = priceDetailsComponent.querySelectorAll('.price-details-segment')[2];
      });

      it('should render total per passenger', () => {
        expect(totalPerPassengerWrapper.querySelector('.price-line--title').textContent).toEqual(
          'SHARED__PRICE_LINE_TITLES__TOTAL_PER_PASSENGER'
        );
      });
    });
  });

  describe('early bird in path price total', () => {
    describe('using data from PriceDetails.earlyBirdPriceDetails', () => {
      it('should render add early bird check in when with early bird', () => {
        const mockProps = new PriceDetailsBuilder().withEarlyBird().build();
        const { container: priceDetailsComponent } = createComponent(mockProps);

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toMatchSnapshot();
      });

      it('should not render add early bird check in when user purchased business select tickets', () => {
        const mockProps = new PriceDetailsBuilder().withEBPurchasedCountIsZero().build();
        const { container: priceDetailsComponent } = createComponent(mockProps);

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toBeNull();
      });

      it('should not render add early bird check in when without early bird', () => {
        const { container: priceDetailsComponent } = createComponent({ ...defaultProps });

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toBeNull();
      });
    });

    describe('using data from Chapi earlyBirdEligibilty', () => {
      it('should render add early bird check in when with early bird', () => {
        const mockProps = new PriceDetailsBuilder().withEarlyBirdEligibility().build();
        const { container: priceDetailsComponent } = createComponent(mockProps);

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toMatchSnapshot();
      });

      it('should hide early bird check in section when showEarlyBirdInFareBreakdown is false', () => {
        const mockProps = new PriceDetailsBuilder().withEarlyBirdEligibility().build();
        const { container: priceDetailsComponent } = createComponent({ ...mockProps, showEarlyBirdInFareBreakdown: false });

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toBeNull();
      });

      it('should not render add early bird check in when user purchased business select tickets', () => {
        const mockProps = new PriceDetailsBuilder().withEarlyBirdEligibility('15.00', []).build();
        const { container: priceDetailsComponent } = createComponent(mockProps);

        expect(priceDetailsComponent.querySelector('.early-bird-in-path--price-total')).toBeNull();
      });

      describe('display early bird check based on', () => {
        const mockProps = new PriceDetailsBuilder().withEarlyBirdEligibility().build();

        describe('when showEarlyBirdInFareBreakdown is true', () => {
          const showEarlyBirdInFareBreakdown = true;

          describe('when isLapChild is true', () => {
            it('should hide show early bird check in section', () => {
              const flightPricingPageResponse = new PricesBuilder().withLapChildEnabled().build();
              const { container: priceDetailsComponent } = createComponent({
                ...mockProps,
                showEarlyBirdInFareBreakdown,
                infantFare: flightPricingPageResponse.flightPricingPage.totals.infantFare
              });

              expect(priceDetailsComponent).toMatchSnapshot();
            });
          });

          describe('when isLapChild is false', () => {
            it('should show early bird check in section', () => {
              const { container } = createComponent({
                ...mockProps,
                showEarlyBirdInFareBreakdown
              });

              expect(container).toMatchSnapshot();
            });
          });
        });

        describe('when showEarlyBirdInFareBreakdown is false', () => {
          const flightPricingPageResponse = new PricesBuilder().withLapChildEnabled().build();
          const showEarlyBirdInFareBreakdown = false;

          describe('when isLapChild is true', () => {
            it('should hide early bird check in section', () => {
              const { container: priceDetailsComponent } = createComponent({
                ...defaultProps,
                showEarlyBirdInFareBreakdown,
                infantFare: flightPricingPageResponse.flightPricingPage.totals.infantFare
              });

              expect(priceDetailsComponent).toMatchSnapshot();
            });
          });

          describe('when isLapChild is false', () => {
            it('should hide early bird check in section', () => {
              const { container: priceDetailsComponent } = createComponent({
                ...defaultProps,
                showEarlyBirdInFareBreakdown
              });

              expect(priceDetailsComponent).toMatchSnapshot();
            });
          });
        });
      });
    });
  });
  describe('total passenger', () => {
    describe('for dollar', () => {
      it('should render correctly', () => {
        const { container: priceDetailsComponent } = createComponent({ ...defaultProps });

        expect(priceDetailsComponent).toMatchSnapshot();
      });
    });

    describe('for point', () => {
      it('should render points total and dollar total', () => {
        const mockProps = new PriceDetailsBuilder().withPoint().build();
        const { container: priceDetailsComponent } = createComponent(mockProps);
        const pointTotalPerSegment = priceDetailsComponent.querySelector('.total-per-segment');

        expect(pointTotalPerSegment).toMatchSnapshot();
      });
    });
  });

  const createComponent = (props) => render(<PriceDetails {...props} />);
});
