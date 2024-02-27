import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';
import FlightProduct from 'src/shared/components/flightProduct';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';

const sinon = sandbox.create();

describe('FlightProduct', () => {
  context('render', () => {
    context('flight product available', () => {
      it('should show dynamic waiver message if available', () => {
        const flightProductCard = new FlightProductBuilder().withDynamicWaiver().build();
        const wrapper = render({
          flightProductCard
        });

        expect(wrapper.find('[data-qa="dynamic-waiver-fare"]')).to.contain.text('Available');
        expect(wrapper.find('[data-qa="diff-price-fare"]')).to.not.exist;
        expect(wrapper.find('[data-qa="regular-price-fare"]')).to.not.exist;
      });

      it('should show delta pricing if isAirChangeOrReaccom is true and if startingFromPriceDifference has value', () => {
        const card1 = {
          amount: '5',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '-'
        };
        const flightProductCard = new FlightProductBuilder().withFareDifference(card1).build();
        const wrapper = render({
          flightProductCard,
          isAirChangeOrReaccom: true
        });

        expect(wrapper.find('[data-qa="dynamic-waiver-fare"]')).to.not.exist;
        expect(wrapper.find('[data-qa="diff-price-fare"]')).to.contain.text('From-$5');
        expect(wrapper.find('[data-qa="regular-price-fare"]')).to.not.exist;
      });

      it('should show straight pricing if isAirChangeOrReaccom are false and if startingFromPrice has value', () => {
        const card1 = {
          amount: '5',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '-'
        };
        const flightProductCard = new FlightProductBuilder().withFareDifference(card1).build();
        const wrapper = render({
          flightProductCard,
          isAirChangeOrReaccom: false
        });

        expect(wrapper.find('[data-qa="dynamic-waiver-fare"]')).to.not.exist;
        expect(wrapper.find('[data-qa="diff-price-fare"]')).to.not.exist;
        expect(wrapper.find('[data-qa="regular-price-fare"]')).to.contain.text('$218');
      });

      it('should show next day text if isNextDayArrival is true', () => {
        const flightProductCard = new FlightProductBuilder().withNextDayArrival().build();
        const wrapper = render({
          flightProductCard
        });

        expect(wrapper).toMatchSnapshot();
      });

      it('should show overnight text if isOvernight is true', () => {
        const flightProductCard = new FlightProductBuilder().withOvernight().build();
        const wrapper = render({
          flightProductCard
        });

        expect(wrapper).toMatchSnapshot();
      });

      it('should show only overnight text if isOvernight and isNextDayArrival are both true', () => {
        const flightProductCard = new FlightProductBuilder().withOvernightAndNextDayArrival().build();
        const wrapper = render({
          flightProductCard
        });

        expect(wrapper).toMatchSnapshot();
      });

      context('flight product unavailable', () => {
        let flightProductCard;

        beforeEach(() => {
          flightProductCard = new FlightProductBuilder().withAllFaresUnavailableWithReason().build();
        });

        context('sold out', () => {
          let wrapper;

          beforeEach(() => {
            wrapper = render({
              flightProductCard: new FlightProductBuilder().withAllFaresUnavailableWithReason('SOLD OUT').build(),
              boundType: 'outbound',
              paxType: 'adult'
            });
          });

          afterEach(() => {
            sinon.restore();
          });

          it('should render SOLD OUT when all fare type product sold out', () => {
            expect(wrapper.find('div.fare-content.unavailable')).to.contain.text('Unavailable');
          });

          it('panel should have a noop onselect event when all fare type product sold out', () => {
            const flightProductContainer = wrapper.find('.flight-product--container');
            
            expect(flightProductContainer.prop('onClick')).to.be.a('function');
            
            const returnValue = flightProductContainer.prop('onClick')();
            
            expect(returnValue).to.be.undefined;
          });
        });

        it('should render Unavailable message instead if an unknown dynamic waiver type is passed.', () => {
          const wrapper = render({
            flightProductCard: { ...flightProductCard, ...{ dynamicWaiver: 'RANDOM' } },
            boundType: 'outbound',
            paxType: 'adult'
          });

          const reasonIfUnavailable = wrapper.find('div.fare-content.unavailable');

          expect(reasonIfUnavailable).to.contain.text('Unavailable');
        });

        it('should render Unavailable message if dynamic wavier is not present', () => {
          const wrapper = render({
            flightProductCard,
            boundType: 'outbound',
            paxType: 'adult'
          });

          const reasonIfUnavailable = wrapper.find('div.fare-content.unavailable');

          expect(reasonIfUnavailable).to.contain.text('Unavailable');
        });

        it('should render Unavailable message instead if an unavailable dynamic waiver type is passed.', () => {
          const wrapper = render({
            flightProductCard: { ...flightProductCard, ...{ dynamicWaiver: 'DYNAMIC_WAIVER_UNAVAILABLE' } },
            boundType: 'outbound',
            paxType: 'adult'
          });

          const reasonIfUnavailable = wrapper.find('div.fare-content.unavailable');

          expect(reasonIfUnavailable).to.contain.text('Unavailable');
        });
      });

      context('low fare flag', () => {
        it('should show LOW_FARE when the hasLowestFare flag is true', () => {
          const flightProductCard = new FlightProductBuilder().withLowestFlight().build();
          const wrapper = render({
            flightProductCard,
            boundType: 'outbound',
            paxType: 'adult',
            defaultExpanded: false
          });

          expect(wrapper.find('.low-fare-flag')).to.have.text('Low Fare');
        });

        it('should not show LOW_FARE when the flight is not the lowest', () => {
          const flightProductCard = new FlightProductBuilder().build();
          const wrapper = render({
            flightProductCard,
            boundType: 'outbound',
            paxType: 'adult',
            defaultExpanded: false
          });

          expect(wrapper.find('.low-fare-flag')).to.not.exist;
        });

        it('should render stretched flight times', () => {
          const wrapper = render({
            flightProductCard: new FlightProductBuilder().build(),
            boundType: 'outbound',
            paxType: 'adult'
          });

          expect(wrapper.find('FlightTimes').prop('isStretched')).to.equal(true);
        });
      });
    });

    context('with promo code applied', () => {
      let fareContent;

      beforeEach(() => {
        const wrapper = render({
          flightProductCard: new FlightProductBuilder().withPoints().build(),
          boundType: 'outbound',
          paxType: 'Adult',
          isPromoCodeApplied: true
        });

        fareContent = wrapper.find('.fare-content');
      });

      it('should render discount price and original price ', () => {
        expect(fareContent.find('Currency').at(0)).to.contain.text('19,000');
        expect(fareContent.find('Currency').at(1)).to.contain.text('18,000');
      });

      it('should strike through original price ', () => {
        expect(fareContent.find('Currency').at(0)).to.have.className('strike-through');
      });
    });

    describe('With same day', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = render({
          flightProductCard: new FlightProductBuilder().withSameDayLabelText().build(),
          isSameDay: true
        });
      });

      it('should find label text', () => {
        expect(wrapper.find('.label-text')).not.empty;
      });

      it('should render same day related views', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render same day expanded product cards', () => {
        wrapper = render({
          flightProductCard: new FlightProductBuilder().withSameDayLabelText().build(),
          isSameDay: true,
          isExpand: true
        });

        expect(wrapper).toMatchSnapshot();
      });
    });

    const render = (props) => mount(<FlightProduct {...props} />);
  });
});
