import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Drawer } from 'src/homeAndNav/components/drawer';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';
import React from 'react';

describe('Drawer', () => {
  const appSizeGetter = jest.fn().mockReturnValue({
    globalHeaderHeight: 20,
    appScrollTop: 20
  });
  const toggleDrawerFnMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#closeDrawer', () => {
    it('should dispatch toggle drawer redux action', () => {
      const { container } = createComponent({ isDrawerOpen: true }, false);

      fireEvent.click(container.querySelector('.drawer--bg'));

      expect(toggleDrawerFnMock).toHaveBeenCalled();
    });
  });

  describe('#scrollTop', () => {
    it('should scroll drawer to top when trigger action resetDrawerScroll', () => {
      const { container } = createComponent({ scrollDrawerToTop: true }, false);

      expect(container.querySelector('.drawer--content')).toHaveStyle('height: 0');
    });

    it('should scroll drawer to top when drawer is open', () => {
      const { container } = createComponent({ isDrawerOpen: true, scrollDrawerToTop: true }, false);

      expect(container.querySelector('.drawer--content')).toHaveStyle('height: 0');
    });
  });

  describe('componentDidUpdate', () => {
    it('should call setState with correct containerHeight and top values when isJourneyBannerDisplayed value changes', () => {
      const setStateMock = jest.fn();
      const instance = React.createRef();
      const { container } = createComponent(
        { isDrawerOpen: true, isJourneyBannerDisplayed: true, appOffsetTop: 60, ref: instance },
        true
      );

      instance.current._setState = setStateMock;
      instance.current._setDrawerSizeByAppSize();

      expect(container.querySelector('.drawer--content')).toHaveStyle('height:calc(100% - 60px)');
    });
  });

  const createComponent = (props = {}, withRegularMount) => {
    const defaultProps = {
      appSizeGetter,
      children: '',
      isDrawerOpen: false,
      toggleDrawerFn: toggleDrawerFnMock,
      scrollDrawerToTop: false,
      isJourneyBannerDisplayed: false,
      appOffsetTop: 0
    };
    const state = configureMockStore()({
      router: {
        location: {
          search: ''
        }
      }
    });

    return withRegularMount
      ? render(<Drawer {...defaultProps} {...props} />)
      : integrationRender()(state, Drawer, { ...defaultProps, ...props });
  };
});
