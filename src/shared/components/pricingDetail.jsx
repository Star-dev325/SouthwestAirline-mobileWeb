// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { getEarlyBirdAdditionalTemplateData } from 'src/airBooking/helpers/earlyBirdPlacementHelper';
import { PRICING_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { REFERRERS } from 'src/shared/constants/webViewConstants';
import { transformToUnitPrice } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';
import BottomLinksPopup from 'src/shared/components/popups/bottomLinksPopup';
import Button from 'src/shared/components/button';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import PriceTotal from 'src/shared/components/priceTotal';
import PricingBannerList from 'src/shared/components/pricingBannerList';
import ProgressionBar from 'src/shared/components/progressionBar';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import UpsellDetails from 'src/shared/components/upsellDetails';
import UpsellSuccessWidget from 'src/shared/components/upsellSuccessWidget';

import type {
  EarlyBirdEligibility,
  FlightPricingPage,
  FlightProductSearchRequest
} from 'src/airBooking/flow-typed/airBooking.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { PriceTotalPropsType } from 'src/shared/components/priceTotal';

type Props = {
  chaseBannerConfig?: ?DynamicPlacementResponse,
  EARLY_BIRD_AB_TESTING: boolean,
  earlyBirdEligibility?: EarlyBirdEligibility,
  earlyBirdSelected: boolean,
  earlyBirdUpsell?: DynamicPlacementResponse,
  flightPricingPage: FlightPricingPage,
  handleFirmOfferOfCreditFn?: () => void,
  hasUpsellError?: boolean,
  isLoggedIn?: boolean,
  isWebView?: boolean,
  onChaseButtonClick?: () => void,
  onContinueClick: (*) => void,
  pathname?: string,
  priceTotal?: PriceTotalPropsType,
  promoMiddle01?: DynamicPlacementResponse,
  promoTop01?: DynamicPlacementResponse,
  searchRequest?: FlightProductSearchRequest,
  selectedCompanyName?: ?string,
  selectFlightProductWithUpsellFn?: (linkObj: Link) => void,
  shouldShowChasePlacement?: boolean,
  totalStep?: number,
  travelFundsBalanceRemaining?: CurrencyType
};

const PricingDetail = ({
  chaseBannerConfig,
  EARLY_BIRD_AB_TESTING,
  earlyBirdEligibility,
  earlyBirdSelected,
  earlyBirdUpsell,
  flightPricingPage,
  handleFirmOfferOfCreditFn,
  hasUpsellError,
  isLoggedIn,
  isWebView,
  onChaseButtonClick,
  onContinueClick,
  pathname,
  priceTotal,
  promoMiddle01,
  promoTop01,
  searchRequest,
  selectedCompanyName,
  selectFlightProductWithUpsellFn,
  shouldShowChasePlacement,
  totalStep,
  travelFundsBalanceRemaining
}: Props) => {
  const { bounds, totals, fareRulesWithLinks, messages, upsellDetails, upsellSuccessMessage, _links } =
    flightPricingPage;

  const priceTotalProps = EARLY_BIRD_AB_TESTING ? priceTotal : {};
  const unitPriceOutBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[0]'));
  const unitPriceInBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[1]'));
  const [isUpsellModalActive, setIsUpsellModalActive] = React.useState(false);

  const getUpsellOptionLinks = () => {
    const upsellDepartureBoundSelectionText = flightPricingPage?.bounds?.[0]?.upsellBoundDetails?.selectionText;
    const upsellDepartureBoundLinkObj = flightPricingPage?.bounds?.[0]?._links?.flightPricingUpsellSingleBound;
    const upsellDepartureBoundPrice = _.get(flightPricingPage, 'bounds[0].upsellBoundDetails.upsellPrice');
    const upsellReturnBoundSelectionText = _.get(flightPricingPage, 'bounds[1].upsellBoundDetails.selectionText');
    const upsellReturnBoundLinkObj = _.get(flightPricingPage, 'bounds[1]._links.flightPricingUpsellSingleBound');
    const upsellReturnBoundPrice = _.get(flightPricingPage, 'bounds[1].upsellBoundDetails.upsellPrice');
    const upsellBothBoundsSelectionText = _.get(upsellDetails, 'selectionText');
    const upsellBothBoundsLinkObj = _.get(_links, 'flightPricingUpsellBothBounds');
    const upsellBothBoundsPrice = _.get(upsellDetails, 'upsellPrice');

    return [
      ...getUpsellOptionLink(upsellDepartureBoundSelectionText, upsellDepartureBoundLinkObj, upsellDepartureBoundPrice),
      ...getUpsellOptionLink(upsellReturnBoundSelectionText, upsellReturnBoundLinkObj, upsellReturnBoundPrice),
      ...getUpsellOptionLink(upsellBothBoundsSelectionText, upsellBothBoundsLinkObj, upsellBothBoundsPrice, true)
    ];
  };

  const getUpsellOptionLink = (selectionText, boundLinkObj, upsellPrice, isBothBounds = false) =>
    (selectionText && boundLinkObj
      ? [
        {
          handler: () => {
            handleUpsellSelection(boundLinkObj, upsellPrice, isBothBounds);
          },
          label: selectionText
        }
      ]
      : []);

  const handleUpsellSelection = (boundLinkObj, upsellPrice, isBothBounds) => {
    const pagedescription = 'button:upsell applied';
    const numberOfPassengers = parseInt(_.get(boundLinkObj, 'body.adultPassengers.numberOfPassengers'));
    const upsell_boundsselected = numberOfPassengers * (isBothBounds ? 2 : 1);
    const upsell_totalcurrency = numberOfPassengers * upsellPrice;

    selectFlightProductWithUpsellFn?.(boundLinkObj);
    raiseSatelliteEvent('squid', {
      pagedescription,
      upsell_boundsselected,
      upsell_totalcurrency
    });
  };

  const onUpgradeMyFlight = () => {
    setIsUpsellModalActive(true);
    raiseSatelliteEvent('squid', { pagedescription: 'modal:Upsell Price Page' });
  };

  const closeUpsellModal = () => {
    setIsUpsellModalActive(false);
  };

  return (
    <div className="pricing-summary">
      <ProgressionBar totalStep={totalStep} step={1} currentIconType="airplane" />
      {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
      {messages && <PricingBannerList messages={messages} />}
      <div className="pricing-summary--content">
        {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
        <ReservationFlightSummary bounds={bounds} />
        {upsellDetails && !hasUpsellError && <UpsellDetails {...upsellDetails} onUpgradeMyFlight={onUpgradeMyFlight} />}
        {upsellSuccessMessage && <UpsellSuccessWidget upsellSuccessMessage={upsellSuccessMessage} />}
        <PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />
        {EARLY_BIRD_AB_TESTING && earlyBirdUpsell && (
          <DynamicPlacement
            additionalTemplateData={getEarlyBirdAdditionalTemplateData(
              unitPriceInBound,
              unitPriceOutBound,
              earlyBirdEligibility
            )}
            earlyBirdEligibility={earlyBirdEligibility}
            earlyBirdSelected={earlyBirdSelected}
            EARLY_BIRD_AB_TESTING={EARLY_BIRD_AB_TESTING}
            {...earlyBirdUpsell}
          />
        )}
        {promoMiddle01 && (
          <DynamicPlacement
            {...promoMiddle01}
            data-qa="promoMiddle01"
            shouldRaiseSatelliteEvent
            bounds={bounds}
            searchRequest={searchRequest}
          />
        )}
        {chaseBannerConfig && shouldShowChasePlacement && (
          <div className="pricing-summary--promos">
            <DynamicPlacement
              data-qa="pricing-page-placement"
              isLoggedIn={isLoggedIn}
              isWebView={isWebView}
              observerCallback={handleFirmOfferOfCreditFn}
              onClick={onChaseButtonClick}
              pageId={PRICING_PAGE_ID}
              referrer={REFERRERS.PRICE}
              returnUrl={pathname}
              totalFare={flightPricingPage.totals.moneyTotal}
              {...chaseBannerConfig}
            />
          </div>
        )}
        <PriceTotal
          earlyBirdEligibility={earlyBirdEligibility}
          showEarlyBirdInFareBreakdown={EARLY_BIRD_AB_TESTING && earlyBirdSelected}
          totals={EARLY_BIRD_AB_TESTING ? undefined : totals}
          travelFundsBalanceRemaining={EARLY_BIRD_AB_TESTING ? travelFundsBalanceRemaining : undefined}
          {...priceTotalProps}
        />
        <div className="price-summary--nav">
          <Button className="continue" onClick={onContinueClick} color="yellow" size="larger" fluid>
            {i18n('AIR_BOOKING__SUMMARY__CONTINUE')}
          </Button>
        </div>
        <BottomLinksPopup
          active={isUpsellModalActive}
          bottom
          closeLabel={i18n('SHARED__BUTTON_TEXT__CANCEL')}
          links={getUpsellOptionLinks()}
          name="upsell-upgrade-options"
          onClose={closeUpsellModal}
          subtitle={i18n('SHARED__PRICING_DETAIL_SUBTITLE')}
        />
      </div>
    </div>
  );
};

export default PricingDetail;
