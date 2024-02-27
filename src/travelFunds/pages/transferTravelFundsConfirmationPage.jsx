// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import InfoBanner from 'src/shared/components/infoBanner';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import TransferFundsSummaryCard from 'src/travelFunds/components/transferFundsSummaryCard';
import TransferFundsTotal from 'src/travelFunds/components/transferFundsTotal';
import i18n from '@swa-ui/locale';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import type { Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';
import type { TransferTravelFundsPageResponse } from 'src/travelFunds/flow-typed/travelFunds.types';

type Props = {
  push: Push,
  transferTravelFundsConfirmation: TransferTravelFundsPageResponse,
  isWebView: boolean,
  footerLinkRows: Array<WcmFooterType>
};

export const TransferTravelFundsConfirmationPage = ({
  transferTravelFundsConfirmation = {},
  push,
  isWebView,
  footerLinkRows
}: Props) => {
  const { headerMessage } = transferTravelFundsConfirmation;

  const rightButtons = [
    {
      name: i18n('SHARED__BUTTON_TEXT__DONE'),
      onClick: () => push('/')
    }
  ];

  const pageHeaderWithButtonsProps = {
    title: i18n('TRAVEL_FUNDS__TRANSFER_PAGE__HEADER'),
    ...(!isWebView ? { rightButtons } : {})
  };

  const _renderHeaderMessage = () =>
    (headerMessage.key === TravelFundsConstants.TRANSFER_PARTIAL_CONFIRMATION_MESSAGE ? (
      <InfoBanner {...headerMessage} />
    ) : (
      <MessageWithInstructions title={headerMessage.header} subInstruction={headerMessage.body} status={'success'} />
    ));

  return (
    <React.Fragment>
      <PageHeaderWithButtons {...pageHeaderWithButtonsProps} />
      {headerMessage && _renderHeaderMessage()}
      <TransferFundsSummaryCard
        originalTravelFund={transferTravelFundsConfirmation.originalTravelFund}
        recipientDetails={transferTravelFundsConfirmation.recipientDetails}
        transferredAmount={transferTravelFundsConfirmation.transferredAmount}
      />
      <TransferFundsTotal transferredAmount={transferTravelFundsConfirmation.transferredAmount} />
      <div className="transfer-travel-funds-footer">
        {!isWebView && <PageFooterWcmSourced footerLinkRows={footerLinkRows} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  transferTravelFundsConfirmation: _.get(
    state,
    'app.travelFunds.lookUpTravelFundsPage.transferTravelFundsConfirmation'
  ),
  isWebView: _.get(state, 'app.webView.isWebView', false),
  footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', [])
});

const mapDispatchToProps = {};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(TransferTravelFundsConfirmationPage);
