// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import AirBookingShoppingSearchForm from 'src/airBooking/components/airBookingShoppingSearchForm';
import withQueryOverrideSearchRequest from 'src/airBooking/enhancers/withQueryOverrideSearchRequest';
import { getFirstShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import { getUserInfo, refreshCorporateInfo } from 'src/shared/actions/accountActions';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { viewTab } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { deleteUserInfo } from 'src/shared/cache/localStorageCache';
import Container from 'src/shared/components/container';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import PageHeader from 'src/shared/components/pageHeader';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { transformFromFormDataToSearchRequest } from 'src/shared/transformers/flightProductSearchRequestTransformer';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type {
  AirBookingShoppingSearchFormDataType,
  CorporateBookingSwitchInfo,
  CorporateInfo,
  FlightBoundMultiSelectSearchRequest,
  FlightProductSearchRequest,
  PassengerCountValue
} from 'src/airBooking/flow-typed/airBooking.types';
import type { AirportType, MultiSelectGroup, Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  MWEB_HOMEPAGE_REDESIGN: boolean,
  allAirports: Array<AirportType>,
  analyticsTrackViewTabFn: (string) => void,
  calendarScheduleMessage: string,
  corporateBookingSwitchInfo: ?CorporateBookingSwitchInfo,
  corporateInfo: ?CorporateInfo,
  fetchLocalSearchRequestsFn: () => void,
  footerLinkRows: Array<WcmFooterType>,
  getAirBookingIndexPagePlacementsFn: (*) => void,
  getLowFareCalendarFn: (search: FlightProductSearchRequest, path: ?string, isInitialSearch: boolean) => void,
  getUserInfoFn: () => void,
  isLoggedIn: boolean,
  isWebView: boolean,
  lastBookableDate: ?string,
  loadAirportsFn: () => void,
  loadRecentlySearchedFn: () => void,
  multiSelectGroup: MultiSelectGroup,
  passengerCountValue: PassengerCountValue,
  push: Push,
  recentlySearched: Array<AirportType>,
  refreshCorporateInfoFn: (boolean) => void,
  resetAirBookingFlowDataFn: () => void,
  resetSavedCreditCardsFn: () => void,
  savePassengerCountFn: ({ adultCount: number, lapChildCount: number, valueUpdated?: boolean }) => void,
  saveSearchRequestFn: (FlightProductSearchRequest) => void,
  searchForFlightsFn: ({ searchRequest: FlightProductSearchRequest, nextPagePath?: string }) => void,
  searchForMultiSelectGroupFlightsFn: ({
    nextPagePath?: string,
    searchRequest: FlightBoundMultiSelectSearchRequest
  }) => void,
  searchRequest: FlightProductSearchRequest,
  updateFormDataValueFn: (string, *) => {},
  updateFormFieldDataValueFn: (string, string, *) => void,
  updateSelectedAirportInfoFn: (airportInfo: *) => void,
  airBookingIndexPagePlacements: { promoBanner: DynamicPlacementResponse, lowFareWithChildren: DynamicPlacementResponse }
};

export const ShoppingLandingPage = ({
  MWEB_HOMEPAGE_REDESIGN,
  allAirports,
  analyticsTrackViewTabFn,
  calendarScheduleMessage,
  corporateBookingSwitchInfo,
  corporateInfo,
  fetchLocalSearchRequestsFn,
  airBookingIndexPagePlacements,
  footerLinkRows,
  getAirBookingIndexPagePlacementsFn,
  getLowFareCalendarFn,
  getUserInfoFn,
  isLoggedIn,
  isWebView,
  lastBookableDate,
  loadAirportsFn,
  loadRecentlySearchedFn,
  multiSelectGroup,
  passengerCountValue,
  push,
  recentlySearched,
  refreshCorporateInfoFn,
  resetAirBookingFlowDataFn,
  resetSavedCreditCardsFn,
  savePassengerCountFn,
  saveSearchRequestFn,
  searchForFlightsFn,
  searchForMultiSelectGroupFlightsFn,
  searchRequest,
  updateFormDataValueFn,
  updateFormFieldDataValueFn,
  updateSelectedAirportInfoFn
}: Props) => {
  const { promoBanner, lowFareWithChildren } = airBookingIndexPagePlacements || {};

  useEffect(() => {
    if (!passengerCountValue?.valueUpdated) {
      savePassengerCountFn({
        adultCount: searchRequest.adultPassengersCount ?? 1,
        lapChildCount: searchRequest.lapInfantPassengersCount ?? 0,
        valueUpdated: true
      });
    }

    getAirBookingIndexPagePlacementsFn();
    fetchLocalSearchRequestsFn();
    loadAirportsFn();
    loadRecentlySearchedFn();
    refreshCorporateInfoFn(true);

    if (_shouldUpdateUserInfo()) {
      deleteUserInfo();
      getUserInfoFn();
    }
  }, []);

  const _shouldUpdateUserInfo = () => {
    const activeCompanyIdAssociations = _.get(corporateInfo, 'activeCompanyIdAssociations');

    return (
      _hasCorporateSwitchInfo() &&
      dayjs().isAfter(_.get(corporateInfo, 'expirationDate')) &&
      (_.isUndefined(activeCompanyIdAssociations) || activeCompanyIdAssociations.length !== 0)
    );
  };

  const _hasCorporateSwitchInfo = () => isLoggedIn && !_.isEmpty(corporateBookingSwitchInfo);

  const _onSearchFlightSubmit = (formData: AirBookingShoppingSearchFormDataType) => {
    const { lapChildCount = 0, adultCount = 1, valueUpdated = false } = passengerCountValue || {};
    const searchRequestFromFormData = transformFromFormDataToSearchRequest({
      ...formData,
      numberOfLapInfants: lapChildCount,
      numberOfAdults: adultCount
    });

    if (valueUpdated === false) {
      updateFormFieldDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, 'numberOfLapInfants', lapChildCount);
      updateFormFieldDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, 'numberOfAdults', adultCount);
      savePassengerCountFn({ adultCount: adultCount, lapChildCount: lapChildCount, valueUpdated: true });
    }
    updateFormFieldDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, 'departureAndReturnDate', {
      departureDate: searchRequestFromFormData.departureDate,
      returnDate: searchRequestFromFormData.returnDate,
      isDateChanged: true
    });
    resetAirBookingFlowDataFn();
    resetSavedCreditCardsFn();

    const path = formData.useLowFareCalendar
      ? getNormalizedRoute({ routeName: 'lowFareCalendar' })
      : getNormalizedRoute({ routeName: 'flightShoppingDepart' });
    const nextPagePath = buildPathWithParamAndQuery(path, getFirstShoppingPageParams());

    if (formData.useLowFareCalendar) {
      getLowFareCalendarFn(searchRequestFromFormData, nextPagePath, true);
    } else if (multiSelectGroup?.isSelected) {
      searchForMultiSelectGroupFlightsFn({ nextPagePath, multiSelectGroup, searchRequest: searchRequestFromFormData });
    } else {
      searchForFlightsFn({ searchRequest: searchRequestFromFormData, nextPagePath });
    }
  };

  const _handleDestinationAirportClick = () => {
    raiseSatelliteEvent('squid', { pagedescription: 'click:Select To Airport' });
  };

  const _goToSelectPassengerPage = () => {
    push(getNormalizedRoute({ routeName: 'selectPassengers' }));
  };

  return (
    <div>
      <PageHeader noBottomPadding>
        {i18n('AIR_BOOKING__SEARCH_FLIGHTS__TITLE')}
        <Link
          className="right white regular page-header--right-button"
          to={getNormalizedRoute({ routeName: 'recent' })}
        >
          {i18n('AIR_BOOKING__SEARCH_FLIGHTS__RECENT')}
        </Link>
      </PageHeader>
      {promoBanner && (
        <DynamicPlacement
          {...promoBanner}
          additionalTemplateData={accountRedeemablePoints}
          data-qa="promoBanner"
          isWebView={isWebView}
        />
      )}
      <Container>
        <AirBookingShoppingSearchForm
          allAirports={allAirports}
          analyticsTrackViewTabFn={analyticsTrackViewTabFn}
          calendarScheduleMessage={calendarScheduleMessage}
          corporateBookingSwitchInfo={corporateBookingSwitchInfo}
          formId={AIR_BOOKING_SHOPPING_SEARCH_FORM}
          isLoggedIn={isLoggedIn}
          isMultiSelectGroupEnabled={true}
          isWebView={isWebView}
          lastBookableDate={lastBookableDate}
          multiSelectGroup={multiSelectGroup}
          MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
          onDestinationSelectorClicked={_handleDestinationAirportClick}
          onSelectPassengerClicked={_goToSelectPassengerPage}
          onSubmit={_onSearchFlightSubmit}
          onUnmount={saveSearchRequestFn}
          passengerCountValue={passengerCountValue}
          recentlySearched={recentlySearched}
          searchRequest={searchRequest}
          updateFormDataValueFn={updateFormDataValueFn}
          updateFormFieldFn={updateFormFieldDataValueFn}
          updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
        />
      </Container>
      {lowFareWithChildren && (
        <DynamicPlacement
          {...lowFareWithChildren}
          data-qa="lowFareWithChildren"
          isWebView={isWebView}
        />
      )}
      {!isWebView && <PageFooterWcmSourced className="book-flight--page-footer" footerLinkRows={footerLinkRows} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  airBookingIndexPagePlacements: _.get(state, 'app.airBooking.airBookingIndexPagePlacements'),
  allAirports: _.get(state, 'app.airports.allAirports'),
  calendarScheduleMessage: _.get(state, 'app.calendarScheduleMessage', null),
  corporateBookingSwitchInfo: _.get(state, 'app.airBooking.corporateBookingSwitchInfo', null),
  corporateInfo: _.get(state, 'app.account.corporateInfo'),
  footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isWebView: _.get(state, 'app.webView.isWebView'),
  lastBookableDate: state.app.lastBookableDate,
  multiSelectGroup: _.get(state, `app.airports.multiSelectGroup`),
  MWEB_HOMEPAGE_REDESIGN: _.get(state, 'app.toggles.MWEB_HOMEPAGE_REDESIGN', false),
  passengerCountValue: _.get(state, 'app.airBooking.savePassengerCount'),
  recentlySearched: _.get(state, 'app.airports.recentlySearched'),
  searchRequest: state.app.airBooking.searchRequest
});

const mapDispatchToProps = {
  analyticsTrackViewTabFn: viewTab,
  fetchLocalSearchRequestsFn: AirBookingActions.getRecentSearchForLocalStorage,
  getAirBookingIndexPagePlacementsFn: AirBookingActions.getAirBookingIndexPagePlacements,
  getLowFareCalendarFn: AirBookingActions.getLowFareCalendar,
  getUserInfoFn: getUserInfo,
  loadAirportsFn: AirportsActions.loadAirports,
  loadRecentlySearchedFn: AirportsActions.loadRecentlySearched,
  refreshCorporateInfoFn: refreshCorporateInfo,
  resetAirBookingFlowDataFn: AirBookingActions.resetAirBookingFlowData,
  resetSavedCreditCardsFn: CreditCardActions.resetSavedCreditCards,
  savePassengerCountFn: AirBookingActions.savePassengerCount,
  saveSearchRequestFn: AirBookingActions.saveSearchRequest,
  searchForFlightsFn: AirBookingActions.searchForFlights,
  searchForMultiSelectGroupFlightsFn: AirBookingActions.searchForMultiSelectGroupFlights,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  updateFormFieldDataValueFn: FormDataActions.updateFormFieldDataValue,
  updateSelectedAirportInfoFn: AirportInfoActions.updateSelectedAirportInfo
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withFeatureToggles,
  withBodyClass('booking-flight'),
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withQueryOverrideSearchRequest
);

export default enhancers(ShoppingLandingPage);
