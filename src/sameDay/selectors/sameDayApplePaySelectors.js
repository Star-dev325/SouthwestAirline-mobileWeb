export const getShouldShowApplePay = (state) =>
  state.app?.toggles?.APPLE_PAY_FOR_SAME_DAY && state.app.applePay?.applePayAvailability?.isAvailable;