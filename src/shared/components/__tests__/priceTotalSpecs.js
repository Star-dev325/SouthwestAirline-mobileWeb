import React from 'react';
import { shallow, mount } from 'enzyme';
import PriceTotal from 'src/shared/components/priceTotal';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import i18n from '@swa-ui/locale';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

const travelFundsBalanceRemaining = {
  amount: '678.90',
  currencyCode: 'USD',
  currencySymbol: '$'
};

describe('Price Total', () => {
  context('reprice', () => {
    let givenProps;
    let priceTotalWrapper;

    context('render', () => {
      it('should render price total line when booking by dollar', () => {
        givenProps = new PriceTotalBuilder().build();
        const expectedMoneyTotal = givenProps.totals.moneyTotal;

        priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} isReprice />);

        expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('title').to.equal('New Total');
        expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('type').to.equal('total');
        expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('total').deep.equal(expectedMoneyTotal);
      });

      it('should render regular price total when splitPay fund is not applied', () => {
        givenProps = new PriceTotalBuilder().build();
        const expectedMoneyTotal = givenProps.totals.moneyTotal;

        priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} isReprice showOnlyPointsTotal={false} />);

        expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('total').deep.equal(expectedMoneyTotal);
      });

      it('should render updated price total per passenger when splitPay fund is applied', () => {
        const updatedPriceTotal = {
          moneyTotal: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          totalPerPassenger: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };

        givenProps = new PriceTotalBuilder().build();

        priceTotalWrapper = shallow(
          <PriceTotal
            totals={givenProps.totals}
            updatedPriceTotal={updatedPriceTotal}
            isReprice
            showOnlyPointsTotal={false}
          />
        );

        expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('total').deep.equal(updatedPriceTotal.moneyTotal);
      });

      it('should show detail note when it is not a companion purchase', () => {
        givenProps = new PriceTotalBuilder().build();

        priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} isReprice />);

        expect(priceTotalWrapper.find('.price-total--info-col').at(0)).to.have.text(
          i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')
        );
      });

      it('should show new dollar and points total line when booking by point', () => {
        givenProps = new PriceTotalBuilder().withPointsTotal().build();
        const expectedPointsTotal = givenProps.totals.pointsTotal;
        const expectedMoneyTotal = givenProps.totals.moneyTotal;

        priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} isReprice />);

        expect(priceTotalWrapper.find('PriceTotalLine').at(0)).to.have.props({
          title: 'New Points Total',
          type: 'total',
          total: expectedPointsTotal,
          className: 'mb4'
        });
        expect(priceTotalWrapper.find('PriceTotalLine').at(1)).to.have.props({
          title: 'Dollar Total',
          type: 'total',
          total: expectedMoneyTotal
        });
      });

      context('should render note', () => {
        beforeEach(() => {
          priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} isReprice />);
        });

        it('should render brief note', () => {
          expect(priceTotalWrapper.find('.price-total--info-col').at(0)).to.have.text('Includes taxes and fees');
        });

        it('should show fare break down', () => {
          expect(priceTotalWrapper.find('[data-qa="toggleBreakdown"]').find('p')).to.have.text('Show fare breakdown');
        });
      });

      it('should not render travel funds ledger items when they do not have value', () => {
        givenProps = new PriceTotalBuilder().build();

        priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} />);

        expect(priceTotalWrapper.find('PriceLedgerLine')).to.not.exist;
      });

      it('should render travel funds ledger items when they have values', () => {
        givenProps = new PriceTotalBuilder().build();
        const totalAppliedTravelFunds = {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        };

        priceTotalWrapper = shallow(
          <PriceTotal
            totalAppliedTravelFunds={totalAppliedTravelFunds}
            totals={givenProps.totals}
            travelFundsBalanceRemaining={travelFundsBalanceRemaining}
          />
        );

        expect(priceTotalWrapper.find('PriceLedgerLine')).to.have.lengthOf(2);
        expect(priceTotalWrapper.find('PriceLedgerLine').at(0)).to.have.prop(
          'title',
          TravelFundsConstants.TRAVEL_FUNDS_APPLIED
        );
        expect(priceTotalWrapper.find('PriceLedgerLine').at(0)).to.have.prop('currencyAmount', totalAppliedTravelFunds);
        expect(priceTotalWrapper.find('PriceLedgerLine').at(1)).to.have.prop(
          'title',
          TravelFundsConstants.TOTAL_DUE_NOW
        );
        expect(priceTotalWrapper.find('PriceLedgerLine').at(1)).to.have.prop(
          'currencyAmount',
          travelFundsBalanceRemaining
        );
      });

      it('should render applied rapid rewards points totals when they have values', () => {
        givenProps = new PriceTotalBuilder().build();
        const totalPointsApplied = {
          moneyApplied: {
            amount: '182.23',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsApplied: {
            amount: '14,214',
            currencyCode: 'PTS',
            currencySymbol: 'PTS'
          }
        };

        priceTotalWrapper = shallow(
          <PriceTotal
            totalPointsApplied={totalPointsApplied}
            totals={givenProps.totals}
            travelFundsBalanceRemaining={travelFundsBalanceRemaining}
          />
        );

        expect(priceTotalWrapper).toMatchSnapshot();
      });
    });
  });

  context('not reprice', () => {
    let givenProps;
    let priceTotalWrapper;

    it('should render according title', () => {
      const givenProps = new PriceTotalBuilder().build();
      const expectedMoneyTotal = givenProps.totals.moneyTotal;

      const priceTotalWrapper = mount(<PriceTotal totals={givenProps.totals} />);

      expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('title').to.equal('Total');
      expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('type').to.equal('total');
      expect(priceTotalWrapper.find('PriceTotalLine')).to.have.prop('total').deep.equal(expectedMoneyTotal);
    });

    it('should show dollar and points total line when booking by point', () => {
      const givenProps = new PriceTotalBuilder().withPointsTotal().build();
      const expectedPointsTotal = givenProps.totals.pointsTotal;
      const expectedMoneyTotal = givenProps.totals.moneyTotal;

      const priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} />);

      expect(priceTotalWrapper.find('PriceTotalLine').at(0)).to.have.props({
        title: 'Points Total',
        type: 'total',
        total: expectedPointsTotal
      });
      expect(priceTotalWrapper.find('PriceTotalLine').at(1)).to.have.props({
        title: 'Dollar Total',
        type: 'total',
        total: expectedMoneyTotal
      });
    });

    context('click on show break down', () => {
      beforeEach(() => {
        givenProps = new PriceTotalBuilder().build();
        priceTotalWrapper = mount(<PriceTotal {...givenProps} />);
      });

      it('should show `Hide fare breakdown` when click on the `Show fare breakdown`', () => {
        const breakDownWrapper = '[data-qa="toggleBreakdown"]';

        click(priceTotalWrapper.find(breakDownWrapper));

        expect(priceTotalWrapper.find(breakDownWrapper).find('p')).to.have.text('Hide fare breakdown');
      });

      it('should show `Show fare breakdown` when click on the `Hide fare breakdown`', () => {
        const breakDownWrapper = priceTotalWrapper.find('[data-qa="toggleBreakdown"]');

        click(breakDownWrapper);
        click(breakDownWrapper);

        expect(breakDownWrapper.find('p')).to.have.text('Show fare breakdown');
      });

      it('should show price detail when click on the `Show fare breakdown`', () => {
        givenProps = new PriceTotalBuilder().build();
        priceTotalWrapper = mount(<PriceTotal {...givenProps} />);
        const expectPassengerFare = givenProps.totals.adultFare;

        click(priceTotalWrapper.find('[data-qa="toggleBreakdown"]'));

        expect(priceTotalWrapper.find('.price-total--price-break-down')).to.be.present();
        expect(priceTotalWrapper.find('PriceDetails')).to.have.prop('adultFare').deep.equal(expectPassengerFare);
        expect(priceTotalWrapper.find('PriceDetails')).to.have.prop('adultPassengerType').deep.equal('Passenger');
        expect(priceTotalWrapper.find('PriceDetails')).to.have.prop('showEarlyBirdInFareBreakdown').to.equal(true);
      });
    });
  });

  context('confirmation price total', () => {
    const mockChangeType = {
      upGrade: false,
      downGrade: false,
      evenExchange: true
    };

    it('should show price breakdown as default', () => {
      const givenProps = new PriceTotalBuilder().withPointsTotal().build();

      const priceTotalWrapper = shallow(
        <PriceTotal totals={givenProps.totals} change={mockChangeType} isPointsChange />
      );

      expect(priceTotalWrapper.find('[data-qa="toggleBreakdown"]').find('p')).to.have.text('Show fare breakdown');
    });

    it('should not show price breakdown if shouldHidePriceBreakdown is true', () => {
      const givenProps = new PriceTotalBuilder().withPointsTotal().build();

      const priceTotalWrapper = shallow(
        <PriceTotal totals={givenProps.totals} change={mockChangeType} isPointsChange shouldHidePriceBreakdown />
      );

      expect(priceTotalWrapper.find('[data-qa="toggleBreakdown"]')).to.be.not.exist;
    });
  });

  context('with points only booking', () => {
    it('should show price breakdown for Points', () => {
      const givenProps = new PriceTotalBuilder().withPointsTotal().build();

      const priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} showOnlyPointsTotal showPoints />);

      expect(priceTotalWrapper).toMatchSnapshot();
    });

    it('should render according title for currency PNR', () => {
      const givenProps = new PriceTotalBuilder().build();
      const priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} showOnlyPointsTotal={false} />);

      expect(priceTotalWrapper).toMatchSnapshot();
    });

    it('should show dollar and points total when not points booking', () => {
      const givenProps = new PriceTotalBuilder().withPointsTotal().build();
      const priceTotalWrapper = shallow(<PriceTotal totals={givenProps.totals} />);

      expect(priceTotalWrapper).toMatchSnapshot();
    });
  });
});
