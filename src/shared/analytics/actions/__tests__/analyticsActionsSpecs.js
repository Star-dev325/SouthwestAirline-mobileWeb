import { sandbox } from 'sinon';
import {
  saveLastSearchedFund,
  specialAssistanceAnalytics,
  switchEarlyBirdInPathButton,
  traceAirChangePaymentType,
  traceEarlybirdPaymentType,
  traceSameDayPaymentType,
  traceYoungTravelerPage,
  trackCalendarStrip,
  trackSubmitForm,
  updateChaseAnalyticsCodes,
  updateContentBlockIds,
  updateContentBlockIdsFromMenuList,
  updateMBoxFailedCallCount,
  updateMBoxTargetTimeoutArtifact,
  updateMBoxTotalCallCount,
  viewModal,
  viewTab
} from 'src/shared/analytics/actions/analyticsActions';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';
import createMockStore from 'test/unit/helpers/createMockStore';

const {
  APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
  CHASE_ANALYTICS__UPDATE_CHASE_CODES,
  MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
  MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
  MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
  SAVE_LAST_SEARCHED_FUND,
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

const sinon = sandbox.create();

describe('analyticsActions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore()({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create action when switch earlybird in path button', () => {
    expect(store.dispatch(switchEarlyBirdInPathButton(true))).to.deep.equal({
      type: SWITCH_EARLYBIRD_IN_PATH_BUTTON,
      isEarlyBirdInPathButtonChecked: true
    });
  });

  it('should create action when a dialog (view modal) is displayed ', () => {
    expect(store.dispatch(viewModal('dialog-test-name'))).to.deep.equal({
      type: VIEW_MODAL,
      name: 'dialog-test-name'
    });
  });

  it('should create action when a tracked form is submitted', () => {
    expect(store.dispatch(trackSubmitForm('test-form-name'))).to.deep.equal({
      type: TRACK_SUBMIT_FORM,
      formName: 'test-form-name'
    });
  });

  it('should create action when a tab is changed', () => {
    expect(store.dispatch(viewTab('test-tab-name'))).to.deep.equal({
      type: VIEW_TAB,
      name: 'test-tab-name'
    });
  });

  it('should create action to trace the payment type for air change flow', () => {
    expect(store.dispatch(traceAirChangePaymentType())).to.deep.equal({
      type: TRACE_AIR_CHANGE_PAYMENT_TYPE
    });
  });

  it('should create action to trace the payment type for early bird flow', () => {
    expect(store.dispatch(traceEarlybirdPaymentType())).to.deep.equal({
      type: TRACE_EARLYBIRD_PAYMENT_TYPE
    });
  });

  it('should create action to set special assistance interaction to true or false', () => {
    expect(store.dispatch(specialAssistanceAnalytics(false))).to.deep.equal({
      type: SPECIAL_ASSISTANCE_SELECTED,
      selected: false
    });
  });

  it('should create action to store the most recently looked up travel fund', () => {
    expect(
      store.dispatch(
        saveLastSearchedFund('luv-voucher', {
          voucherNumber: '1234567890',
          securityCode: '1234'
        })
      )
    ).to.deep.equal({
      type: SAVE_LAST_SEARCHED_FUND,
      lastSearchedFund: {
        fundType: 'luv-voucher',
        fundData: {
          voucherNumber: '1234567890',
          securityCode: '1234'
        }
      }
    });
  });

  it('should create an action to update the chase analytics codes', () => {
    expect(
      store.dispatch(
        updateChaseAnalyticsCodes({
          offerIdentifier: 'anId',
          acquisitionSourceCodes: 'aSourceCode'
        })
      )
    ).to.deep.equal({
      type: CHASE_ANALYTICS__UPDATE_CHASE_CODES,
      payload: {
        acquisitionSourceCodes: 'aSourceCode',
        offerIdentifier: 'anId'
      }
    });
  });

  context('updateContentBlockIds', () => {
    let toContentBlockIdsStub;

    beforeEach(() => {
      toContentBlockIdsStub = sinon.stub(WcmTransformer, 'toContentBlockIds');
    });

    it('should create an action to update content block ids', () => {
      const response = 'response';
      const contentBlockIds = 'contentBlockIds';

      toContentBlockIdsStub.returns(contentBlockIds);

      expect(store.dispatch(updateContentBlockIds(response))).to.deep.equal({
        type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: contentBlockIds
      });

      expect(toContentBlockIdsStub).to.have.been.calledWith(response);
    });
  });

  context('updateContentBlockIdsFromMenuList', () => {
    it('should create an action to append content block ids', () => {
      const response = 'response';
      const contentBlockIds = 'contentBlockIds';

      const toContentBlockIdsFromMenuListStub = sinon
        .stub(WcmTransformer, 'toContentBlockIdsFromMenuList')
        .returns(contentBlockIds);

      expect(store.dispatch(updateContentBlockIdsFromMenuList(response))).to.deep.equal({
        type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: contentBlockIds
      });

      expect(toContentBlockIdsFromMenuListStub).to.have.been.calledWith(response);
    });
  });

  context('mBox store', () => {
    it('should create an action to update total mBox call count', () => {
      const count = 1;

      expect(store.dispatch(updateMBoxTotalCallCount(count))).to.deep.equal({
        type: MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
        payload: { totalMboxCallsCounter: 1 }
      });
    });
    it('should create an action to update total failed mBox call count', () => {
      const count = 100;

      expect(store.dispatch(updateMBoxFailedCallCount(count))).to.deep.equal({
        type: MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
        payload: { failedMboxCallsCounter: 100 }
      });
    });
    it('should create an action to update timeout artifact', () => {
      const artifact = 'LOUIE_ARMSTRONG';

      expect(store.dispatch(updateMBoxTargetTimeoutArtifact(artifact))).to.deep.equal({
        type: MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
        payload: { mBoxTimeOutArtifact: 'LOUIE_ARMSTRONG' }
      });
    });
  });

  it('should create action when trackCalendarStrip is called with a selectedDate', () => {
    expect(store.dispatch(trackCalendarStrip('2020-11-23'))).to.deep.equal({
      type: TRACK_CALENDAR_STRIP,
      selectedDate: '2020-11-23'
    });
  });

  it('should create action when traceSameDayPaymentType is called', () => {
    expect(store.dispatch(traceSameDayPaymentType())).to.deep.equal({
      type: TRACE_SAME_DAY_PAYMENT_TYPE
    });
  });

  it('should create action when traceYoungTravelerPage is called', () => {
    expect(store.dispatch(traceYoungTravelerPage())).to.deep.equal({
      type: TRACE_YOUNG_TRAVELER_PAGE
    });
  });
});
