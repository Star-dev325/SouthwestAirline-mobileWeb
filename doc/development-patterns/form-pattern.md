# Form Pattern in mWeb

### Overview

The most idea of this solution is coming from `redux-form`. So, you can think, this solution is very super light version of redux. If you are familiar with `redux-form`, maybe you can learn and handle this in couple minutes.

### Features

The new solution focus on some pain points that `Form Model` introduced. The significant two issues are:

1. The old form cache is deeply binding with the `Form Model`, and it is changing the form data during component render phase. So, it caused some unexpected behaviors when applying the cached data and need force update in some time.
2. The form data is saved in `Form Model`. When we change the data in `Form Model`, the component can not update automatically.

In order to solve those problems, we made a new form solution, that have those features:

Stored form data just presents data shows in UI.

- You can get the form data user submitted in onSubmit method.
- If you want to use the formData user submitted in different pages of the flow, you should store it as part of flow.

1. Build-in form cache.
   The form data will automatically cached Once user has some operations in form, and open for customizing cache operation.
2. Trackable data in redux store, but not tightly rely on redux.
3. Dynamic composition.
4. Can easily compose reusable field.
5. Simple interface to make it easy to make new field.
6. Lint tool.

### Folder structure

```
./src/shared/form
├── components
│   └── form.jsx                                  // The wrapper of native form, you should alway using this one instead of the native form.
├── constants
│   └── validationErrorTypes.js                   // error types
├── enhancers
│   ├── withField.js                              // HOC for wrapping a field
│   ├── withFields.js                             // HOC for wrapping several fields
│   └── withForm.js                               // HOC for wrapping a form
├── fields                                        // The folder to place all the field and fields
│   ├── chaseInstantCreditCardFields.jsx
│   ├── ...
├── flow-typed                                    // The type definition for form related data format
│   └── form.types.js
├── formValidators                                // form validation functions
│   ├── asyncValidators.js
│   ├── passengerPersonalInfoFormValidator.js
│   ├── sharedFieldValidatorRules.js
│   └── sharedFormValidatorRules.js
├── helpers                                       // a helper function help you to execute the validation rules.
│   └── validatorHelpers.js
```

### Build-in form cache

The basic idea of form cache is to pre-fill the form data when user do browser back and forward to simulate the browser behavior just like a traditional web page.

From programmer view, we should clean cached data when user submit the form or continue to next page.

#### How to enable and disable

The form cache is enabled by default, if you want disable this, you can pass `disableFormData` to `true` when you are using `withForm`.

### How to pre-fill form

1. We can prepare `initalFormData` to pre-fill the form, `initialFormData` is a key-value object, key is field name, which we want to pre-fill.
2. Pass the `initialFormData` to the form.

### How to handle error

1. When we submit the form, we will validate all form data according to the form validators.
2. We need to pass `formValidator` to `withForm`.
3. In `formValidator`, we will define `fieldRules` and `formRules`. In the rules, we can add error message type for each rule.
   - if error type is `ERROR_HEADER`, we will show the first error message in red error header.
   - if error type is `SIMPLE_ERROR_POPUP`, we will show the first error message in an error popup.

#### How form cache works

##### Saving phase

The data for a form always saved in store when user tap any keys on the phone or tablet.

##### Applying phase

We will always use the cached data to display. The store always has the latest change.
So, We should not manage field value in `state`, should always use form data to display the content, which would pass to field component by `props`.

##### Deleting phase

1. Basically, if transition to a page not in back/forward way, we'll delete the form data in `componentDidMount` of `WithForm`.
2. We have an option `autoClearFormData`, When it's true, if user submit a form without any validation error, we will save the result for calling the API later and also delete the cache.

### Trackable data in redux store

When saving value to store, you might see the action `UPDATE_FORM_FIELD_DATA_VALUE`. If you meet any issue, you can use redux-dev-tool to help you track the changes and indicate issues.

### Dynamic composition

Based on the `register` and `unregister` mechanism, the output of a form (form data) always is a plain object that maps the field name to field value, just like you see on the UI. If you hide some fields based some business logic, you don't need to omit those fields when submit the form. And also, the validator will not execute the field rule that was not show up on the page.

#### How register and unregister works

When you are wrapping a input using withField, the wrapped component will register this when you create a instance of your wrapped component in `componentDidMount`. And, it will unregister your component when `componentWillUnmount`.

#### Why we count the instance of each component in withForm

In some situation, we want to combine several fields that modify a single field. As an example, the `CreditCardFields` used this feature.

### Compose reusable field

The new form solution supplied a mechanism to help you compose multiple field as a fields to reuse in different forms. As a simple example of this, you can checkout `PersonalInfoFields`. As a more complex one, you will find out it in future after we refactored the contact method page.

A fields component always need a `names` props to indicate the scope of those fields' concerns. This is designed for constraint not flexibility. The goal of this is forcing you to group and reuse only related fields.

## Dynamic validating of fields

To dynamically validate a field on change, pass in the string to the form's option: 'fieldsToValidateOnChange' when the form is created. (See the enrollPersonalInfoForm for an example). NOTE: in the future, this can be updated to have an array of strings passed in, for now it just accepts a single string.

There is also logic to restrict additional editing to a single field.
The form data actions have two actions: 'restrictFormChangeToFieldName' and 'unrestrictFormChangeToFieldName'. For restricting: Pass in the string of the fieldName you want to enable with its specified formId. This will add a value to the form's state called 'fieldNameEnabledForChange'. Then in your form component, you can set field disabled based on that value.
To enable: pass in the formId to the action and it will set the 'fieldNameEnabledForChange' to undefined, which will enable the fields.

### TODO

- The ability to rename the field names. Currently, the most place we created a fields is hard coded the Fields component. But, in some situation, we want customized the names. For example, in payment form, we have 2 of phone numbers. One is for chase credit card, another is for new credit card. And we want the output to have two fields like `chasePhoneNumber` and `phoneNumber`.
