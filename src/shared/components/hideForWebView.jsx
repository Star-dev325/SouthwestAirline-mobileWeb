// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import type { Node } from 'react';

type Props = {
  isWebView?: boolean,
  children: Node
};

const HideForWebView = (props: Props) => {
  const { isWebView, children } = props;

  if (!isWebView) {
    return <div>{children}</div>;
  }

  return null;
};

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView')
});

export default connect(mapStateToProps, {})(HideForWebView);
