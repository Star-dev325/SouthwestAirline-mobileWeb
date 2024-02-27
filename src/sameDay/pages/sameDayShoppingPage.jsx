// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CurrentReservation from 'src/airChange/components/currentReservation';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import { getShowStandbyDialogOptions } from 'src/sameDay/helpers/sameDayModalHelper';
import { getShowSortFilterDialogOptions } from 'src/sameDay/helpers/sameDayShoppingSortFilterHelper';
import { getShoppingInformationWithSortedAndFilteredCards } from 'src/sameDay/selectors/sameDayShoppingSelectors';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import FlightProduct from 'src/shared/components/flightProduct';
import { FlightProductDrop } from 'src/shared/components/flightProductDrop';
import Icon from 'src/shared/components/icon';
import ShoppingAirStationsOverview from 'src/shared/components/shoppingAirStationsOverview';
import SubHeader from 'src/shared/components/subHeader';
import { getIconType } from 'src/shared/constants/iconConstants';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { get } from 'src/shared/helpers/jsUtils';
import { updateQueryStringParameter } from 'src/shared/helpers/urlHelper';

import type { SameDayShoppingInformation, ShoppingDisclaimer } from 'src/sameDay/flow-typed/sameDay.types';
import type {
  FlightDetailsResponse,
  FlightProductCard,
  Replace,
  SameDayFlightDetailsRequest
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { FlightRetrieveRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  applySameDayShoppingPageSortFilterFn: *,
  hideDialogFn: (*) => Promise<*>,
  isWebView: boolean,
  passengerSearchToken: string,
  replace: Replace,
  retrieveSameDayFlightDetailsInformationFn: (
    sameDayFlightDetailsRequest: SameDayFlightDetailsRequest
  ) => Promise<FlightDetailsResponse>,
  retrieveSameDayPricingDetailsInformationFn: *,
  sameDayFlightDetails: FlightDetailsResponse,
  sameDayShoppingInformation: SameDayShoppingInformation,
  sameDayShoppingPageSortFilterFormData: FormData,
  sameDaySortFilteredCards: [],
  saveChangeFlowFn: (changeFlow: boolean) => void,
  selectFareFn: (productCard: FlightProductCard, changeFlow: boolean) => void,
  showDialogFn: (*) => Promise<*>,
  viewReservationSearchRequest: FlightRetrieveRequestType
};

export const SameDayShoppingPage = ({
  applySameDayShoppingPageSortFilterFn,
  hideDialogFn,
  isWebView,
  passengerSearchToken,
  replace,
  retrieveSameDayFlightDetailsInformationFn,
  retrieveSameDayPricingDetailsInformationFn,
  sameDayFlightDetails,
  sameDayShoppingInformation,
  sameDaySortFilteredCards,
  saveChangeFlowFn,
  selectFareFn,
  showDialogFn,
  viewReservationSearchRequest
}: Props) => {
  const {
    _links,
    _meta,
    confirmBaggageMessage,
    currentReservation,
    expandedDetails,
    header,
    shoppingDisclaimers = [],
    standbyBaggageMessage,
    standbyListFAQs
  } = sameDayShoppingInformation;
  const { allFlightsFilteredOutText } = expandedDetails;
  const { originAirport, destinationAirport, flightType } = header;
  const { linkSuffixClickableText, modalDetails } = standbyListFAQs || {};

  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    saveChangeFlowFn(false);
  }, []);

  const _onProductSelected = (index, productCard) => {
    const { _links } = productCard;

    if (!expandedCards[index]) {
      retrieveSameDayFlightDetailsInformationFn(_links.sameDayFlightDetails).then(() => {
        setExpandedCards((prevState) => ({
          ...prevState,
          [index]: true
        }));
      });
    }
  };

  const _handleConfirmBaggageMessage = (productCard, isChangeFlow) => {
    const {
      _links: { sameDayPricing = {} }
    } = sameDayShoppingInformation;
    const {
      _meta: { standbyProductId = '' }
    } = productCard;

    {
      isChangeFlow
        ? goToSelectedFarePage(productCard, isChangeFlow)
        : retrieveSameDayPricingDetailsInformationFn({
          ...sameDayPricing,
          ...{ body: { ...sameDayPricing.body, productId: standbyProductId } }
        });
    }
  };

  const _onListForStandbyClick = (productCard: FlightProductCard, isChangeFlow: boolean) => {
    if (confirmBaggageMessage === null) {
      _handleConfirmBaggageMessage(productCard, isChangeFlow);
    } else {
      raiseSatelliteEvent('squid', { page_description: 'modal: baggage display' });
      showDialogFn({
        name: 'standbyCheckedBaggage',
        title: confirmBaggageMessage?.header,
        message: confirmBaggageMessage?.body,
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: hideDialogFn
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                _handleConfirmBaggageMessage(productCard, isChangeFlow);
              });
            }
          }
        ]
      });
    }
  };

  const goToSelectedFarePage = (productCard, isChangeFlow) => {
    selectFareFn(productCard, isChangeFlow);
  };

  const _renderShoppingDisclaimer = (shoppingDisclaimer: ShoppingDisclaimer, index: number) => {
    const { icon, label } = shoppingDisclaimer;

    return (
      <div key={icon + index} className="same-day-shopping-page--disclaimers-container" data-qa="shoppingDisclaimers">
        {icon && (
          <Icon
            className="same-day-shopping-page--disclaimers-container_icon"
            data-qa={icon}
            type={getIconType(icon)}
          />
        )}
        {label && <div className="same-day-shopping-page--disclaimers-container_label">{label}</div>}
      </div>
    );
  };

  const _renderStandbyListFAQ = () => {
    const _handleOnSuffixTextClick = () => {
      raiseSatelliteEvent('squid', { page_description: 'modal: sdc/sb view standby faqs' });

      const onButtonClick = (button: any) => {
        const buttonAction = button?.action;

        if (buttonAction.type === 'LINK') {
          const link = updateQueryStringParameter(buttonAction.value, 'clk', 'STNDBY_FAQ_MODAL');

          hideDialogFn().then(() => {
            window.open(link, '_blank');
          });
        } else if (buttonAction.type === 'DISMISS') {
          hideDialogFn();
        }
      };

      showDialogFn(getShowStandbyDialogOptions(modalDetails, onButtonClick));
    };

    return (
      <div className="same-day-shopping-page--standby-faq-link">
        {linkSuffixClickableText && (
          <a
            className="same-day-shopping-page--standby-faq-link_suffix-text"
            onClick={_handleOnSuffixTextClick}
            role="button"
          >
            {linkSuffixClickableText}
          </a>
        )}
      </div>
    );
  };

  const _renderSortFilterButton = () => {
    const _handleOnSortFilterButtonClick = () => {
      raiseSatelliteEvent('squid', { page_description: 'modal: sdc/sb sort filter' });

      showDialogFn(getShowSortFilterDialogOptions(_handleApplySortFilter, hideDialogFn));
    };

    return (
      <div className="same-day-shopping-page--sort-filter-button">
        <a
          className="same-day-shopping-page--sort-filter-button-text"
          onClick={_handleOnSortFilterButtonClick}
          role="button"
        >
          {i18n('SAME_DAY_SORT_FILTER_BUTTON')}
        </a>
        <Icon className="same-day-shopping-page--sort-filter-button-icon" type="sortFilter" />
      </div>
    );
  };

  const _handleApplySortFilter = () => {
    setExpandedCards({});
    applySameDayShoppingPageSortFilterFn();
    hideDialogFn();
  };

  return (
    <div className="same-day-shopping-page">
      <SubHeader title={i18n('SELECT_SAME_DAY_FLIGHT')} />
      {originAirport && destinationAirport && (
        <ShoppingAirStationsOverview
          destinationAirport={destinationAirport}
          isOutbound={flightType === 'Departure'}
          originAirport={originAirport}
        />
      )}
      <div className="px4">
        <CurrentReservation currentReservation={currentReservation} />
      </div>
      {shoppingDisclaimers?.length && shoppingDisclaimers.map(_renderShoppingDisclaimer)}
      {standbyListFAQs && _renderStandbyListFAQ()}
      <div className="same-day-shopping-page--products-container">
        <div className="flight-list-text" data-qa="please-choose">
          <div>{i18n('SAME_DAY_PLEASE_CHOOSE')}</div>
          {_renderSortFilterButton()}
        </div>
        {sameDaySortFilteredCards?.length !== 0 &&
          _.map(sameDaySortFilteredCards, (productCard, index: number) => (
            <div key={productCard.flightNumbers + index} className="same-day-shopping-page--product-card">
              <FlightProduct
                flightProductCard={productCard}
                isExpand={expandedCards[index]}
                isSameDay
                onProductSelected={() => _onProductSelected(index, productCard)}
              />
              {expandedCards[index] && (
                <FlightProductDrop
                  expandedDetails={expandedDetails}
                  flightDetailsResponse={sameDayFlightDetails}
                  flightIdentifier={productCard._links.sameDayFlightDetails.body.flightIdentifier}
                  hideDialogFn={hideDialogFn}
                  isWebView={isWebView}
                  onListForStandbyClick={(isChangeFlow) => _onListForStandbyClick(productCard, isChangeFlow)}
                  passengerSearchToken={passengerSearchToken}
                  productCard={productCard}
                  purchaseWithPoints={_meta?.purchaseWithPoints}
                  replace={replace}
                  showDialogFn={showDialogFn}
                  standbyBaggageMessage={standbyBaggageMessage}
                  viewReservationPageRequest={_links?.viewReservationViewPage}
                  viewReservationSearchRequest={viewReservationSearchRequest}
                />
              )}
            </div>
          ))}
        {sameDaySortFilteredCards?.length === 0 && (
          <div className="same-day-shopping-page--all-flights-filtered-out-text">{allFlightsFilteredOutText}</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWebView: state.app.webView?.isWebView,
  sameDayFlightDetails: get(state, 'app.sameDay.sameDayShoppingPage.sameDayFlightDetails', {}),
  sameDayShoppingInformation: get(state, 'app.sameDay.sameDayShoppingPage.sameDayShoppingInformation', {}),
  sameDayShoppingPageSortFilterFormData: get(state, 'app.formData.sameDayShoppingSortFilterForm.data'),
  sameDaySortFilteredCards: getShoppingInformationWithSortedAndFilteredCards(state),
  viewReservationSearchRequest: state.app?.viewReservation?.searchRequest,
  passengerSearchToken: state.app?.viewReservation?.viewForSameDayPage?.passengerSearchToken
});

const mapDispatchToProps = {
  applySameDayShoppingPageSortFilterFn: sameDayActions.applySameDayShoppingPageSortFilter,
  hideDialogFn: hideDialog,
  retrieveSameDayFlightDetailsInformationFn: sameDayActions.retrieveSameDayFlightDetailsInformation,
  retrieveSameDayPricingDetailsInformationFn: sameDayActions.retrieveSameDayPricingDetailsInformation,
  saveChangeFlowFn: sameDayActions.saveChangeFlow,
  selectFareFn: sameDayActions.selectFare,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('same-day-shopping-page')
);

export default enhancers(SameDayShoppingPage);
