// @flow
import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';

import PageHeader from 'src/shared/components/pageHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import SubscriptionDetails from 'src/enroll/components/subscriptionDetails';

type Props = {
  subscriptionTitle: string
};

export class SubscriptionDetailsPage extends React.Component<Props> {
  static defaultProps = {
    subscriptionTitle: 'Subscription Details'
  };

  render = () => {
    const { subscriptionTitle } = this.props;

    return (
      <div className="subscription-details-page">
        <PageHeader>
          <span className="header">{subscriptionTitle}</span>
        </PageHeader>

        <SubscriptionDetails />
      </div>
    );
  };
}

export default _.flowRight([withRouter, withBodyClass(['subscription-detail', 'hide-header'])])(
  SubscriptionDetailsPage
);
