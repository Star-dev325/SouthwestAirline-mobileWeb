# PayPal Pattern

## Summary

Provides an overview of the patterns used by the AirBooking PayPal Purchase Flow.
These patterns can be re-used by the EarlyBird, Companion and AirChange PayPal Purchase Flows.

## System Overview

This diagram provides a system overview of Purchase with PayPal.

![Dialog Image - Use Atom](images/Vision_PayPal_Flow.png)

## Mobile Web Implementation

The HoC **withPayPal** provides common functions used by Pages that require purchase with PayPal functionality.
**withPayPal** assists with resuming the App State and Analytics data when the user returns to mWeb from the PayPal site.
**withPayPal** provides the following functions to the using Pages.

- **shouldGotoPayPalSignInFn** - returns true if the user be navigated to the PayPal site
- **gotoPayPalSignInFn** - creates the PayPal token, stores the resume data and sends the user to the PayPal site
- **shouldResumeDataFn** - returns true if the user returning from the PayPal site and purchase flow can continue
- **resumeDataFn** - resumes the mWeb state

See PurchaseSummaryPage (purchaseSummaryPage.jsx) as an example.

## Mobile Web Sequence Diagrams

These diagrams are the sequence diagrams for the AirBook Purchase with PayPal Flow.

#### Sequence Diagram AirBooking PayPal Purchase Flow Part 1

This diagram shows the AirBooking after PayPal payment option is selected and the user presses the Purchase Button.
![Dialog Image - Use Atom](images/UML-Sequence-PayPal-AirBooking-PurchaseFlow-Part1.png)

#### Sequence Diagram AirBooking PayPal Purchase Flow Part 2

This diagram shows the processing after the user logs into the PayPal site, selects the PayPal
payment option and returns to the mWeb site.
![Dialog Image - Use Atom](images/UML-Sequence-PayPal-AirBooking-PurchaseFlow-Part2.png)

## Data Structure Description

The resume data is saved to Session Storage and is reloaded to restore the mWeb App to the state prior to navigating
to the PayPal site. Below is the resume data structure.

```javascript
const resumeData = {
  options,
  state,
  analytics
};
```

This resume data structure will be stored in Session Storage using store2.

The **state** node of the resume data is the App state that will be loaded to the Redux state tree.

The **analytics** node of the resume data is the analytics data that will be save to **window.data_a**.

The **options** portion of the node is for data that should not be stored in the Redux state tree but is still required by
the Page to resume processing after returning from the external PayPal website. The **options** node is optional.

The are no requirements for the data shape under **options** node.

Upon returning from the external PayPal website the data will be retrieved from Session storage and the
data under the **state** and **analytics** nodes will be restored by withPayPal HoC by triggering Actions.

## How to Debug Common PayPal Issues

**I see an error when I navigate to the PayPal site.**

1. Verify that the correct environment URL is included in bootstrap data: `/swa-ui/bootstrap/mobile-web/1/data.js` > `swa-bootstrap-mobile-web/urls` > `paypalUrl`

   - For lower environments, ensure the URL has `sandbox` in the domain
   - For production, ensure the URL does not have `sandbox` in it

2. Verify that the `merchant-token` request has returned successfully from the backend with a `merchantToken` key.

**I am not returned to the application after entering my PayPal information.**

1. Verify the redirectURL and cancelURL are associated with the correct environment in the request body of the `merchant-token` call.
2. [Hybrid] Verify the source of the redirectURL and cancelURL in the environment configs:
   - [Dev1 Example](../../config/dev1.js)
     - `PAYPAL_WEBVIEW_RETURN_URL`
     - `PAYPAL_WEBVIEW_CANCEL_URL`
3. [Hybrid] Verify the Native Apps have their URL registry set up correctly.
   - For iOS, this can be done by copying the correct Redirect URL, with prefix and path, and pasting into a Notes page. Force Tap on the URL, if you see an option like Open in Southwest App, you can assume the custom scheme URLs are correctly setup.

**I am not seeing PayPal as a form of payment.**

1. Verify `PAYPAL` key is included in the bootstrap data: `/swa-ui/bootstrap/mobile-web/1/data.js` > `swa-bootstrap-mobile-web/payment-option-order`
