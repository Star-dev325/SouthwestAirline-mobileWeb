# Internationalization (i18n) Pattern

## Description

mWeb uses the [@swa-ui/locale](https://gitlab-tools.swacorp.com/dcom/ui-package/swa-ui-locale) and [@swa-ui/bootstrap](https://gitlab-tools.swacorp.com/dcom/ui-package/swa-ui-bootstrap) packages to implement i18n for user-facing text that WCM can override without an mWeb code deploy. This allows mWeb to achieve maximum flexibility of our display text.

## Setup

All mWeb i18n keys are defined in text files (e.g. `src/airBooking/i18n/airBookingText.js`) that are pulled into a [global object](../../src/app/i18n/global.js).

This global object is imported into the `setUpI18nBootstrap` function within the [bootstrapHelper](../../src/app/helpers/bootstrapHelper.js) and is used as the i18n default values.

The retrieval function for the bootstrap data is setup using the [bootstrapSetup](../../src/app/helpers/bootstrapSetup.js) and is invoked within [index.js](../../src/app/index.js). This sets up the `@swa-ui/bootstrap` package to be able to require data from the bootstrap files.

### Ingesting Overrides

The `setUpI18nBootstrap` function then uses `fetchBootstrapData` to retrieve the WCM-provided overrides list from the bootstrap data. This list represents the keys that WCM wishes to override within our application. The intention is that keys will live within the overrides until a ticket can be played to incorporate the text update into the default values within the application. For example, consider the following timeline:

1. Marketing requests text change mid-release cycle
2. WCM updates overrides list to include change, and new text is immediately viewable in production
3. mWeb ticket is created to update the key within the application code in order to ingest the change long-term
4. mWeb change is pushed to production in next possible release cycle
5. WCM removes key from overrides list and mWeb default is used once again

## Usage

### Step 1

Any text that is displayed to the user is eligible for i18n. To use an i18n key, you must add your new key to a new or existing i18n text file.

```javascript
export default {
  EXAMPLE_KEY: 'Example Value'
};
```

If you have added a new text file, be sure to import the file into [global.js](../../src/app/i18n/global.js) so that the i18n function can find your new key.

### Step 2

Inside the component where you want to display the text, import the `i18n` function from the `@swa-ui/locale` package and pass your new key as a string to the function. This function will return the override value if present, otherwise it will return the default value you have supplied in your text file in Step 1.

```javascript
import i18n from '@swa-ui/locale';

<div>{i18n('EXAMPLE_KEY')}</div>;
```

### Key Naming Conventions

A key should compose of 3 identifiers separated by double underscores. This provides consistency, clarity, and readability.

`{MODULE}__{LOCATION}__{ELEMENT}`

- **Module:** folder or flow, e.g. AIR_BOOKING, CHECK_IN, AIR_CHANGE
- **Location:** page, component, or grouping, e.g. PRICE_PAGE, CONFIRMATION_PAGE, RAPID_REWARDS
- **Element:** how the text is used within the page, e.g. HEADER, BUTTON, TITLE

When a key is used in multiple modules, use `SHARED` for the identifier. e.g. `SHARED__ERROR__MAXIMUM_TRIES`

In addition, the name of a key should adhere to the following principles:

- Capital Case
- Unique
- Descriptive
- Reflective of the where the key is used, not its value

**Example:**

| Good Keys                                                          | Bad Keys                                        | Explanation                                            |
| ------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------ |
| AIR_BOOKING**PRICE_PAGE**HEADER                                    | pricePageHeader                                 | Name should be capital case                            |
| AIR_BOOKING**PRICE_PAGE**HEADER                                    | PAGE_HEADER                                     | Name should be specific to its location                |
| AIR_BOOKING**PRICE_PAGE**BUTTON_TEXT                               | CONTINUE_BUTTON                                 | Name should not include reference to its current value |
| AIR_BOOKING**PRICE_PAGE**HEADER AIR_BOOKING**PRICE_PAGE**SUBHEADER | AIR_BOOKING_HEADER_TEXT AIR_BOOKING_HEADER_TEXT | Name should not be generic or repeated                 |
