// @flow
import _ from 'lodash';
import { setI18nReplacementKeys } from '@swa-ui/locale';

import * as AdobeTargetApi from 'src/shared/api/adobeTargetApi';
import { getUserInfo } from 'src/shared/actions/accountActions';
import { toAdobeParams, parseMbox } from 'src/shared/helpers/adobeHelper';
import { getChasePrequalOffers } from 'src/chase/actions/chaseActions';
import { getUserAlreadyHasChaseRRVisa } from 'src/shared/selectors/chaseSelector';
import { shouldShowEarlyBirdInPathForAirbooking } from 'src/shared/selectors/earlyBirdSelector';
import {
  updateMBoxTotalCallCount,
  updateMBoxFailedCallCount,
  updateMBoxTargetTimeoutArtifact
} from 'src/shared/analytics/actions/analyticsActions';
import { adobeTargetTestActionMapping } from 'src/shared/constants/adobeTargetTestActionMapping';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

import type {
  Dispatch as ThunkDispatch,
  AdobeTargetConfig,
  AdobeTargetContent
} from 'src/shared/flow-typed/shared.types';
import type { ChasePrequalOffersParams } from 'src/chase/flow-typed/chase.types';

const handleMboxFailureAndTimeout = (status: string, error: *) => (dispatch: ThunkDispatch) => {
  dispatch(updateMBoxFailedCallCount(1));

  if (_.includes(status, 'timeout') || _.includes(error.message, 'timed out')) {
    dispatch(updateMBoxTargetTimeoutArtifact('Target_TimeOut'));
  }
};

export const getTargetParams =
  ({ userInfoRequired = true }: ChasePrequalOffersParams = {}, pageId: string = '') =>
    (dispatch: ThunkDispatch, getState: *) => {
      const state = _.cloneDeep(getState());
      const ENABLE_TARGET_CONFIG = _.get(getState(), 'app.toggles.ENABLE_TARGET_CONFIG', false);

      if (ENABLE_TARGET_CONFIG && pageId) {
        return dispatch(getTargetParamsFromAppSettings(pageId));
      } else {
        return Promise.all([dispatch(getChasePrequalOffers(pageId)), userInfoRequired && dispatch(getUserInfo())])
          .then(([chaseInfo, userInfo]) =>
            toAdobeParams(chaseInfo, userInfo, getEarlyBirdParams(state), getUserAlreadyHasChaseRRVisa(state))
          )
          .catch(() => ({}));
      }
    };

export const getTargetParamsFromAppSettings = (pageId: string) => (dispatch: ThunkDispatch) => {
  const APP_SETTINGS = fetchBootstrapData(BootstrapConstants.APP_SETTINGS, {});
  const pageMboxParams = pageId ? _.get(APP_SETTINGS, `${pageId}.mboxParameters`, {}) : {};
  const combinedMboxParameters = {
    ..._.get(APP_SETTINGS, 'default.mboxSettings.mboxParameters', {}),
    ...pageMboxParams
  };

  return Promise.all([
    shouldGetChasePrequalOffers(combinedMboxParameters) && dispatch(getChasePrequalOffers(pageId)),
    shouldGetUserInfo(combinedMboxParameters) && dispatch(getUserInfo())
  ])
    .then(() => dispatch(getMboxParams(combinedMboxParameters)))
    .catch(() => dispatch(getMboxParams(combinedMboxParameters)));
};

const getMboxParams = (combinedMboxParameters) => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const selectors = {
    earlyBirdEligible: shouldShowEarlyBirdInPathForAirbooking,
    responsivesize: () => 'na'
  };

  return Object.entries(combinedMboxParameters).reduce((allParams, [key, path]) => {
    const selector = selectors[key];

    const value = selector ? selector(state) : typeof path === 'string' && _.get(state, path);

    return { ...allParams, [key]: value };
  }, {});
};

const shouldGetChasePrequalOffers = (mboxParams) =>
  _.hasAny(mboxParams, ['offerIdentifier', 'acquisitionSourceCodes', 'highValueIndicator']);

const shouldGetUserInfo = (mboxParams) => _.hasAny(mboxParams, ['companionRemainingPoints', 'redeemablePoints']);

const getEarlyBirdParams = (state) => ({
  earlyBirdEligible: shouldShowEarlyBirdInPathForAirbooking(state),
  earlyBirdSelected: _.get(state, 'app.airBooking.earlyBirdSelected', false)
});

const dispatchActions =
  (mbox: * = {}) =>
    (dispatch: ThunkDispatch) => {
      _.mapKeys(mbox, (value, key) => {
        const actionToDispatch = adobeTargetTestActionMapping()[key];

        actionToDispatch && dispatch(actionToDispatch(value));
      });
    };

export const loadMboxDefaults = () => (dispatch: ThunkDispatch) => {
  const APP_SETTINGS = fetchBootstrapData(BootstrapConstants.APP_SETTINGS, {});
  const mboxTestDefaults = _.get(APP_SETTINGS, 'default.mboxSettings.mboxDefaults.test');

  dispatch(dispatchActions(mboxTestDefaults));
};

const transformMboxSegment =
  (mbox: AdobeTargetContent = {}) =>
    (dispatch: ThunkDispatch) => {
      const segment = _.get(mbox, 'target.segment[0]');
      const { test, test_i18n } = mbox;

      dispatch(dispatchActions(test));

      test_i18n && setI18nReplacementKeys(test_i18n);

      return segment;
    };

export const getMboxConfig =
  (pageId: string, params: *, defaultMboxes: Array<string>) =>
    (dispatch: *, getState: *): Array<{ mbox: string, params: * }> => {
      const ENABLE_TARGET_CONFIG = _.get(getState(), 'app.toggles.ENABLE_TARGET_CONFIG', false);
      const configMboxes = _.get(fetchBootstrapData(BootstrapConstants.APP_SETTINGS), `${pageId}.mboxes`, []);
      const mboxes = ENABLE_TARGET_CONFIG ? configMboxes : defaultMboxes;

      return mboxes.map((mbox) => ({ mbox, params }));
    };

const getMboxContentWithTestObject = (content, mboxDefaults) => {
  const TEST_DEFAULT = 'test';

  if (content) {
    content = parseMbox(content);

    const updatedMboxTestValues = { ...mboxDefaults[TEST_DEFAULT], ...content[TEST_DEFAULT] };

    content[TEST_DEFAULT] = updatedMboxTestValues;
    mboxDefaults[TEST_DEFAULT] = updatedMboxTestValues;
  } else {
    content = mboxDefaults;
  }

  return content;
};

export const getSegments = (options: AdobeTargetConfig) => (dispatch: ThunkDispatch) => {
  if (!options?.length) return Promise.resolve([]);

  dispatch(updateMBoxTotalCallCount(1));

  return AdobeTargetApi.getOffers(options)
    .then((response) => {
      const mboxes = _.get(response, 'execute.mboxes');
      const mboxDefaults =
        fetchBootstrapData(BootstrapConstants.APP_SETTINGS)?.default?.mboxSettings?.mboxDefaults ?? {};

      return _.compact(
        _.flatMap(mboxes, (mbox) =>
          dispatch(transformMboxSegment(getMboxContentWithTestObject(_.get(mbox, 'options[0].content'), mboxDefaults)))
        )
      );
    })
    .catch(({ status, error = {} }) => {
      dispatch(handleMboxFailureAndTimeout(status, error));
      dispatch(loadMboxDefaults());

      return [];
    });
};
