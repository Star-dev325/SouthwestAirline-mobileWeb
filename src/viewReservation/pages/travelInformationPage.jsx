// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { VIEW_RESERVATION_TRAVEL_INFORMATION_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { isEmpty } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery, buildPathWithParamAndUniqueQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import TravelInformationForm from 'src/viewReservation/components/travelInformationForm';
import {
  transformToSaveTravelInformationLink,
  transformToTravelInformationFormInitialFormData
} from 'src/viewReservation/transformers/travelInformationTransformer';

import type { PassengerNameRecord, Push, Replace, SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';
import type {
  EditPNRPassengerPageType,
  PnrPassengerFullNameType,
  SaveTravelInformationParamType,
  TravelInformationFormData
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  editPNRPassengerPage: EditPNRPassengerPageType,
  goBack: () => void,
  hideDialogFn: (*) => Promise<*>,
  location: HistoryLocationWithState<PassengerNameRecord>,
  params: { passengerReference: string },
  push: Push,
  query: {
    passengerReference?: string,
    searchToken?: string
  },
  replace: Replace,
  retrieveFlightAndTravelInformationWithSearchTokenFn: (searchToken: string, passengerReference: string) => void,
  saveTravelInformationFn: (SaveTravelInformationParamType) => void,
  showDialogFn: (*) => Promise<*>,
  specialAssistanceSelections?: SpecialAssistanceType,
  updateTravelInformationForAnalyticsFn: (?Link) => void,
  viewReservationViewPage: *
};

type State = {
  recordLocator: string
};

export class TravelInformationPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recordLocator: _.get(props, 'location.state.recordLocator', '')
    };
  }

  componentDidMount() {
    const { query: { passengerReference, searchToken } = {}, retrieveFlightAndTravelInformationWithSearchTokenFn, viewReservationViewPage } = this.props;

    if (searchToken && isEmpty(viewReservationViewPage)) {
      passengerReference && retrieveFlightAndTravelInformationWithSearchTokenFn(searchToken, passengerReference);
    }
    raiseSatelliteEvent('TOOL:CHCK:Travel Information');
  }

  isPassportNumberEdited: boolean;

  _onClickCancel = () => {
    const { showDialogFn, hideDialogFn } = this.props;
    const buttons = [
      {
        label: i18n('SHARED__BUTTON_TEXT__NO'),
        onClick: hideDialogFn
      },
      {
        label: i18n('SHARED__BUTTON_TEXT__YES'),
        onClick: () => {
          hideDialogFn().then(this._goBack);
        }
      }
    ];

    showDialogFn({
      name: 'travel-info-page-confirm-lost-info-before-cancel',
      title: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_TITLE'),
      message: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_MESSAGE_FOR_RESERVATION'),
      buttons
    });
  };

  _onPassPortNumberFocus = () => {
    this.isPassportNumberEdited = true;
  };

  _goToSpecialAssistance = () => {
    const { query: { passengerReference, searchToken } = {}, params: { passengerReference: currentPassenger }, push } = this.props;

    push(buildPathWithParamAndUniqueQuery(getNormalizedRoute({ routeName: 'specialAssistance' }), {
      passengerReference: currentPassenger
    }, { passengerReference, searchToken }, true), null, null, { isInternalNav: true });
  };

  _onSubmitWithAckPopup = (
    updateTravelInformationLink: ?Link,
    confirmationAckMsgOnSave: string,
    firstName: string,
    middleName: string,
    lastName: string,
    isNameChanged: boolean
  ) => {
    const { showDialogFn, hideDialogFn } = this.props;
    const buttons = [
      {
        label: i18n('SHARED__BUTTON_TEXT__NO'),
        onClick: hideDialogFn
      },
      {
        label: i18n('SHARED__BUTTON_TEXT__YES'),
        onClick: () => {
          hideDialogFn().then(
            this._onSubmitHelper(updateTravelInformationLink, firstName, middleName, lastName, isNameChanged)
          );
        }
      }
    ];

    showDialogFn({
      name: 'travel-info-page-ack-before-save',
      message: confirmationAckMsgOnSave,
      buttons
    });
  };

  _goBack = () => {
    const { goBack, push, query: { searchToken } = {} } = this.props;

    if (searchToken) {
      push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), {}, { searchToken }));
    } else {
      goBack();
    }
  };

  _onSubmitHelper = (
    updateTravelInformationLink: ?Link,
    firstName: string,
    middleName: string,
    lastName: string,
    isNameChanged: boolean
  ) => {
    const { saveTravelInformationFn, updateTravelInformationForAnalyticsFn, editPNRPassengerPage, query: { searchToken } = {} } = this.props;
    const { recordLocator } = this.state;
    const editNamesSuccessfulUpdateMessage = isNameChanged
      ? _.get(editPNRPassengerPage, 'editNamesSuccessfulUpdateMessage.body', null)
      : null;
    const pnr: PnrPassengerFullNameType = {
      recordLocator,
      firstName,
      middleName,
      lastName
    };

    updateTravelInformationForAnalyticsFn(updateTravelInformationLink);
    updateTravelInformationLink
      ? saveTravelInformationFn({ editNamesSuccessfulUpdateMessage, pnr, searchToken, updateTravelInformationLink })
      : this._goBack();
  };

  _onSubmit = (formData: TravelInformationFormData) => {
    const { editPNRPassengerPage, specialAssistanceSelections } = this.props;
    const { _links: link } = editPNRPassengerPage;
    const initialFormData = transformToTravelInformationFormInitialFormData(editPNRPassengerPage);
    const firstName = _.get(formData, 'firstName', '');
    const middleName = _.get(formData, 'middleName', '');
    const lastName = _.get(formData, 'lastName', '');
    const confirmationAckMsgOnSave = this._getConfirmationAckMsg();

    const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
      editPNRPassengerPage.isInternational,
      initialFormData,
      _.merge({}, formData, { specialAssistance: specialAssistanceSelections }),
      link,
      this.isPassportNumberEdited
    );

    if (isNameChanged && !_.isEmpty(confirmationAckMsgOnSave)) {
      this._onSubmitWithAckPopup(
        updateTravelInformationLink,
        confirmationAckMsgOnSave,
        firstName,
        middleName,
        lastName,
        isNameChanged
      );
    } else {
      this._onSubmitHelper(updateTravelInformationLink, firstName, middleName, lastName, isNameChanged);
    }
  };

  _getConfirmationAckMsg() {
    const {
      editPNRPassengerPage: { editNamesCheckedInMessage }
    } = this.props;
    let confirmationAckMsgOnSave = '';
    const message = _.get(editNamesCheckedInMessage, 'body');
    const key = _.get(editNamesCheckedInMessage, 'key');

    if (key === 'UPDATE_PASSENGER_NAMES_CHECKED_IN_MESSAGE' && !_.isEmpty(message)) {
      confirmationAckMsgOnSave = message;
    }

    return confirmationAckMsgOnSave;
  }

  render() {
    const { editPNRPassengerPage, specialAssistanceSelections } = this.props;
    const {
      _meta: { isEditablePassengerFirstMiddleName = false, isEditablePassengerLastName = false } = {},
      editNamesMessage = ''
    } = editPNRPassengerPage ?? {};

    return !_.isEmpty(editPNRPassengerPage) && (
      <div>
        <PageHeaderWithButtons
          title="Passenger Details"
          rightButtons={[{ name: 'Cancel', onClick: this._onClickCancel }]}
        />
        <TravelInformationForm
          formId={VIEW_RESERVATION_TRAVEL_INFORMATION_FORM}
          onSubmit={this._onSubmit}
          initialFormData={transformToTravelInformationFormInitialFormData(editPNRPassengerPage)}
          onPassPortNumberFocus={this._onPassPortNumberFocus}
          isInternational={editPNRPassengerPage.isInternational}
          clickSpecialAssistanceFn={this._goToSpecialAssistance}
          specialAssistanceSelections={specialAssistanceSelections}
          isEditablePassengerFirstMiddleName={isEditablePassengerFirstMiddleName}
          isEditablePassengerLastName={isEditablePassengerLastName}
          editNamesMessage={editNamesMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editPNRPassengerPage: _.get(state, 'app.viewReservation.travelInformationPage.response.editPNRPassengerPage'),
  specialAssistanceSelections: _.get(
    state,
    `app.formData.${VIEW_RESERVATION_TRAVEL_INFORMATION_FORM}.data.specialAssistance`
  ),
  viewReservationViewPage: _.get(state, 'app.viewReservation.flightReservation')
});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  saveTravelInformationFn: ViewReservationActions.saveTravelInformation,
  retrieveFlightAndTravelInformationWithSearchTokenFn: ViewReservationActions.retrieveFlightAndTravelInformationWithSearchToken,
  updateTravelInformationForAnalyticsFn: ViewReservationActions.updateTravelInformationForAnalytics
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(TravelInformationPage);
