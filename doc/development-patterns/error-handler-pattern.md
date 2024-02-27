# Error Handler Pattern

### Redux version

#### Form Validation Error Handler

Currently in our project we already have an whole aspect for errorHeader handling:

- errorHeaderContainer.jsx
- errorHeader.jsx
- hideErrorHeader/showErrorHeader in `formHelper`
- errorHeader state in redux tree

and we have already embed errorHeaderContainer into `pageHeader.jsx`. So if you want the error header functionality, you have the following choices:

1. If the page already have pageHeader or subHeader, then you just need to call errorHeaderActions as you want.
2. If the page don't have pageHeader or subHeader, then you need to add errorHeaderContainer to the place you want, then call errorHeaderActions as you want.

Never create an errorState in your page to manage the page error header.

`errorHeaderContainer` is already migrated to redux.

error header will show when form submit with error, and will hide when validation fail by default.

```javaScript
// in withForm.js
_handleValidationErrors = (formData, errors) => {
        if (!_.isEmpty(errors)) {
          const headerError = this._getFirstErrorByType(errors, ERROR_HEADER);
          const simplePopupError = this._getFirstErrorByType(errors, SIMPLE_ERROR_POPUP);
          if (headerError) {
            this.props.showErrorHeaderMsgFn(headerError.error.msg);
          } else if (simplePopupError) {
            this._showSimpleErrorPopup(simplePopupError.key, simplePopupError.error);
          }
          return this.setState({
            errors
          });
        }
        this.props.onSubmit(formData);
        autoClearFormData && this.props.clearFormDataByIdFn(this.props.formId);
      }

 _hideHeaderError() {
  this.props.hideErrorHeaderMsgFn();
}
```

`withForm` will pass `hideErrorHeaderMsgFn` to child component.

#### API Error Handler

For redux, we use the redux middleware to trigger the error dialog display when there is an error payload in action.

```javascript
export default function apiErrorPopupMiddleware({ dispatch }) {
  return (next) => (action) => {
    const { error } = action;
    if (error && !_.get(action.error, '$customized')) {
      dispatch(showErrorPopUP(error));
    }
    return next(action);
  };
}
```

If we use async validation in form, we also need to pass the error payload:

```javascript
export const checkRR = (passengerInfo: Passenger) => {
  return (dispatch: ReduxDispatch<*>): * => {
    dispatch(fetchAccountLookUp());

    const passengerForCheck = {
      ..._.pick(passengerInfo, ['firstName', 'middleName', 'lastName']),
      accountNumber: passengerInfo.rapidRewardsNumber
    };

    return AccountsApi.accountNumberLookup(passengerForCheck)
      .then(() => {
        dispatch(fetchAccountLookUpSuccess());
      })
      .catch((error) => {
        dispatch(fetchAccountLookUpFailed(error));
        throw error;
      });
  };
};

export const accountNumberValidator = (formData: Passenger, errors: FormValidationErrors) => {
  const { rapidRewardsNumber } = formData;
  if (_.isEmpty(errors) && !_.isEmpty(rapidRewardsNumber)) {
    return store
      .dispatch(checkRR(formData))
      .then(() => true)
      .catch((error) => {
        //... hide some logic

        return new HttpRequestError(errorMessage, requestId, responseCode, httpStatusCode);
      });
  }
  return true;
};
```

If any action contain `error` and there is no `$customized` in error, will trigger `showErrorPopUP` action.

##### Customize error handler

If you want to customize the error popup, you can set the error `$customized = true`, which will not trigger error pop-up.

```javascript
return FlightBookingApi.findFlightProducts(transformToAPIRequest(searchRequest))
      .then(response => {
        /...
      })
      .catch(originalError => {
        const isHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_HAWAII_MESSAGE);
        const isNonHawaiiNoRoutesError = containsApiErrorCodes(originalError, ERROR_NO_ROUTES_EXISTS);

        const isCustomized = isHawaiiNoRoutesError || isNonHawaiiNoRoutesError;
        const error = isCustomized ? _.merge(originalError, {$customized: true}) : originalError;

        dispatch(fetchFlightShoppingPageFailed(error));

        isHawaiiNoRoutesError && _handleHawaiiNoRoutesError(originalError, dispatch, searchRequest);
        isNonHawaiiNoRoutesError && dispatch(showDialog(transformToNoRoutesErrorDialogOptions(originalError, searchRequest)));
      });
```

Then you can use dialog to display the customized error:

```javascript
const _handleHawaiiNoRoutesError = (error, dispatch, searchRequest) => {
  const query = { pageId: 'hawaii-no-routes-popup', channel: CHANNEL };
  ContentDeliveryApi.getContent(query)
    .then((response) => {
      const { buttons, errorTitle, errorDescription } = _.get(response, 'results.noRouteExistsHawaii.content');
      const transformButtonToLinks = () => {
        /*...some logic*/
      };

      const links = transformButtonToLinks(buttons);

      dispatch(
        showDialog({
          active: true,
          title: errorTitle,
          name: 'no-routes-hawaii-error',
          message: errorDescription,
          closeLabel: OK,
          error,
          onClose: dispatchHideDialog,
          verticalLinks: {
            links
          }
        })
      );
    })
    .catch(() => {
      dispatch(showDialog(transformToNoRoutesErrorDialogOptions(error, searchRequest)));
    });
};
```

#### Form Validation Error Handler

The only difference is how we apply it in form of redux version:

```javascript
// in src/shared/components/form.jsx

_hideHeaderError() {
    hideErrorHeader();
}

 getDefaultProps() {
    return {
      onValidationFailed: defaultFormValidationFailure
    };
  }
```

`defaultFormValidationFailure` is in `formHelper.js`

```javascript
const defaultFormValidationFailure = function (formModel) {
  const errorType = formModel.getErrorHeaderType();

  store.dispatch(showErrorHeaderMsg(ErrorMessages[errorType]));
};
```

##### Customize error handler

If you want to customize the error popup, you can set the error `$customized = true`, which will not trigger error pop-up.

```javascript
AirCancelActions.deleteBoardingPasses.listen(function (pnrsWithBoardingPass: Array<PassengerNameRecord>) {
  return Promise.all(
    _.map(pnrsWithBoardingPass, (pnr: PassengerNameRecord) => {
      return ReservationApi.deleteBoardingPass(pnr);
    })
  )
    .then(this.completed)
    .catch((error) => {
      const { responseJSON } = error;
      if (_.get(responseJSON, 'code') === CLOSED_FOR_ACCEPTANCE_ERROR_CODE) {
        AirCancelActions.deleteBoardingPasses.failed(_.merge(error, { $customized: true }));
      } else {
        AirCancelActions.deleteBoardingPasses.failed(error);
      }
    });
});
```

Then you can use the async promise catch callback to display the customized error:

```javascript
DialogActions.hideDialog()
  .then(() => {
    return AirCancelActions.deleteBoardingPasses(pnrsWithBoardingPass);
  })
  .then(() => {
    this.setState({ pnrsWithBoardingPass: [] });
    return ViewReservationActions.retrieveReservation(this._getReservationRequestParams());
  })
  .then(() => {
    return this._retrieveReservationForCancel(this._getReservationRequestParams());
  })
  .catch((error) => {
    const responseJSON = _.get(error, 'responseJSON', {});
    if (_.get(responseJSON, 'code') === CLOSED_FOR_ACCEPTANCE_ERROR_CODE) {
      DialogActions.showDialog({
        name: 'delete-boarding-pass-close-for-acceptance',
        title: responseJSON.message,
        verticalLinks: {
          links: [
            {
              label: CALL,
              href: 'tel:1-800-435-9792'
            }
          ]
        },
        closeLabel: CANCEL
      });
    }
  });
```
