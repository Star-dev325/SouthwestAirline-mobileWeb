// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import DestinationInfo from 'src/earlyBird/components/destinationInfo';
import EarlyBirdCheckInPricingBanner from 'src/earlyBird/components/earlyBirdCheckInPricingBanner';
import EarlyBirdDetailForm from 'src/earlyBird/components/earlyBirdDetailForm';
import transformToDefaultValues from 'src/earlyBird/transformers/earlyBirdDetailFormDefaultValuesTransformer';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { showDialog } from 'src/shared/actions/dialogActions';
import SubHeader from 'src/shared/components/subHeader';
import { EARLY_BIRD_DETAILS_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import WithShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import formatDateRange from 'src/shared/helpers/formatDateRange';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { ViewEarlyBirdReservationPageResponseType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  isLoggedIn: boolean,
  response: ViewEarlyBirdReservationPageResponseType,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  flightDateRange: string,
  accountNumber: string,
  formData?: FormData,
  showDialogFn: (*) => void,
  resetPaymentInfoFn: () => void,
  gotoReviewPageFn: (
    nextPagePath?: string,
    isLoggedIn: boolean,
    formData: FormData,
    response: ViewEarlyBirdReservationPageResponseType
  ) => void
};

export class EarlyBirdDetailPage extends React.Component<Props> {
  _onClickIneligibleLabel = (message: string) => {
    this.props.showDialogFn({
      name: 'earlybird-checkin-ineligible',
      title: i18n('EARLY_BIRD_INELIGIBLE_DIALOG_TITLE'),
      message
    });
  };

  _continueAsGuest = (nextPagePath: string, formData: FormData) => {
    const { gotoReviewPageFn, response, resetPaymentInfoFn } = this.props;

    resetPaymentInfoFn();
    gotoReviewPageFn(nextPagePath, false, formData, response);
  };

  _onClickContinue = (formData: FormData) => {
    const {
      isLoggedIn,
      gotoReviewPageFn,
      response,
      response: { recordLocator },
      setReLoginCallbackFunctionsFn
    } = this.props;
    const nextPagePath = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'review' }), { pnr: recordLocator });
    const next = () => gotoReviewPageFn(nextPagePath, isLoggedIn, formData, response);

    next();
    setReLoginCallbackFunctionsFn({ continueAsGuestFn: () => this._continueAsGuest(nextPagePath, formData) });
  };

  render() {
    const {
      response: { destinationDescription, earlyBirdBounds },
      flightDateRange
    } = this.props;

    return (
      <div ref="earlyBirdDetail" className="early-bird-detail">
        <SubHeader title={i18n('SHARED__EARLY_BIRD__CHECK_IN_TITLE')} />
        <EarlyBirdCheckInPricingBanner />
        <DestinationInfo dateRange={flightDateRange} destinationAirport={destinationDescription} />
        <p className="early-bird-detail--message">{i18n('EARLY_BIRD_NEW_SELECT_ALL_PASSENGERS_TIPS')}</p>
        <EarlyBirdDetailForm
          formId={EARLY_BIRD_DETAILS_FORM}
          initialFormData={transformToDefaultValues(earlyBirdBounds)}
          earlyBirdBounds={earlyBirdBounds}
          onSubmit={this._onClickContinue}
          onClickIneligibleLabel={this._onClickIneligibleLabel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  flightDateRange: formatDateRange(
    _.get(state, 'app.earlyBird.detailPage.response.dates.first'),
    _.get(state, 'app.earlyBird.detailPage.response.dates.second')
  ),
  response: _.get(state, 'app.earlyBird.detailPage.response'),
  formData: _.get(state, `app.formData.${EARLY_BIRD_DETAILS_FORM}.data`),
  accountNumber: _.get(state, 'app.account.accountNumber')
});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  gotoReviewPageFn: EarlyBirdActions.gotoReviewPage,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  resetPaymentInfoFn: EarlyBirdActions.resetPaymentInfo
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  WithShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(EarlyBirdDetailPage);
