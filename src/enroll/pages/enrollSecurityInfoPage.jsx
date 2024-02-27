// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ProgressionBar from 'src/shared/components/progressionBar';
import * as EnrollActions from 'src/enroll/actions/enrollActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import EnrollSecurityInfoForm from 'src/enroll/components/enrollSecurityInfoForm';
import { transformToEnrollRequest } from 'src/enroll/transformers/enrollmentTransformer';
import {
  ENROLL_CONTACT_INFO_FORM,
  ENROLL_PERSONAL_INFO_FORM,
  ENROLL_SECURITY_INFO_FORM
} from 'src/shared/constants/formIds';

import type { CreateUserAccountType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  minorAgeThreshold: number,
  dateOfBirth: string,
  enrollSecurityQuestions: Array<string>,
  getEnrollSecurityQuestionsFn: () => void,
  createUserAccountFn: (request: CreateUserAccountType) => void,
  personalInfoData: FormData,
  contactInfoData: FormData,
  securityInfoData: FormData,
  analyticsTrackSubmitFormFn: (string) => void,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void
};

export class EnrollSecurityInfoPage extends Component<Props> {
  componentDidMount() {
    const { getEnrollSecurityQuestionsFn } = this.props;

    getEnrollSecurityQuestionsFn();
  }

  _onSubmit = () => {
    const { personalInfoData, contactInfoData, securityInfoData, createUserAccountFn, analyticsTrackSubmitFormFn } =
      this.props;
    const request = transformToEnrollRequest({ personalInfoData, contactInfoData, securityInfoData });

    createUserAccountFn(request);
    analyticsTrackSubmitFormFn('enroll-security-info');
  };

  _clearSecurityFields = () => {
    const { updateFormDataValueFn } = this.props;

    updateFormDataValueFn(ENROLL_SECURITY_INFO_FORM, {
      password: '',
      confirmedPassword: '',
      answer1: '',
      answer2: ''
    });
  };

  render() {
    const { enrollSecurityQuestions, dateOfBirth, minorAgeThreshold } = this.props;

    return (
      <div>
        <ProgressionBar
          step={3}
          totalStep={3}
          title="Security Info"
          subTitles={['Personal', 'Contact', 'Security']}
          currentIconType="user"
        />
        <EnrollSecurityInfoForm
          formId={ENROLL_SECURITY_INFO_FORM}
          securityQuestions={enrollSecurityQuestions}
          minorAgeThreshold={minorAgeThreshold}
          dateOfBirth={dateOfBirth}
          onSubmit={this._onSubmit}
          onValidationFailed={this._clearSecurityFields}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  minorAgeThreshold: _.get(state, 'app.wcmContent.applicationProperties.coppa.rrEnrollment.minAgeThreshold', 13),
  dateOfBirth: _.get(state, `app.formData.${ENROLL_PERSONAL_INFO_FORM}.data.dateOfBirth`),
  enrollSecurityQuestions: _.get(state, 'app.enroll.securityQuestions'),
  personalInfoData: _.get(state, `app.formData.${ENROLL_PERSONAL_INFO_FORM}.data`),
  contactInfoData: _.get(state, `app.formData.${ENROLL_CONTACT_INFO_FORM}.data`),
  securityInfoData: _.get(state, `app.formData.${ENROLL_SECURITY_INFO_FORM}.data`)
});

const mapDispatchToProps = {
  getEnrollSecurityQuestionsFn: EnrollActions.getSecurityQuestions,
  createUserAccountFn: EnrollActions.createUserAccount,
  analyticsTrackSubmitFormFn: AnalyticsActions.trackSubmitForm,
  updateFormDataValueFn: FormDataActions.updateFormDataValue
};

export default _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EnrollSecurityInfoPage);
