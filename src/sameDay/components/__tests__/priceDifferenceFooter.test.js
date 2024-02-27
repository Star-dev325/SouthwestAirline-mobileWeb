import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PriceDifferenceFooter } from 'src/sameDay/components/priceDifferenceFooter';
import SameDayPricingResponseBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import SameDayRefundMethodBuilder from 'test/builders/apiResponse/sameDayRefundMethodBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('priceDifferenceFooter', () => {
  it('should render price diff footer component when there is no amount due with no taxes and Fees content', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const container = getContainer(sameDayPricingPage);

    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component for upgrade with amount due with taxes and fees content', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDue().build();
    const container = getContainer(sameDayPricingPage);

    expect(container).toMatchSnapshot();
  });

  it('should render refund scenario footer when credit is due', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withRefundScenario().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });
  
    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component for upgrade with PTS', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withPtsUpgradeScenario().build();
    const container = getContainer(sameDayPricingPage);

    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component for upgrade with PTS with refundScenario', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withPtsUpgradeScenario().build();
    const container = getContainer(sameDayPricingPage);

    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component for downgrade with PTS', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withPtsDowngradeScenario().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });
  
    expect(container).toMatchSnapshot();
  });
  it('should render price diff footer component when fare is in credit due and tax is in amount due', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withPtsDowngradeCreditFareAndAmountDueTaxScenario().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });
   
    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component when fare is in amount due and tax is in credit due', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withPtsUpgradeAmountDueFareAndCreditTaxScenario().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });
   
    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component when amountDueFare is present and amountduetax is not present', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueFarePtsAndNoTax().build();
    const container = getContainer(sameDayPricingPage, {
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });

    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component when creditDueFare is present and creditduetax is not present', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withCreditDueFarePtsAndNoTax().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText
    });
   
    expect(container).toMatchSnapshot();
  });

  it('should render price diff footer component when ItemTotalLabel and amountDueTax are present for pointsEvenexchange in sameDayRefundPage', () => {
    const sameDayRefundMethodPage = new SameDayRefundMethodBuilder().withAmountDue().build().sameDayRefundMethod;
    const container = getContainer(sameDayRefundMethodPage, {
      amountDue: sameDayRefundMethodPage.fareSummary.amountDue,
      labelText: sameDayRefundMethodPage._links.sameDayConfirmation.labelText,
      taxesAndFeesWithLinks: sameDayRefundMethodPage.fareSummary.taxesAndFeesWithLinks
    });
   
    expect(container).toMatchSnapshot();
  });

  it('should render price diff continue button with extra bottom padding when isWebView', () => {
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withRefundScenario().build();
    const container = getContainer(sameDayPricingPage, {
      creditDue: sameDayPricingPage.fareSummary.creditDue,
      labelText: sameDayPricingPage._links.sameDayConfirmationRefund.labelText,
      isWebView: true
    });

    expect(container).toMatchSnapshot();
  });

  const getContainer = (sameDayPricingPage, props) => {
    const baseProps = {
      amountDue: sameDayPricingPage.fareSummary.amountDue,
      labelText: sameDayPricingPage?._links?.sameDayConfirmation?.labelText,
      taxesAndFeesWithLinks: sameDayPricingPage.fareSummary.taxesAndFeesWithLinks
    };
    const { container } = createComponent({ ...baseProps, ...props });

    return container;
  };

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      location: {},
      match: { params: '' }
    };
    const defaultState = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <PriceDifferenceFooter {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
