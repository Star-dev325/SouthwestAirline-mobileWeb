// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import ContactTracingForm from 'src/contactTracing/components/contactTracingForm';
import * as ContactTracingActions from 'src/contactTracing/actions/contactTracingActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import i18n from '@swa-ui/locale';
import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { DEFAULT } from 'src/shared/constants/buttonPopupStyleTypes';

import type { MessageType } from 'src/shared/flow-typed/shared.types';
import type { DestinationConfig, passengerToApplyToAllType } from 'src/contactTracing/flow-typed/contactTracing.types';
import type { ContactTracingRequest } from 'src/contactTracing/actions/contactTracingActions';

type Search = {
  link?: Link,
  confirmationNumber: string
};

type Props = {
  isWebView?: boolean,
  updateLink?: Link,
  currentConfirmationNumber?: string,
  search?: Search,
  passengers?: Array<*>,
  passengerIndex?: number,
  passengerToApplyToAll?: passengerToApplyToAllType,
  destinationConfig?: DestinationConfig,
  location: HistoryLocationWithState<Search>,
  retrieveContractTracingFn: ({ link: Link }) => void,
  goBack: () => void,
  resetFlowFn: () => void,
  updateContactTracingFn: ((MessageType) => void, ContactTracingRequest) => Promise<*>,
  updatePassengerIndexFn: (number) => Promise<*>,
  updatePassengerToApplyToAllFn: (?passengerToApplyToAllType) => Promise<*>,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  exitWebViewFn: () => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: (*) => Promise<*>
};

const toUpdateRequest = (data, passengerId) => {
  const { addressLine } = data;
  const { contactPhone1, contactPhone2, contactEmail, ...destination } =
    UpdateAPIsTransformers.transformDestinationFormData(data);

  return {
    passengerId,
    contactEmail,
    contactPhone1,
    contactPhone2,
    destination: addressLine ? destination : null
  };
};

const toFormData = (passengers, passengerIndex, passengerToApplyToAll) => {
  const passenger = !_.isEmpty(passengerToApplyToAll) ? passengerToApplyToAll : passengers[passengerIndex];

  const {
    streetAddress: addressLine,
    zipOrPostalCode,
    city,
    stateProvinceRegion,
    country: isoCountryCode
  } = _.get(passenger, 'destination') || {};

  const form = {
    contactEmail: _.get(passenger, 'contactEmail'),
    ...UpdateAPIsTransformers.toPhoneFormData(passenger, 'contactPhone1'),
    ...UpdateAPIsTransformers.toPhoneFormData(passenger, 'contactPhone2'),
    addressLine,
    zipOrPostalCode,
    city,
    stateProvinceRegion,
    isoCountryCode
  };

  return _.pickBy(form, _.identity);
};

export class ContactTracingPage extends React.Component<Props> {
  componentDidMount() {
    const { search = {}, retrieveContractTracingFn, resetFlowFn, location } = this.props;
    let lookup = search;

    if (!lookup.link) {
      lookup = { ...location.state };
    }

    const { link, confirmationNumber } = lookup || {};

    if (link) {
      resetFlowFn();
      retrieveContractTracingFn({ link, confirmationNumber });
    }

    raiseSatelliteEvent('TOOL:CHCK:contact tracing');
  }

  render() {
    const {
      currentConfirmationNumber = '',
      destinationConfig,
      updateLink,
      isWebView,
      passengers = [],
      passengerIndex = 0,
      passengerToApplyToAll,
      goBack,
      updatePassengerIndexFn,
      updatePassengerToApplyToAllFn,
      updateContactTracingFn,
      updateFormDataValueFn,
      resetFlowFn,
      exitWebViewFn,
      showDialogFn,
      hideDialogFn
    } = this.props;

    const passenger = passengers[passengerIndex];
    const _onCompleteCallBack = (message: MessageType) => {
      if (passengerIndex === passengers.length - 1) {
        const buttons = [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(onExit);
            },
            style: DEFAULT
          }
        ];

        showDialogFn({
          name: 'contact-tracing-success-info-save',
          title: _.get(message, 'header'),
          message: _.get(message, 'body'),
          buttons
        });
      } else {
        updatePassengerIndexFn(passengerIndex + 1);
      }
    };
    const onExit = () => {
      resetFlowFn();

      isWebView ? exitWebViewFn() : goBack();
    };
    const onSaveThen = (onComplete) => (data) => {
      const update = toUpdateRequest(data, passenger.passengerId);
      const { saveForAll } = data;

      _.isEmpty(passengerToApplyToAll) && saveForAll && updatePassengerToApplyToAllFn(update);
      updateLink && updateContactTracingFn(onComplete, { link: updateLink, update });
    };
    const key = `Contact-Tracing-${currentConfirmationNumber}-${passengerIndex}`;

    let submitButton = {
      name: i18n('SHARED__BUTTON_TEXT__SAVE_CONTINUE'),
      onClick: onSaveThen(_onCompleteCallBack)
    };
    let leftButtons = passenger ? [{ name: i18n('SHARED__BUTTON_TEXT__SKIP'), onClick: _onCompleteCallBack }] : [];
    let rightButtons = isWebView ? [] : [{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), onClick: onExit }];

    if (passengerIndex === passengers.length - 1) {
      submitButton = {
        name: i18n('SHARED__BUTTON_TEXT__SAVE'),
        onClick: onSaveThen(_onCompleteCallBack)
      };
      leftButtons = [];
    }

    if (isWebView) {
      rightButtons = [
        {
          name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
          onClick: onExit
        }
      ];
    }

    return (
      <React.Fragment>
        <PageHeaderWithButtons
          title={isWebView ? '' : i18n('CONTACT_TRACING_MANAGE_TITLE')}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
        />
        {passenger && (
          <ContactTracingForm
            key={key}
            formId={key}
            updateFormDataValueFn={updateFormDataValueFn}
            passengerName={passenger.name}
            initialFormData={toFormData(passengers, passengerIndex, passengerToApplyToAll)}
            passengerNumber={passengerIndex + 1}
            passengerCount={passengers.length}
            submitButtonText={submitButton.name}
            onSubmit={submitButton.onClick}
            destinationConfig={destinationConfig}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const contactTracing = _.get(state, 'app.contactTracing.detailPage', {});

  return {
    contactTracing,
    informationWithLinks: _.get(contactTracing, 'response.informationWithLinks'),
    passengers: _.get(contactTracing, 'response.passengers', []),
    updateLink: _.get(contactTracing, 'response._links.contactTracingUpdate'),
    destinationConfig: _.get(contactTracing, 'response.destinationConfig'),
    currentConfirmationNumber: _.get(contactTracing, 'response.confirmationNumber'),
    search: contactTracing.search,
    passengerIndex: _.get(contactTracing, 'passengerIndex', 0),
    passengerToApplyToAll: _.get(contactTracing, 'passengerToApplyToAll', {}),
    isWebView: _.get(state, 'app.webView.isWebView')
  };
};

const mapDispatchToProps = {
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  retrieveContractTracingFn: ContactTracingActions.retrieveContractTracing,
  updatePassengerIndexFn: ContactTracingActions.updatePassengerIndex,
  updatePassengerToApplyToAllFn: ContactTracingActions.updatePassengerToApplyToAll,
  updateContactTracingFn: ContactTracingActions.updateContactTracing,
  resetFlowFn: ContactTracingActions.resetData,
  exitWebViewFn: WebViewActions.exitWebView,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('contactTracing-page')
);

export default enhancers(ContactTracingPage);
