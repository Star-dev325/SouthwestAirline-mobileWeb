// @flow
import React, { Component } from 'react';

type Props = {
  onClick: (*) => void,
  showLoading: boolean
};

class LowFareDisplayMore extends Component<Props> {
  render() {
    const { showLoading, onClick } = this.props;

    return (
      <div
        className="low-fare-calendar--fetch-prev-next"
        onClick={() => !showLoading && onClick()}
      >
        {
          showLoading &&
          <img
            className="lfc-ic-load-more"
            src="/content/mkt/images/landing_pages/loadingEllipses.gif"
          />
        }
        {
          !showLoading && 
          <img
            className="lfc-ic-load-more"
            src="/content/mkt/images/landing_pages/ic-load-more.png"
            srcSet="/content/mkt/images/landing_pages/ic-load-more@2x.png 2x, /content/mkt/images/landing_pages/ic-load-more@3x.png 3x"
          />
        }
      </div>
    );
  }
}

export default LowFareDisplayMore;
