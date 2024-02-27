// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { TRANSFER_TRAVEL_FUNDS_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import EligibleTravelFundsCard from 'src/travelFunds/components/eligibleTravelFundsCard';
import TransferTravelFundsForm from 'src/travelFunds/components/transferTravelFundsForm';
import { transformToTransferTravelFundsRequest } from 'src/travelFunds/transformers/travelFundsTransformer';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type { Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';
import type {
  TransferTravelFundsFormData,
  TransferTravelFundsRequestType,
  ValidateTransferPageResponse
} from 'src/travelFunds/flow-typed/travelFunds.types';

type Props = {
  push: Push,
  validateFunds: ValidateTransferPageResponse,
  receiptEmailAddress: string,
  transferTravelFundsFn: (request: TransferTravelFundsRequestType) => Promise<*>,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  goBack: () => void,
  footerLinkRows: Array<WcmFooterType>,
  TF_PERSONAL_MSG_MAX_CHAR: number,
  isWebView: boolean,
  isLoggedIn: boolean,
  accountNumber: string
};

export class TransferTravelFundsPage extends Component<Props> {
  _onSubmit = (formData: TransferTravelFundsFormData) => {
    const { isLoggedIn, setReLoginCallbackFunctionsFn } = this.props;

    isLoggedIn && this._onTransferTravelFunds(formData);
    setReLoginCallbackFunctionsFn({ continueAsGuestFn: this._continueAsGuest });
  };

  _continueAsGuest = () => {
    const { push } = this.props;

    push(getNormalizedRoute({ routeName: 'index' }));
  }

  _onTransferTravelFunds = (formData: TransferTravelFundsFormData) => {
    const { validateFunds, transferTravelFundsFn, push } = this.props;

    const transferTravelFundsRequest = transformToTransferTravelFundsRequest(validateFunds, formData);

    transferTravelFundsFn(transferTravelFundsRequest).then(() => {
      push(getNormalizedRoute({ routeName: 'transferConfirmation' }));
    });
  };

  render() {
    const { validateFunds = {}, goBack, receiptEmailAddress, footerLinkRows, TF_PERSONAL_MSG_MAX_CHAR, isWebView } = this.props;

    const {
      _links = {},
      viewTravelFund: { displayName, expirationDate, fundIdentifier, transferableAmount, travelFundType, leisureFund, expirationDateString },
      recipientInfoText,
      learnMoreWithLinks
    } = validateFunds;

    const rightButton = [
      {
        name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        onClick: goBack
      }
    ];

    return (
      <React.Fragment>
        <PageHeaderWithButtons title={i18n('TRAVEL_FUNDS__TRANSFER_PAGE__HEADER')} rightButtons={rightButton} />
        <EligibleTravelFundsCard
          displayName={displayName}
          expirationDate={expirationDate}
          expirationDateString={expirationDateString}
          fundIdentifier={fundIdentifier}
          transferableAmount={transferableAmount}
          learnMoreWithLinks={learnMoreWithLinks}
          travelFundType={travelFundType}
          leisureFund={leisureFund}
        />
        <TransferTravelFundsForm
          formId={TRANSFER_TRAVEL_FUNDS_FORM}
          onSubmit={this._onSubmit}
          onSubmitLabel={_.get(_links, 'transferFund.labelText', i18n('TRAVEL_FUNDS__TRANSFER_PAGE__BUTTON'))}
          receiptEmailAddress={receiptEmailAddress}
          transferableAmount={transferableAmount}
          recipientInfoText={recipientInfoText}
          personalMsgMaxChar={TF_PERSONAL_MSG_MAX_CHAR}
        />
        <div className="transfer-travel-funds-footer">
          {!isWebView && <PageFooterWcmSourced footerLinkRows={footerLinkRows} />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  validateFunds: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.validateFunds'),
  receiptEmailAddress: _.get(state, 'app.account.accountInfo.contactInfo.emailAddress'),
  footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
  TF_PERSONAL_MSG_MAX_CHAR: _.get(state, 'app.wcmContent.applicationProperties.TF_PERSONAL_MSG_MAX_CHAR', 320),
  isWebView: _.get(state, 'app.webView.isWebView', false),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  accountNumber: _.get(state, 'app.account.accountNumber')
});

const mapDispatchToProps = {
  transferTravelFundsFn: TravelFundsActions.transferTravelFunds,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(TransferTravelFundsPage);
