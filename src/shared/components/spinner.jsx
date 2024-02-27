// @flow

import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { getSpinnerMessage } from 'src/shared/selectors/spinnerSelectors';
import _ from 'lodash';
import withDisableScrolling from 'src/shared/enhancers/withDisableScrolling';

type Props = {
  showSpinner: boolean,
  isWebView: boolean,
  appReady: boolean,
  spinnerMessage: ?string
};

export class Spinner extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.showSpinner !== nextProps.showSpinner || this.props.spinnerMessage !== nextProps.spinnerMessage;
  }

  render() {
    const { showSpinner, isWebView, appReady, spinnerMessage } = this.props;
    const shouldShowSpinner = isWebView ? appReady && showSpinner : showSpinner;

    const getClassName = () => cx({
      dimmer: !isWebView,
      'dimmer-web-view': isWebView,
      'dimmer-with-message': !!spinnerMessage
    });

    return (
      <div className={getClassName()} hidden={!shouldShowSpinner} data-qa="loading spinner">
        <div className="loading-spinner" />
        <img
          className="loading-spinner-img rotate"
          hidden={!isWebView}
          src="/content/mkt/images/landing_pages/ic-spinner-plane.png"
          srcSet="/content/mkt/images/landing_pages/ic-spinner-plane@2x.png 2x, /content/mkt/images/landing_pages/ic-spinner-plane@3x.png 3x"
        />
        {spinnerMessage && <div className="loading-spinner-message">{spinnerMessage}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appReady: state.app.appReady,
  isWebView: state.app.webView.isWebView,
  showSpinner: state.app.spinner.showSpinner,
  spinnerMessage: getSpinnerMessage(state)
});

const enhancers = _.flowRight(connect(mapStateToProps, {}), withDisableScrolling({ activeName: 'showSpinner' }));

export default enhancers(Spinner);
