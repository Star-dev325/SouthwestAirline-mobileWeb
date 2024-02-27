// @flow
import { useGeolocation } from '@swa-ui/geolocation';
import pluralize from 'pluralize';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';
import * as HomePageActions from 'src/homeAndNav/actions/homepageActions';
import HomeBanner from 'src/homeAndNav/components/homeBanner';
import HomeHero from 'src/homeAndNav/components/homeHero';
import HomeNavGrid from 'src/homeAndNav/components/homeNavGrid';
import HomeNavList from 'src/homeAndNav/components/homeNavList';
import InFlightEntertainmentMenu from 'src/homeAndNav/components/inFlightEntertainmentMenu';
import LoginBanner from 'src/homeAndNav/components/loginBanner';
import TravelAdvisoryNavItem from 'src/homeAndNav/components/travelAdvisoryNavItem';
import UserPreferName from 'src/homeAndNav/components/userPreferName';
import NavDrawerConstants from 'src/homeAndNav/constants/navDrawerConstants';
import { setTripTypeForDetailsPage } from 'src/myAccount/actions/myAccountActions';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';
import { CAR, FLIGHT } from 'src/myAccount/constants/upcomingTripType';
import { getCarRetrieveReservationInfoFromTrip } from 'src/myAccount/helpers/upcomingTripsHelper';
import { fetchUpcomingTripsNonBlocking } from 'src/shared/actions/sharedActions';
import { updateChaseAnalyticsCodes } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import PageHeader from 'src/shared/components/pageHeader';
import { COOKIES } from 'src/shared/constants/webViewConstants';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import BrowserObject from 'src/shared/helpers/browserObject';
import { flowRight, get } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import * as TravelAdvisoryActions from 'src/travelAdvisory/actions/travelAdvisoryActions';
import { clearFlightReservation, retrieveCarReservation } from 'src/viewReservation/actions/viewReservationActions';
import { retrieveHomepagePromotions } from 'src/wcm/actions/wcmActions';

import type { HomePagePromotion, TravelAdvisory, Trip } from 'src/homeAndNav/flow-typed/homeAndNav.types';
import type { ChaseCodes, Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';
import type {
  CarReservationType,
  RetrieveReservationRequestType
} from 'src/viewReservation/flow-typed/viewReservation.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { window } = BrowserObject;
const { ANDROID_URL, IOS_URL } = NavDrawerConstants;

type Props = {
  clearFlightReservationFn: () => void,
  clearUpcomingTripsCountFn: () => void,
  footerLinkRows: Array<WcmFooterType>,
  getAccountUpcomingTripsFn: () => void,
  getTravelAdvisoriesFn: () => *,
  handleFirmOfferOfCreditFn: () => void,
  heroContents: Array<DynamicPlacementResponse>,
  homeBanners: Array<DynamicPlacementResponse>,
  homePagePromotions: Array<HomePagePromotion>,
  isLoggedIn: boolean,
  isWebView: boolean,
  loadHomepagePlacementsFn: (location?: string) => void,
  loginBanner: DynamicPlacementResponse,
  name: string,
  push: Push,
  resetHeroContentsFn: () => void,
  retrieveCarReservationFn: (retrieveReservationRequest: RetrieveReservationRequestType) => Promise<CarReservationType>,
  retrieveHomepagePromotionsFn: () => void,
  setTripTypeForDetailsPageFn: (string) => void,
  travelAdvisories: Array<TravelAdvisory>,
  trip: Trip | null,
  upcomingTripsCount: number,
  updateChaseAnalyticsCodesFn: (codes: ChaseCodes) => void
};

type OnNavListNavItem = { link_type: string, target: string };

export const Homepage = (props: Props) => {
  const {
    clearUpcomingTripsCountFn,
    getTravelAdvisoriesFn,
    handleFirmOfferOfCreditFn,
    loadHomepagePlacementsFn,
    resetHeroContentsFn,
    retrieveHomepagePromotionsFn,
    updateChaseAnalyticsCodesFn,
    footerLinkRows,
    heroContents,
    homeBanners,
    homePagePromotions,
    isLoggedIn,
    isWebView,
    name,
    loginBanner,
    push,
    travelAdvisories,
    upcomingTripsCount
  } = props;

  const geolocation = useGeolocation();
  const ref = useRef();

  useEffect(() => {
    const station = get(geolocation, 'nearestStation', '');
    
    retrieveHomepagePromotionsFn();
    loadHomepagePlacementsFn(station);
    getTravelAdvisoriesFn();

    return () => {
      clearUpcomingTripsCountFn();
      updateChaseAnalyticsCodesFn(DEFAULT_OFFERS);
      resetHeroContentsFn();
    };
  }, []);

  useEffect(() => {
    const station = get(geolocation, 'nearestStation', '');

    if (ref.current && ref.current !== isLoggedIn) {
      loadHomepagePlacementsFn(station);
    }
    ref.current = isLoggedIn;
  }, [ref.current !== isLoggedIn]);
  
  const showTravelAdvisory = () => {
    travelAdvisories.length === 1
      ? push(buildPathWithParamAndQuery('/travel-advisories/:number', { number: 0 }))
      : push('/travel-advisories');
  };

  const onNavGridItemClick = (toPath: string, isExternalPath: boolean) => {
    isExternalPath ? window.open(toPath, '_self') : push(toPath || '/');
  };

  const onNavListItemClick = (navData: OnNavListNavItem) => {
    const isGetTheAppLinkTargetValue = navData.target === ANDROID_URL || navData.target === IOS_URL;

    if (isGetTheAppLinkTargetValue) {
      raiseSatelliteEvent('squid', { pagedescription: 'link:get the app' });
    }

    wcmTransitionTo(navData);
  };

  const toUpcomingTripDetailPage = () => {
    const { trip, setTripTypeForDetailsPageFn, clearFlightReservationFn, retrieveCarReservationFn } = props;
    const tripType = get(trip, 'tripType', '');

    setTripTypeForDetailsPageFn(tripType);

    if (trip && tripType === FLIGHT) {
      clearFlightReservationFn();
      goToTripDetails();
    } else if (trip && tripType === CAR) {
      const request = getCarRetrieveReservationInfoFromTrip(trip);

      retrieveCarReservationFn(request).then(() => {
        goToTripDetails();
      });
    }
  };

  const goToTripDetails = () => {
    const { trip } = props;
    let name;
    let recordLocator;

    if (trip && trip.tripType === FLIGHT) {
      const firstName = get(trip, '_links.viewReservationViewPage.query.first-name');
      const lastName = get(trip, '_links.viewReservationViewPage.query.last-name');
      const confirmationNumber = get(trip, 'confirmationNumber');

      name = { firstName, lastName };
      recordLocator = { recordLocator: confirmationNumber };
    }

    push(
      buildPathWithParamAndQuery('/my-account/upcoming-trip-details/:tripIndex', { tripIndex: 0 }, recordLocator),
      null,
      null,
      name
    );
  };

  const onUpcomingTripsClick = () => {
    upcomingTripsCount === 1 ? toUpcomingTripDetailPage() : push('/my-account/upcoming-trips');
  };
  const shouldShowLoginBanner = loginBanner && Cookie.getValue(COOKIES.SHOW_LOGIN_BANNER) === 'true';
  const shouldShowTravelAdvisories = travelAdvisories && travelAdvisories.length >= 1;
  const isInflightWifi = get(window, 'swa.inflight', false);

  return (
    <div>
      <PageHeader hidden={!isLoggedIn || !name} className="account-bar">
        <div className="user-prefer-name-col">
          <UserPreferName isLoggedIn={isLoggedIn} name={name} />
        </div>
        <div className="upcoming-trips-link-col">
          <MyAccountNavItem onClick={onUpcomingTripsClick}>
            <i className="bold">{upcomingTripsCount ? upcomingTripsCount : ''}</i>{' '}
            {pluralize('Upcoming Trip', upcomingTripsCount)}
          </MyAccountNavItem>
        </div>
      </PageHeader>
      { shouldShowLoginBanner && <LoginBanner content={loginBanner.content} /> }
      {isInflightWifi && <InFlightEntertainmentMenu />}
      <HomeBanner handleFirmOfferOfCreditFn={handleFirmOfferOfCreditFn} homeBanners={homeBanners} />
      <HomeHero handleFirmOfferOfCreditFn={handleFirmOfferOfCreditFn} heroContents={heroContents} />
      {shouldShowTravelAdvisories && (
        <TravelAdvisoryNavItem travelAdvisories={travelAdvisories} onClick={showTravelAdvisory} />
      )}
      <HomeNavGrid onNavGridItemClick={onNavGridItemClick} />
      {homePagePromotions.length > 0 && (
        <HomeNavList homepagePromotions={homePagePromotions} onNavListItemClick={onNavListItemClick} />
      )}
      {!isWebView && <PageFooterWcmSourced footerLinkRows={footerLinkRows} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.app.homeAndNav.homePage,
  footerLinkRows: get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
  homePagePromotions: get(state, 'app.wcmContent.homepagePromotions.homepage_promotions_mobile', []),
  isLoggedIn: get(state, 'app.account.isLoggedIn', false),
  isWebView: get(state, 'app.webView.isWebView'),
  name: get(state, 'app.account.accountInfo.customerInfo.name.userName', ''),
  travelAdvisories: get(state, 'app.travelAdvisory.messageTravelAdvisory', [])
});

const mapDispatchToProps = {
  clearFlightReservationFn: clearFlightReservation,
  clearUpcomingTripsCountFn: HomePageActions.clearUpcomingTripsCount,
  getAccountUpcomingTripsFn: fetchUpcomingTripsNonBlocking,
  getTravelAdvisoriesFn: TravelAdvisoryActions.getTravelAdvisories,
  handleFirmOfferOfCreditFn: ChaseActions.handleFirmOfferOfCredit,
  loadHomepagePlacementsFn: HomePageActions.loadHomepagePlacements,
  resetHeroContentsFn: HomePageActions.resetHeroContents,
  retrieveCarReservationFn: retrieveCarReservation,
  retrieveHomepagePromotionsFn: retrieveHomepagePromotions,
  setTripTypeForDetailsPageFn: setTripTypeForDetailsPage,
  updateChaseAnalyticsCodesFn: updateChaseAnalyticsCodes
};

const EnhancedHomepage = flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps))(Homepage);

export default EnhancedHomepage;