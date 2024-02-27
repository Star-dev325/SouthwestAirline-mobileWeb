import { getShouldShowApplePay } from 'src/shared/selectors/upgradedBoardingSelector';

const getState = (applePayToggle, isApplePayAvailable) => ({
  app: {
    toggles: {
      APPLE_PAY_FOR_UPGRADED_BOARDING: applePayToggle
    },
    applePay: {
      applePayAvailability: {
        isAvailable: isApplePayAvailable
      }
    }
  }
});

describe('getShouldShowApplePay', () => {
  it('should return true when applePayForUpgradedBoarding and applePayAvailability are true', () => {
    const state = getState(true, true);

    const result = getShouldShowApplePay(state);

    expect(result).toEqual(true);
  });

  it('should return false when applePayForUpgradedBoarding and applePayAvailability are false', () => {
    const state = getState(false, false);

    const result = getShouldShowApplePay(state);

    expect(result).toEqual(false);
  });

  it('should return false when applePayAvailability are false', () => {
    const state = getState(true, false);

    const result = getShouldShowApplePay(state);

    expect(result).toEqual(false);
  });

  it('should return false when applePayForUpgradedBoarding are false', () => {
    const state = getState(false, true);
    const result = getShouldShowApplePay(state);

    expect(result).toEqual(false);
  });
});
