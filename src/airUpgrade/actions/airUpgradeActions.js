// @flow
import { push } from 'connected-react-router';
import _ from 'lodash';
import { goToPricingReview, resetAirChangeData } from 'src/airChange/actions/airChangeActions';
import upgradeFareActionTypes, { apiActionCreator } from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { AIR_UPGRADE_FARE_OPTIONS, AIR_UPGRADE_FLOW_NAME } from 'src/airUpgrade/constants/airUpgradeConstants';
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { buildUpgradeFareReservationRequest, getPricingChangeRequests } from 'src/airUpgrade/helpers/upgradeFareHelper';
import { resetCalculateFlowData } from 'src/shared/actions/applyTravelFundsActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as AirUpgradeApi from 'src/shared/api/airUpgradeApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getPlacements } from 'src/wcm/actions/wcmActions';

import type { PricingDataType, UpgradeSearchRequestType } from 'src/airUpgrade/flow-typed/airUpgrade.types';
import type { Dispatch as ThunkDispatch, UpgradeFareReservationDataType } from 'src/shared/flow-typed/shared.types';

const {
  AIR_UPGRADE__FETCH_RESERVATION,
  AIR_UPGRADE__CHANGE_SELECTED_BOUND,
  AIR_UPGRADE__SAVE_UPGRADE_TYPE,
  AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS,
  AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN,
  AIR_UPGRADE__SEARCH_REQUEST,
  AIR_UPGRADE__UPGRADE_INDEX
} = upgradeFareActionTypes;

export const { fetchReservation, fetchReservationSuccess, fetchReservationFailed } =
  apiActionCreator(AIR_UPGRADE__FETCH_RESERVATION);

export const changeSelectedBound = ({ productId, isSelected }: { productId: string, isSelected: boolean }) => ({
  type: AIR_UPGRADE__CHANGE_SELECTED_BOUND,
  boundData: { productId, isSelected }
});

export const loadUpgradeIndex = () => ({
  type: AIR_UPGRADE__UPGRADE_INDEX
});

export const saveUpgradeType = (upgradeType: string | null) => ({
  type: AIR_UPGRADE__SAVE_UPGRADE_TYPE,
  upgradeType
});

export const resumeAfterLogin = (shouldResume: boolean) => ({
  type: AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN,
  shouldResume
});

export const saveSearchRequest = (searchRequest: UpgradeSearchRequestType) => ({
  type: AIR_UPGRADE__SEARCH_REQUEST,
  searchRequest
});

export const getUpgradeFareReservation =
  (
    upgradeFareReservationData: UpgradeFareReservationDataType,
    shouldPushRoute: ?boolean = true,
    errorHandler?: () => void
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const upgradeType = _.get(state, 'app.airUpgrade.airUpgradeReducer.upgradeType');
      const requestData = buildUpgradeFareReservationRequest({
        ...upgradeFareReservationData,
        nonPremiumSearch: upgradeType === AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU
      });

      dispatch(resetAirChangeData());
      dispatch(fetchReservation());

      return AirUpgradeApi.retrieveReservation(requestData)
        .then((content) => {
          dispatch(fetchReservationSuccess(content));
          dispatch(FlowStatusActions.setFlowStatus(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS));

          const isEnabledUrlNormalization = state?.app?.toggles?.ENABLE_URL_NORMALIZATION;
          const airUpgradeSelectBoundRoute = isEnabledUrlNormalization ? airUpgradeRoutes['airUpgradeSelectBound'] : airUpgradeOldRoutes['airUpgradeSelectBound'];

          shouldPushRoute && dispatch(push(buildPathWithParamAndQuery(airUpgradeSelectBoundRoute, {}, { upgradeType })));
        })
        .catch((error) => dispatch(fetchReservationFailed({ ...error, errorHandler })));
    };

export const goToAirChangePricingReview =
  (
    changePricingLink: Link,
    pricingDataList: Array<PricingDataType>,
    isLoggedIn: boolean,
    shouldResetCalculateFundsFlow: boolean = false,
    ignoreNavigationLogic: boolean = false
  ) =>
    (dispatch: ThunkDispatch, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const boundSelectionDataList = _.get(
        state,
        'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.boundSelectionDataList'
      );

      const body = getPricingChangeRequests(changePricingLink, pricingDataList, boundSelectionDataList);
      const request = { ...changePricingLink, body };
      const selectedProduct = body.changeRequests.find(({ productId } = {}) => productId !== null);
      const { arrivalAirportCode, departureAirportCode, boundType } = selectedProduct || {};
      const searchRequest = { from: departureAirportCode, to: arrivalAirportCode, boundType };

      dispatch(FlowStatusActions.setFlowStatus(AIR_UPGRADE_FLOW_NAME, STATUS.COMPLETED));
      dispatch(saveSearchRequest(searchRequest));
      dispatch(resetCalculateFlowData());

      return dispatch(goToPricingReview(request, isLoggedIn, shouldResetCalculateFundsFlow, ignoreNavigationLogic));
    };

const { fetchAirUpgradePlacements, fetchAirUpgradePlacementsSuccess, fetchAirUpgradePlacementsFailed } =
  apiActionCreator(AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS);

export const loadUpgradeFarePagePlacements = (upgradeType: string, pageId: string) => (dispatch: ThunkDispatch) => {
  dispatch(fetchAirUpgradePlacements());

  dispatch(getPlacements(pageId, [upgradeType], [], {}, true))
    .then((content) => {
      dispatch(fetchAirUpgradePlacementsSuccess(content));
    })
    .catch(() => dispatch(fetchAirUpgradePlacementsFailed()));
};
