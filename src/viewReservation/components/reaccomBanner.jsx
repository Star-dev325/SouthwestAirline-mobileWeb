// @flow

import React from 'react';

import Icon from 'src/shared/components/icon';

type Props = {
  header: string,
  body: string,
  showBodyAsHtml?: boolean
};

class ReaccomBanner extends React.Component<Props> {
  render() {
    const { header, body, showBodyAsHtml = false } = this.props;

    return (
      <div className="reaccom-banner">
        <div className="reaccom-banner-container flex">
          <div className="reaccom-banner-container--alert">
            <Icon className="reaccom-banner-container--alert-icon" type={'plus-icon'}>
              !
            </Icon>
          </div>
          <b className="reaccom-banner-container--header">{header}</b>
        </div>
        {showBodyAsHtml && <p className="reaccom-banner--body py2" dangerouslySetInnerHTML={{ __html: body }} />}
        {!showBodyAsHtml && <p className="reaccom-banner--body py2">{body}</p>}
      </div>
    );
  }
}

export default ReaccomBanner;
