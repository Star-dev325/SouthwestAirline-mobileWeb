import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import PlacementLink from 'src/wcm/components/placementLink';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('PlacementLink', () => {
  let handlePlacementLinkFnMock;
  let onClickMock;

  beforeEach(() => {
    handlePlacementLinkFnMock = jest.fn();
    onClickMock = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render PlacementLink with children', () => {
    const { container } = createComponent({
      children: <div />
    });
    const placementLinkProps = container.querySelector('[data-qa="placement-link"]');

    expect(placementLinkProps).toBeTruthy();
  });

  describe('onClick', () => {
    const expectedResult = {
      actionParams: undefined,
      actionToDispatch: undefined,
      contentBlockId: '',
      isChaseCombo: false,
      isChasePlacement: false,
      linkType: 'none',
      pageId: undefined,
      referrer: '',
      shouldRaiseSatelliteEvent: false,
      target: 'default'
    };

    it('should call onClick prop', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

      expect(handlePlacementLinkFnMock).toHaveBeenCalledWith(expectedResult);
    });

    describe('target', () => {
      it('should use target when available', () => {
        const { container } = createComponent({
          target: 'target'
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith({ ...expectedResult, target: "target" });
      });

      it('should use href when target unavailable', () => {
        const { container } = createComponent({
          target: '',
          href: 'href'
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith({ ...expectedResult, target: "href" });
      });

      it('should use default value when target and href unavailable', () => {
        const { container } = createComponent({
          target: '',
          href: ''
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith({ ...expectedResult, target: "" });
      });
    });

    describe('linkType', () => {
      it('should use linkType when available', () => {
        const { container } = createComponent({
          linkType: 'none'
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith(expectedResult);
      });

      it('should use placementData linkType when linkType unavailable', () => {
        const { container } = createComponent({
          linkType: null,
          placementData: {
            linkType: 'webview'
          }
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith({ ...expectedResult, linkType: "webview" });
      });

      it('should use default value when linkType and placementData linkType unavailable', () => {
        const { container } = createComponent({
          linkType: null,
          placementData: {
            linkType: null
          }
        });

        fireEvent.click(container.querySelector('[data-qa="placement-link"]'));

        expect(handlePlacementLinkFnMock).toHaveBeenCalledWith(expectedResult);
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      actionParams: undefined,
      actionToDispatch: undefined,
      children: null,
      className: null,
      contentBlockId: '',
      handlePlacementLinkFn: handlePlacementLinkFnMock,
      isChaseCombo: false,
      isChasePlacement: false,
      linkType: 'none',
      onClick: onClickMock,
      pageId: undefined,
      referrer: '',
      shouldRaiseSatelliteEvent: false,
      target: 'default'
    };
    const finalProps = { ...defaultProps, ...props };
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <PlacementLink {...finalProps} />
      </Provider>
    );
  };
});
