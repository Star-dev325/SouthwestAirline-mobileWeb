# Hybrid Pattern

## Summary

A hybrid mobile app is a native mobile app (iOS / Android) that embeds web application code via a webview. The webview acts as a web browser window that is part of the native app, and the web part (HTML, JavaScript, CSS, etc.) can be built into the binary of the native app or deployed to a web server.

- Reference Architecture: https://confluence-tools.swacorp.com/display/NSRA/Hybrid+Mobile+App+Implementation+Guide
- Hybrid Overview (for all platforms): https://confluence-tools.swacorp.com/display/MOB/Hybrid

#### How?

The Southwest Native Apps load mWeb in a webview and use it for several business flows: Air Booking, Car Booking, Flight Status, and more. Since mWeb is one single SPA, the native apps load the webview in the background and present the webview whenever the user clicks on a relevant flow in the app (i.e. "Book Flight"). A messaging protocol ([JavaScript Bridge](#javascript-bridge)) has been built to tell the webview which flow to display (i.e. Air Booking flow).

#### Why?

Now, instead of developing features 3 times (once for mWeb, once for iOS, and once for Android), a feature only needs to be built in mWeb. This allows for a large reduction in development cost and offers a faster overall time to market for features. It also increases capacity for the native developers to focus on innovative native-specific features.

#### When?

Hybrid should be considered at the beginning of project planning for new features. Here is some high level criteria that should guide the decision on whether to develop a feature in Hybrid.

> **Should Use**: For commonly updated flows (i.e. Air Booking), rarely updated flows (i.e. Flight Status), digital payments
> **Should Not Use**: For "Day of Travel" flows (i.e. Check-In), native SDK heavy functionality (i.e. Authentication with FaceID), flows where a webview does not make sense (i.e. Home Screen, Nav Drawer)

<br>

## Initial Load

As mentioned above, the webview is loaded in the background of the native apps in order to provide a better user experience; this helps ensure that the webview will have finished loading by the time a user clicks on a Hybrid flow.

#### Configuration

When the native apps load the webview in the background, they load the URL with query params to set initial configuration. These key/values are meant to set configuration for that webview session, with the intent that these values will not change for the duration of the session. See the [JavaScript Bridge](#javascript-bridge) section for when data needs to be sent throughout the webview session.

The following query params are consumed in the `webViewMiddleware.js` and persisted to either Redux or Local Storage as necessary.

**Note:** This is the current list of supported query parameters, but this list could grow over time and may not be maintained fully here.

| Param             | Example Value(s)                     | Description                                                                                                                                      |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| webView           | true                                 | This tells mWeb that it is in a webview and makes necessary UI changes (hide the global header, show a airplane spinner, etc.)                   |
| channel           | IOS, ANDROID                         | This tells mWeb the API channel identity of the native app (this value is passed for the `X-Channel-ID` HTTP header)                             |
| corporateChannel  | IOS_CORP, ANDROID_CORP               | This tells mWeb the API corporate channel identity of the native app (this value is passed for the `X-Channel-ID` HTTP header)                   |
| apiKey            | l7xxd690c2dcabf84b8fa29a3cfad29e0c00 | This tells mWeb the API key of the native app (this value is passed for the `X-API-Key` HTTP header)                                             |
| deviceType        | iphone, ipad, android                | This tells mWeb the device type (also referred to as `datachannel`) of the native app (this value is stored in `data_a` for Adobe Launch)        |
| shareFlightStatus | true, false                          | This tells mWeb to enable sharing functionality in the flight status flow (the iOS app passes `true` and the Android app passes `false` for now) |
| adobe_mc          | ...                                  | This tells mWeb the Adobe Experience ID of the native app (the Adobe `at.js` will read and handle this value to stitch the user session)         |

> Example URL: https://mobile.dev1.southwest.com/blank?webView=true&channel=IOS&corporateChannel=IOS_CORP&deviceType=iphone&apiKey=l7xxd690c2dcabf84b8fa29a3cfad29e0c00&shareFlightStatus=true&adobe_mc=TS%3D1639673673925%7CMCMID%3D32116325729226398287293532732067786372%7CMCORGID%3D65D316D751E563EC0A490D4C%40AdobeOrg

#### Blank Page

As shown in the Example URL above, the native apps load mWeb on a `/blank` route. The `BlankPage.jsx` is simply a component with an empty `<div />` that is enhanced with `withBodyClass('bgpdkblue')`.

The native apps navigate to the Blank Page before navigating to another page to help provide a more seamless user experience with transitions. Since mWeb is a single SPA, this prevents any flickering when switching between Hybrid flows within the app.

> For example: Blank Page → Flight Status → Blank Page → Air Booking.

<br>

## JavaScript Bridge

The JavaScript Bridge is a common term used to reference the messaging protocol used to communicate between the webview and the native apps. It is a JavaScript interface that handles 2-way communication, hence the name "JavaScript Bridge".

> Note: The JavaScript Bridge should be used sparingly and only used when there is a strong use case to leverage it. Often times it is better to simply push logic to CHAPI, leverage WCM content, or leverage Adobe Target before trying to solve a problem with the JS Bridge.

> The JS Bridge contract must be maintained for past versions of the native apps (until a force update), so consider the implications before making any JS Bridge changes. When leveraging the JS Bridge, keep messages generic, maintain backwards compatibility, and build future-proof.

#### Messages **from** Native App **to** Webview

In order to receive messages from the native apps, mWeb has "enhanced" the browser's `window` object with a field called `api`. This `api` object has a function called `message` that the native apps can invoke to send a message.

This enhancement is handled in the `withWebView` HOC (`App.jsx` is wrapped with this HOC).

```javascript
useEffect(() => {
  window.api = { message: receiveMessageFromNativeApps };
}, []);
```

The `receiveMessageFromNativeApps` function handles these messages and receives: a message key, a value, and optional additional state (Base64 encoded). The native apps would send the following simple JS Bridge message to display the Flight Status flow.

```javascript
window.api.message('ROUTE_CHANGE', '/flight-status', '');
```

Here is an example that provides some optional state in the JS Bridge message. This example displays the Car Booking flow with the initial search form populated with data.

```javascript
window.api.message(
  'ROUTE_CHANGE',
  '/car/booking',
  'eyJwaWNrVXAiOiJEQUwiLCJkcm9wT2ZmRGF0ZSI6IjIwMjItMDEtMTUiLCJkcm9wT2ZmIjoiQVRMIiwicGlja1VwRGF0ZSI6IjIwMjItMDEtMDEifQ=='
);
```

> Note: The state is passed as a Base64 encoded string. The object that was encoded for this example would be

```json
{
  "pickUp": "DAL",
  "dropOffDate": "2022-01-15",
  "dropOff": "ATL",
  "pickUpDate": "2022-01-01"
}
```

Here are the most common use cases for Native App → Webview messages

- Changing Routes
- Adding / Removing OAuth Tokens
- Saving Chase PreQaul Offers
- Continuing from a Deep Link

#### Messages **from** Webview **to** Native App

In a similar way, the native apps "enhance" the window object with their own JavaScript interface, in which they can receive messages from the webview. The `WebViewHelper.js` is where mWeb sends messages to the native apps.

For the following JS Bridge message `displayLogin`, the native apps add their own JavaScript interface

- For iOS: `window.AndroidInterface.displayLogin($base64EncodedString)`
- For Android: `window.webkit.messageHandlers.displayLogin.postMessage($base64EncodedString)`

> The message name should always be consistent for all platforms, as an agreed upon contract. Optional state (Base64 encoded) can be passed in the message as well; the encoded object must also be consistent for all platforms.

Here are the some common use cases for Native App → Webview messages

- Displaying Native Login Screen
- Sending Chase PreQaul Offers
- Leverage Native Apple Pay
