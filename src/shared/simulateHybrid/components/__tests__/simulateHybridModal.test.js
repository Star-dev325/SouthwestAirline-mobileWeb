jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper', () => ({
  hideFullScreenModal: jest.fn()
}));
jest.mock('src/shared/actions/webViewActions', () => ({
  isNotWebView: jest.fn().mockReturnValue({ type: 'isNotWebView' }),
  isWebView: jest.fn().mockReturnValue({ type: 'isWebView' })
}));

import { fireEvent } from '@testing-library/react';
import { isNotWebView, isWebView } from 'src/shared/actions/webViewActions';
import { hideFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import SimulateHybridModal from 'src/shared/simulateHybrid/components/simulateHybridModal';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('SimulateHybridModal', () => {
  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should dismiss the full screen modal when the done button is clicked', () => {
    const { getByText } = createComponent();

    fireEvent.click(getByText('Done'));

    expect(hideFullScreenModal).toHaveBeenCalled();
  });

  it('should update web view state when the checkbox is turned on', () => {
    const { getByText } = createComponent(); 

    fireEvent.click(getByText('Enable Hybrid'));

    expect(isWebView).toHaveBeenCalled();
  });

  it('should update web view state when the checkbox is turned on', () => {
    const { getByText } = createComponent({ app: { webView: { isWebView: true } } });

    fireEvent.click(getByText('Enable Hybrid'));

    expect(isNotWebView).toHaveBeenCalled();
  });

  const defaultState = {
    app: {
      webView: {
        isWebView: false
      }
    },
    router: {
      location: {
        search: {
          activeIdInURL: '_modal=_hybrid'
        }
      }
    }
  };
  const createComponent = (state = {}) => {
    const mergedState = {
      ...defaultState,
      ...state
    };

    return integrationRender()(mergedState, SimulateHybridModal, {});
  };
});