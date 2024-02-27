// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';
import i18n from '@swa-ui/locale';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as ChaseApi from 'src/shared/api/chaseApi';
import * as ChasePrequalApi from 'src/shared/api/chasePrequalApi';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import ChaseActionTypes, { apiActionCreator } from 'src/chase/actions/chaseActionTypes';
import { shouldCheckPrequal } from 'src/shared/selectors/chaseSelector';
import CacheConfig from 'src/shared/cache/cacheConfig';
import { expireHomeNavMenu } from 'src/wcm/actions/wcmActions';
import { updateChaseAnalyticsCodes } from 'src/shared/analytics/actions/analyticsActions';
import { loadChaseSessionId } from 'src/airBooking/actions/airBookingActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { toApplicationInfo } from 'src/chase/transformers/chaseTransformer';
import { shouldShowChaseInstantCreditCard } from 'src/airBooking/selectors/paymentPageSelectors';
import { isLoggedIn as getIsLoggedIn } from 'src/shared/helpers/accountInfoHelper';
import { toChaseCodes } from 'src/shared/helpers/chasePrequalHelper';
import {
  DEFAULT_OFFERS,
  INSUFFICIENT_FUNDS_TITLE,
  INSUFFICIENT_FUNDS_MESSAGE
} from 'src/chase/constants/chaseConstants';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import type { ApplicationInfo, FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import type { ChasePrefillRequestType } from 'src/chase/flow-typed/chase.types';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

const {
  CHASE__UPDATE_CHASE_FLOW_COMPLETED,
  CHASE__CREATE_SESSION_FOR_CHASE,
  CHASE__GET_APPLICATION_INFO,
  CHASE__FETCH_APPLICATION_STATUS,
  CHASE__SET_CHASE_BANNER_SHOWN,
  CHASE__SET_CHASE_CREDIT_STATUS,
  CHASE__SET_CHASE_EXISTING_CARD_MEMBER,
  CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
  CHASE__RESET_CHASE_TEMPORARY_CARD,
  CHASE__RESET_CHASE_APPLICATION_INFO
} = ChaseActionTypes;

export const updateChaseFlowCompleted = (isChaseFlowCompleted: boolean) => ({
  type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
  isChaseFlowCompleted
});

export const setChaseCreditStatus = (creditStatus: string) => ({
  type: CHASE__SET_CHASE_CREDIT_STATUS,
  creditStatus
});

export const setShouldRetryInstantCreditsCall = (shouldSetRetryInstantCreditsCall: boolean = false) => ({
  type: CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
  shouldSetRetryInstantCreditsCall
});

export const setChaseBannerShown = (isChaseBannerShown: boolean) => ({
  type: CHASE__SET_CHASE_BANNER_SHOWN,
  isChaseBannerShown
});

export const setIsChaseExistingCardMember = (audience: string) => ({
  type: CHASE__SET_CHASE_EXISTING_CARD_MEMBER,
  isChaseExistingCardMember: audience === AdobeTargetConstants.CHASE_EXISTING_CARD_MEMBER
});

export const resetChaseData = () => (dispatch: *) => {
  AccountInfoHelper.removeChaseSessionId();
  dispatch(resetChaseTemporaryCard());
  dispatch(resetChaseApplicationInfo());
};

const resetChaseTemporaryCard = () => ({
  type: CHASE__RESET_CHASE_TEMPORARY_CARD
});

const resetChaseApplicationInfo = () => ({
  type: CHASE__RESET_CHASE_APPLICATION_INFO
});

export const handleFirmOfferOfCredit = (additionalParams: {}) => () =>
  LocalStorageCache.loadChasePrequalOffers(false)
    .then((offerData) => {
      const { expirationTimestamp, focCalled = false, offerIdentifier, swaOffersIdentitySource } = offerData || {};
      const loginState = getIsLoggedIn();
      const offerParams = { ...additionalParams, loginState, swaOffersIdentitySource };

      !focCalled &&
        offerIdentifier &&
        ChasePrequalApi.confirmCustomerViewedFirmOfferOfCredit(offerIdentifier, offerParams).then(() => {
          const updatedOfferData = { ...offerData, focCalled: true };

          LocalStorageCache.saveChasePrequalOffers(updatedOfferData, null, expirationTimestamp);
          WebViewHelper.sendChaseOffers(updatedOfferData);
        });
    })
    .catch(_.noop);

export const getChasePrequalOffers = (pageId: string) => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const shouldFetch = shouldCheckPrequal(state);

  return LocalStorageCache.loadChasePrequalOffers()
    .catch(() => (shouldFetch ? dispatch(fetchChasePrequalOffers(pageId)) : Promise.resolve(DEFAULT_OFFERS)))
    .then((offerData) => {
      const offers = toChaseCodes(offerData);

      dispatch(updateChaseAnalyticsCodes(offers));

      return offers;
    });
};

const fetchChasePrequalOffers = (pageId: string) => (dispatch: ThunkDispatch) =>
  ChasePrequalApi.getChasePrequalOffers(pageId)
    .then((response) => (response ? dispatch(saveChasePrequalOffers(response)) : DEFAULT_OFFERS))
    .catch(() => DEFAULT_OFFERS);

const { getApplicationInfo, getApplicationInfoSuccess, getApplicationInfoFailed } =
  apiActionCreator(CHASE__GET_APPLICATION_INFO);

export const getChaseApplicationInfo = (request: ChasePrefillRequestType) => (dispatch: ReduxDispatch<*>) => {
  dispatch(getApplicationInfo(request));

  return ChaseApi.getApplicationInfo(request)
    .then((response) => {
      dispatch(getApplicationInfoSuccess(response));

      return response;
    })
    .catch((error) => {
      dispatch(getApplicationInfoFailed());

      return Promise.reject(error);
    });
};

const { createSessionForChase, createSessionForChaseSuccess, createSessionForChaseFailed } = apiActionCreator(
  CHASE__CREATE_SESSION_FOR_CHASE
);

export const createChaseSession =
  (returnURL: string, isLoggedIn: boolean, encryptedRapidRewardsNumber?: string) => (dispatch: ThunkDispatch) => {
    dispatch(createSessionForChase());

    return ChaseApi.createSession(returnURL, isLoggedIn, encryptedRapidRewardsNumber)
      .then((response) => {
        dispatch(createSessionForChaseSuccess(response));
        const { chaseSessionId } = response || {};

        if (chaseSessionId) {
          LocalStorageCache.saveSwaOffersIdentity();
          LocalStorageCache.saveChaseSessionId(chaseSessionId);
          dispatch(deleteChasePrequalOffers());

          return chaseSessionId;
        }
      })
      .catch((error) => {
        dispatch(createSessionForChaseFailed());

        return Promise.reject(error);
      });
  };

export const saveChasePrequalOffers = (response: *) => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const accountNumber = _.get(state, 'app.account.accountNumber');
  const chaseTtlConfig = fetchBootstrapData(BootstrapConstants.CHASE_TTL_CONFIG_PATH, []);
  const isNoOffers = _.isEmpty(_.get(response, 'offers', []));
  const offerType = isNoOffers ? 'no_offers' : 'offers';
  const ttl = _.get(
    chaseTtlConfig.filter((config) => config.type === offerType),
    '[0].ttlInSeconds',
    CacheConfig.CHASE_PREQUAL_OFFERS_SECONDS
  );
  const expirationTimestamp = dayjs().add(ttl, 'seconds').valueOf();
  const accountNumberHashed = createSha256Hash(accountNumber);
  const updatedResponse = { ...response, focCalled: false, expirationTimestamp, accountNumber: accountNumberHashed };

  LocalStorageCache.saveChasePrequalOffers(updatedResponse, ttl / 60);
  WebViewHelper.sendChaseOffers(updatedResponse);
  dispatch(expireHomeNavMenu());

  return response;
};

export const deleteChasePrequalOffers = () => (dispatch: ThunkDispatch) => {
  LocalStorageCache.deleteChasePrequalOffers();
  dispatch(expireHomeNavMenu());
};

const showInsufficientFundsDialog = () => (dispatch: ThunkDispatch) => {
  dispatch(
    showDialog({
      name: 'pricing-summary-insufficient-funds',
      title: i18n(INSUFFICIENT_FUNDS_TITLE),
      message: i18n(INSUFFICIENT_FUNDS_MESSAGE),
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () => dispatch(hideDialog())
        }
      ]
    })
  );
};

const { fetchApplicationStatus, fetchApplicationStatusSuccess, fetchApplicationStatusFailed } = apiActionCreator(
  CHASE__FETCH_APPLICATION_STATUS
);

export const getChaseApplicationStatus = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());

  return loadChaseSessionId(dispatch).then((chaseSessionId) => {
    if (chaseSessionId) {
      dispatch(fetchApplicationStatus());

      return ChaseApi.retrieveChaseInstantCreditResponse(chaseSessionId)
        .then((response) => {
          const searchRequest = _.get(state, 'app.airBooking.searchRequest');
          const applicationInfo = toApplicationInfo(response);

          dispatch(fetchApplicationStatusSuccess({ applicationInfo }));
          dispatch(handleChaseStatus(applicationInfo, searchRequest));
        })
        .catch(() => dispatch(fetchApplicationStatusFailed()));
    }
  });
};

const handleChaseStatus =
  (applicationInfo: ApplicationInfo, searchRequest: FlightProductSearchRequest) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const {
        chaseApplicationCompleted = false,
        chaseCreditStatus = '',
        customer = {},
        isApproved = false
      } = applicationInfo || {};
      const { accountNumber = '', firstName = '', lastName = '' } = customer;

      chaseCreditStatus && dispatch(setChaseCreditStatus(chaseCreditStatus));
      dispatch(updateChaseFlowCompleted(chaseApplicationCompleted));

      if (isApproved) {
        shouldShowChaseInstantCreditCard(_.cloneDeep(getState()))
          ? dispatch(AirBookingActions.saveChaseCardPaymentInfo())
          : dispatch(showInsufficientFundsDialog());

        if (accountNumber) {
          dispatch(
            AirBookingActions.generatePassengerPageInfo({
              searchRequest,
              chaseCardHolder: { accountNumber, firstName, lastName }
            })
          );
          dispatch(AirBookingActions.regeneratePurchaseSummaryPage());
        }
      }
    };
