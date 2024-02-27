import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';

describe('routeFlowConfigGetter', () => {
  it('should contains related route flow configurations for airBooking', () => {
    const state = { app: { flowStatus: { airBooking: { path: 'airBooking' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.airBooking).toBeDefined();

    configs.airBooking.flowConfig.flowCleaner();

    expect(configs.airBooking.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.airBooking);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for airCancel', () => {
    const state = { app: { flowStatus: { airCancel: { path: 'airCancel' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.airCancel).toBeDefined();
    expect(configs.airCancel.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.airCancel);
  });

  it('should contains related route flow configurations for airChange', () => {
    const state = { app: { flowStatus: { airChange: { path: 'airChange' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.airChange).toBeDefined();

    configs.airChange.flowConfig.flowCleaner();

    expect(configs.airChange.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.airChange);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for carBooking', () => {
    const state = { app: { flowStatus: { carBooking: { path: 'carBooking' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.carBooking).toBeDefined();

    configs.carBooking.flowConfig.flowCleaner();

    expect(configs.carBooking.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.carBooking);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for checkIn', () => {
    const state = { app: { flowStatus: { carCancel: { path: 'carCancel' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.carCancel).toBeDefined();
    expect(configs.carCancel.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.carCancel);
  });

  it('should contains related route flow configurations for checkIn', () => {
    const state = { app: { flowStatus: { checkIn: { path: 'checkIn' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.checkIn).toBeDefined();

    configs.checkIn.flowConfig.flowCleaner();

    expect(configs.checkIn.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.checkIn);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for companion', () => {
    const state = { app: { flowStatus: { companion: { path: 'companion' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.companion).toBeDefined();

    configs.companion.flowConfig.flowCleaner();

    expect(configs.companion.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.companion);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for earlyBird', () => {
    const state = { app: { flowStatus: { earlyBird: { path: 'earlyBird' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.earlyBird).toBeDefined();

    configs.earlyBird.flowConfig.flowCleaner();

    expect(configs.earlyBird.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.earlyBird);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for enroll', () => {
    const state = { app: { flowStatus: { enroll: { path: 'enroll' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.enroll).toBeDefined();

    configs.enroll.flowConfig.flowCleaner();

    expect(configs.enroll.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.enroll);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for lookUpTravelFunds', () => {
    const state = { app: { flowStatus: { travelFunds: { path: 'lookUpTravelFunds' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.lookUpTravelFunds).toBeDefined();

    configs.lookUpTravelFunds.flowConfig.flowCleaner();

    expect(configs.lookUpTravelFunds.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.travelFunds);
    expect(dispatchMock).toBeCalled();
  });

  it('should contains related route flow configurations for sameDay', () => {
    const state = { app: { flowStatus: { sameDay: { path: 'sameDay' } } } };
    const configs = routeFlowConfigGetter({ dispatch: jest.fn(), getState: jest.fn(() => ({ ...state })) });

    expect(configs.sameDay).toBeDefined();
    expect(configs.sameDay.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.sameDay);
  });

  it('should contains related route flow configurations for standby', () => {
    const state = { app: { flowStatus: { standby: { path: 'standby' } } } };
    const configs = routeFlowConfigGetter({ dispatch: jest.fn(), getState: jest.fn(() => ({ ...state })) });

    expect(configs.standby).toBeDefined();
    expect(configs.standby.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.standby);
  });

  it('should contains related route flow configurations for upgradedBoarding', () => {
    const state = { app: { flowStatus: { upgradedBoarding: { path: 'upgradedBoarding' } } } };
    const dispatchMock = jest.fn();

    const configs = routeFlowConfigGetter({ getState: jest.fn(() => ({ ...state })), dispatch: dispatchMock });

    expect(configs.upgradedBoarding).toBeDefined();

    configs.upgradedBoarding.flowConfig.flowCleaner();

    expect(configs.upgradedBoarding.flowConfig.flowStatusGetter()).toMatchObject(state.app.flowStatus.upgradedBoarding);
    expect(dispatchMock).toBeCalled();
  });
});
