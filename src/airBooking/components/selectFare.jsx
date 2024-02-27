// @flow

import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import ContentLink from 'src/shared/components/contentLink';
import FareProductList from 'src/shared/components/fareProductList';
import FlightHeader from 'src/shared/components/flightHeader';
import Footnotes from 'src/shared/components/footnotes';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { INBOUND } from 'src/shared/constants/flightBoundTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import TierTypes from 'src/shared/constants/tierTypes';
import { formatCurrency } from 'src/shared/helpers/formatCurrencyHelper';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { FlightSelectFarePage } from 'src/airBooking/flow-typed/airBooking.types';
import type { FareProduct } from 'src/shared/flow-typed/shared.types';

export const SelectFare = ({
  accountInfo,
  card: { 
    arrivalTime,
    departureTime,
    fares,
    flightNumbers,
    isNextDayArrival,
    isOvernight,
    stopDescriptionOnSelect
  },
  disclaimerWithLinks,
  fareDetailsLink,
  fetchFareDetailsJsonFn,
  flightCardIndex,
  flightPricingPage,
  getFlightSelectFarePagePlacementsFn,
  goBack,
  isPromoCodeApplied,
  isWebView,
  nextProductPageParams,
  params: { direction, paxType = PassengerTypes.ADULT },
  placements,
  productDefinitions,
  searchRequest,
  selectedCompanyName,
  selectedProducts,
  selectFlightProductFn,
  sortFlightProductsFn,
  sortStrategy,
  tier
}: FlightSelectFarePage) => {
  const { disclaimers } = productDefinitions;
  const { href: fareDetailsHREF, labelText: fareDetailsLabelText } = fareDetailsLink ?? {};

  const _onClickCancel = () => {
    goBack();
  };

  const _transitionToFareDetails = () => {
    fetchFareDetailsJsonFn(fareDetailsHREF, getNormalizedRoute({ routeName: 'fareDetails' }));
    raiseSatelliteEvent('fare details page');
  };

  const _getAccountInfo = () => ({
    name: `${get(accountInfo, 'customerInfo.name.firstName')} ${get(accountInfo, 'customerInfo.name.lastName')}`,
    points: formatCurrency(get(accountInfo, 'rapidRewardsDetails.redeemablePoints', 0)),
    tierStatus: TierTypes[get(accountInfo, 'rapidRewardsDetails.tierInfo.tier')]
  });

  const _fareSelected = (fareProduct: FareProduct) => {
    const fareProductId = get(fareProduct, '_meta.productId');
    const nextPaxType = nextProductPageParams?.paxType || PassengerTypes.ADULT;
    const nextDirection = get(nextProductPageParams, 'direction');
    const nextRoute = nextDirection === INBOUND
      ? 'flightShoppingReturn'
      : 'flightShoppingDepart';
    const nextProductPagePath = isEmpty(nextProductPageParams)
      ? null
      : buildPathWithParamAndQuery(getNormalizedRoute({ routeName: nextRoute }), {
        paxType: nextPaxType,
        direction: nextDirection
      });

    if (direction === INBOUND) {
      sortFlightProductsFn(sortStrategy, INBOUND, paxType);
    }

    selectFlightProductFn({
      selectedProducts,
      paxType,
      direction,
      fareProductId,
      nextProductPagePath,
      flightPricingPage,
      searchRequest,
      flightCardIndex,
      tier
    });
  };

  const renderFooter = () => (
    <div className="py5 bdt large">
      <a data-qa="fare-details-link" className="block pblue" onClick={_transitionToFareDetails}>
        {' '}
        {fareDetailsLabelText}
      </a>
    </div>
  );
  const { promoTop01, bottomPromo1 } = placements || {};

  useEffect(() => {
    getFlightSelectFarePagePlacementsFn(direction);
  }, [direction]);

  return (
    <div className="flight-select-fare--container">
      <PageHeaderWithButtons
        title={'Select Fare'}
        rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), className: 'cancel', onClick: _onClickCancel }]}
      />
      {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
      <FlightHeader
        arrivalTime={arrivalTime}
        departureTime={departureTime}
        flightNumbers={flightNumbers}
        isNextDay={isNextDayArrival}
        isOvernight={isOvernight}
        stopDescription={stopDescriptionOnSelect}
      />
      {promoTop01 && (
        <DynamicPlacement
          {...promoTop01}
          data-qa="promoTop01"
          isWebView={isWebView}
          additionalTemplateData={accountInfo && _getAccountInfo()}
        />
      )}
      <div className={'bgwhite pt4 px4 flight-select-fare--products-container'}>
        {disclaimerWithLinks && (
          <div className={'bgltblue px4 py4 mb5'} data-qa="disclaimerWithLinks">
            <ContentLink raw={disclaimerWithLinks} />
          </div>
        )}
        <FareProductList
          fares={fares}
          productDefinitions={productDefinitions}
          isPromoCodeApplied={isPromoCodeApplied}
          onFareSelected={_fareSelected}
        />
        {(fareDetailsHREF && fareDetailsLabelText) && renderFooter()}
      </div>
      {bottomPromo1 && <DynamicPlacement {...bottomPromo1} data-qa="bottomPromo1" isWebView={isWebView} />}
      <div className="white px4 py5 flight-select-fare--footnotes">
        <Footnotes footnotes={disclaimers} />
      </div>
    </div>
  );
};

export default SelectFare;
