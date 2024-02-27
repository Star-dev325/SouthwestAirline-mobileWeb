// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrollPersonalInfoForm from 'src/enroll/components/enrollPersonalInfoForm';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import ProgressionBar from 'src/shared/components/progressionBar';
import { STATUS } from 'src/shared/constants/flowConstants';
import { ENROLL_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { store } from 'src/shared/redux/createStore';

import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  analyticsTrackSubmitFormFn: (string) => void,
  fieldNameEnabledForChange?: string,
  LOYALTY_AGE_VERIFICATION: boolean,
  push: Push
};

export class EnrollPersonalInfoPage extends Component<Props> {
  _onSubmit = () => {
    const { push, analyticsTrackSubmitFormFn } = this.props;

    store.dispatch(FlowStatusActions.setFlowStatus('enroll', STATUS.IN_PROGRESS));
    analyticsTrackSubmitFormFn('enroll-personal-info');
    push(getNormalizedRoute({ routeName: 'contact' }));
  };

  render() {
    const { LOYALTY_AGE_VERIFICATION, fieldNameEnabledForChange } = this.props;

    return (
      <div>
        <ProgressionBar
          currentIconType="user"
          step={1}
          subTitles={['Personal', 'Contact', 'Security']}
          title="Personal Info"
          totalStep={3}
        />
        <EnrollPersonalInfoForm
          fieldNameEnabledForChange={fieldNameEnabledForChange}
          formId={ENROLL_PERSONAL_INFO_FORM}
          LOYALTY_AGE_VERIFICATION={LOYALTY_AGE_VERIFICATION}
          onSubmit={this._onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fieldNameEnabledForChange: state?.app?.formData?.ENROLL_PERSONAL_INFO_FORM?.fieldNameEnabledForChange,
  LOYALTY_AGE_VERIFICATION: state?.app?.toggles?.LOYALTY_AGE_VERIFICATION
});

const mapDispatchToProps = {
  analyticsTrackSubmitFormFn: AnalyticsActions.trackSubmitForm
};

export default _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EnrollPersonalInfoPage);
