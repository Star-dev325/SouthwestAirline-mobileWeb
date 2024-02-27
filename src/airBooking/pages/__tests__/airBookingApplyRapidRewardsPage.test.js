import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AirBookingApplyRapidRewardsPage } from 'src/airBooking/pages/airBookingApplyRapidRewardsPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import SplitPayPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageResponseBuilder';
import FlexPlacementBuilder from 'test/builders/model/flexPlacementBuilder';
import createMockStore from 'test/unit/helpers/configureMockStore';
import { untilAssertPass } from 'test/unit/helpers/waitFor';

const mockStore = createMockStore();
const oneFundResponse = {
  travelFunds: [
    {
      expirationDate: '2020-2-20',
      travelFundType: 'TRAVEL_FUNDS',
      displayName: 'Hank Hill',
      fundIdentifier: 'ABC123',
      errorMessage: null,
      appliedAmount: {
        amount: '408.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '30.70',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: null
    }
  ],
  balanceRemaining: {
    amount: '408.98',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totalFunds: {
    amount: '0.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totals: {
    moneyTotal: {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    pointsTotal: null
  },
  fundsAppliedToken: 'funds-token'
};

const splitPayTravelFund = {
  expirationDate: '2020-2-20',
  travelFundType: 'SPLIT_PAYMENT',
  displayName: 'Hank Hill',
  fundIdentifier: 'ABC123',
  errorMessage: null,
  appliedAmount: {
    amount: '408.98',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  remainingAmount: {
    amount: '30.70',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  _links: {
    removeTravelFund: {
      body: {
        removalTravelFundId: 1
      }
    }
  }
};

describe('AirBookingApplyRapidRewardsPage', () => {
  let calculateFundsFnStub;
  let clearFormDataByIdFnStub;
  let getSplitPayOptionsListFnStub;
  let goBackStub;
  let hideDialogFnStub;
  let loadSplitPayPagePlacementsFnStub;
  let onClickCancelButtonStub;
  let onSubmitApplyRapidRewardPointsStub;
  let removeFundFnStub;
  let resetCalculateFlowDataFnStub;
  let resetSplitPayTermsAndConditionsFnStub;
  let satelliteTrackStub;
  let showDialogFnStub;

  beforeEach(() => {
    calculateFundsFnStub = jest.fn();
    clearFormDataByIdFnStub = jest.fn();
    getSplitPayOptionsListFnStub = jest.fn().mockResolvedValue({});
    goBackStub = jest.fn();
    hideDialogFnStub = jest.fn();
    loadSplitPayPagePlacementsFnStub = jest.fn().mockResolvedValue({});
    onClickCancelButtonStub = jest.fn();
    onSubmitApplyRapidRewardPointsStub = jest.fn();
    removeFundFnStub = jest.fn();
    resetCalculateFlowDataFnStub = jest.fn();
    resetSplitPayTermsAndConditionsFnStub = jest.fn();
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    showDialogFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const applyRapidRewardsComponent = createComponent();

    expect(applyRapidRewardsComponent.baseElement).toMatchSnapshot();
  });

  it('should not render page header when isWebView is true', () => {
    const { container } = createComponent({ isWebView: true });

    expect(container).toMatchSnapshot();
  });

  it('should have a splitPayOptions array', () => {
    const { container } = createComponent({
      splitPayPage: {
        splitPayOptions: [
          {
            pointsAmount: '$20',
            revenueAmount: '2,000',
            fundIdentifier: 'fund-identifier',
            splitPayOptionPointsAmount: 2000
          }
        ]
      }
    });

    expect(container.querySelectorAll('.apply-rapid-rewards-page').length).toEqual(1);
  });

  it('should load SplitPayPagePlacements on page load', () => {
    createComponent();

    untilAssertPass(() => {
      expect(loadSplitPayPagePlacementsFnStub).toHaveBeenCalled();
    });
  });

  it('should display placement when response contain paymentBanner', () => {
    const flexPlacement = new FlexPlacementBuilder().build();

    const { container } = createComponent({
      splitPayPagePlacements: {
        paymentBanner: flexPlacement
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should not display placement when response does not contain paymentBanner', () => {
    const { container } = createComponent({
      splitPayPagePlacements: undefined
    });

    expect(container).toMatchSnapshot();
  });

  it('should display wcm offer and options when there is paymentBanner placement and splitPayOptions array', () => {
    const flexPlacement = new FlexPlacementBuilder().build();

    const { container } = createComponent({
      splitPayPagePlacements: {
        paymentBanner: flexPlacement
      },
      splitPayOptionsExists: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should not display wcm offer and options when placements is null and splitPayOptionsExists flag is false', () => {
    const { container } = createComponent({
      splitPayPagePlacements: {},
      splitPayOptionsExists: false
    });

    expect(container).toMatchSnapshot();
  });

  it('should not display split pay message message when splitPayMessage is falsy', () => {
    const { container } = createComponent({ splitPayMessage: null });

    expect(container).toMatchSnapshot();
  });

  it('should display split pay message message when splitPayMessage exists', () => {
    const { container } = createComponent({
      splitPayMessage: new SplitPayPageBuilder().withSplitPayMessage().build().splitPayMessage,
      splitPayPage: {},
      splitPayPagePlacements: {}
    });

    expect(container).toMatchSnapshot();
  });

  it('should not render travel funds section when travelFunds is falsy', () => {
    const { container } = createComponent({ splitPayPageResponse: new SplitPayPageBuilder().build() });

    expect(container).toMatchSnapshot();
  });

  it('should render travel funds section when travelFunds exists', () => {
    const { container } = createComponent({
      splitPayPageResponse: new SplitPayPageBuilder().withAppliedFunds().build()
    });

    expect(container).toMatchSnapshot();
  });

  it('should not render priceTotal component when totals object is unavailable', () => {
    const splitPayPageResponse = {
      ...new SplitPayPageBuilder().build(),
      totals: null
    };
    const { container } = createComponent({ splitPayPageResponse });

    expect(container).toMatchSnapshot();
  });

  it('should not render priceTotal component when priceTotals is provided and no points have been applied', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render updated priceTotal component when totals object is provided and funds applied', () => {
    const splitPayPageCalcFundsResponseWithFundsApplied = {
      ...new SplitPayPageBuilder().withAppliedFunds().build(),
      totals: {
        moneyTotal: {
          amount: '510.85',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsTotal: null
      }
    };
    const { container } = createComponent({ splitPayPageCalcFundsResponseWithFundsApplied });

    expect(container).toMatchSnapshot();
  });

  it('should call the SPLIT_PAYMENT calculate endpoint and make an analytics call when form is submitted', () => {
    const mockFormData = {
      selectedRadioOption: 'ABC123'
    };

    const { container } = createComponent();

    onSubmitApplyRapidRewardPointsStub(mockFormData);
    fireEvent.click(container.querySelector('[type="submit"]'));

    onSubmitApplyRapidRewardPointsStub(mockFormData, calculateFundsFnStub);

    expect(calculateFundsFnStub).toHaveBeenCalled();
    expect(satelliteTrackStub).toHaveBeenCalledWith('squid', {
      page_description: 'button:cash plus points apply points'
    });
  });

  it('should call the remove calculate funds endpoint when X mark is clicked', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: new SplitPayPageBuilder().withAppliedFunds().build()
    });

    fireEvent.click(container.querySelector('.fund-results-list--removal-button'));
    expect(removeFundFnStub).toHaveBeenCalled();
  });

  it('should reset the form on X mark click, when only one fund is displayed', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: oneFundResponse
    });

    fireEvent.click(container.querySelector('.fund-results-list--removal-button'));
    expect(resetCalculateFlowDataFnStub).toHaveBeenCalled();
  });

  it('should reset split pay disclaimer on X mark click, when only one fund is displayed', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: oneFundResponse
    });

    fireEvent.click(container.querySelector('.fund-results-list--removal-button'));

    expect(resetSplitPayTermsAndConditionsFnStub).toHaveBeenCalled();
  });

  it('should reset split pay form on X mark click', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: oneFundResponse
    });

    fireEvent.click(container.querySelector('.fund-results-list--removal-button'));

    expect(clearFormDataByIdFnStub).toHaveBeenCalled();
  });

  it('should not reset split pay form on X mark click', () => {
    oneFundResponse.travelFunds = [oneFundResponse.travelFunds, splitPayTravelFund];

    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: oneFundResponse
    });

    fireEvent.click(container.querySelector('.fund-results-list--removal-button'));

    expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
  });

  it('should push to airBooking review page when click continue', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: new SplitPayPageBuilder().withAppliedFunds().build(),
      splitPayPageResponse: new SplitPayPageBuilder().build()
    });

    fireEvent.click(container.querySelector('.apply-continue-button'));

    expect(goBackStub).toHaveBeenCalled();
  });

  it('should show dialog if splitPay fund is applied and when cancel button is clicked ', () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: new SplitPayPageBuilder().withAppliedFunds().withTotalPointsApplied().build(),
      splitPayPageResponse: new SplitPayPageBuilder().build()
    });

    fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
    expect(showDialogFnStub).toHaveBeenCalled();
  });

  it('should close the dialog, remove selected splitPay, and goBack to review page when user clicks OK on popup dialog', async () => {
    const { container } = createComponent({
      applySplitPayPageCalcFundsResponse: new SplitPayPageBuilder().withAppliedFunds().withTotalPointsApplied().build(),
      splitPayPageResponse: new SplitPayPageBuilder().build()
    });

    fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
    await clickDialogButton(1);

    expect(hideDialogFnStub).toHaveBeenCalled();
  });

  it('should go to airBooking review page when cancel button is clicked, when splitPay fund is not applied', () => {
    const { container } = createComponent({
      splitPayPageResponse: new SplitPayPageBuilder().build()
    });

    fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
    expect(goBackStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      accountRedeemablePoints: 0,
      calculateFundsFn: calculateFundsFnStub,
      clearFormDataByIdFn: clearFormDataByIdFnStub,
      fundsAppliedToken: 'ajbhdjHdb',
      getSplitPayOptionsListFn: getSplitPayOptionsListFnStub,
      goBack: goBackStub,
      hideDialogFn: hideDialogFnStub,
      isWebView: false,
      itineraryPricingToken: 'itinerary-token',
      loadSplitPayPagePlacementsFn: loadSplitPayPagePlacementsFnStub,
      onClickCancelButton: onClickCancelButtonStub,
      onSubmitApplyRapidRewardPoints: onSubmitApplyRapidRewardPointsStub,
      passengerInfos: [
        {
          otherPassengerReference: 2,
          passengerInfo: {
            dateOfBirth: '1954-4-19',
            firstName: 'Hank',
            gender: 'M',
            lastName: 'Hill',
            middleName: 'hjdbv',
            rapidRewardsNumber: '1234567890',
            suffix: 'bdh'
          },
          passengerReference: 1,
          type: 'adult'
        }
      ],
      removeFundFn: removeFundFnStub,
      resetCalculateFlowDataFn: resetCalculateFlowDataFnStub,
      resetSplitPayTermsAndConditionsFn: resetSplitPayTermsAndConditionsFnStub,
      showDialogFn: showDialogFnStub,
      splitPayLinksObj: {},
      splitPayPage: new SplitPayPageBuilder().build().splitPayPage,
      splitPayPagePlacements: {},
      splitPayRadioOptions: {}
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };
    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return render(
      <Provider store={mockStore(state)}>
        <AirBookingApplyRapidRewardsPage {...finalProps} />
      </Provider>
    );
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnStub.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
