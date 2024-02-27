# CeptorJS Pattern

## Summary

CeptorJs is a library owned and maintained by vendor partner [UATP](https://uatp.com/) that facilitates the usage of various alternative forms of payment (AFP). It is currently used by Desktop for Uplift and by mWeb and Hybrid for both Apple Pay and Uplift. It is best practice to stay aligned with Desktop on which version of CeptorJs we are using. See [package.json](../../package.json) for the currently used version.

```
"ceptor-js": "2.1.17",
```

## Development Pattern

The high-level workflow for both Apple Pay and Uplift is below. View the Uplift diagram for a more detailed, visual representation.

1. Instantiate a `CeptorWrapper`
2. Build `CeptorConfig` object containing details about SWA client and the transaction
3. Call `getAvailable` with `CeptorConfig` object and receive available forms of payment from CeptorJS in response
4. Call `getAvailable` or `update` with any changes to data in the `CeptorConfig` object
5. Display forms of payment to the user
6. If user selects form of payment, collect additional data (i.e. Apple Pay Sheet, External Payment Page) and call `getUatpCard` to retrieve card details
7. Submit UATP Card details to CHAPI `/purchase` call

### Common Relevant Files

Brief descriptions of some of the common relevant files. This should not be considered the source of truth, but a guide to some of the well-known files.

- Higher Order Component (HOC) - `withAlternativeFormsOfPayment.js`
  - Wraps the checkout pages and orchestrates the loading, validating, and initiating of AFPs
- Actions - `alternativeFormOfPaymentActions.js`
  - Contains logic for calling into CeptorWrapper apis and provides error handling and loading spinners
- Reducer - `alternativeFormsOfPaymentReducer.js`
  - Contains a base function for generation an afpAvailability object for a given payment method
- Selector - `alternativeFormsOfPaymentSelector.js`
  - Main config file for creating the CeptorConfig object that is passed in to CeptorJS
  - Contains logic for AFP availability and money totals
- Helper - `alternativeFormsOfPaymentHelper.js`
  - Holds supporting logic for various pieces of the Ceptor flow
- Transformer - `alternativeFormsOfPaymentTransformer.js`
  - Contains logic to transform CeptorJS requests and responses into consumable formats
  - Error Log transformation

---

## Apple Pay

### Summary

CeptorJs provides a wrapper for Southwest that handles integrating with [CellPoint Digital (CPD)](https://cellpointdigital.com/) which orchestrates the Apple Pay payments.

### Relevant Files

- Reducer - `applePayReducer.js`
  - Stores applePayCard and availability objects in state
- Helper - `applePayHelper.js`
  - Validates apple pay card with UATP card details

### Notes

- Apple Pay is available in iOS native via an SDK
- Apple Pay is available through hybrid using the `ceptor-js` library

## How to Debug Common Issues

**Apple Pay transactions are failing**

1. Verify the following network calls are returning a successful response:
   - getAvailable
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Apple Pay payment method
       - When `methodAvailable` is false, this could mean that the supporting APIs are down and UATP or CDP should be contacted
   - update
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Apple Pay payment method
       - Follow the same remediation steps as the getAvailable call if `methodAvailable` is false
   - FinalizeTransaction
     - Verify response is 200
   - authorize-payment
     - If this is failing consistently, reach out to CDP with the request copied as a cURL and the response.
     - Be sure to include the transactionId
   - pay
     - If this is failing consistently, reach out to CDP with the request copied as a cURL and the response.
     - Be sure to include the transactionId
2. View any `/log` calls in the Network tab for details on the error.
   - If there is any detail, reach out to CDP with the details of the error message.
3. Verify your account is properly set up with an Apple Pay test card. Reach out to iOS team for assistance in setting this up.

**I do not see Apple Pay as a form of payment**

1. For mWeb browsers, you must be in Safari in the Responsive Design Mode for a mobile device. Ceptor verifies your user agent is iOS in order to see Apple Pay.
2. Verify `APPLE_PAY` key is included in the bootstrap data: `/swa-ui/bootstrap/mobile-web/1/data.js` > `swa-bootstrap-mobile-web/payment-option-order`
3. Verify the Ceptor Core network calls have completed successfully. If any are consistently failing, reach out to the Ceptor or CDP development team.
   - getAvailable
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Apple Pay payment method
       - When `methodAvailable` is false, this could mean that the supporting APIs are down and UATP or CDP should be contacted
   - update
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - Follow the same remediation steps as the getAvailable call if `methodAvailable` is false
4. View any `/log` calls in the Network tab for details on the error.
   - If there is any detail, reach out to CDP with the details of the error message.

---

## Uplift

### Summary

[Uplift](https://www.uplift.com/) is a vendor partner that provides a form of payment that allows users to pay in low cost monthly installments. Uplift offers a loan to the user and provides a UATP card to Southwest that allows the user to book the transaction. The user then separately settles with Uplift through monthly installment payments.

### Relevant Files

- Reducer - `upliftReducer.js`
  - Stores upliftCard and availability objects in state
- Selector - `upliftSelector.js`
  - Contains logic for showing/hiding, enabling/disabling Uplift based on business rules (see `getShouldShowUplift` and `getShouldDisableUplift` for most recent business rules)
  - Contains logic for building the Uplift portion of the ceptorConfig including passenger and trip details
  - Contains function for generating the Pay Monthly text seen underneath the payment method option
- Helper - `upliftHelper.js`
  - Validates uplift card with UATP card details

### External Payment Page

The external payment page is responsible for hosting the Uplift iFrame. The user is directed to the page once they have selected Uplift as a FOP and clicked Purchase. It is responsible for loading the loan application and redirecting the user back into the mWeb or native app flows. It was built to be extensible for future alternative forms of payment loaded through CeptorJS.

**Note** - An external payment page is required due to legal restrictions from hosting an iFrame and collecting sensitive data within the native apps. Since this is a hybrid flow, mWeb also uses an external payment page to provide a consistent experience.

Folder - `src/externalPayment`

- Page Component - `externalPaymentPage.jsx`
- Reducer - `externalPaymentReducer.js`
  - Tracks retrieved AFP Params, token availability upon completion of the Uplift loan application, and logic to show/hide the return button
- Actions - `externalPaymentActions.js`
  - Primarily serves as a wrapper for various `alternativeFormsOfPaymentActions` to refresh the CeptorWrapper session
- Helper - `externalPaymentHelper.js`
  - Validates redirectUrl and generates error log logic

## Hybrid Deep Links

When in Hybrid, the external payment page utilizes Custom Scheme URLs to open the Native Apps upon completion of the loan application. The URL prefixes and paths are located in mWeb's bootstrap data and are controlled by WCM.

The current path and prefix keys are located in the `swa-bootstrap-mobile-web/urls` section of the bootstrap data. An example of the bootstrap data can be seen here: https://mobile.dev1.southwest.com/swa-ui/bootstrap/mobile-web/1/data.js. For more information on the configurations, view the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide).

| Key                                      | Use                          |
| ---------------------------------------- | ---------------------------- |
| externalPaymentDeepLinkUrl               | Deep link path               |
| externalPaymentAndroidCustomSchemePrefix | Android custom scheme prefix |
| externalPaymentIOSCustomSchemePrefix     | iOS custom scheme prefix     |

### Why Custom Scheme URLs

A custom scheme URL in iOS is needed due to native handling within iOS/Safari to ignore registered universal links **if the link is followed from the same domain as the universal link.** Because the external payment page is hosted on mobile.southwest.com, iOS will ignore the registered list in the iOS app and always open the link in mWeb. This is not an issue for PayPal/Chase because those pages are hosted on their own, different domains.

For Android, the custom scheme URL is needed because Samsung Browser does not support universal links but is used by a statistically significant portion of Southwest's Android users.

---

## Guides

### How to Add Uplift to a Checkout Flow

Example to Follow: Air Booking Flow - src/airBooking/pages/purchaseSummaryPage.jsx

_Note - this list is not considered exhaustive, and should be read as a guide to get started_

1. Wrap the checkout summary page with the withAlternativeFormsOfPayment HOC

```
withAlternativeFormsOfPayment(APPLICATION_TYPES.AIR_BOOKING),
```

2. Add new `APPLICATION_TYPE` to pass into the HOC

```
export const APPLICATION_TYPES = {
  AIR_BOOKING: 'air-booking',
  AIR_CHANGE: 'air-change',
  COMPANION: 'companion',
  EARLYBIRD: 'earlybird'
};
```

3. Pull in `upliftAdditionalMessaging` and `upliftAdditionalInfoLink` to pass into component that will render selected form of payment

```
upliftAdditionalMessaging={upliftAdditionalMessaging}
upliftAdditionalInfoLink={i18n('LEARN_MORE')}
```

```
upliftAdditionalMessaging: PaymentPageSelectors.getUpliftAdditionalMessagingTripTotal(state),
```

4. Update purchase button click to initiate the external payment page when Uplift is selected

```
else if (hasSelectedUplift) {
      checkSessionExpired({
        next: () => this._initiateAlternativeFormOfPayment(PAYMENT_METHODS.UPLIFT, formData),
        postLogin: fetchSavedCreditCardsFn,
        reLogin: () => this._initiateAlternativeFormOfPayment(PAYMENT_METHODS.UPLIFT, formData),
        asGuest: () => this._continueAsGuest(formData)
      }, true, loginType);
    }
```

```
_initiateAlternativeFormOfPayment = (paymentMethod: string, formData: *) => {
    const {saveFormDataFn, persistAppStateFn, initiateAlternativeFormOfPaymentFn} = this.props;

    saveFormDataFn(formData).then(() => {
      if (paymentMethod === PAYMENT_METHODS.UPLIFT) {
        persistAppStateFn(EXTERNAL_PAYMENT);
      }

      initiateAlternativeFormOfPaymentFn(paymentMethod);
    });
  }
```

5. Update `componentDidMount` to handle resuming from the external payment page

```
} else if (shouldResumeAppStateFn(EXTERNAL_PAYMENT)) {
      this._resumeFromExternalPaymentPage();
    }
```

6. Update `componentDidUpdate` and purchase function to handle upliftCard data submission

```
const newUpliftCard = getNewUpliftCard(prevUpliftCard, upliftCard);
    newUpliftCard && this._callPurchaseFlightFn(newUpliftCard.formData);
```

7. Review `componentDidUpdate` in `withAlternativeFormsOfPayment` to ensure handling of webview deep links

```
if (webViewExternalPaymentAuthorizedSearchString && shouldResumeAppStateFn(EXTERNAL_PAYMENT)) {
      this._resumeFromExternalPaymentPage(webViewExternalPaymentAuthorizedSearchString);
      setExternalPaymentAuthorizedSearchStringFn(null);
    }
```

8. Add your new application type to the Ceptor Core environment configs (the backend server that powers CeptorJS) so that Ceptor Core will return `methodAvailable` key as `true`. View this [Mobile Installment Payments Environment Configuration Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide) for more details on configuring new environments and flows.

---

### How to Release a New CeptorJS Version

View the instructions listed in the ceptor-js library titled [steps-to-implement](https://gitlab-tools.swacorp.com/e136028/ceptor-js/-/blob/feature/swa-uplift-changes/steps-to-implement.md). There are planned improvements to this process to be completed in [MOB-118584](https://jira-tools.swacorp.com/browse/MOB-118584).

---

### How to Debug Common Uplift Issues

**Uplift is not showing up as a payment method.**

1. Initiate a new booking and complete flow until landing on the purchase page.
2. Verify the `USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX` toggle is correctly set to ON.
3. Verify the booking fits the business criteria for Uplift.
   - At the time of this writing, the business logic is contained in the `getShouldShowUplift` and `getShouldDisableUplift` functions in the [upliftSelector](../../src/shared/selectors/upliftSelector.js)
4. Verify the Ceptor Core and Uplift network calls have completed successfully. If any are consistently failing, reach out to the ceptor development team.
   - getAvailable
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - When `methodAvailable` is false, this could mean the transaction is not eligible based on Ceptor Core's logic or that the supporting APIs are down and UATP should be contacted. More information on Ceptor Core's logic in the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide)
   - update
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - Follow the same remediation steps as the getAvailable call if `methodAvailable` is false
   - from
     - Verify response code is 200
       - If this is failing, Uplift may be down and should be contacted
5. Verify the target call is correctly returning the Uplift mBox
   - View the Target `/delivery` call made on the purchase summary page
   - Verify the correct content is returned
   - Implementation found in `loadPurchasePagePlacements` in [airBookingActions](../../src/airBooking/actions/airBookingActions.js).
6. View any `/log` calls in the Network tab for details on the error.

**The loan application isn't loading after I click Purchase on mWeb Purchase page**

1. Initiate a new booking and click purchase on the mWeb purchase page.
2. Verify the following network calls have completed successfully on external payment page:
   - getAvailable
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - When `methodAvailable` is false, this could mean the transaction is not eligible based on Ceptor Core's logic or that the supporting APIs are down and UATP should be contacted. More information on ceptor Core's logic in the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide)
   - update
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - Follow the same remediation steps as the getAvailable call if `methodAvailable` is false
   - from
     - Verify response code is 200
       - If this is failing, Uplift may be down and should be contacted
3. View any `/log` calls in the Network tab for details on the error.
4. If there are any issues within the iFrame, contact Uplift. They own the iFrame code and can investigate and push updates.

**Uplift transactions are failing after I click Purchase on the loan application.**

1. Initiate a new booking and complete flow through clicking Purchase on the loan application. Test Data available on the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide).
2. Verify the following network calls have completed successfully on mWeb Purchase page:
   - getAvailable
     - Verify response code is 200
     - Verify the response object includes `methodAvailable: true` for Uplift payment method
       - When `methodAvailable` is false, this could mean the transaction is not eligible based on Ceptor Core's logic or that the supporting APIs are down and UATP should be contacted. More information on ceptor Core's logic in the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide)
   - purchase or x-purchase
     - if the CHAPI is failing, view the specific error details and work with CHAPI team to understand the failure
3. View any `/log` calls in the Network tab for details on the error.

**[Hybrid] I do not see Uplift as a form of payment.**

1. Verify the user is in a hybrid experience.
2. Verify the user meets the business criteria for Uplift.
   - At the time of this writing, the business logic is contained in the `getShouldShowUplift` and `getShouldDisableUplift` functions in the [upliftSelector](../../src/shared/selectors/upliftSelector.js)
3. Follow the above steps for debugging Uplift visibility in mWeb.

**[Hybrid] The app is not opening when I click Purchase on the loan application, instead I see the mWeb homepage.**

1. Verify the configuration for the redirect URLs is correct in the bootstrap data. View the WCM > Configurations section in the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide) for details on the correct configurations.
2. Verify the Native Apps have their URL registry set up correctly.
   - For iOS, this can be done by copying the correct Redirect URL, with prefix and path, and pasting into a Notes page. Force Tap on the URL, if you see an option like Open in Southwest App, you can assume the custom scheme URLs are correctly setup.
3. Use debugger tools to step through redirectUrl logic located in the [externalPaymentPage](../../src/externalPayment/pages/externalPaymentPage.jsx) as of the time of this writing.
4. View any `/log` calls in the Network tab for details on the error.

**[Hybrid] When I click Purchase on the loan application, I see the Native Homepage instead of the Purchase Summary Page**

1. Verify the configuration for the redirect URLs is correct in the bootstrap data. View the WCM > Configurations section in the [Environment Guide](https://confluence-tools.swacorp.com/pages/viewpage.action?spaceKey=MOB&title=Mobile+Installment+Payments+Environment+Configuration+Guide) for details on the correct configurations.
2. If configuration is correct, then this should be investigated by the Native teams why the webview is not being re-presented.
