// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import { toggleDrawer } from 'src/homeAndNav/actions/drawerActions';
import { getAppContent, addClass, removeClass } from 'src/shared/helpers/domUtils';

type Props = {
  children: *,
  appSizeGetter: () => {
    globalHeaderHeight: number,
    appScrollTop: number
  },
  toggleDrawerFn: (state: boolean) => void,
  isDrawerOpen: boolean,
  scrollDrawerToTop: boolean,
  isJourneyBannerDisplayed: boolean,
  appOffsetTop: number
};

type State = {
  open: boolean,
  containerHeight: string,
  top: number
};

export class Drawer extends Component<Props, State> {
  state: State = {
    open: this.props.isDrawerOpen,
    containerHeight: '0',
    top: 0
  };

  componentDidMount() {
    this._toggleScrollOnAppContent();
    this._onStatusChange(this.props.scrollDrawerToTop);
  }

  componentDidUpdate(prevProps: Props) {
    this._toggleScrollOnAppContent();

    if (this.props.isJourneyBannerDisplayed !== prevProps.isJourneyBannerDisplayed) {
      this._setDrawerSizeByAppSize();
    }
  }

  _toggleScrollOnAppContent = () => {
    const appContent = getAppContent();
    const disableScrollingClass = 'disable-scrolling';

    if (!appContent) {
      return;
    }

    if (this.props.isDrawerOpen) {
      addClass(appContent, disableScrollingClass);
      this._onStatusChange(this.props.scrollDrawerToTop);
    } else {
      removeClass(appContent, disableScrollingClass);
    }
  };

  _setDrawerSizeByAppSize = () => {
    const { globalHeaderHeight = 0, appScrollTop = 0 } = this.props.appSizeGetter();
    const { appOffsetTop } = this.props;
    const drawerTop = appScrollTop > globalHeaderHeight ? 0 : globalHeaderHeight - appScrollTop + appOffsetTop;

    this.setState({
      containerHeight: `calc(100% - ${drawerTop}px)`,
      top: drawerTop
    });
  };

  _onStatusChange = (scrollTop: boolean) => {
    const { open } = this.state;

    if (open !== this.props.isDrawerOpen) {
      if (this.props.isDrawerOpen) {
        this._setDrawerSizeByAppSize();
        this.resetScrollTop();
      }
      this.setState({
        open: this.props.isDrawerOpen
      });
    }
    !scrollTop && this.resetScrollTop();
  };

  resetScrollTop = () => {
    this.refs.drawerContent.scrollTop = 0;
  };

  closeDrawer = () => {
    const { isDrawerOpen, toggleDrawerFn } = this.props;

    if (isDrawerOpen) {
      toggleDrawerFn(true);
    }
  };

  render() {
    const active = this.props.isDrawerOpen ? 'active' : '';
    const { top, containerHeight } = this.state;
    const debouncedCloseDrawerOnTouchMove = _.debounce((...args) => this.closeDrawer(...args), 1000, {
      leading: true,
      trailing: false
    });

    return (
      <div className={cx(active, 'drawer')} ref="drawer" style={{ top }}>
        <div
          className="drawer--bg disable-scrolling"
          onClick={() => this.closeDrawer()}
          ref="drawerBg"
          onTouchMove={debouncedCloseDrawerOnTouchMove}
        />
        <div id="drawerContent" className="drawer--content" ref="drawerContent" style={{ height: containerHeight }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrawerOpen: state.app.homeAndNav.drawer.isDrawerOpen,
  scrollDrawerToTop: state.app.homeAndNav.drawer.scrollDrawerToTop
});

const mapDispatchToProps = {
  toggleDrawerFn: toggleDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
