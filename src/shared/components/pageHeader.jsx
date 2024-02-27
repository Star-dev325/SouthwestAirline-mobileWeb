// @flow

import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';

import ErrorHeaderContainer from 'src/shared/components/errorHeader/errorHeaderContainer';

import type { Node } from 'react';
import type { ElementRef } from 'src/shared/flow-typed/shared.types';

type Props = {
  hidden?: boolean,
  noPadding?: boolean,
  noBottomPadding?: boolean,
  className?: string,
  children?: Node,
  isWebView: boolean
};

export const PageHeader = (props: Props) => {
  const { hidden, noPadding, noBottomPadding, className, isWebView, children } = props;

  const classes = cx(
    {
      'page-header': true,
      hidden,
      'page-header--no-padding': noPadding,
      'page-header--no-bottom-padding': noBottomPadding && isWebView
    },
    className
  );

  const setStickyHeaderPadding = (ref: ElementRef) => {
    const reactModal = !_.isEmpty(document.getElementsByClassName('ReactModalPortal'));

    const pageHeader = reactModal
      ? document.querySelector('.ReactModalPortal .action-bar')
      : document.getElementById('webview-page-header');
    const height = _.get(pageHeader, 'offsetHeight', 0);

    _.set(ref, 'style.paddingTop', `${height}px`);
  };

  return (
    <div>
      <div className={classes} id={isWebView ? 'webview-page-header' : ''}>
        {children}
      </div>
      {isWebView && <div ref={setStickyHeaderPadding} />}
      <ErrorHeaderContainer />
    </div>
  );
};

PageHeader.defaultProps = {
  hidden: false,
  noPadding: false
};

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView', false)
});

const enhancers = _.flowRight(connect(mapStateToProps, {}));

export default enhancers(PageHeader);
