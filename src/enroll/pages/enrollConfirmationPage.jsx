// @flow
import React, { Component } from 'react';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ENROLL_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import Container from 'src/shared/components/container';
import Message from 'src/shared/components/message';
import Icon from 'src/shared/components/icon';
import SubHeader from 'src/shared/components/subHeader';
import i18n from '@swa-ui/locale';

import type { Push } from 'src/shared/flow-typed/shared.types';

type PersonalInfoType = {
  firstName: string,
  lastName: string
};

type Props = {
  personalInfo: PersonalInfoType,
  accountNumber: string,
  push: Push
};

export class EnrollConfirmationPage extends Component<Props> {
  _onClickLoginButton = (evt: Event) => {
    evt.preventDefault();
    this.props.push(buildPathWithParamAndQuery('/login', null, { to: '/', simpleLogin: true, withPoints: false }));
  };

  render() {
    const {
      personalInfo: { firstName, lastName },
      accountNumber
    } = this.props;
    const fullName = [firstName, lastName].join(' ');

    return (
      <div className="enroll-confirmation-page">
        <div className="enroll-confirmation__bg">
          <SubHeader title="Confirmation" />
          <Container>
            <Message status="success" size="huge">
              {i18n('ENROLL_WELCOME')}, {firstName}!
            </Message>

            <p className="congratulation-text">
              {i18n('ENROLL_CONGRATULATION_TEXT_1')}
              <sup>®</sup>
              {i18n('ENROLL_CONGRATULATION_TEXT_2')}
            </p>

            <div className="confirmation-cards-page--wrapper">
              <div className="enroll-confirmation-page--cards">
                <img
                  src="/content/mkt/images/landing_pages/swa_logo_light.svg"
                  className="enroll-confirmation-page--cards-logo"
                />
                <span className="enroll-confirmation-page--cards-tm">{i18n('ENROLL_RAPID_REWARDS')}</span>
                <div className="enroll-confirmation-page--cards-user-info">
                  <div className="username">{fullName}</div>
                  <div className="account-number">{accountNumber}</div>
                </div>
              </div>
            </div>
            <div className="goto-login" onClick={this._onClickLoginButton}>
              <span>{i18n('ENROLL_LOG_IN')}</span>
              <Icon type="keyboard-arrow-right" />
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  personalInfo: {
    firstName: _.get(state, `app.formData.${ENROLL_PERSONAL_INFO_FORM}.data.firstName`),
    lastName: _.get(state, `app.formData.${ENROLL_PERSONAL_INFO_FORM}.data.lastName`)
  },
  accountNumber: _.get(state, 'app.account.accountNumber')
});

export default _.flowRight(withConnectedReactRouter, connect(mapStateToProps, {}))(EnrollConfirmationPage);
