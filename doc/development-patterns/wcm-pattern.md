# wcm pattern

## how to add new wcm content

If you want to use a new wcm content in our app, here are the steps to implement it.
let's take earlybird introduction as a example:

### 1. actionType

add a new action type in `wcmActionsTypes.js` for fetch content later

### 2. wcmConfig

it's a file to place config of a wcm action.

| CONFIG PROPERTY | USAGE                                                                            | required |
| --------------- | -------------------------------------------------------------------------------- | -------- |
| wcmPath         | wcm api call path                                                                | yes      |
| actionType      | action type wrtitten in first step                                               | yes      |
| shouldShowAlert | when fetch api failed, pop up will not show when it's false                      | no       |
| closeWindow     | when fetch api failed, user click `ok` on pop up, window will close if it's true | no       |
| queryParams     | when call content delivery api                                                   | no       |

### 3. add action

```javaScript
export const retrieveEarlyBirdIntroduction = () => dispatch(getWCMContent(earlyBirdIntroduction));
```

Use a encapsulated method `getWCMContent` which will
dynamically call API and generate action for success or failure.

We have two kinds of api may be called in `getWCMContent` action.

```javascript
const fetchWCMContent = (wcmPath?: string, queryParams?: QueryParameter): Promise<*> => {
  if (!queryParams) {
    return WcmApi.getJsonFile(wcmPath);
  }

  return ContentDeliveryApi.getContent(queryParams);
};
```

- wcm api, will get some static web content

- delivery api, which is encapsulated based on wcm api, will get some dynamic web content

### 4. reducer

```
const reducers = _.mapValues(wcmConfig, config => {
  return (state = null, action) => {
    if (action.type === `${config.actionType}_SUCCESS`) {
      return action.response;
    }
    return state;
  };
})
```

we don't need to add reducer mannually, cause all the node will generator automatically by Iterator.

### 5. connect redux node in page

```
const mapStateToProps = (state) => ({
  webContent: _.get(state, 'app.wcmContent.contactUs') || {}
});
```

## HOC

some pages have same behavior and render logic, so we use a HOC to extract logic:

- `wcmOverlay.jsx`

- `wcmStyledPage.jsx`

## How can we build a wcm page

- styled page

using /in-the-air page as a example

> add config for this page

```
inTheAir: {
    wcmPath: 'content/generated/data/information/inTheAir.json',
    actionType: WCM__FETCH_IN_THE_AIR,
    closeWindow: false
}
```

> add an action for retrieve in the air

```
export const retrieveInTheAir = () => {
  return (dispatch: *) => dispatch(getWCMContent(inTheAir));
};
```

> create the page in `styledPages.js` with HOC `wcmStyledPage`

```
export const InTheAirPage = wcmStyledPage(retrieveInTheAir, 'inTheAir');
```

- overlay page

using /taxes-and-fees page as a example

> add config for this page

```
taxesAndFees: {
    wcmPath: 'content/generated/data/overlays/government_taxes_fees.json',
    actionType: WCM__FETCH__TAXES_AND_FEES,
    closeWindow: true
}
```

> add an action for retrieve in the air

```
export const retrieveTaxesAndFees = () => {
  return (dispatch: *) => dispatch(getWCMContent(taxesAndFees));
};
```

> create the page in `overlayPages.js` with HOC `wcmOverlay`

```
export const TaxesAndFeesOverlay = wcmOverlay(retrieveTaxesAndFees, 'taxesAndFees');
```
