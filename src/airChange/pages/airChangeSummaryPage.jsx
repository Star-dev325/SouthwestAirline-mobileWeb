// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import i18n from '@swa-ui/locale';
import { resumeAfterLogin } from 'src/airChange/actions/airChangeActions';
import AirChangePriceTotal from 'src/airChange/components/airChangePriceTotal';
import { hasEnoughPointsForFare } from 'src/airChange/helpers/airChangeHelper';
import { getChangeType } from 'src/airChange/selectors/changeTypeSelector';
import { getAccountInfo } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import Button from 'src/shared/components/button';
import PageHeader from 'src/shared/components/pageHeader';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import PricingBannerList from 'src/shared/components/pricingBannerList';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';

import type { ChangePricingPage, ChangeType } from 'src/airChange/flow-typed/airChange.types';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  push: Push,
  changePricingPage: ChangePricingPage,
  accountRedeemablePoints: number,
  isLoggedIn: boolean,
  shouldResumeAfterLogin: boolean,
  getAccountInfoFn: () => void,
  showDialogFn: (*) => void,
  hideDialogFn: () => Promise<*>,
  resumeAfterLoginFn: (boolean) => void,
  changeType: ChangeType
};

type DialogDataType = {
  messageKey: string,
  dialogName: string,
  continueFn: () => void,
  positiveButtonLabel?: string,
  showCancelButton?: boolean
};

export class AirChangeSummaryPage extends React.Component<Props> {
  componentDidMount() {
    const { shouldResumeAfterLogin, isLoggedIn, resumeAfterLoginFn } = this.props;

    if (isLoggedIn && shouldResumeAfterLogin) {
      this._handleContinueForPointsChange();
      resumeAfterLoginFn(false);
    }
  }

  _goToReviewPage = () => {
    this.props.push(getNormalizedRoute({ routeName: 'reconcile' }));
  };

  _showNotEnoughPointsDialog = () => {
    const { showDialogFn, hideDialogFn, getAccountInfoFn } = this.props;

    showDialogFn({
      name: 'flight-purchase-not-enough-points-modify',
      title: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__TITLE'),
      message: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__MESSAGE'),
      className: 'not-enough-points-dialog',
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
          onClick: () => hideDialogFn().then(() => getAccountInfoFn())
        },
        {
          label: i18n('AIR_CHANGE__SUMMARY_PAGE__WITH_POINTS'),
          onClick: this._handlePopupModifyFlightOnClick
        }
      ]
    });
  };

  _handlePopupModifyFlightOnClick = () => {
    const { hideDialogFn, changePricingPage, getAccountInfoFn } = this.props;
    let flightDirection;
    const { body } = changePricingPage._links.changeConfirmationPage;

    if (!!body && body.productIdToken.outbound) {
      flightDirection = 'outbound';
    } else if (!!body && body.productIdToken.inbound) {
      flightDirection = 'inbound';
    }
    hideDialogFn().then(() => {
      this.props.push(
        buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShopping' }), {
          direction: flightDirection,
          paxType: PassengerTypes.ADULT
        })
      );
      getAccountInfoFn();
    });
  };

  _handleContinueForPointsChange = () => {
    const { isLoggedIn, resumeAfterLoginFn, changeType, changePricingPage, accountRedeemablePoints } = this.props;
    const amount = _.get(changePricingPage, 'fareSummary.newAmountDue.fare.amount', '0');

    if (isLoggedIn) {
      !changeType.upGrade || hasEnoughPointsForFare(amount, accountRedeemablePoints)
        ? this._goToReviewPage()
        : this._showNotEnoughPointsDialog();
    } else {
      this.props.push('/login', null, {
        simpleLogin: true,
        to: getNormalizedRoute({
          routeName: 'price'
        }),
        withPoints: true
      });
      resumeAfterLoginFn(true);
    }
  };

  _showSwabizMessage = (): void => {
    const dialogData = {
      messageKey: 'CHANGE_SWABIZ_GHOST_MESSAGE',
      dialogName: 'air-change-ghost-card-message-before-continuing',
      continueFn: this._confirmAndContinue,
      positiveButtonLabel: i18n('SHARED__BUTTON_TEXT__OK'),
      showCancelButton: false
    };

    this._showDialog(dialogData);
  };

  _checkForRequiredPayment = (): void => {
    const paymentRequired = _.get(this.props, 'changePricingPage.paymentRequired', true);

    if (paymentRequired) {
      this._showSwabizMessage();
    } else {
      this._confirmAndContinue();
    }
  };

  _confirmAndContinue = (): void => {
    const isPointsChange = _.get(this.props, 'changePricingPage._meta.purchaseWithPoints');

    if (isPointsChange) {
      this._handleContinueForPointsChange();
    } else {
      this._goToReviewPage();
    }
  };

  _showDialog = ({
    messageKey,
    dialogName,
    continueFn,
    positiveButtonLabel,
    showCancelButton
  }: DialogDataType): void => {
    const { messages } = this.props.changePricingPage;
    const message = _.find(messages, { key: messageKey });
    const buttons = [
      {
        label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        onClick: this.props.hideDialogFn
      },
      {
        label: positiveButtonLabel,
        onClick: () => {
          this.props.hideDialogFn().then(() => {
            continueFn();
          });
        }
      }
    ];

    !showCancelButton && buttons.splice(0, 1);

    !_.isEmpty(message)
      ? this.props.showDialogFn({
        name: dialogName,
        title: _.get(message, 'header'),
        message: _.get(message, 'body'),
        buttons
      })
      : continueFn();
  };

  render() {
    const {
      changePricingPage: { header, totals, bounds, fareRulesWithLinks, fareSummary, priceMessages },
      changeType
    } = this.props;
    const isPointsChange = _.get(this.props, 'changePricingPage._meta.purchaseWithPoints');

    return (
      <div>
        <PageHeader>
          <div>
            <span className="inline-block mr4">Price</span>
            <span className="normal inline-block mr2" data-qa="airPort-codes">
              {header}
            </span>
          </div>
        </PageHeader>
        {priceMessages && <PricingBannerList messages={priceMessages} />}
        <ReservationFlightSummary bounds={bounds} />
        <PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />
        <AirChangePriceTotal
          isPointsChange={isPointsChange}
          totals={totals}
          change={changeType}
          fareSummary={fareSummary}
        />
        <div className="p4 bgpblue">
          <Button className="continue" onClick={this._checkForRequiredPayment} color="yellow" size="larger" fluid>
            {i18n('AIR_BOOKING__SUMMARY__CONTINUE')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  changePricingPage: state.app.airChange.changePricingPage.response,
  shouldResumeAfterLogin: state.app.airChange.changePricingPage.resumeAfterLogin,
  isLoggedIn: state.app.account.isLoggedIn,
  accountRedeemablePoints: _.get(state.app, 'account.accountInfo.rapidRewardsDetails.redeemablePoints', 0),
  changeType: getChangeType(state)
});

const mapDispatchToProps = {
  resumeAfterLoginFn: resumeAfterLogin,
  getAccountInfoFn: getAccountInfo,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeSummaryPage);
