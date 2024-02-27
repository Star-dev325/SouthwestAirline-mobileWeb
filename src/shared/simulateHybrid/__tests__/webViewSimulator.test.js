jest.mock('@swa-ui/hybrid', () => ({
  ...jest.requireActual('@swa-ui/hybrid'),
  handleRouteChange: jest.fn()
}));
jest.mock('src/shared/actions/webViewActions', () => ({
  isNotWebView: jest.fn().mockReturnValue({ type: 'isNotWebView' }),
  isWebView: jest.fn().mockReturnValue({ type: 'isWebView' })
}));
jest.mock('src/shared/helpers/browserObject', () => ({
  location: { pathname: '' },
  window: { 
    location: {},
    navigator: {},
    swa: { webViewMessage: jest.fn() } 
  }
}));

import { 
  handleRouteChange,
  WEBVIEW_MESSAGE_KEYS 
} from '@swa-ui/hybrid';
import { window as browserWindow } from 'src/shared/helpers/browserObject';
import { isNotWebView } from 'src/shared/actions/webViewActions';
import { 
  addSimulatorInterface,
  removeSimulatorInterface,
  simulateRouteChange 
} from 'src/shared/simulateHybrid/webViewSimulator';

describe('webViewSimulator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should simulate a route change', () => {
    const mockRoute = 'test/route';
    const mockState = { test: 'value' };
    const mockEncodedState = btoa(mockState);

    simulateRouteChange(mockRoute, mockState);

    expect(browserWindow.swa.webViewMessage).toHaveBeenCalledWith(WEBVIEW_MESSAGE_KEYS.ROUTE_CHANGE, mockRoute, mockEncodedState);
  });

  it('should add a function that exits the web view to the simulator interface', () => {
    addSimulatorInterface();

    browserWindow.SimulatorInterface.exit();

    expect(isNotWebView).toHaveBeenCalled();

    removeSimulatorInterface();
  });

  it('should add a function that redirects the user on exit to the simulator interface', () => {
    addSimulatorInterface();

    browserWindow.SimulatorInterface.exit();

    expect(handleRouteChange).toHaveBeenCalled();

    removeSimulatorInterface();
  });

  it('should remove the simulator interface', () => {
    addSimulatorInterface();
    removeSimulatorInterface();

    expect(browserWindow.SimulatorInterface).toBe(null);
  });
});