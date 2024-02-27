// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { showNativeAppLogin } from 'src/shared/actions/webViewActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import Container from 'src/shared/components/container';
import ContentLink from 'src/shared/components/contentLink';
import FundResultsList from 'src/shared/components/fundResultsList';
import InfoBanner from 'src/shared/components/infoBanner';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { sitePaths } from 'src/shared/constants/siteLinks';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import FundTypeSelector from 'src/travelFunds/components/fundTypeSelector';
import LookUpFundsForm from 'src/travelFunds/components/lookUpFundsForm';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import {
  transformToCardLookupRequest,
  transformToRTFLookupRequest,
  transformToVoucherLookupRequest
} from 'src/travelFunds/transformers/travelFundsTransformer';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type { MessageType, NativeAppLoginOptions, Push } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type {
  AssociateFundsMessageResponse,
  LookUpCardFundType,
  LookUpFundRequestType,
  LookUpRTFFundType,
  LookUpVoucherFundType,
  RetrievedFundType,
  TravelFundsOptionsType,
  ViewTravelFundLinkRequestType,
  ViewTravelFundsLinkRequestInfo
} from 'src/travelFunds/flow-typed/travelFunds.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const {
  ASSOCIATE_FUNDS_TYPE,
  CHECK_TRAVEL_FUNDS,
  FUND_TYPES,
  FUND_TYPES_FORMATTED,
  GIFT_CARD_FORM_FIELDS,
  LOOK_UP_FUNDS,
  LOOK_UP_GIFT_CARD,
  LOOK_UP_GIFT_CARD_FORM_ID,
  LOOK_UP_LUV_VOUCHER_FORM_ID,
  LOOK_UP_TRAVEL_FUNDS_FORM_ID,
  LOOK_UP_VOUCHER,
  LUV_VOUCHER_FORM_FIELDS,
  TRANSFER_FUNDS_TYPE,
  TRAVEL_FUNDS_FORM_FIELDS,
  TRAVEL_FUNDS_TERMS_AND_CONDITIONS
} = TravelFundsConstants;

type Props = {
  accountNumber: string,
  associateFundsFn: (ViewTravelFundLinkRequestType) => Promise<*>,
  associateFundsMessage: AssociateFundsMessageResponse,
  currentlySelectedTab: TravelFundsOptionsType,
  isLoggedIn: boolean,
  isWebView: boolean,
  loadTravelFundsPagePlacementsFn: () => Promise<*>,
  message?: MessageType,
  placements: Array<DynamicPlacementResponse>,
  previousTravelFundsSearch: LookUpFundRequestType,
  push: Push,
  resumeAfterLogin: {
    requestInfo: ViewTravelFundsLinkRequestInfo,
    shouldResume: boolean
  },
  resumeAfterLoginFn: (boolean, ?ViewTravelFundsLinkRequestInfo) => void,
  retrieveTravelFundsFn: (LookUpFundRequestType, ?boolean) => void,
  retrieveUnusedFundsFn: (LookUpFundRequestType) => Promise<*>,
  retrievedFunds: Array<RetrievedFundType>,
  saveLastSearchedFundFn: (TravelFundsOptionsType, FormData) => void,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  showNativeAppLoginFn: (NativeAppLoginOptions) => void,
  updateSelectedLookupTabFn: (TravelFundsOptionsType) => void,
  validateTransferFundsFn: (ViewTravelFundLinkRequestType) => Promise<*>
};

export class LookUpTravelFundsPage extends Component<Props> {
  componentDidMount() {
    const { isLoggedIn, loadTravelFundsPagePlacementsFn } = this.props;

    raiseSatelliteEvent('look up travel funds');
    loadTravelFundsPagePlacementsFn();
    this._handleResumeAfterLogin();

    isLoggedIn && this._retrieveUnusedFunds();
  }

  componentDidUpdate() {
    this._handleResumeAfterLogin();
  }

  _continue = (requestInfo: ViewTravelFundsLinkRequestInfo) => {
    const { isLoggedIn } = this.props;

    isLoggedIn ? this._handleContinueLoggedIn(requestInfo) : this._handleContinueAsGuest(requestInfo);
  };

  _continueAsGuest = () => {
    const { previousTravelFundsSearch, retrieveTravelFundsFn } = this.props;

    previousTravelFundsSearch?.body && retrieveTravelFundsFn(previousTravelFundsSearch, true);
  };

  _handleContinue = (requestInfo: ViewTravelFundsLinkRequestInfo) => {
    const { setReLoginCallbackFunctionsFn } = this.props;

    this._continue(requestInfo);
    setReLoginCallbackFunctionsFn({ continueAsGuestFn: this._continueAsGuest });
  };

  _handleContinueAsGuest = (requestInfo: ViewTravelFundsLinkRequestInfo) => {
    const { isWebView, push, showNativeAppLoginFn, resumeAfterLoginFn } = this.props;

    if (isWebView) {
      showNativeAppLoginFn({ loginType: LOGIN_TYPES.TRANSFER_TRAVEL_FUNDS });
      resumeAfterLoginFn(true, requestInfo);
    } else {
      push('/login', null, {
        simpleLogin: true,
        to: getNormalizedRoute({ routeName: 'index' }),
        transferFunds: true
      });
      resumeAfterLoginFn(true, requestInfo);
    }
  };

  _handleContinueLoggedIn = (requestInfo: ViewTravelFundsLinkRequestInfo) => {
    const { associateFundsFn, previousTravelFundsSearch, push, retrieveTravelFundsFn, validateTransferFundsFn } =
      this.props;
    const { requestLink, type } = requestInfo;

    if (!type || !requestLink) return;

    if (type === TRANSFER_FUNDS_TYPE) {
      validateTransferFundsFn(requestLink)
        .then(() => push(getNormalizedRoute({ routeName: 'transferFunds' })))
        .catch(() => retrieveTravelFundsFn(previousTravelFundsSearch, true));
    } else if (type === ASSOCIATE_FUNDS_TYPE) {
      associateFundsFn(requestLink).then(() => retrieveTravelFundsFn(previousTravelFundsSearch, true));
    }
  };

  _handleResumeAfterLogin = () => {
    const { isLoggedIn, resumeAfterLogin, resumeAfterLoginFn } = this.props;
    const { requestInfo, shouldResume } = resumeAfterLogin;

    if (isLoggedIn && shouldResume) {
      resumeAfterLoginFn(false);
      this._handleContinue(requestInfo);
    }
  };

  _onClickAssociateFundLink = (associateFundLink: ViewTravelFundLinkRequestType) => {
    this._handleContinue({ requestLink: associateFundLink, type: ASSOCIATE_FUNDS_TYPE });
  };

  _onClickValidateTransferLink = (validateTransferLink: ViewTravelFundLinkRequestType) => {
    this._handleContinue({ requestLink: validateTransferLink, type: TRANSFER_FUNDS_TYPE });
  };

  _onSelectionChange = (selection: TravelFundsOptionsType) => {
    const { updateSelectedLookupTabFn } = this.props;

    updateSelectedLookupTabFn(selection);
  };

  _onSubmitCardLookup = (formData: LookUpCardFundType) => {
    const { retrieveTravelFundsFn, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[2], formData);
    retrieveTravelFundsFn(transformToCardLookupRequest(formData));
  };

  _onSubmitRTFLookup = (formData: LookUpRTFFundType) => {
    const { retrieveTravelFundsFn, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[0], formData);
    retrieveTravelFundsFn(transformToRTFLookupRequest(formData));
  };

  _onSubmitVoucherLookup = (formData: LookUpVoucherFundType) => {
    const { retrieveTravelFundsFn, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[1], formData);
    retrieveTravelFundsFn(transformToVoucherLookupRequest(formData));
  };

  _retrieveUnusedFunds = () => {
    const { retrieveUnusedFundsFn } = this.props;
    const request = {
      href: 'v1/mobile-air-booking/page/view-fund',
      method: 'GET'
    };

    retrieveUnusedFundsFn(request);
  };

  render() {
    const { associateFundsMessage, currentlySelectedTab, isWebView, message, placements, push, retrievedFunds } =
      this.props;

    const rightButton = [
      {
        name: i18n('SHARED__BUTTON_TEXT__DONE'),
        onClick: () => push('/')
      }
    ];

    const giftCardSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[2];
    const luvVoucherSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[1];
    const travelFundsSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[0];

    return (
      <div>
        {!isWebView && <PageHeaderWithButtons rightButtons={rightButton} title={CHECK_TRAVEL_FUNDS} />}
        {!_.isEmpty(associateFundsMessage) && (
          <InfoBanner
            className="associate-funds-message"
            header={associateFundsMessage.header}
            iconType={associateFundsMessage.icon === 'POSITIVE' ? 'check-circle' : undefined}
            shouldScrollToTop
          />
        )}
        <div className="look-up-travel-funds">
          {message && (
            <Container className="look-up-travel-funds--message-container">
              <div className="look-up-travel-funds--message">
                <h3 className="xxlarge bold white inline-block" data-qa="message-header-text">
                  {message.header}
                </h3>
                <p className="mt2" data-qa="message-body-text">
                  {message.body}
                </p>
              </div>
            </Container>
          )}
          <div className="look-up-travel-funds--selector">
            <FundTypeSelector
              fundTypes={FUND_TYPES}
              onClickSelector={this._onSelectionChange}
              selectedFund={currentlySelectedTab}
            />
          </div>
          <div className="look-up-travel-funds--forms">
            {travelFundsSelected && (
              <LookUpFundsForm
                buttonText={LOOK_UP_FUNDS}
                formFields={TRAVEL_FUNDS_FORM_FIELDS}
                formId={LOOK_UP_TRAVEL_FUNDS_FORM_ID}
                onSubmit={this._onSubmitRTFLookup}
              />
            )}
            {luvVoucherSelected && (
              <LookUpFundsForm
                buttonText={LOOK_UP_VOUCHER}
                formFields={LUV_VOUCHER_FORM_FIELDS}
                formId={LOOK_UP_LUV_VOUCHER_FORM_ID}
                onSubmit={this._onSubmitVoucherLookup}
              />
            )}
            {giftCardSelected && (
              <LookUpFundsForm
                buttonText={LOOK_UP_GIFT_CARD}
                formFields={GIFT_CARD_FORM_FIELDS}
                formId={LOOK_UP_GIFT_CARD_FORM_ID}
                onSubmit={this._onSubmitCardLookup}
              />
            )}
          </div>
          <p className="travel-funds--disclaimer">{i18n('CHECK_TRAVEL_FUNDS_DISCLAIMER')}</p>
          <ContentLink className="pblue travel-funds-terms-link" href={sitePaths.fundsTermsAndConditions}>
            {TRAVEL_FUNDS_TERMS_AND_CONDITIONS}
          </ContentLink>
          <ContentLink className="pblue travel-funds-faqs-link" href={sitePaths.fundsFaqs}>
            {i18n('TRAVEL_FUNDS_FAQS')}
          </ContentLink>
          {retrievedFunds.length > 0 && (
            <div className="look-up-travel-funds--results">
              <FundResultsList
                listTitle={i18n('FUNDS_FROM_YOUR_ACCOUNT')}
                onClickAssociateFundLink={this._onClickAssociateFundLink}
                onClickValidateTransferLink={this._onClickValidateTransferLink}
                retrievedFunds={retrievedFunds}
              />
            </div>
          )}
        </div>

        {travelFundsSelected && retrievedFunds.length > 0 && (
          <div className="placements">
            {placements.map((placement, index) => (
              <DynamicPlacement {...placement} data-qa="look-up-travel-funds-page-placement" key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accountNumber: _.get(state, 'app.account.accountNumber'),
  associateFundsMessage: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.associateFundsMessage'),
  currentlySelectedTab: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.currentlySelectedTab') || 'travel-funds',
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isWebView: _.get(state, 'app.webView.isWebView', false),
  message: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.message'),
  placements: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.placements', []),
  previousTravelFundsSearch: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.previousTravelFundsSearch'),
  resumeAfterLogin: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.resumeAfterLogin'),
  retrievedFunds: _.get(state, 'app.travelFunds.lookUpTravelFundsPage.viewTravelFund.retrievedFunds')
});

const mapDispatchToProps = {
  associateFundsFn: TravelFundsActions.associateFunds,
  loadTravelFundsPagePlacementsFn: TravelFundsActions.loadTravelFundsPagePlacements,
  resumeAfterLoginFn: TravelFundsActions.resumeAfterLogin,
  retrieveTravelFundsFn: TravelFundsActions.retrieveTravelFunds,
  retrieveUnusedFundsFn: TravelFundsActions.retrieveUnusedFunds,
  saveLastSearchedFundFn: AnalyticsActions.saveLastSearchedFund,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showNativeAppLoginFn: showNativeAppLogin,
  updateSelectedLookupTabFn: TravelFundsActions.updateSelectedLookupTab,
  validateTransferFundsFn: TravelFundsActions.validateTransferFunds
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(LookUpTravelFundsPage);
