// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { enrollCustomerAccountForRR } from 'src/myAccount/actions/myAccountActions';
import { trackSubmitForm } from 'src/shared/analytics/actions/analyticsActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import SubHeader from 'src/shared/components/subHeader';
import RapidRewardsEnrollForm from 'src/myAccount/components/rapidRewardsEnrollForm';
import i18n from '@swa-ui/locale';

import type { Replace } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { RREnrollRequestDataType } from 'src/myAccount/flow-typed/myAccount.types';

type Props = {
  replace: Replace,
  isLoggedIn: boolean,
  minorAgeThreshold: number,
  dateOfBirth: string,
  enrollCustomerAccountForRRFn: (RREnrollRequestDataType) => Promise<*>,
  analyticsTrackSubmitFormFn: (string) => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: () => Promise<*>
};

export class RapidRewardsEnrollPage extends Component<Props> {
  _showCongratulationsPopup = () => {
    const { replace, showDialogFn, hideDialogFn } = this.props;

    showDialogFn({
      name: 'enroll-rapid-rewards-confirmation',
      title: i18n('MY_ACCOUNT__ENROLL_FOR_RAPID_REWARDS__CONFIRMATION_TITLE'),
      message: i18n('MY_ACCOUNT__ENROLL_FOR_RAPID_REWARDS__CONFIRMATION_MESSAGE'),
      buttons: [
        {
          label: 'OK',
          onClick: () =>
            hideDialogFn().then(() => {
              replace('/my-account');
            })
        }
      ]
    });
  };

  _onSubmit = ({ optInForEmailSubscriptions }: FormData) => {
    const { replace, isLoggedIn, analyticsTrackSubmitFormFn, enrollCustomerAccountForRRFn } = this.props;

    !isLoggedIn && replace('/my-account');
    analyticsTrackSubmitFormFn('my-account-enroll-for-rapid-rewards');

    enrollCustomerAccountForRRFn({ optInForEmailSubscriptions }).then(() => this._showCongratulationsPopup());
  };

  render() {
    const { dateOfBirth, minorAgeThreshold } = this.props;

    return (
      <div className="enroll-for-rapid-rewards">
        <SubHeader title={i18n('MY_ACCOUNT__ENROLL_IN_RAPID_REWARDS')} />
        <RapidRewardsEnrollForm
          formId={i18n('MY_ACCOUNT__RAPID_REWARDS_ENROLLMENT_FORM')}
          onSubmit={this._onSubmit}
          dateOfBirth={dateOfBirth}
          minorAgeThreshold={minorAgeThreshold}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  minorAgeThreshold: _.get(state, 'app.wcmContent.applicationProperties.coppa.rrEnrollment.minAgeThreshold', 13),
  dateOfBirth: _.get(state, 'app.account.accountInfo.customerInfo.birthDate')
});

const mapDispatchToProps = {
  enrollCustomerAccountForRRFn: enrollCustomerAccountForRR,
  analyticsTrackSubmitFormFn: trackSubmitForm,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(RapidRewardsEnrollPage);
