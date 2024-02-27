// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import type { Dispatch as ReduxDispatch } from 'redux';
import myAccountActionTypes, { apiActionCreator } from 'src/myAccount/actions/myAccountActionTypes';
import type { RREnrollRequestDataType, PromotionDetailViewLinkType } from 'src/myAccount/flow-typed/myAccount.types';
import { transformToRapidRewardsPageUI } from 'src/myAccount/transformers/pageUITransformer';
import {
  transformToPromotionDetailSectionsWithWCM,
  transformPromotionsWithId
} from 'src/myAccount/transformers/promotionsTransformer';
import { getUserInfo } from 'src/shared/actions/accountActions';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import { getPlacements, retrieveExclusivePromotionInfo } from 'src/wcm/actions/wcmActions';
import {
  LOYALTY_MY_ACCOUNT_INDEX,
  PROMO_CODES_PAGE_ID,
  RAPID_REWARDS_SNAPSHOT_PAGE_ID
} from 'src/wcm/constants/wcmConstants';

const {
  MY_ACCOUNT__CLEAR_PAST_FLIGHTS,
  MY_ACCOUNT__CLEAR_PROMO_CODES,
  MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO,
  MY_ACCOUNT__CLEAR_SAVED_FLIGHTS,
  MY_ACCOUNT__CLEAR_UPCOMING_TRIPS,
  MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
  MY_ACCOUNT__FETCH_PAST_FLIGHTS,
  MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS,
  MY_ACCOUNT__FETCH_PROMO_CODES,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS,
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS,
  MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION,
  MY_ACCOUNT__RESET_FLOW_DATA,
  MY_ACCOUNT__SET_TRIP_TYPE
} = myAccountActionTypes;

const { fetchSavedFlights, fetchSavedFlightsFailed, fetchSavedFlightsSuccess } = apiActionCreator(
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS
);

export const getSavedFlights =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchSavedFlights());

      return AccountsApi.fetchSavedFlights()
        .then((response) => dispatch(fetchSavedFlightsSuccess(response)))
        .catch((error) => dispatch(fetchSavedFlightsFailed(error)));
    };

export const clearSavedFlights = () => ({
  type: MY_ACCOUNT__CLEAR_SAVED_FLIGHTS
});

const { fetchPastFlights, fetchPastFlightsFailed, fetchPastFlightsSuccess } =
  apiActionCreator(MY_ACCOUNT__FETCH_PAST_FLIGHTS);

export const getPastFlights =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchPastFlights());

      return AccountsApi.fetchPastFlights()
        .then((response) => dispatch(fetchPastFlightsSuccess(response)))
        .catch((error) => dispatch(fetchPastFlightsFailed(error)));
    };

export const clearPastFlights = () => ({
  type: MY_ACCOUNT__CLEAR_PAST_FLIGHTS
});

const { fetchPromoCodes, fetchPromoCodesFailed, fetchPromoCodesSuccess } =
  apiActionCreator(MY_ACCOUNT__FETCH_PROMO_CODES);

export const getPromoCodes =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchPromoCodes());

      return AccountsApi.fetchPromoCodes()
        .then((response) => dispatch(fetchPromoCodesSuccess(response)))
        .catch((error) => dispatch(fetchPromoCodesFailed(error)));
    };

export const clearPromoCodes = () => ({
  type: MY_ACCOUNT__CLEAR_PROMO_CODES
});

const { fetchUpcomingTrips, fetchUpcomingTripsFailed, fetchUpcomingTripsSuccess } = apiActionCreator(
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS
);

export const getUpcomingTrips =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchUpcomingTrips());

      return AccountsApi.getUpcomingTrips()
        .then((response) => dispatch(fetchUpcomingTripsSuccess(response)))
        .catch((error) => dispatch(fetchUpcomingTripsFailed(error)));
    };

export const clearUpcomingTrips = () => ({
  type: MY_ACCOUNT__CLEAR_UPCOMING_TRIPS
});

const { fetchRapidRewardsInfo, fetchRapidRewardsInfoFailed, fetchRapidRewardsInfoSuccess } = apiActionCreator(
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO
);

export const getRapidRewardsInfo =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchRapidRewardsInfo());

      return AccountsApi.fetchRapidRewardsInfo()
        .then((response) => dispatch(fetchRapidRewardsInfoSuccess(transformToRapidRewardsPageUI(response))))
        .catch((error) => dispatch(fetchRapidRewardsInfoFailed(error)));
    };

const { enrollCustomerAccount, enrollCustomerAccountFailed, enrollCustomerAccountSuccess } = apiActionCreator(
  MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT
);

export const enrollCustomerAccountForRR =
  (emailSubscriptions: RREnrollRequestDataType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(enrollCustomerAccount());

      return AccountsApi.updateRapidRewards(emailSubscriptions)
        .then(() => dispatch(enrollCustomerAccountSuccess()))
        .catch((error) => dispatch(enrollCustomerAccountFailed(error)));
    };

const { fetchAccountInfo, fetchAccountInfoFailed, fetchAccountInfoSuccess } =
  apiActionCreator(MY_ACCOUNT__FETCH_ACCOUNT_INFO);

export const getAccountInfoForLandingPage =
  () =>
    (dispatch: *): Promise<*> => {
      dispatch(fetchAccountInfo());

      return AccountsApi.fetchAccountInfo()
        .then((response) => {
          dispatch(fetchAccountInfoSuccess(response));
          dispatch(loadAccountPagePlacements());
          dispatch(getExclusivePromotions()).then(() => {
            dispatch(getUpcomingTrips());
          });
        })
        .catch((error) => dispatch(fetchAccountInfoFailed(error)));
    };

const { fetchExclusivePromotions, fetchExclusivePromotionsFailed, fetchExclusivePromotionsSuccess } = apiActionCreator(
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS
);

export const getExclusivePromotions =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchExclusivePromotions());

      return AccountsApi.fetchPromotions()
        .then((response) => dispatch(fetchExclusivePromotionsSuccess(transformPromotionsWithId(response).promotionsPage)))
        .catch((error) => dispatch(fetchExclusivePromotionsFailed(error)));
    };

const { fetchPromotionDetails, fetchPromotionDetailsFailed, fetchPromotionDetailsSuccess } = apiActionCreator(
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS
);

export const getPromotionDetails =
  (promotionDetailsRequestParams: PromotionDetailViewLinkType) =>
    (dispatch: *): Promise<*> => {
      const { promotionId } = promotionDetailsRequestParams;

      dispatch(fetchPromotionDetails());

      return AccountsApi.fetchPromotionDetails(promotionDetailsRequestParams)
        .then((promotionResponse) =>
          dispatch(retrieveExclusivePromotionInfo())
            .then((wcmResponse) => [promotionResponse, wcmResponse])
            .catch(() => [promotionResponse, {}])
        )
        .then(([promotionResponse, wcmResponse]) => {
          dispatch(
            fetchPromotionDetailsSuccess(
              _.merge({}, promotionResponse, {
                promotionDetailsPage: {
                  sections: transformToPromotionDetailSectionsWithWCM(wcmResponse, promotionId)
                }
              }).promotionDetailsPage
            )
          );
        })
        .catch((error) => dispatch(fetchPromotionDetailsFailed(error)));
    };

const { registerExclusivePromotion, registerExclusivePromotionFailed, registerExclusivePromotionSuccess } =
  apiActionCreator(MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION);

export const registerUserExclusivePromotion =
  (registerPromotionRequest: Link) =>
    (dispatch: *): Promise<*> => {
      dispatch(registerExclusivePromotion());

      return AccountsApi.registerPromotion(registerPromotionRequest)
        .then(() => {
          dispatch(registerExclusivePromotionSuccess());
          dispatch(
            showDialog({
              name: 'promotion-register-confirmation',
              title: 'Confirmation',
              message: i18n('MY_ACCOUNT__PROMOTION_YOURE_NOW_REGISTERED'),
              buttons: [
                {
                  label: i18n('SHARED__BUTTON_TEXT__OK'),
                  onClick: () => {
                    dispatch(hideDialog()).then(() => {
                      dispatch(getExclusivePromotions());
                    });
                  }
                }
              ]
            })
          );
        })
        .catch((error) => dispatch(registerExclusivePromotionFailed(error)));
    };

const {
  fetchRapidRewardsPagePlacements,
  fetchRapidRewardsPagePlacementsFailed,
  fetchRapidRewardsPagePlacementsSuccess
} = apiActionCreator(MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS);

export const getMyAccountRapidRewardsPagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchRapidRewardsPagePlacements());

      return dispatch(getTargetParams({}, RAPID_REWARDS_SNAPSHOT_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(RAPID_REWARDS_SNAPSHOT_PAGE_ID, params, [])))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(RAPID_REWARDS_SNAPSHOT_PAGE_ID, [], segments)))
        .then((response) => dispatch(fetchRapidRewardsPagePlacementsSuccess(response)))
        .catch((error) => dispatch(fetchRapidRewardsPagePlacementsFailed(error)));
    };

const { fetchAccountPagePlacements, fetchAccountPagePlacementsFailed, fetchAccountPagePlacementsSuccess } =
  apiActionCreator(MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS);

export const loadAccountPagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchAccountPagePlacements());

      return dispatch(getTargetParams({}, LOYALTY_MY_ACCOUNT_INDEX))
        .then((params) => dispatch(getMboxConfig(LOYALTY_MY_ACCOUNT_INDEX, params, [])))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => 
          Promise.resolve(dispatch(getUserInfo())).then((userInfoResponse) => {
            const accountType = userInfoResponse?.customers?.UserInformation?.accountType;
            const appContext = accountType ? [accountType] : [];

            return dispatch(getPlacements(LOYALTY_MY_ACCOUNT_INDEX, appContext, segments));
          })
        )
        .then((response) => dispatch(fetchAccountPagePlacementsSuccess(response)))
        .catch((error) => dispatch(fetchAccountPagePlacementsFailed(error)));
    };

const { fetchPromoCodesPagePlacements, fetchPromoCodesPagePlacementsFailed, fetchPromoCodesPagePlacementsSuccess } =
  apiActionCreator(MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS);

export const getPromoCodesPagePlacements =
  () =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchPromoCodesPagePlacements());

      return dispatch(getTargetParams({}, PROMO_CODES_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(PROMO_CODES_PAGE_ID, params, [])))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(PROMO_CODES_PAGE_ID, [], segments)))
        .then((response) => dispatch(fetchPromoCodesPagePlacementsSuccess(response)))
        .catch((error) => dispatch(fetchPromoCodesPagePlacementsFailed(error)));
    };

export const clearRapidRewardsInfo = () => ({
  type: MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO
});

export const resetFlowData = () => ({
  type: MY_ACCOUNT__RESET_FLOW_DATA
});

export const setTripTypeForDetailsPage = (tripType: string) => ({
  type: MY_ACCOUNT__SET_TRIP_TYPE,
  tripType
});
