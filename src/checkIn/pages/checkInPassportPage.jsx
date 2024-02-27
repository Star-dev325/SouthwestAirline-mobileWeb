// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import * as CheckInFlowDataSelectors from 'src/checkIn/selectors/checkInFlowDataSelector';
import * as CheckInPassportPageSelectors from 'src/checkIn/selectors/checkInPassportPageSelector';
import { logout } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { CHECK_IN_PASSPORT_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import PassportForm from 'src/shared/form/components/passportForm';
import BrowserObject from 'src/shared/helpers/browserObject';
import { hasSessionExpired } from 'src/shared/helpers/loginSessionHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type {
  NextPageOptionType,
  TravelDocumentActionParametersType,
  TravelDocumentsRequestLink
} from 'src/checkIn/flow-typed/checkIn.types';
import type { PassportFormData, Push } from 'src/shared/flow-typed/shared.types';

const { location } = BrowserObject;

type Search = {
  confirmationNumber: string,
  link?: Link
};

type Props = {
  addNationalityAndEmergencyDocumentsFn: (TravelDocumentActionParametersType) => Promise<*>,
  checkInSessionToken: string,
  formData: PassportFormData,
  goBack: () => void,
  hideDialogFn: (*) => Promise<*>,
  isLastPage: boolean,
  isUserLoggedIn: boolean,
  location: HistoryLocationWithState<Search>,
  logoutFn: (*) => *,
  nextPageOptions: NextPageOptionType,
  params: { paxNumber: number },
  push: Push,
  recordLocator?: string,
  requestData: ?TravelDocumentsRequestLink,
  shouldShowSaveEmergencyContactForAll?: boolean,
  shouldShowSkipButton: boolean,
  showDialogFn: (*) => *,
  suppressEmergencyContact?: boolean,
  travelerName: string
};

export class PassportPage extends React.Component<Props> {
  componentDidMount() {
    const { location } = this.props;

    _.isEmpty(location.search) && raiseSatelliteEvent('TOOL:CHCK:passport details');
  }

  _backToHome = () => {
    const { isUserLoggedIn, logoutFn, hideDialogFn } = this.props;

    if (isUserLoggedIn && hasSessionExpired()) {
      logoutFn();
    }

    hideDialogFn().then(() => {
      location.reload();
    });
  };

  _onPassportSubmit = (toSubmitFormData: PassportFormData) => {
    const {
      addNationalityAndEmergencyDocumentsFn,
      checkInSessionToken,
      formData,
      params: { paxNumber },
      requestData,
      shouldShowSaveEmergencyContactForAll,
      suppressEmergencyContact
    } = this.props;

    const isPassportUpdated = formData.passportNumber !== toSubmitFormData.passportNumber;

    if (!isPassportUpdated) {
      toSubmitFormData = _.omit(toSubmitFormData, 'passportNumber');
    }

    if (requestData) {
      addNationalityAndEmergencyDocumentsFn({
        checkInSessionToken,
        formData: toSubmitFormData,
        paxNumber,
        requestData,
        shouldShowSaveEmergencyContactForAll: !!shouldShowSaveEmergencyContactForAll,
        showSessionExpiredPopup: this._showSessionExpiredPopup,
        suppressEmergencyContact,
        transitToNextPax: this._transitionToNextPax
      });
    }
  };

  _showSessionExpiredPopup = () => {
    this.props.showDialogFn({
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: this._backToHome
        }
      ],
      name: 'check-in-passport-session-token-expired',
      title: i18n('CHECK_IN__ERRORS__SESSION_TOKEN_EXPIRED')
    });
  };

  _transitionToNextPax = () => {
    const {
      nextPageOptions: { nextPagePath, nextPaxNumber },
      push
    } = this.props;

    if (nextPagePath === getNormalizedRoute({ routeName: 'checkInConfirmation' })) {
      push(getNormalizedRoute({ routeName: 'checkInConfirmation' }));
    } else {
      push(buildPathWithParamAndQuery(nextPagePath, { paxNumber: nextPaxNumber }));
    }
  };

  _onSkipButtonClick = () => {
    this._transitionToNextPax();
  };

  _onCancelButtonClick = () => {
    const { hideDialogFn, showDialogFn } = this.props;

    showDialogFn({
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__NO'),
          onClick: hideDialogFn
        },
        {
          label: i18n('SHARED__BUTTON_TEXT__YES'),
          onClick: () => {
            hideDialogFn().then(() => {
              this.props.goBack();
            });
          }
        }
      ],
      message: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_MESSAGE_FOR_CHECK_IN'),
      name: 'passport-quit-apis-flow',
      title: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_TITLE')
    });
  };

  render() {
    const {
      formData,
      isLastPage,
      params: { paxNumber },
      requestData,
      shouldShowSaveEmergencyContactForAll,
      shouldShowSkipButton,
      suppressEmergencyContact,
      travelerName
    } = this.props;
    const buttons = {
      leftButtons: [{ name: 'Cancel', onClick: this._onCancelButtonClick }],
      rightButtons: []
    };

    if (shouldShowSkipButton) {
      buttons.rightButtons = [{ name: 'Skip', onClick: this._onSkipButtonClick }];
    }
    const submitButtonText = isLastPage
      ? i18n('SHARED__BUTTON_TEXT__CONTINUE')
      : i18n('CHECK_IN__CONFIRM_AND_CONTINUE_BUTTON');

    return (
      <div>
        <PageHeaderWithButtons title={i18n('SHARED__PASSPORT_PAGE__PASSPORT_PAGE_TITLE')} {...buttons} />
        {!_.isEmpty(requestData) && (
          <PassportForm
            disableNationalityItem={!_.isEmpty(formData.nationality)}
            enableUserToHideEmergencyContact
            formId={`${CHECK_IN_PASSPORT_FORM}_${paxNumber}`}
            initialFormData={formData}
            isEmergencyContactRequired
            isLapChild={suppressEmergencyContact}
            onSubmit={this._onPassportSubmit}
            passengerName={travelerName}
            passportSubmitButtonText={submitButtonText}
            shouldShowSaveEmergencyContactForAll={shouldShowSaveEmergencyContactForAll}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  checkInSessionToken: _.get(state, 'app.checkIn.checkInFlowData.checkInSessionToken'),
  formData: CheckInPassportPageSelectors.getPassportPageFormData(state, props),
  isLastPage: CheckInPassportPageSelectors.isLastPage(state, props),
  isUserLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  nextPageOptions: CheckInFlowDataSelectors.getNextPageOptions(state, props),
  recordLocator: _.get(state, 'app.checkIn.checkInFlowData.recordLocator'),
  requestData: CheckInFlowDataSelectors.getRequestData(state, props),
  shouldShowSaveEmergencyContactForAll: CheckInPassportPageSelectors.getShouldShowSaveEmergencyContactForAll(
    state,
    props
  ),
  shouldShowSkipButton: CheckInPassportPageSelectors.shouldShowSkipButton(state),
  suppressEmergencyContact: CheckInFlowDataSelectors.getSuppressEmergencyContact(state, props),
  travelerName: CheckInFlowDataSelectors.getPassengerName(state, props)
});

const mapDispatchToProps = {
  addNationalityAndEmergencyDocumentsFn: CheckInActions.addNationalityAndEmergencyDocuments,
  hideDialogFn: hideDialog,
  logoutFn: logout,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(PassportPage);
