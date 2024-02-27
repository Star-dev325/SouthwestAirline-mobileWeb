// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = { upsellSuccessMessage: { header: string, body: string } };

const UpsellSuccessWidget = ({ upsellSuccessMessage: { header, body } }: Props) => (
  <div className="upsell-success-widget">
    <div className="upsell-success-widget--header-container">
      <Icon className="upsell-success-widget--icon" type="check-circle" />
      <b className="upsell-success-widget--header">{header}</b>
    </div>
    <p className="upsell-success-widget--body">{body}</p>
  </div>
);

export default UpsellSuccessWidget;
