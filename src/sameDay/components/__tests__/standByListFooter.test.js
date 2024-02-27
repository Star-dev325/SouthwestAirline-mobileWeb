import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { StandByListFooter } from 'src/sameDay/components/standByListFooter.jsx';
import sameDayPurchaseConfirmationBuilder from 'test/builders/apiResponse/sameDayPurchaseConfirmationPageBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('StandByListFooter', () => {
  it('should  render standBy list footer component with all information', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          total,
          total: { item: title },
          taxesAndFeesWithLinks
        },
        _links: {
          enhancedStandbyList: { labelText: standbyLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().build();

    const { container } = createComponent(
      { isShowPoints: false, standbyLabel, taxesAndFeesWithLinks, title, total },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render total with points and tax in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          total: pointsTotal,
          total: { item: title },
          taxesAndFeesWithLinks,
          totalPointsTax: total
        },
        _links: {
          enhancedStandbyList: { labelText: standbyLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().withPointsAmountDue().build();

    const { container } = createComponent(
      { isShowPoints: true, pointsTotal, standbyLabel, taxesAndFeesWithLinks, title, total },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render taxCreditRefund with points credit and tax credit in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          refundMessage,
          total: pointsTotal,
          totalCreditPointsTax: taxCreditRefund,
          taxesAndFeesWithLinks,
          totalCreditPointsTax: { item: taxTitle },
          totalPointsTax: total
        },
        _links: {
          viewBoardingPositions: { labelText: standbyLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().withPointsAndTaxCredit().build();

    const { container } = createComponent(
      {
        isShowPoints: true,
        pointsTotal,
        refundMessage,
        taxCreditRefund,
        standbyLabel,
        taxesAndFeesWithLinks,
        taxTitle,
        total
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render total with points and no tax in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          total,
          total: { item: title },
          taxesAndFeesWithLinks
        },
        _links: {
          enhancedStandbyList: { labelText: standbyLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().withPointsNoTaxAmountDue().build();

    const { container } = createComponent(
      { isShowPoints: true, standbyLabel, taxesAndFeesWithLinks, title, total },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render Boarding details label in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          refundMessage,
          totalCredit,
          totalCredit: { item: title },
          taxesAndFeesWithLinks
        },
        _links: {
          viewBoardingPositions: { labelText: viewBoardingPositionsLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().withTotalCreditDue().build();

    const { container } = createComponent(
      { refundMessage, taxesAndFeesWithLinks, title, total: totalCredit, totalCredit, viewBoardingPositionsLabel },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should not render standby list button in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          total,
          total: { item: title },
          taxesAndFeesWithLinks
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().build();

    const { container } = createComponent({ taxesAndFeesWithLinks, total, title }, {});

    expect(container).toMatchSnapshot();
  });

  it('should not render total price in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          total: { item: title },
          taxesAndFeesWithLinks
        },
        _links: {
          enhancedStandbyList: { labelText: standbyLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().build();

    const { container } = createComponent({ standbyLabel, taxesAndFeesWithLinks, title }, {});

    expect(container).toMatchSnapshot();
  });

  it('should render total credit and standby list button in the standBy list footer component ', () => {
    const { sameDayConfirmationPage } = new sameDayPurchaseConfirmationBuilder().withTotalCreditDueStandBy().build();
    const refundMessage = sameDayConfirmationPage.fareSummary.refundMessage;
    const standbyLabel = sameDayConfirmationPage._links.enhancedStandbyList.labelText;
    const taxesAndFeesWithLinks = sameDayConfirmationPage.fareSummary.taxesAndFeesWithLinks;
    const title = sameDayConfirmationPage.fareSummary.totalCredit.item;
    const totalCredit = sameDayConfirmationPage.fareSummary.totalCredit;

    const { container } = createComponent(
      { refundMessage, standbyLabel, taxesAndFeesWithLinks, title, totalCredit },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render standby list button with extra bottom padding in the standBy list footer component when isWebView', () => {
    const { sameDayConfirmationPage } = new sameDayPurchaseConfirmationBuilder().withTotalCreditDueStandBy().build();
    const refundMessage = sameDayConfirmationPage.fareSummary.refundMessage;
    const standbyLabel = sameDayConfirmationPage._links.enhancedStandbyList.labelText;
    const taxesAndFeesWithLinks = sameDayConfirmationPage.fareSummary.taxesAndFeesWithLinks;
    const title = sameDayConfirmationPage.fareSummary.totalCredit.item;
    const totalCredit = sameDayConfirmationPage.fareSummary.totalCredit;

    const { container } = createComponent(
      { refundMessage, standbyLabel, taxesAndFeesWithLinks, title, totalCredit, isWebView: true },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should not render explanatory note(taxesAndFeesWithLinks) in the standBy list footer component', () => {
    const { sameDayConfirmationPage } = new sameDayPurchaseConfirmationBuilder().build();
    const standbyLabel = sameDayConfirmationPage._links.enhancedStandbyList.labelText;
    const title = sameDayConfirmationPage.fareSummary.total.item;
    const total = sameDayConfirmationPage.fareSummary.total;

    const { container } = createComponent({ standbyLabel, title, total }, {});

    expect(container).toMatchSnapshot();
  });

  it('should render points credit only in the standBy list footer component', () => {
    const {
      sameDayConfirmationPage: {
        fareSummary: {
          refundMessage,
          totalCredit,
          totalCredit: { item: title },
          taxesAndFeesWithLinks
        },
        _links: {
          viewBoardingPositions: { labelText: viewBoardingPositionsLabel }
        }
      }
    } = new sameDayPurchaseConfirmationBuilder().withOnlyPointsCredit().build();

    const { container } = createComponent(
      { isShowPoints: true, refundMessage, taxesAndFeesWithLinks, title, totalCredit, viewBoardingPositionsLabel },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render a link with the standby search token when in web view', () => {
    const props = {
      isWebView: true,
      recordLocator: 'recordLocator',
      standbyLabel: 'standbyLabel',
      standbyToken: 'standbyToken'
    };
    const { queryByText } = createComponent(props);

    expect(queryByText('buttonText')).toMatchSnapshot();
  });

  it('should render a link with the boarding pass details when in web view', () => {
    const props = {
      buttonLabel: 'buttonLabel',
      firstName: 'First',
      lastName: 'Last',
      isWebView: true,
      recordLocator: 'recordLocator'
    };
    const { queryByText } = createComponent(props);

    expect(queryByText('buttonLabel')).toMatchSnapshot();
  });

  it('should render a link with the view boarding details with passenger search token when in web view', () => {
    const props = {
      firstName: 'John',
      isWebView: true,
      lastName: 'Appleseed',
      passengerSearchToken: 'abc.123.xyz',
      recordLocator: 'abc123',
      viewBoardingPositionsLabel: 'Boarding details'
    };
    const { getByText } = createComponent(props);

    expect(getByText('Boarding details')).toMatchSnapshot();
  });

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
    const mergedProps = { ...defaultProps, ...props };
    const store = configureMockStore()({ ...defaultState, ...state });

    return render(
      <div>
        <Provider store={store}>
          <StandByListFooter {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
