// @flow

import React from 'react';

import Icon from 'src/shared/components/icon';
import { scrollToTop } from 'src/shared/helpers/uiHelper';

import type { Node } from 'react';

type Props = {
  header?: string,
  body?: Node,
  learnMoreUrl?: string,
  iconTypeColor?: string,
  className?: string,
  iconType?: string,
  shouldScrollToTop?: boolean
};

class InfoBanner extends React.Component<Props> {
  componentDidUpdate() {
    this.props.shouldScrollToTop && scrollToTop();
  }

  render() {
    const { header, body, learnMoreUrl, iconTypeColor, className, iconType } = this.props;

    const icon = iconType ? iconType : `exclamation-circle ${iconTypeColor ? iconTypeColor : 'warning'}`;

    return (
      <div className={`info-banner ${className ? className : ''}`}>
        <div className="info-banner--alert">
          <Icon type={icon} />
        </div>
        <div className="info-banner-container">
          <b className="info-banner-container--header">{header}</b>
          <p className="info-banner-container--body">{body}</p>
          <div className="info-banner-container--link">
            {learnMoreUrl && (
              <a href={learnMoreUrl} target="_blank">
                Learn More <Icon className="pblue xxlarge learn-more--icon" type="keyboard-arrow-right" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoBanner;
