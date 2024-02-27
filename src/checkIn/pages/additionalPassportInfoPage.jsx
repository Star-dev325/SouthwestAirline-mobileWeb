// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import AdditionalPassportInfoForm from 'src/checkIn/components/additionalPassportInfoForm';
import * as AdditionalPassportInfoPageSelector from 'src/checkIn/selectors/checkInAdditionalPassportInfoPageSelector';
import { getNextPageOptions, getPassengerName, getRequestData } from 'src/checkIn/selectors/checkInFlowDataSelector';
import { cleanUpEndOfSession } from 'src/shared/actions/accountActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import CheckInErrorCode from 'src/checkIn/constants/checkInErrorCode';
import { CHECK_IN_ADDITIONAL_PASSPORT_INFO_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import BrowserObject from 'src/shared/helpers/browserObject';
import { containsApiErrorCodes } from 'src/shared/helpers/errorCodesHelper';
import { hasSessionExpired } from 'src/shared/helpers/loginSessionHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { NextPageOptionType } from 'src/checkIn/flow-typed/checkIn.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

const { location } = BrowserObject;

type Props = {
  isLoggedIn: boolean,
  passengerName: string,
  recordLocator: string,
  shouldShowSkipButton: boolean,
  nextPageOptions: NextPageOptionType,
  isLastPAX: boolean,
  requestData: Link,
  checkInSessionToken: string,
  initialFormData: ?FormData,
  documentTitles?: { [string]: string },
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: () => Promise<*>,
  addAdditionalPassportInfoDocumentsFn: (Link, FormData, string) => Promise<*>,
  cleanUpEndOfSessionFn: () => void,
  params: { paxNumber: number },
  push: Push,
  goBack: (*) => void
};

export class AdditionalPassportInfoPage extends Component<Props> {
  static defaultProps = {
    recordLocator: '',
    passengerName: '',
    requestData: {},
    isLastPAX: false
  };

  componentDidMount() {
    raiseSatelliteEvent('TOOL:CHCK:additional traveler details');
  }

  _onSubmit = (formData: FormData) => {
    const { addAdditionalPassportInfoDocumentsFn, checkInSessionToken, requestData } = this.props;

    addAdditionalPassportInfoDocumentsFn(requestData, formData, checkInSessionToken)
      .then(() => {
        this._transitionToNextPax();
      })
      .catch((error) => {
        if (containsApiErrorCodes(error, CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED)) {
          this._showSessionExpiredPopup();
        }
      });
  };

  _onAdditionalNavItemClick = (key: string) => {
    const {
      params: { paxNumber },
      push
    } = this.props;

    const routePathMap = {
      'destination': getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformationDestination' }),
      'permanentResidentCard': getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformationGreenCard' }),
      'visa': getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformationVisa' })
    };

    push(buildPathWithParamAndQuery(routePathMap[key], { paxNumber }));
  };

  _showSessionExpiredPopup = () => {
    const { showDialogFn } = this.props;

    showDialogFn({
      name: 'check-in-travel-documents-session-token-expired',
      title: i18n('CHECK_IN__ERRORS__SESSION_TOKEN_EXPIRED'),
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: this._reloadPage
        }
      ]
    });
  };

  _reloadPage = () => {
    const { isLoggedIn, hideDialogFn, cleanUpEndOfSessionFn } = this.props;

    if (isLoggedIn && hasSessionExpired()) {
      cleanUpEndOfSessionFn();
    }

    hideDialogFn().then(() => location.reload());
  };

  _onCancelButtonClick = () => {
    const { showDialogFn, hideDialogFn, goBack } = this.props;

    showDialogFn({
      name: 'addition-quit-apis-flow',
      title: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_TITLE'),
      message: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_MESSAGE_FOR_CHECK_IN'),
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__NO'),
          onClick: hideDialogFn
        },
        {
          label: i18n('SHARED__BUTTON_TEXT__YES'),
          onClick: () => {
            hideDialogFn().then(goBack);
          }
        }
      ]
    });
  };

  _onSkipButtonClick = () => {
    this._transitionToNextPax();
  };

  _transitionToNextPax = () => {
    const {
      push,
      nextPageOptions: { nextPagePath, nextPaxNumber }
    } = this.props;

    if (nextPagePath === getNormalizedRoute({ routeName: 'checkInConfirmation' })) {
      push(getNormalizedRoute({ routeName: 'checkInConfirmation' }));
    } else {
      push(buildPathWithParamAndQuery(nextPagePath, { paxNumber: +nextPaxNumber }));
    }
  };

  _getButtons = (shouldShowSkipButton: boolean) => {
    const leftButtons = [{ name: 'Cancel', onClick: this._onCancelButtonClick }];
    const rightButtons = [{ name: 'Skip', onClick: this._onSkipButtonClick }];

    return shouldShowSkipButton ? { leftButtons, rightButtons } : { leftButtons };
  };

  render() {
    const {
      passengerName,
      shouldShowSkipButton,
      isLastPAX,
      initialFormData,
      documentTitles = {},
      params: { paxNumber }
    } = this.props;
    const buttons = this._getButtons(shouldShowSkipButton);

    return (
      <div>
        <PageHeaderWithButtons title="Travel Document" {...buttons} />
        <AdditionalPassportInfoForm
          formId={`${CHECK_IN_ADDITIONAL_PASSPORT_INFO_FORM}_${paxNumber}`}
          initialFormData={initialFormData}
          isLastPAX={isLastPAX}
          documentTitles={documentTitles}
          passengerName={passengerName}
          onSubmit={this._onSubmit}
          onAdditionalNavItemClick={this._onAdditionalNavItemClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  recordLocator: _.get(state, 'app.checkIn.checkInFlowData.recordLocator'),
  checkInSessionToken: _.get(state, 'app.checkIn.checkInFlowData.checkInSessionToken'),
  nextPageOptions: getNextPageOptions(state, props),
  documentTitles: AdditionalPassportInfoPageSelector.getDocumentTitles(state, props),
  initialFormData: AdditionalPassportInfoPageSelector.getFormData(state, props),
  shouldShowSkipButton: AdditionalPassportInfoPageSelector.shouldShowSkipButton(state),
  isLastPAX: AdditionalPassportInfoPageSelector.isLastPAX(state, props),
  passengerName: getPassengerName(state, props),
  requestData: getRequestData(state, props)
});

const mapDispatchToProps = {
  showDialogFn: DialogActions.showDialog,
  hideDialogFn: DialogActions.hideDialog,
  addAdditionalPassportInfoDocumentsFn: CheckInActions.addAdditionalPassportInfoDocuments,
  cleanUpEndOfSessionFn: cleanUpEndOfSession
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AdditionalPassportInfoPage);
