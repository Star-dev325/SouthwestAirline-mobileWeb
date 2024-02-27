# Constants and String Literals Pattern

## Overview

> Constants and especially literal text should not be hard-coded in React components. In later versions of the application we may have to support internationalization and it will be more work to isolate the literals once the application has already been completed.

### Approach

Our approach is to have a single constants file per feature that will reside in the constants folder. This single file will only contain literal text for components in that feature. As the text may span multiple components we will allow for component specific and shared feature literals. See the following example which is an example based on the myAccount feature.

Example: `myAccountConstants.js`

> `myAccountConstants.js` contains only literal text for specific components or text that is to be shared across components in the same feature. Other constants such as `Types`, `Codes`, `Statuses` etc. should be in separate files in the same folder.

#### Using the constants

Import the constants file the same as another module. You may import everything or just individual objects that are required. For example, you may need to import `MYACCOUNT` and `RAPIDREWARDSPANELENROLLED` in order to get access to text from the feature and also the component.

```js
// Import feature and/or component level features from the constants file
import {MY_ACCOUNT_FLIGHT_CARD} from 'src/myAccount/constants/myAccountConstants';

// Import other constants that are defined in other files.
import MyTripType from 'src/myAccount/constants/myTripType';
const {SAVED_FLIGHTS, PAST_FLIGHTS} = MyTripType;

...
 <div className={e('check-price')}>
  <Button size='large' color='grey' fluid onClick={this._fillSearchForm} ref='checkPriceButton'>
    {
      this.props.type === SAVED_FLIGHTS.value
        ? MY_ACCOUNT_FLIGHT_CARD.CHECK_PRICE
        : MY_ACCOUNT_FLIGHT_CARD.REBOOK_IT
    }
  </Button>
</div>
```

#### The constants folder

The constants folder should only contain one feature specific constants file named `xxxConstants.js` where `xxx` is the feature name. Examples would be `myAccountConstants.js`, `airBookingConstants.js`, `earlyBirdConstants.js`

The folder is also used to have individual files for each enumeration type such as `myTripType.js`.

Be consistent with naming the enumeration types. For example, standardize on `xxxCode`, `xxxType`, `xxxStatus` etc.

```bash
src/myAccount
├── __tests__
├── actions
├── components
├── constants
│   ├── myAccountConstants.js
│   ├── myTripType.js
│   └── upcomingTripType.js
├── helpers
├── index.jsx
├── index.scss
├── interceptors.js
├── pages
├── stores
```

#### Use of Keys

We currently do not have a strict standard for naming the actual keys to the literals. This is mainly as we introduced the pattern after development had started and we are trying to avoid introducing bugs on code that already has been tested. In a later phase if internationalization is required, the key names will be formalized. The initial concern is to ensure we get the literal text out of the components.

For remediation purposes the following recommendations are given:

1. Have a single constants file `<feature>Constants.js` which resides in the `src/<feature>/constants` folder.
2. Define a single object in the constants file to hold constants shared across the feature. The name of the object should be **exactly** the same as the component, in upper case and with `_` separators.
3. Have a single object per component, page and helper and place the key/value pairs into the object.

### Tips & Tricks

Each literal must be enclosed in braces such as `{YOUR_COMPONENT_NAME.YOUR_KEY_NAME}`

```html
<span>
  {TIER_BENEFITS.DEFAULT_BENEFIT_FLY_BY} <sup>{'\u00AE'}</sup><br />
  <span className="extra-info">{TIER_BENEFITS.DEFAULT_BENEFIT_PRIORITY_SECURITY_LINE}</span>
</span>
```

HTML codes can be represented as the actual character or the Unicode equivalent, but we recommend the actual character which is more clear.

```html
// bad: it displays "First &middot; Second"
<div>{'First &middot; Second'}</div>

// specify the Unicode equivalent
<div>{'First \u00b7 Second'}</div>

// include the character in the string
<div>{'First · Second'}</div>
```

When possible, create small phrases to group together words with dynamic content. There are two ways to implement this, and we recommend the second way using `lodash`.

one way: use `util`

```js
// require the library
import util from 'util';

// Use sprint to format the string with one or more parameters
<span>{util.format(CONFIRMATION_NUMBER_SUBTITLE.CONFIRMATION_NUMBER, this.props.confirmationNumber)}</span>;

// Where the string is defined as...
CONFIRMATION_NUMBER_SUBTITLE: {
  CONFIRMATION_NUMBER: 'Confirmation # %s';
}
```

other way: use `lodash`

```js
// require the library
import _ from 'loadsh';

// Use template to format the string with an object which contains the key/value pairs
_.template(N_SELECTED)({ number: arrayFromString.length });

// Where the string is defined as...
CAR_VENDOR: {
  N_SELECTED: `<%= number%> selected`;
}
```
