// @flow
import React from 'react';
import _ from 'lodash';

import FundResultItem from 'src/shared/components/fundResultItem';

import type { RetrievedFundType, ViewTravelFundLinkRequestType } from 'src/travelFunds/flow-typed/travelFunds.types';
import type { BillingInformation } from 'src/shared/flow-typed/shared.types';
import { getCardShortNameByType } from 'src/shared/helpers/creditCardHelper';

type Props = {
  retrievedFunds?: Array<RetrievedFundType>,
  billingInfo?: BillingInformation,
  listTitle: string,
  removeFundFn?: (string) => *,
  requireRemoveFundLinkToShowRemoveButton?: boolean,
  onClickAssociateFundLink?: (associateFundLink: ViewTravelFundLinkRequestType) => void,
  onClickValidateTransferLink?: (validateTransferLink: ViewTravelFundLinkRequestType) => void
};

const FundResultsList = (props: Props) => {
  const {
    retrievedFunds,
    billingInfo,
    listTitle,
    onClickAssociateFundLink,
    onClickValidateTransferLink,
    removeFundFn,
    requireRemoveFundLinkToShowRemoveButton
  } = props;

  return (
    <div className="fund-results-list">
      <p className="fund-results-list--title">{listTitle}</p>
      {retrievedFunds &&
        _.map(retrievedFunds, (fund, index: number) => {
          const fundRemovalString = _.get(fund, '_links.removeTravelFund.body.removalTravelFundId', '0');
          const restProps = { key: `${fund.travelFundType}-${index}` };
          const showRemoveFundButton = requireRemoveFundLinkToShowRemoveButton ? !!_.get(fund, '_links') : true;
          const validateTransferLink = _.get(fund, '_links.validateTransfer');
          const associateFundLink = _.get(fund, '_links.associateFund');
          const { greyBoxMessage, transferableText } = fund;
          const shouldRenderGreyBoxMessage = greyBoxMessage && (!!greyBoxMessage.header || !!greyBoxMessage.body);

          shouldRenderGreyBoxMessage && _.set(restProps, 'greyBoxMessage', greyBoxMessage);
          fundRemovalString && _.set(restProps, 'removalId', fundRemovalString);
          showRemoveFundButton && removeFundFn && _.set(restProps, 'removeFundFn', removeFundFn);
          fund.fundIdentifier && _.set(restProps, 'fundIdentifier', fund.fundIdentifier);
          fund.expirationDate && _.set(restProps, 'expirationDate', fund.expirationDate);
          fund.refundableAmount && _.set(restProps, 'refundableAmount', fund.refundableAmount);
          fund.nonRefundableAmount && _.set(restProps, 'nonRefundableAmount', fund.nonRefundableAmount);
          fund.remainingAmount && _.set(restProps, 'remainingAmount', fund.remainingAmount);
          fund.errorMessage && _.set(restProps, 'errorMessage', fund.errorMessage);
          fund.expirationDateString && _.set(restProps, 'expirationDateString', fund.expirationDateString);
          fund.pointsRemaining && _.set(restProps, 'pointsRemaining', fund.pointsRemaining);
          fund.appliedPointsAmount && _.set(restProps, 'appliedPointsAmount', fund.appliedPointsAmount);
          fund.appliedPoints && _.set(restProps, 'appliedPoints', fund.appliedPoints);
          !_.isEmpty(validateTransferLink) && _.set(restProps, 'validateTransferLink', validateTransferLink);
          !_.isEmpty(associateFundLink) && _.set(restProps, 'associateFundLink', associateFundLink);

          return (
            <FundResultItem
              appliedAmount={fund.appliedAmount ? fund.appliedAmount : fund.currentAmount}
              fundType={fund.travelFundType}
              displayName={fund.displayName}
              leisureFund={_.get(fund, 'leisureFund', null)}
              transferableText={transferableText}
              onClickValidateTransferLinkFn={onClickValidateTransferLink}
              onClickAssociateFundLinkFn={onClickAssociateFundLink}
              {...restProps}
            />
          );
        })}
      {billingInfo && billingInfo.cardType && (
        <FundResultItem
          key={'credit-card-fund-result-item'}
          fundType={billingInfo.cardType}
          displayName={getCardShortNameByType(billingInfo.cardType)}
          appliedAmount={billingInfo.amountApplied}
          billingInfo={billingInfo}
        />
      )}
    </div>
  );
};

export default FundResultsList;
