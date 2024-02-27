// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'src/shared/components/button';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import { DOLLAR } from 'src/shared/constants/currencyTypes';
import withReservationDetailTransition from 'src/shared/enhancers/withReservationDetailTransition';
import { buildNativeAppLink } from 'src/shared/helpers/hybridHelper';

import type { FareSummaryConfirmation } from 'src/sameDay/flow-typed/sameDay.types';

type Props = {
  creditInfoMessage?: string,
  firstName: string,
  isRefund?: boolean,
  isShowPoints?: boolean,
  isWebView: boolean,
  lastName: string,
  onBoardingDetailsButtonClick: () => void,
  onSeeStandbyListButtonClick: () => void,
  passengerSearchToken: ?string,
  pointsTotal?: FareSummaryConfirmation,
  recordLocator: ?string,
  refundMessage?: string,
  standbyLabel: string,
  standbyToken: ?string,
  taxCreditRefund?: FareSummaryConfirmation,
  taxesAndFeesWithLinks?: string,
  taxTitle: string,
  title: string,
  total: FareSummaryConfirmation,
  totalCredit: FareSummaryConfirmation,
  totalPointsTax: FareSummaryConfirmation,
  viewBoardingPositionsLabel: string
};

export const StandByListFooter = ({
  creditInfoMessage,
  firstName,
  isRefund,
  isShowPoints,
  isWebView,
  lastName,
  onBoardingDetailsButtonClick,
  onSeeStandbyListButtonClick,
  passengerSearchToken,
  pointsTotal,
  recordLocator,
  refundMessage,
  standbyLabel,
  standbyToken,
  taxCreditRefund,
  taxesAndFeesWithLinks,
  taxTitle,
  title,
  total,
  totalCredit,
  totalPointsTax,
  viewBoardingPositionsLabel
}: Props) => {
  const isDollar = totalCredit?.currencyCode === DOLLAR;
  const hasNoPointDueAndTaxCredit = taxCreditRefund?.amount !== '0' && total?.amount === '0';
  const hasPointsDueAndTaxCredit =
    taxCreditRefund?.amount !== '0' && total?.amount !== '0' && total?.currencyCode === 'PTS';
  const hasPointsCreditOnly = !taxCreditRefund && total?.amount !== '0' && total?.currencyCode === 'PTS';
  const backgroundColorClassNames = {
    bgblue: !totalCredit || !taxCreditRefund || hasNoPointDueAndTaxCredit,
    bggreen: totalCredit || (taxCreditRefund && !hasNoPointDueAndTaxCredit)
  };
  const pointsTotalBackgroundColor = {
    bgblue: !isRefund,
    bggreen: isRefund
  };
  const showRefundTaxesNotes = (taxCreditRefund || totalCredit) && !totalPointsTax && !hasNoPointDueAndTaxCredit;
  const refundMessageClassNames = {
    'stand-by-list-footer--refund-taxes-note_right': showRefundTaxesNotes,
    'stand-by-list-footer--refund-taxes-note': showRefundTaxesNotes,
    'stand-by-list-footer--sub-note': !taxCreditRefund || hasNoPointDueAndTaxCredit
  };
  const refundMessageTop = {
    'stand-by-list-footer--taxes-and-fees_top': (taxCreditRefund || totalCredit) && !totalPointsTax,
    'stand-by-list-footer--taxes-and-fees_reverse': (totalCredit && !totalPointsTax) || standbyLabel
  };
  const showRefundMessageAtBottom =
    (totalCredit || isRefund || isDollar) && !hasNoPointDueAndTaxCredit && !totalPointsTax && refundMessage;
  const totalBackgroundColor = {
    bgblue: !isRefund && !taxCreditRefund,
    bggreen: isRefund && totalCredit && !totalPointsTax
  };
  const taxCreditBackgroundColor = {
    bgblue: !taxCreditRefund,
    bggreen: (taxCreditRefund || totalCredit) && !totalPointsTax
  };
  const taxesLinkClassNames = {
    'stand-by-list-footer--refund-taxes-note_right':
      (taxCreditRefund || totalCredit) && !totalPointsTax && !hasNoPointDueAndTaxCredit,
    'stand-by-list-footer--refund-taxes-note':
      (taxCreditRefund || totalCredit) && !totalPointsTax && !hasNoPointDueAndTaxCredit,
    'stand-by-list-footer--sub-note': !taxCreditRefund || hasNoPointDueAndTaxCredit
  };
  const priceDifferenceTotalClass =
    !standbyLabel && !isDollar
      ? 'price-difference-footer--price-total-with-rule'
      : 'price-difference-footer--price-total';

  const _renderStandbyListButton = () => {
    let buttonProps = {
      color: 'blue',
      fluid: true,
      size: 'larger',
      type: 'submit'
    };

    buttonProps = isWebView
      ? { ...buttonProps, href: buildNativeAppLink('standby', { recordLocator, standbyToken }) }
      : { ...buttonProps, onClick: onSeeStandbyListButtonClick };

    return (
      <div
        className={cx('early-bird-price-footer--nav stand-by-list-footer--nav', backgroundColorClassNames, {
          'stand-by-list-footer--nav_webview': isWebView
        })}
      >
        <Button {...buttonProps}>{standbyLabel}</Button>
      </div>
    );
  };

  const _renderBoardingDetailsButton = () => {
    let buttonProps = {
      color: 'yellow',
      fluid: true,
      size: 'larger',
      type: 'submit'
    };

    buttonProps = isWebView
      ? {
        ...buttonProps,
        href: buildNativeAppLink('boarding-details', { firstName, lastName, passengerSearchToken, recordLocator })
      }
      : { ...buttonProps, onClick: onBoardingDetailsButtonClick };

    return (
      <div>
        <Button {...buttonProps}>{viewBoardingPositionsLabel ?? i18n('SHARED__BUTTON_TEXT__BOARDING_DETAILS')}</Button>
      </div>
    );
  };

  const _renderCreditInfoMessage = () =>
    (taxCreditRefund || isRefund || !totalPointsTax) &&
    creditInfoMessage &&
    !refundMessage && (
      <div>
        <p className="price-credit-message">{creditInfoMessage}</p>
      </div>
    );

  const _renderRefundMessage = (hideMarginTop?: boolean = false) =>
    (!totalCredit || totalPointsTax || hasNoPointDueAndTaxCredit) &&
    refundMessage && (
      <div>
        <p
          className={cx('stand-by-list-footer--price-refund-message', {
            'stand-by-list-footer--price-refund-message_top-margin': !standbyLabel && !hideMarginTop,
            'stand-by-list-footer--refund-taxes-note_right': hasPointsDueAndTaxCredit
          })}
        >
          {refundMessage}
        </p>
      </div>
    );

  const _renderTaxesAndFeesWithLinksMessageTop = () =>
    standbyLabel &&
    taxesAndFeesWithLinks && (
      <div>
        <p
          className={cx('stand-by-list-footer--price-refund-message', {
            'stand-by-list-footer--price-refund-message_top-margin': standbyLabel
          })}
        >
          {taxesAndFeesWithLinks}
        </p>
      </div>
    );

  const _renderTaxesAndFeesWithLinksMessage = () =>
    taxesAndFeesWithLinks &&
    (!taxCreditRefund || !standbyLabel) && (
      <div className={cx('stand-by-list-footer', taxesLinkClassNames)}>
        <p className="white" dangerouslySetInnerHTML={{ __html: taxesAndFeesWithLinks }} />
      </div>
    );

  const _renderTaxCreditRefundSection = () => (
    <div className={cx('stand-by-list-footer--price-total', priceDifferenceTotalClass, taxCreditBackgroundColor)}>
      <PriceTotalLine
        creditInfoMessage={refundMessage ? null : creditInfoMessage}
        taxCreditRefund={taxCreditRefund}
        showPts={isShowPoints}
        title={taxTitle || title}
        type="totalPerSection"
      />
      <div className={cx(refundMessageTop)}>
        {(!hasPointsDueAndTaxCredit && _renderRefundMessage(hasPointsDueAndTaxCredit)) || _renderCreditInfoMessage()}
        {_renderTaxesAndFeesWithLinksMessageTop()}
      </div>
    </div>
  );

  return (
    <div className="stand-by-list-footer">
      {taxCreditRefund && hasNoPointDueAndTaxCredit && _renderTaxCreditRefundSection()}
      {pointsTotal && (
        <div className={cx('stand-by-list-footer--price-total', priceDifferenceTotalClass, pointsTotalBackgroundColor)}>
          <PriceTotalLine
            creditInfoMessage={refundMessage ? null : creditInfoMessage}
            isRefund={isRefund}
            pointsTotal={pointsTotal}
            showPts={isShowPoints}
            title={title}
            type="totalPerSection"
          />
          {_renderRefundMessage() || _renderCreditInfoMessage()}
        </div>
      )}
      {total && (
        <div className={cx('stand-by-list-footer--price-total', priceDifferenceTotalClass, totalBackgroundColor)}>
          <PriceTotalLine
            creditInfoMessage={refundMessage ? null : creditInfoMessage}
            isRefund={taxCreditRefund || totalCredit ? isRefund : false}
            showPts={isShowPoints}
            title={isRefund || totalPointsTax ? taxTitle : title}
            total={total}
            totalPointsTax={totalPointsTax}
            type="totalPerSection"
          />
          {!refundMessage &&
            isShowPoints &&
            isRefund &&
            !totalPointsTax &&
            total?.amount !== '0' &&
            _renderCreditInfoMessage()}
        </div>
      )}
      {taxCreditRefund && !hasNoPointDueAndTaxCredit && _renderTaxCreditRefundSection()}
      <div
        className={cx(
          'stand-by-list-footer--taxes-and-fees',
          priceDifferenceTotalClass,
          hasNoPointDueAndTaxCredit ? pointsTotalBackgroundColor : taxCreditBackgroundColor,
          refundMessageTop
        )}
      >
        {showRefundMessageAtBottom && (
          <div className={cx('stand-by-list-footer', refundMessageClassNames)}>
            {!hasPointsDueAndTaxCredit && hasPointsCreditOnly && _renderTaxesAndFeesWithLinksMessage()}
            <p className="white" dangerouslySetInnerHTML={{ __html: refundMessage }} />
          </div>
        )}
        {(!hasPointsCreditOnly || !hasNoPointDueAndTaxCredit) && _renderTaxesAndFeesWithLinksMessage()}
        {hasPointsDueAndTaxCredit && _renderRefundMessage()}
      </div>
      {!standbyLabel && !isDollar && (
        <div
          className={cx(
            'stand-by-list-footer--divider',
            hasNoPointDueAndTaxCredit ? pointsTotalBackgroundColor : taxCreditBackgroundColor
          )}
        >
          <hr className="stand-by-list-footer--divider-rule" />
        </div>
      )}
      {standbyLabel ? (
        _renderStandbyListButton()
      ) : (
        <div
          className={cx(
            isDollar ? 'stand-by-list-footer--btn_right' : 'stand-by-list-footer--btn',
            priceDifferenceTotalClass,
            hasNoPointDueAndTaxCredit ? pointsTotalBackgroundColor : taxCreditBackgroundColor
          )}
        >
          {_renderBoardingDetailsButton()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWebView: state?.app?.webView?.isWebView
});

const enhancers = _.flowRight(withReservationDetailTransition, connect(mapStateToProps, null));

export default enhancers(StandByListFooter);
