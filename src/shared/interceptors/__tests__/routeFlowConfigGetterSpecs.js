import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WcmApi from 'src/shared/api/wcmApi';
import * as CarBookingApi from 'src/shared/api/carBookingApi';
import Q from "q";

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('routeFlowConfigGetter', () => {
  let store;
  let actions;
  let flowConfig;

  beforeEach(() => {
    store = mockStore({
      app: {
        flowStatus: {
          airBooking: 'airBookingTestFlow',
          airCancel: 'airCancelTestFlow',
          airChange: 'airChangeTestFlow',
          carBooking: 'carBookingTestFlow',
          carCancel: 'carCancelTestFlow',
          checkIn: 'checkInTestFlow',
          companion: 'companionTestFlow',
          earlyBird: 'earlyBirdTestFlow',
          enroll: 'enrollTestFlow',
          sameDay: 'sameDayTestFlow',
          travelFunds: 'travelFundsTestFlow',
          upgradedBoarding: 'upgradedBoardingTestFlow'
        }
      }
    });
    flowConfig = routeFlowConfigGetter(store);
    actions = store.getActions();
  });

  const getFlowStatus = (type) => flowConfig[type].flowConfig.flowStatusGetter();
  const cleanFlow = (type) => flowConfig[type].flowConfig.flowCleaner();

  it('should get flow status for airCancel', () => {
    expect(getFlowStatus('airCancel')).to.be.equal('airCancelTestFlow');
  });

  it('should get flow status for carCancel', () => {
    expect(getFlowStatus('carCancel')).to.be.equal('carCancelTestFlow');
  });

  context('airBooking', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('airBooking')).to.be.equal('airBookingTestFlow');
    });

    it('should set status to initial on clear', () => {
      cleanFlow('airBooking');

      expect(actions).to.deep.equal([
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'airBooking',
          status: 'initial'
        }
      ]);
    });
  });

  context('carBooking', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('carBooking')).to.be.equal('carBookingTestFlow');
    });

    it('should set status to initial and start new session flow on clear', () => {
      sinon.stub(WcmApi, 'getJsonFile').returns(Q.resolve({}));
      sinon.stub(CarBookingApi, 'retrieveCarVendors').returns(Q.resolve({}));
      sinon.stub(CarBookingApi, 'retrieveLocations').returns(Q.resolve({}));

      cleanFlow('carBooking');

      expect(actions).to.deep.equal([
        {
          flowName: 'carBooking',
          status: 'initial',
          type: 'SET_FLOW_STATUS'
        },
        {
          type: 'CAR_BOOKING__RESET_FLOW_DATA'
        },
        {
          type: 'WCM__FETCH_CAR_VENDOR_IMAGES'
        },
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CAR_VENDORS'
        },
        {
          isFetching: true,
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS'
        },
        {
          searchRequests: [],
          type: 'CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS'
        }
      ]);
    });
  });

  context('earlyBird', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('earlyBird')).to.be.equal('earlyBirdTestFlow');
    });

    it('should clear flow status', () => {
      cleanFlow('earlyBird');

      expect(actions).to.deep.equal([
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'earlyBird'
        }
      ]);
    });
  });

  context('enroll', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('enroll')).to.be.equal('enrollTestFlow');
    });

    it('should clear flow status', () => {
      cleanFlow('enroll');

      expect(actions).to.deep.equal([
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'enroll'
        }
      ]);
    });
  });

  context('companion', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('companion')).to.be.equal('companionTestFlow');
    });

    it('should clear flow status', () => {
      cleanFlow('companion');

      expect(actions).to.deep.equal([
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'companion'
        }
      ]);
    });
  });

  context('checkIn', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('checkIn')).to.be.equal('checkInTestFlow');
    });

    it('should clear flow status', () => {
      cleanFlow('checkIn');

      expect(actions).to.deep.equal([
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'checkIn'
        }
      ]);
    });
  });

  context('airChange', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('airChange')).to.be.equal('airChangeTestFlow');
    });

    it('should clear flow status and reset selected airport info', () => {
      cleanFlow('airChange');

      expect(actions).to.deep.equal([
        {
          type: 'AIRPORT_INFO__RESET_SELECTED_AIRPORT_INFO'
        },
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'airChange'
        }
      ]);
    });
  });

  context('lookUpTravelFunds', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('lookUpTravelFunds')).to.be.equal('travelFundsTestFlow');
    });

    it('should clear flow status, reset lookup flow data and clear all lookup forms', () => {
      const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };

      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      cleanFlow('lookUpTravelFunds');
      
      expect(actions).to.deep.equal([
        {
          type: 'TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA'
        },
        clearFormDataByIdStub,
        clearFormDataByIdStub,
        clearFormDataByIdStub,
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'lookUpTravelFunds'
        }
      ]);
    });
  });

  context('upgradedBoarding', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('upgradedBoarding')).to.be.equal('upgradedBoardingTestFlow');
    });

    it('should clear flow status', () => {
      cleanFlow('upgradedBoarding');

      expect(actions).to.deep.equal([
        {
          type: 'CLEAR_FLOW_STATUS',
          flowName: 'upgradedBoarding'
        }
      ]);
    });
  });

  describe('sameDay', () => {
    it('should get flow status', () => {
      expect(getFlowStatus('sameDay')).to.be.equal('sameDayTestFlow');
    });
  });
});
