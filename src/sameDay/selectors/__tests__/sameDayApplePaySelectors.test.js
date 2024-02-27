import { getShouldShowApplePay } from 'src/sameDay/selectors/sameDayApplePaySelectors';

describe('sameDayApplePaySelectors', () => {
  it('should show Apple Pay when it is available and the toggle is on', () => {
    const mockState = {
      app: {
        applePay: {
          applePayAvailability: {
            isAvailable: true
          }
        },
        toggles: {
          APPLE_PAY_FOR_SAME_DAY: true
        }
      }
    };

    expect(getShouldShowApplePay(mockState)).toEqual(true);
  });

  it('should not show Apple Pay when it is not available', () => {
    const mockState = {
      app: {
        applePay: {
          applePayAvailability: {
            isAvailable: false
          }
        },
        toggles: {
          APPLE_PAY_FOR_SAME_DAY: true
        }
      }
    };

    expect(getShouldShowApplePay(mockState)).toEqual(false);
  });

  it('should not show Apple Pay when it is not toggled on', () => {
    const mockState = {
      app: {
        applePay: {
          applePayAvailability: {
            isAvailable: true
          }
        },
        toggles: {
          APPLE_PAY_FOR_SAME_DAY: false
        }
      }
    };

    expect(getShouldShowApplePay(mockState)).toEqual(false);
  });

  it('should not throw an exception when app state is empty', () => {
    const wrappedGetShouldShowApplePay = () => {
      getShouldShowApplePay({});
    };

    expect(wrappedGetShouldShowApplePay).not.toThrow();
  });

  it('should not throw an exception when toggle state is empty', () => {
    const wrappedGetShouldShowApplePay = () => {
      getShouldShowApplePay({
        app: { 
          applePay: {
            applePayAvailability: { 
              isAvailable: true 
            } 
          }
        }
      });
    };

    expect(wrappedGetShouldShowApplePay).not.toThrow();
  });
});