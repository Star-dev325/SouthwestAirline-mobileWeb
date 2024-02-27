# WCM Placements Pattern

## Summary

WCM is able to return a variety of different content to display as placements throughout the application. This placements content is usually controlled through Adobe Target, meaning different users could experience different placements in the same location. We've created a transformer `toDynamicPlacement` and a component `DynamicPlacement` which, when used together, should enable any type of content to be displayed in any placement location. In addition, there is a `PlacementLink` component which can be used to consolidate click behavior for WCM placements.

## toDynamicPlacement

Each placement type can have a different structure and in some cases it's necessary to modify the initial response from WCM. One example of this is the `BLOCK_PLACEMENT` type which we modify to fit into the same structure as the `MOBILE_HERO` type so that both can be leveraged in our `ImagePlacment` component.

```javascript
case BLOCK_PLACEMENT: {
  return {
    displayType: BLOCK_PLACEMENT,
    promoImageBackground: placement.backgroundImage,
    imageForegroundAltText: placement.backgroundImageAltText || '',
    blocks: placement.blocks || [],
    target: placement.target,
    linkType: placement.linkType || wcmLinkTypes.NONE,
    ...transformPlacementData(placementData)
  };
}
```

When adding entirely new types of placements, it's ideal to not add a special case for the new type but to try and build the new component around the default case in `toDynamicPlacement` which unwraps content object of the WCM response:

```javascript
return (
  dynamicContent && {
    ...dynamicContent,
    displayType,
    ...transformPlacementData(placementData)
  }
);
```

The `toDynamicPlacement` function will also unwrap the `placementData` of the WCM response which guarantees certain fields will always appear in the WCM content:

```javascript
{
  viewPortThreshold: 0.5,
  shouldObserveViewPort: false,
  contentBlockId: '',
  isChasePrequal: false,
  isChaseCombo: false,
  isChasePlacement: false
}
```

`shouldObserveViewPort` is set by `placementData.isChasePrequal` and defaults to `false` and is used along with `viewPortThreshold` to observe placements and trigger callbacks. The most common use case for this is to make an FOC call when the user has seen a prequalified Chase placement.

The easiest way to utilize this is to transform the content in the reducer. For example:

```javascript
export const purchasePagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS: {
      const bottomPromo1 = toDynamicPlacement(action.response, 'bottomPromo1');

      return { bottomPromo1 };
    }
    default:
      return state;
  }
};
```

## Flow Types of WCM Placement Content

Currently, there are a couple different types of placement content that are supported in the application. Each of these types are defined in `wcm.types.js` and follow a pattern of a Response type and a Props type. The Response type is only what we expect to be in the placement after being transformed in `toDynamicPlacement`.

`ImagePlacementResponse` example:

```javascript
export type ImagePlacementResponse = PlacementData & {
  displayType: BLOCK_PLACEMENT_DISPLAY_TYPE | MOBILE_HERO_DISPLAY_TYPE,
  linkType: LinkType,
  imageForegroundAltText: string,
  promoImageBackground: string,
  promoImageForeground?: string,
  target: string
};
```

The Props type contains any additional fields that are needed to render the placement but aren't provided by WCM.

`ImagePlacementProps` example:

```javascript
export type ImagePlacementProps = ImagePlacementResponse & {
  referrer?: string,
  isWebView?: boolean,
  onClick?: () => void,
  isChasePromo?: boolean
};
```

## DynamicPlacement

The `DynamicPlacement` component will handle which component needs to be rendered by looking at the `displayType` of the placement. It also handles passing template data to `FlexPlacement` for string interpolation as well as resizing `FlexPlacement` to the proper width.

### TemplateData

`FlexPlacement` takes an optional parameter of `templateData` to replace template keys with user-specific data in the placement. The base template data, which contains the user's information pulled from the Redux store, is constructed in `templateDataSeletor.js` and is then augmented in `DynamicPlacement` using the `placementData` field from the placement itself.

### Resizing

Flex placements can only be sent as a static size from WCM so it's necessary to pass a `scaleFactor` to `FlexPlacement` to scale it to the correct width. `DynamicPlacement` has a callback `_calculateScaleFactor` which is called on a window resize event that will calculate the scale factor from the width of the placement, as provided by WCM, and the width of the screen through a reference on the `DynamicPlacement`.

## PlacementLink

Placements should try to utilize `PlacementLink` for their click behavior which consolidates all click behavior into one location. It takes all of the props it needs to correctly handle any type of ad (_see below_).

Props for `PlacementLink`:

```javascript
type Props = {
  onClick?: () => void,
  handlePlacementLinkFn: (*) => void,
  children: *,
  isChaseCombo: boolean,
  isChasePlacement: boolean,
  referrer: string,
  target?: string,
  href?: string,
  linkType?: LinkType,
  placementData?: {
    linkType?: LinkType
  }
};
```

The `referrer` field is used to correctly route native applications back into the hybrid flow during the Chase application process.

`handlePlacementLinkFn` is passed down from `DynamicPlacement` and is dispatched to `handlePlacementLink` in `wcmActions`. This function will append the datachannel to your target and then either pass a message on the javascript bridge in Hybrid for Chase ads or will call `wcmTransitionTo` to correctly route within the application.

An example of using `PlacementLink` can be found in either `ChaseInstantCredit` or `ImagePlacement`:

`ChaseInstantCredit` example:

```javascript
<PlacementLink
  target={target}
  linkType={linkType}
  isChaseCombo={isChaseCombo}
  isChasePlacement={isChasePlacement}
  onClick={onClick}
  referrer={referrer}
  handlePlacementLinkFn={handlePlacementLinkFn}
>
  <Button
    className={cx(_.get(styles, BUTTON_TYPE) || 'button--grey', 'pt5 chase-instant-credit--button')}
    size="larger"
    fluid
  >
    {buttonText}
  </Button>
</PlacementLink>
```

`ImagePlacement` example:

```javascript
<PlacementLink
  target={target}
  linkType={linkType}
  referrer={referrer}
  isChaseCombo={isChaseCombo}
  isChasePlacement={isChasePlacement}
  onClick={onClick}
  handlePlacementLinkFn={handlePlacementLinkFn}
>
  <img {...imageAttributes} />
</PlacementLink>
```

It is also used as a custom command (see all custom commands in `flexPlacementConstants.js`).
