# Express Checkout in mWeb

## Business Requirement

> SWA want to save users time during purchase when the user satisfy some conditions.

### Conditions

- Logged in.
- Have saved personal information.
- Have saved credit card.
- The passenger number for purchase is only one.

## Approach

We have a HOC which named as `withExpressCheckout.js` to achieve this functionality. And we applied it on `passengerInformation` page. When the component mounted, it will dispatch `fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn` action to handle all the logic which related with express checkout.
Here is the pseudo-code.

```js
componentDidMount() {
      ...
      if (isEligibleForExpressCheckout && isLoggedIn) {
        ...

        fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn(...);
      } else {
        this.setState({shouldRenderComponent: true});
      }
    }
```

The state `isEligibleForExpressCheckout` will be initialized as **true** in `airBookingReducers`.

Inside of this action, there are two API calls and dispatched other four actions. And they are explained bellowing.

###API Call:

- AccountsApi.fetchPaymentOptions()

  > To fetch the payment information from server

- FlightBookingApi.fetchPassengerInfo()
  > To fetch the passenger information from server

###Actions:

- fetchSavedCCAndPassengerInfoSuccess

  > To save the `savedCreditCards` and `accountInfo`

- prefillPassengerInfo

  > To update `passengerInfo` and `contactMethodInfo` which are used to pre-fill passenger form on `passengerInformation` page.

- clearFormDataByURL

  > To clear the old form data in case there is some cache data which fill before by user.

- expressCheckout
  > To check all the conditions are satisfied to perform express checkout, if so page will transition to review page otherwise set `isEligibleForExpressCheckout` as **false** and stay on the `passengerInformation` page.
