// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrollContactInfoForm from 'src/enroll/components/enrollContactInfoForm';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import ProgressionBar from 'src/shared/components/progressionBar';
import { ENROLL_CONTACT_INFO_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  analyticsTrackSubmitFormFn: (string) => void,
  push: Push
};

export class EnrollContactInfoPage extends Component<Props> {
  _onSubmit = () => {
    const { push, analyticsTrackSubmitFormFn } = this.props;

    analyticsTrackSubmitFormFn('enroll-contact-info');
    push(getNormalizedRoute({ routeName: 'security' }));
  };

  render() {
    return (
      <div>
        <ProgressionBar
          currentIconType="user"
          step={2}
          subTitles={['Personal', 'Contact', 'Security']}
          title="Contact Info"
          totalStep={3}
        />
        <EnrollContactInfoForm formId={ENROLL_CONTACT_INFO_FORM} onSubmit={this._onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  analyticsTrackSubmitFormFn: AnalyticsActions.trackSubmitForm
};

export default _.flowRight(withConnectedReactRouter, connect(null, mapDispatchToProps))(EnrollContactInfoPage);
