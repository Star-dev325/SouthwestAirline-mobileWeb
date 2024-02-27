# Adobe Target Pattern

## Summary

Our marketing partners use Adobe Target to segment users, providing different experiences to different users for testing
purposes, particularly various A/B testing strategies. `adobeTargetActions` serves as an abstraction around making
Target calls via `adobeTargetApi` and the Adobe Target library. You can use the `getSegment` or `getSegments` actions
respectively (see below). The request to Adobe Target will contain an "mbox" id and some optional params. The response
of an Adobe Target call will be a segment id which can be used in a couple of ways.

## Use case: targeted placements

We can send the segment id received in the Target response to WCM in a placements call.
The segment id represents a particular experience that this Customer should receive and WCM can return a placement
intended to target that particular experience.

An example in `wcmActions`:

```javascript
const retrieveHomeNavMenu =
  () =>
  (dispatch: ThunkDispatch, getState: () => *): Promise<*> => { 
    dispatch(fetchHomeNavMenu());

    if (_.get(getState(), 'app.webView.isWebView')) {
      return dispatch(getPlacements(PAGE_ID_HAMBURGER_MENU))
        .then((content) => dispatch(setMenuListContent(content)))
        .then((content) => dispatch(fetchHomeNavMenuSuccess(content)))
        .catch((error) => dispatch(fetchHomeNavMenuFailed(error)));
    }

    return dispatch(getTargetParams({ isPurchasePath: false }))
      .then((params) =>
        dispatch(getSegments([{ mbox: GLOBAL_NAV_TOP_MBOX_ID }, { mbox: GLOBAL_NAV_PROMO1_MBOX_ID, params }]))
      )
      .then((segments) => dispatch(getPlacements(PAGE_ID_HAMBURGER_MENU, [], segments)))
      .then((content) => dispatch(setMenuListContent(content)))
      .catch((error) => dispatch(fetchHomeNavMenuFailed(error)));
  };
```

Note that the result of the `getSegments` call is passed to `getPlacements`.

## Use case: application logic

We can also use the segment id received in the Target response to drive particular application logic.

In this example, the Target call is made to determine whether to show or hide the corporate switch on the booking widget.

```javascript
export const setCorporateSwitchVisibility = () => (dispatch: ThunkDispatch) => {
  return dispatch(getSegment(CORPORATE_SWITCH_VISIBILITY_MBOX_ID)).then((segment) =>
    dispatch(setIsCorporateSwitchVisible(segment === CORPORATE_SWITCH_VISIBILITY_SEGMENT_SHOW))
  );
};
```
