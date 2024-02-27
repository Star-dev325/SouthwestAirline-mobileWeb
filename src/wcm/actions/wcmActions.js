// @flow
import i18n from '@swa-ui/locale';
import { push } from 'connected-react-router';
import dayjs from 'dayjs';
import _ from 'lodash';
import { appendParamsIfChaseUrl } from 'src/airBooking/helpers/amcvCookieHelper';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';
import { updateActiveLinkIndex } from 'src/homeAndNav/actions/menuListActions';
import { wcmMenuListDataTransformer } from 'src/homeAndNav/transformers/menuDataTransformers';
import { transformPromoBannerContentToPromotion } from 'src/rapidRewards/transformers/promoBannersTransformer';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { updateContentBlockIds } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as WcmApi from 'src/shared/api/wcmApi';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import { CHANNEL, PAGE_ID_FOOTER, PAGE_ID_HAMBURGER_MENU } from 'src/shared/constants/requestParameter';
import SharedConstants from 'src/shared/constants/sharedConstants';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import BrowserObject from 'src/shared/helpers/browserObject';
import { get } from 'src/shared/helpers/jsUtils';
import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedPageId, isOnOldRoute, removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import { chasePromoClicked } from 'src/shared/helpers/webViewHelper';
import wcmActionsTypes, { apiActionCreator } from 'src/wcm/actions/wcmActionsTypes';
import WcmConfigConstants from 'src/wcm/constants/wcmConfig';

import type { QueryParameter } from 'src/shared/api/contentDeliveryApi';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import type { LinkType } from 'src/shared/flow-typed/wcmLink.types';
import type { WcmContentResponse } from 'src/wcm/flow-typed/wcm.types';

const { GLOBAL_NAV_PROMO1_MBOX_ID, GLOBAL_NAV_TOP_MBOX_ID } = AdobeTargetConstants;
const { window } = BrowserObject;
const { HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE } = homeAndNavActionTypes;
const { WCM__FETCH_HOME_NAV_MENU, WCM__FETCH_FARE_DETAILS, WCM__FETCH_FOOTER } = wcmActionsTypes;
const {
  aboutRapidRewards,
  applicationProperties,
  atTheAirport,
  baggageRestrictions,
  bookingTeaser,
  boardingThePlane,
  cancellationPolicy,
  carLimitOfLiability,
  carriageContract,
  carVendorImages,
  checkinAndRefund,
  contactUs,
  earlyBirdBanner,
  earlyBirdIntroduction,
  exclusivePromotionInfo,
  fareRules,
  fareRulesForFareType,
  flyingSouthwest,
  formsOfPayment,
  hazardousMaterials,
  homepagePromotions,
  inTheAir,
  learnMoreSwabiz,
  learnMoreSwabizNotAssociated,
  privacyPolicy,
  rapidRewardsInfo,
  rapidRewardsPromotions,
  specialAssistance,
  standbyPolicies,
  taxesAndFees,
  termsAndConditions,
  tierBenefits,
  travelFundsTermsConditions,
  youngTravelerParentConsent
} = WcmConfigConstants;

const { DATA_CHANNEL } = SharedConstants;

type wcmConfigType = {
  actionType: string,
  closeWindow?: boolean,
  isSpinnerNeeded?: boolean,
  queryParams?: QueryParameter,
  shouldShowAlert?: boolean,
  wcmPath?: string
};

export const getFormattedActions = (actionType: string, options: { isSpinnerNeeded?: boolean }) => {
  const actions = apiActionCreator(actionType, options);
  const formattedActions = {};

  _.forIn(actions, (action, key: string) => {
    if (key.includes('Success')) {
      formattedActions.fetchSuccess = action;
    } else if (key.includes('Failed')) {
      formattedActions.fetchFailed = action;
    } else {
      formattedActions.fetchBegin = action;
    }
  });

  return formattedActions;
};

export const retrieveApplicationProperties = () => (dispatch: *) => dispatch(getWCMContent(applicationProperties));

export const retrieveCarVendorImages = (isSpinnerNeeded?: boolean) => (dispatch: *) => {
  !_.isUndefined(isSpinnerNeeded) && (carVendorImages.isSpinnerNeeded = isSpinnerNeeded);

  return dispatch(getWCMContent(carVendorImages));
};

export const retrieveTaxesAndFees = () => (dispatch: *) => dispatch(getWCMContent(taxesAndFees));

export const retrieveHazardousMaterials = () => (dispatch: *) => dispatch(getWCMContent(hazardousMaterials));

export const retrieveBaggageRestrictions = () => (dispatch: *) => dispatch(getWCMContent(baggageRestrictions));

export const retrieveFareRules = () => (dispatch: *) => dispatch(getWCMContent(fareRules));

export const retrievePrivacyPolicy = () => (dispatch: *) => dispatch(getWCMContent(privacyPolicy));

export const retrieveTermsAndConditions = () => (dispatch: *) => dispatch(getWCMContent(termsAndConditions));

export const retrieveFormsOfPayment = () => (dispatch: *) => dispatch(getWCMContent(formsOfPayment));

export const retrieveCancellationPolicy = () => (dispatch: *) => dispatch(getWCMContent(cancellationPolicy));

export const retrieveCarriageContract = () => (dispatch: *) => dispatch(getWCMContent(carriageContract));

export const retrieveCheckinAndRefund = () => (dispatch: *) => dispatch(getWCMContent(checkinAndRefund));

export const retrieveCarLimitOfLiability = () => (dispatch: *) => dispatch(getWCMContent(carLimitOfLiability));

export const retrieveStandbyPolicies = () => (dispatch: *) => dispatch(getWCMContent(standbyPolicies));

export const retrieveEarlyBirdIntroduction = () => (dispatch: *) => dispatch(getWCMContent(earlyBirdIntroduction));

export const retrieveFareRulesForFareType = (fareType: string) => (dispatch: *) => {
  if (!fareRulesForFareType.wcmPath.includes('.json')) {
    fareRulesForFareType.wcmPath = `${fareRulesForFareType.wcmPath}${fareType}_fare.json`;
  }

  return dispatch(getWCMContent(fareRulesForFareType));
};

export const retrieveInTheAir = () => (dispatch: *) => dispatch(getWCMContent(inTheAir));

export const retrieveFlyingSouthwest = () => (dispatch: *) => dispatch(getWCMContent(flyingSouthwest));

export const retrieveAtTheAirport = () => (dispatch: *) => dispatch(getWCMContent(atTheAirport));

export const retrieveBoardingThePlane = () => (dispatch: *) => dispatch(getWCMContent(boardingThePlane));

export const retrieveAboutRapidRewards = () => (dispatch: *) => dispatch(getWCMContent(aboutRapidRewards));

export const retrieveContactUs = () => (dispatch: *) => dispatch(getWCMContent(contactUs));

export const retrieveTierBenefits = () => (dispatch: *) => dispatch(getWCMContent(tierBenefits));

export const retrieveLearnMoreSwabiz = () => (dispatch: *) => dispatch(getWCMContent(learnMoreSwabiz));

export const retrieveLearnMoreSwabizNotAssociated = () => (dispatch: *) =>
  dispatch(getWCMContent(learnMoreSwabizNotAssociated));

export const retrieveEarlyBirdBanner = () => (dispatch: *) => dispatch(getWCMContent(earlyBirdBanner));

export const retrieveSpecialAssistance = () => (dispatch: *) => dispatch(getWCMContent(specialAssistance));

export const retrieveTravelFundsTermsConditions = () => (dispatch: *) =>
  dispatch(getWCMContent(travelFundsTermsConditions));

export const retrieveBookingTeaser = () => (dispatch: *) => dispatch(getWCMContent(bookingTeaser));

export const retrieveHomepagePromotions = () => (dispatch: *) => dispatch(getWCMContent(homepagePromotions));

export const retrieveYoungTravelerParentConsent = () => (dispatch: *) => dispatch(getWCMContent(youngTravelerParentConsent));

export const retrieveRapidRewardsPromotions = (queryParams: QueryParameter) => {
  rapidRewardsPromotions.queryParams = queryParams;

  return getWCMContent(rapidRewardsPromotions);
};

export const retrieveExclusivePromotionInfo = () => (dispatch: *) => dispatch(getWCMContent(exclusivePromotionInfo));

export const retrieveRapidRewardsInfo = () => (dispatch: *) => dispatch(getWCMContent(rapidRewardsInfo));

const { fetchFareDetails, fetchFareDetailsSuccess, fetchFareDetailsFailed } = apiActionCreator(WCM__FETCH_FARE_DETAILS);

export const fetchFareDetailsJson = (href: string, route: string) => (dispatch: *) => {
  dispatch(fetchFareDetails());

  return fetchWCMContent(removeInitialForwardSlash(href))
    .then((response) => {
      dispatch(fetchFareDetailsSuccess(response));
      dispatch(push(route));
    })
    .catch((error) => dispatch(fetchFareDetailsFailed(error)));
};

export const getContentParamsFromAppSettings =
  (pageId: string, restParams: { [key: string]: string } = {}) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const mboxParams = {};
      const state = _.cloneDeep(getState());
      const APP_SETTINGS = fetchBootstrapData(BootstrapConstants.APP_SETTINGS, {});
      const pageContentParams = pageId ? get(APP_SETTINGS, `${pageId}.contentParameters`, {}) : {};
      const combinedContentParameters = {
        ...get(APP_SETTINGS, 'default.mboxSettings.contentParameters', {}),
        ...pageContentParams
      };

      const getContentParamFromMap = {
        persona: restParams.persona
      };

      for (const key in combinedContentParameters) {
        if (combinedContentParameters[key] !== key) {
          mboxParams[key] = get(state, combinedContentParameters[key]);
        } else {
          mboxParams[key] = getContentParamFromMap[key];
        }
      }

      return mboxParams;
    };

export const getPlacements =
  (
    pageId: string,
    appContexts: Array<string> = [],
    segments: Array<string> = [],
    restParams: { [key: string]: string } = {},
    useAutoPageId: boolean = false
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const ENABLE_TARGET_CONFIG: boolean = get(getState(), 'app.toggles.ENABLE_TARGET_CONFIG', false);
      const normalizedPageId = useAutoPageId && !isOnOldRoute() ? getNormalizedPageId() : pageId;
      const contentParams = ENABLE_TARGET_CONFIG
        ? dispatch(getContentParamsFromAppSettings(pageId, restParams))
        : restParams;
      
      const nearestStation = get(restParams, 'nearestStation', '');
      const nearestStationParam = nearestStation ? { nearestStation } : {};
      const queryParams = {
        ...contentParams,
        ...nearestStationParam,
        appContexts,
        channel: CHANNEL,
        pageId: normalizedPageId,
        segments
      };

      return ContentDeliveryApi.getContent(queryParams).then((content) => {
        dispatch(updateContentBlockIds(content));

        return content;
      });
    };

const fetchWCMContent = (wcmPath?: string, queryParams?: QueryParameter): Promise<*> => {
  if (!queryParams) {
    return WcmApi.getJsonFile(wcmPath);
  }

  return ContentDeliveryApi.getContent(queryParams);
};

export const getWCMContent = (wcmConfig: wcmConfigType) => {
  const { wcmPath, queryParams, actionType, isSpinnerNeeded, closeWindow = false, shouldShowAlert = true } = wcmConfig;

  return (dispatch: *) => {
    const { fetchBegin, fetchSuccess, fetchFailed } = getFormattedActions(actionType, { isSpinnerNeeded });

    dispatch(fetchBegin());

    return fetchWCMContent(wcmPath, queryParams)
      .then((response) => {
        if (actionType === rapidRewardsPromotions.actionType) {
          dispatch(fetchSuccess(transformPromoBannerContentToPromotion(response)));
        } else {
          dispatch(fetchSuccess(response));
        }

        return response;
      })
      .catch(() => {
        dispatch(fetchFailed());
        shouldShowAlert && dispatch(showAlert(closeWindow));
      });
  };
};

const showAlert =
  (closeWindow: ?boolean = false) =>
    (dispatch: *) => {
      dispatch(
        showDialog({
          name: 'wcm-load-error',
          title: i18n('SHARED__ERROR_MESSAGES__WCM_LOAD_ERROR_TITLE'),
          message: i18n('SHARED__ERROR_MESSAGES__WCM_LOAD_ERROR_MESSAGE'),
          buttons: [
            {
              label: 'Close',
              onClick: () => {
                dispatch(hideDialog());
                closeWindow && window.close();
              }
            }
          ]
        })
      );
    };

const { fetchHomeNavMenu, fetchHomeNavMenuSuccess, fetchHomeNavMenuFailed } =
  apiActionCreator(WCM__FETCH_HOME_NAV_MENU);

const retrieveHomeNavMenu =
  () =>
    (dispatch: ThunkDispatch, getState: () => *): Promise<*> => {
      dispatch(fetchHomeNavMenu());

      if (get(getState(), 'app.webView.isWebView')) {
        return dispatch(getPlacements(PAGE_ID_HAMBURGER_MENU))
          .then((content) => dispatch(setMenuListContent(content)))
          .then((content) => dispatch(fetchHomeNavMenuSuccess(content)))
          .catch((error) => dispatch(fetchHomeNavMenuFailed(error)));
      }

      const defaultMboxes = [GLOBAL_NAV_TOP_MBOX_ID, GLOBAL_NAV_PROMO1_MBOX_ID];

      return dispatch(getTargetParams({}, PAGE_ID_HAMBURGER_MENU))
        .then((params) => dispatch(getMboxConfig(PAGE_ID_HAMBURGER_MENU, params, defaultMboxes)))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(PAGE_ID_HAMBURGER_MENU, [], segments)))
        .then((content) => dispatch(setMenuListContent(content)))
        .then((content) => dispatch(fetchHomeNavMenuSuccess(content)))
        .catch((error) => dispatch(fetchHomeNavMenuFailed(error)));
    };

const setMenuListContent = (content: WcmContentResponse) => (dispatch: ThunkDispatch) => {
  const updatedMenuList = wcmMenuListDataTransformer(content);

  updatedMenuList.map((menuItem, index) => {
    const { active, isAccordion } = menuItem;

    active && isAccordion && dispatch(updateActiveLinkIndex(index));
  });

  dispatch({
    type: HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE,
    payload: updatedMenuList
  });

  return content;
};

export const refreshHomeNavMenu = () => (dispatch: ThunkDispatch, getState: *) => {
  const expirationDate = get(getState(), 'app.wcmContent.homeNavMenu.expirationDate');

  if (!expirationDate || dayjs().isAfter(expirationDate)) {
    return dispatch(retrieveHomeNavMenu());
  }

  return dispatch(() => Promise.resolve());
};

export const expireHomeNavMenu = () => ({
  type: wcmActionsTypes.WCM__EXPIRE_HOME_NAV_MENU
});

const { fetchFooter, fetchFooterSuccess, fetchFooterFailed } = apiActionCreator(WCM__FETCH_FOOTER);

export const retrieveFooterContent = () => (dispatch: ThunkDispatch) => {
  dispatch(fetchFooter());

  return dispatch(getTargetParams({}, PAGE_ID_FOOTER))
    .then((params) => dispatch(getMboxConfig(PAGE_ID_FOOTER, params, [])))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(PAGE_ID_FOOTER, [], segments)))
    .then((content) => dispatch(fetchFooterSuccess(content)))
    .catch(() => dispatch(fetchFooterFailed()));
};

type LinkParams = {
  contentBlockId: string,
  isChaseCombo: boolean,
  isChasePlacement: boolean,
  linkType: LinkType,
  pageId?: string,
  referrer: string,
  shouldRaiseSatelliteEvent?: boolean,
  target: string,
  actionToDispatch?: (*) => *,
  actionParams?: Array<*>
};

const getUpdatedTarget = ({
  deviceType,
  isChaseCombo,
  isWebView,
  linkType,
  pageId,
  target
}: LinkParams & { isWebView: boolean, deviceType: string }) => {
  const appendedTarget = appendParamsIfChaseUrl(target, { isChaseCombo, pageId });

  if (linkType === WcmLinkTypes.APP) {
    return isWebView ? 'swaAppLink://'.concat(target) : target;
  }

  return buildPathWithQuery(appendedTarget, { datachannel: deviceType });
};

const getUpdatedLinkType = ({ linkType, isWebView }: { linkType: LinkType, isWebView: boolean }) => {
  const isAppLinkType = linkType === WcmLinkTypes.APP;

  return isWebView && isAppLinkType ? WcmLinkTypes.WEB_VIEW : linkType;
};

export const handlePlacementLink = (params: LinkParams) => (dispatch: ThunkDispatch, getState: *) => {
  const state = _.cloneDeep(getState());
  const deviceType = get(state, 'app.webView.deviceType', DATA_CHANNEL);
  const isWebView = get(state, 'app.webView.isWebView', false);
  const {
    actionParams,
    actionToDispatch,
    contentBlockId,
    isChaseCombo,
    isChasePlacement,
    referrer,
    shouldRaiseSatelliteEvent
  } = params;

  if (shouldRaiseSatelliteEvent) {
    raiseSatelliteEvent('squid', { pagedescription: `link:content-${contentBlockId}` });
  }

  const target = getUpdatedTarget({ ...params, isWebView, deviceType });
  const linkType = getUpdatedLinkType({ ...params, isWebView, deviceType });

  if (isWebView && isChasePlacement) {
    return chasePromoClicked(target, linkType, isChaseCombo, referrer);
  } else if (actionToDispatch && actionParams) {
    dispatch(actionToDispatch(...actionParams));
  } else {
    return wcmTransitionTo({ target, linkType, useWebViewLinkType: isChaseCombo });
  }
};
