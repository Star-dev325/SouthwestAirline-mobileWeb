import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import WcmOverlayModal from 'src/wcm/components/wcmOverlayModal';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('WcmOverlayModal', () => {
  const TITLE = 'Learn more about SWABIZ';

  let onDoneMock;

  beforeEach(() => {
    onDoneMock = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when performing modal actions', () => {
    it('should call done callback function', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.wcm-overlay-modal .action-bar-buttons .button'));

      expect(onDoneMock).toHaveBeenCalled();
    });

    it('should not load page header if isWebView is true', () => {
      const { container } = createComponent({ isWebView: true });

      expect(container.querySelector('.hidden.action-bar')).toBeTruthy();
    });

    it('should load page header if isWebView is false', () => {
      const { container } = createComponent({ isWebView: false });
      
      expect(container.querySelector('.hidden.action-bar')).toBeFalsy();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      doneLabel: 'Done',
      isWebView: false,
      onDone: onDoneMock,
      overlay: {
        body: [],
        title: TITLE
      }
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <WcmOverlayModal {...defaultProps }  { ...props } />
      </Provider>
    );
  };
});
