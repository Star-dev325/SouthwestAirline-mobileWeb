// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import type { Node } from 'react';

type Props = {
  isWebView?: boolean,
  children: Node
};

const ShowForWebView = (props: Props) => {
  const { isWebView, children } = props;

  return isWebView ? <div>{children}</div> : null;
};

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView')
});

export default connect(mapStateToProps, {})(ShowForWebView);
