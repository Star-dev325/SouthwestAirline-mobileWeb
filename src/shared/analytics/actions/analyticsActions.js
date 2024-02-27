// @flow

import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import { toContentBlockIds, toContentBlockIdsFromMenuList } from 'src/wcm/transformers/wcmTransformer';

import type { ChaseCodes } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { WcmContentResponse } from 'src/wcm/flow-typed/wcm.types';

const {
  APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
  CHASE_ANALYTICS__UPDATE_CHASE_CODES,
  MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
  MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
  MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
  PAGE_LOAD_COMPLETED,
  SAVE_LAST_SEARCHED_FUND,
  SET_LOCALE,
  SPECIAL_ASSISTANCE_SELECTED,
  SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  TRACE_AIR_CHANGE_PAYMENT_TYPE,
  TRACE_EARLYBIRD_PAYMENT_TYPE,
  TRACE_SAME_DAY_PAYMENT_TYPE,
  TRACE_YOUNG_TRAVELER_PAGE,
  TRACK_CALENDAR_STRIP,
  TRACK_SUBMIT_FORM,
  UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
  VIEW_MODAL,
  VIEW_TAB
} = AnalyticsActionTypes;

export const switchEarlyBirdInPathButton = (isEarlyBirdInPathButtonChecked: boolean) => ({
  type: SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  isEarlyBirdInPathButtonChecked
});

export const viewModal = (name?: string) => ({
  type: VIEW_MODAL,
  name
});

export const trackSubmitForm = (formName: string) => ({
  type: TRACK_SUBMIT_FORM,
  formName
});

export const viewTab = (name: string) => ({
  type: VIEW_TAB,
  name
});

export const traceAirChangePaymentType = () => ({
  type: TRACE_AIR_CHANGE_PAYMENT_TYPE
});

export const traceEarlybirdPaymentType = () => ({
  type: TRACE_EARLYBIRD_PAYMENT_TYPE
});

export const traceSameDayPaymentType = () => ({
  type: TRACE_SAME_DAY_PAYMENT_TYPE
});

export const traceYoungTravelerPage = () => ({
  type: TRACE_YOUNG_TRAVELER_PAGE
});

export const pageLoadCompletedForAnalytics = (location: HistoryLocation, method?: string) => ({
  type: PAGE_LOAD_COMPLETED,
  location,
  method
});

export const specialAssistanceAnalytics = (selected: boolean) => ({
  type: SPECIAL_ASSISTANCE_SELECTED,
  selected
});

export const saveLastSearchedFund = (fundType: string, formData: FormData) => ({
  type: SAVE_LAST_SEARCHED_FUND,
  lastSearchedFund: {
    fundType,
    fundData: formData
  }
});

export const updateChaseAnalyticsCodes = (chaseCodes: ChaseCodes) => ({
  type: CHASE_ANALYTICS__UPDATE_CHASE_CODES,
  payload: chaseCodes
});

export const updateContentBlockIdsFromMenuList = (menuList: Array<*>) => ({
  type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
  payload: toContentBlockIdsFromMenuList(menuList)
});

export const updateContentBlockIds = (response: WcmContentResponse) => ({
  type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
  payload: toContentBlockIds(response)
});

export const updateMBoxTotalCallCount = (callTotal: number) => ({
  type: MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
  payload: { totalMboxCallsCounter: callTotal }
});

export const updateMBoxFailedCallCount = (failedCallCount: number) => ({
  type: MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
  payload: { failedMboxCallsCounter: failedCallCount }
});

export const updateMBoxTargetTimeoutArtifact = (artifact: 'Target_TimeOut' | 'SPA_TimeOut') => ({
  type: MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
  payload: { mBoxTimeOutArtifact: artifact }
});

export const trackCalendarStrip = (selectedDate: string) => ({
  type: TRACK_CALENDAR_STRIP,
  selectedDate
});

export const setLocale = () => ({
  type: SET_LOCALE
});
