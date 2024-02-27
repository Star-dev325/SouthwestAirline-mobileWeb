// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import Button from 'src/shared/components/button';
import { buildNativeAppLink } from 'src/shared/helpers/hybridHelper';

import type { StandbyBaggageMessage, ViewReservationPageRequest } from 'src/sameDay/flow-typed/sameDay.types';
import type {
  ExpandedDetails,
  FlightDetailsResponse,
  FlightLegs,
  FlightProductCard,
  FlightProductCurrencyType,
  Replace
} from 'src/shared/flow-typed/shared.types';
import type { FlightRetrieveRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  expandedDetails: ExpandedDetails,
  flightDetailsResponse: FlightDetailsResponse,
  flightIdentifier: string,
  hideDialogFn: (*) => Promise<*>,
  isStandbyOnly?: boolean,
  isWebView: boolean,
  onListForStandbyClick: (changeSection: boolean) => void,
  passengerSearchToken: string,
  productCard: FlightProductCard,
  purchaseWithPoints: boolean,
  replace: Replace,
  showDialogFn: (*) => Promise<*>,
  standbyBaggageMessage: StandbyBaggageMessage | null,
  viewReservationPageRequest?: ViewReservationPageRequest,
  viewReservationSearchRequest: FlightRetrieveRequestType
};

const STANDBY_SECTION_IDENTIFIER = 'standby';
const CHANGE_SECTION_IDENTIFIER = 'change';

export const FlightProductDrop = ({
  expandedDetails,
  flightDetailsResponse,
  flightIdentifier,
  hideDialogFn,
  isStandbyOnly = false,
  isWebView,
  onListForStandbyClick,
  passengerSearchToken,
  productCard,
  purchaseWithPoints,
  replace,
  showDialogFn,
  standbyBaggageMessage,
  viewReservationPageRequest,
  viewReservationSearchRequest
}: Props) => {
  const {
    changeUnavailableText,
    standbyAmount,
    standbyLabelSubText,
    standbyLabelText,
    standbyUnavailableText,
    startingFromPriceDifference,
    startingFromPriceDiffPointsTax
  } = productCard;
  const {
    allowSameDayChange,
    changeDescription,
    changeDetailsLabelText,
    changeLabel,
    standbyDescription,
    standbyDetailsLabelText,
    standbyLabel
  } = expandedDetails;
  const flightDetails: Array<FlightLegs> = flightDetailsResponse?.[flightIdentifier]?.flightLegs;
  const showStandbyOnly = !allowSameDayChange || isStandbyOnly;

  const _handleStandbyClick = (event, available, changeSection, identifier) => {
    const { body, dismissLabelText, key, labelText } = standbyBaggageMessage || {};

    let buttonProps = {
      label: labelText
    };

    if (isWebView) {
      const href = viewReservationPageRequest?.href || '';
      const recordLocator = href.slice(href.lastIndexOf('/') + 1);

      buttonProps = {
        ...buttonProps,
        href: buildNativeAppLink('manage-reservation', { recordLocator, passengerSearchToken }),
        onClick: () => hideDialogFn()
      };
    } else {
      const { firstName, lastName, recordLocator } = viewReservationSearchRequest || {};

      buttonProps = {
        ...buttonProps,
        onClick: () => {
          hideDialogFn().then(() => {
            replace(`/view-reservation/trip-details/${recordLocator}`, null, null, { firstName, lastName });
          });
        }
      };
    }

    if (standbyBaggageMessage && identifier === STANDBY_SECTION_IDENTIFIER) {
      showDialogFn({
        buttons: [
          {
            label: dismissLabelText,
            onClick: hideDialogFn
          },
          buttonProps
        ],
        message: body,
        name: key
      });
    } else if (available) {
      onListForStandbyClick(changeSection);
    }
  };

  const _renderFlightCardDetails = () => (
    <div className="flight-product-drop--flight-card-details">
      <div className="flex6">
        <div className="flight-product-drop--flight-card-details_label-text">{standbyDetailsLabelText}</div>
        {flightDetails.map(({ standbyDetailsLabelDescription }, i) => (
          <div
            className="flight-product-drop--flight-card-details_label-details"
            key={`${flightIdentifier}-standby-label-${i}`}
          >
            {standbyDetailsLabelDescription}
          </div>
        ))}
      </div>
      <div className="flex6">
        <div className="flight-product-drop--flight-card-details_label-text">{changeDetailsLabelText}</div>
        {flightDetails.map(({ changeDetailsLabelDescription }, i) => (
          <div
            className="flight-product-drop--flight-card-details_label-details"
            key={`${flightIdentifier}-change-label-${i}`}
          >
            {changeDetailsLabelDescription}
          </div>
        ))}
      </div>
    </div>
  );

  const _renderPriceDetail = (priceDifference: FlightProductCurrencyType, isTax = false) => {
    const { amount, currencySymbol, sign }: FlightProductCurrencyType = priceDifference;

    return (
      <>
        {sign && <span>{sign}</span>}
        {(!purchaseWithPoints || isTax) && currencySymbol && (
          <sup className={isTax ? null : 'flight-product-drop--money-sign'}>{currencySymbol}</sup>
        )}
        {amount && <span>{amount}</span>}
        {purchaseWithPoints && !isTax && (
          <span className={'flight-product-drop--points-sign'}>{i18n('SHARED__COMMON__POINTS_TEXT')}</span>
        )}
      </>
    );
  };

  const _renderPriceDetailAndLabel = (identifier: string) => {
    let content = null;

    if (identifier === STANDBY_SECTION_IDENTIFIER) {
      content = (
        <>
          {standbyAmount ? (
            <>
              <span className="flight-product-drop--standby-text">{_renderPriceDetail(standbyAmount, false)}</span>
              {standbyLabelSubText && (
                <span className="flight-product-drop--standby-subtext">{standbyLabelSubText}</span>
              )}
            </>
          ) : (
            <span className="flight-product-drop--unavailable-text">{standbyUnavailableText}</span>
          )}
        </>
      );
    } else if (changeUnavailableText) {
      content = (
        <>
          {identifier === CHANGE_SECTION_IDENTIFIER && (
            <span className="flight-product-drop--unavailable-text">{changeUnavailableText}</span>
          )}
        </>
      );
    } else if (startingFromPriceDiffPointsTax || startingFromPriceDifference) {
      content = (
        <>
          {startingFromPriceDifference && <div>{i18n('SHARED__COMMON__FROM')}</div>}
          <div className="flight-product-drop--header_content-price-difference">
            {startingFromPriceDifference && _renderPriceDetail(startingFromPriceDifference)}
          </div>
          {startingFromPriceDiffPointsTax && (
            <div className="flight-product-drop--header_content-points-tax">
              {startingFromPriceDiffPointsTax && _renderPriceDetail(startingFromPriceDiffPointsTax, true)}
            </div>
          )}
        </>
      );
    }

    return content;
  };

  const _getProductButtonClassName = (available: boolean, identifier: string) =>
    cx({
      'flight-product-drop--button-available': available,
      'flight-product-drop--unavailable-text': !available,
      'flight-product-drop--header_content': true,
      'flight-product-drop--header_content-standby': identifier === STANDBY_SECTION_IDENTIFIER,
      'flight-product-drop--header_content-change': identifier === CHANGE_SECTION_IDENTIFIER
    });

  const _renderButton = (identifier: string) => {
    const changeSection = identifier === CHANGE_SECTION_IDENTIFIER;
    const standbySection = identifier === STANDBY_SECTION_IDENTIFIER;
    const available = !((changeSection && changeUnavailableText) || (standbySection && standbyUnavailableText));

    return (
      <div
        className={_getProductButtonClassName(available, identifier)}
        onClick={(event) => _handleStandbyClick(event, available, changeSection, identifier)}
        role="button"
        tabIndex="0"
      >
        {_renderPriceDetailAndLabel(identifier)}
      </div>
    );
  };

  const _getProductLabelClassName = (identifier: string) =>
    cx({
      'flight-product-drop--header': true,
      'flight-product-drop--header_standby': identifier === STANDBY_SECTION_IDENTIFIER,
      'flight-product-drop--header_change': identifier === CHANGE_SECTION_IDENTIFIER
    });

  const _renderFlightCardHeaderDetails = (description: string, identifier: string, label?: ?string) => (
    <div className={_getProductLabelClassName(identifier)}>
      <label className="flight-product-drop--header_label">{label}</label>
      <p className="flight-product-drop--header_description ">{description}</p>
    </div>
  );

  const _getFlightCardDetailsFooterClassname = (identifier: string) =>
    cx({
      'flight-product-drop--footer': true,
      'flight-product-drop--footer_standby': identifier === STANDBY_SECTION_IDENTIFIER,
      'flight-product-drop--footer_change': identifier === CHANGE_SECTION_IDENTIFIER
    });

  const _renderFlightCardFooterDetails = (flightDetailInfo: Array<FlightLegs>, identifier: string, label?: ?string) => (
    <>
      {flightDetailInfo?.length && (
        <div className={_getFlightCardDetailsFooterClassname(identifier)}>
          <div className="flight-product-drop--footer_label-text">{label}</div>
          {flightDetailInfo.map(({ standbyDetailsLabelDescription, changeDetailsLabelDescription }, index) => (
            <div className="flight-product-drop--footer_label-details" key={`${flightIdentifier}-details-${index}`}>
              {identifier === STANDBY_SECTION_IDENTIFIER
                ? standbyDetailsLabelDescription
                : changeDetailsLabelDescription}
            </div>
          ))}
        </div>
      )}
    </>
  );

  const _renderStandbySection = () => (
    <>
      {_renderFlightCardHeaderDetails(
        standbyDescription,
        STANDBY_SECTION_IDENTIFIER,
        standbyLabel ? standbyLabel : standbyUnavailableText
      )}
      {_renderButton(STANDBY_SECTION_IDENTIFIER)}
      {_renderFlightCardFooterDetails(flightDetails, STANDBY_SECTION_IDENTIFIER, standbyDetailsLabelText)}
    </>
  );

  const _renderChangeSection = () => (
    <>
      {_renderFlightCardHeaderDetails(changeDescription, CHANGE_SECTION_IDENTIFIER, changeLabel)}
      {_renderButton(CHANGE_SECTION_IDENTIFIER)}
      {_renderFlightCardFooterDetails(flightDetails, CHANGE_SECTION_IDENTIFIER, changeDetailsLabelText)}
    </>
  );

  const _renderStandbyOnlySection = () => (
    <>
      <div className="flight-product-drop--standby-only-body_title">{standbyLabel}</div>
      <div className="flight-product-drop--standby-only-body_description">{standbyDescription}</div>
      <div className="flight-product-drop--standby-only-body_button">
        {standbyLabelText ? (
          <Button
            color="blue"
            fluid
            onClick={(event) => _handleStandbyClick(event, true, false, STANDBY_SECTION_IDENTIFIER)}
            role="submit"
            size="larger"
            type="submit"
          >
            {standbyLabelText}
          </Button>
        ) : standbyUnavailableText ? (
          <div className="flight-product-drop--standby-only-body_button-unavailable-text">{standbyUnavailableText}</div>
        ) : (
          standbyAmount && (
            <Button
              color="blue"
              fluid
              onClick={(event) => _handleStandbyClick(event, true, false, STANDBY_SECTION_IDENTIFIER)}
              role="submit"
              size="larger"
              type="submit"
            >
              {_renderPriceDetail(standbyAmount)}
            </Button>
          )
        )}
      </div>
      {flightDetails?.length && _renderFlightCardDetails()}
    </>
  );

  return (
    <div className="flight-product-drop">
      <div className="flight-product-drop--divider"></div>
      <div className={showStandbyOnly ? 'flight-product-drop--standby-only-body' : 'flight-product-drop--body'}>
        {showStandbyOnly ? (
          <>{_renderStandbyOnlySection()}</>
        ) : (
          <>
            {_renderStandbySection()}
            {_renderChangeSection()}
          </>
        )}
      </div>
    </div>
  );
};
