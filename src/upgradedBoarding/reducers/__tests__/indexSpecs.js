import _ from 'lodash';
import upgradedBoarding from 'src/upgradedBoarding/reducers';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';

describe('UpgradedBoarding Reducers', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      upgradedBoardingPage: {
        upgradedBoardingPagePlacements: {},
        purchasePagePlacements: {},
        upgradedBoardingResponse: {},
        paymentInfo: {},
        upgradedBoardingCountdownTimeStamp: null,
        upgradedBoardingPurchaseResponse: {},
        moneyTotal: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      }
    };
  });

  it('should create default store structure when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(upgradedBoarding(undefined, action)).to.deep.equal(defaultState);
  });

  it('should reset upgraded boarding flow data when action type is UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA', () => {
    const modifiedState = _.merge(
      {},
      defaultState,
      {
        upgradedBoardingResponse: {
          upgradedBoardingSelectPage: {
            recordLocator: '4FFCX6',
            destinationDescription: 'Memphis',
            originationDestinationDescription: 'Atlanta, GA to Memphis, TN'
          }
        }
      },
      {
        upgradedBoardingPage: {
          upgradedBoardingPagePlacements: {
            promoTop: {}
          }
        }
      },
      { paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' } },
      { moneyTotal: { amount: '70.00', currencyCode: 'USD', currencySymbol: '$' } }
    );

    const updatedState = upgradedBoarding(modifiedState, {
      type: upgradedBoardingActionTypes.UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
    });

    expect(updatedState.upgradedBoardingPage.upgradedBoardingPagePlacements).to.deep.equal(
      modifiedState.upgradedBoardingPage.upgradedBoardingPagePlacements
    );
  });

  it('should reset upgraded boarding flow data to default state when upgradedBoardingPage state is undefined and action type is UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA', () => {
    const modifiedState = _.merge(
      {},
      defaultState,
      {
        upgradedBoardingResponse: {
          upgradedBoardingSelectPage: {
            recordLocator: '4FFCX6',
            destinationDescription: 'Memphis',
            originationDestinationDescription: 'Atlanta, GA to Memphis, TN'
          }
        }
      },
      { paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' } },
      { moneyTotal: { amount: '70.00', currencyCode: 'USD', currencySymbol: '$' } }
    );

    const updatedState = upgradedBoarding(modifiedState, {
      type: upgradedBoardingActionTypes.UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
    });

    expect(updatedState.upgradedBoardingPage.upgradedBoardingPagePlacements).to.deep.equal(
      defaultState.upgradedBoardingPage.upgradedBoardingPagePlacements
    );
  });
});
