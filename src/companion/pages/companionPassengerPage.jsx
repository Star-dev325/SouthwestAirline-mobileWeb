// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ProgressionBar from 'src/shared/components/progressionBar';
import CompanionPassengerForm from 'src/companion/components/companionPassengerForm';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import { COMPANION_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import { getCompanionInfo } from 'src/companion/selectors/companionPassengerPageSelectors';
import type { CompanionPassengerFormData, CompanionBasicInfo } from 'src/companion/flow-typed/companion.types';
import { getCompanionContactMethodContent } from 'src/companion/selectors/companionContactMethodSelectors';
import type { Push, SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

type Props = {
  saveCompanionPassengerFn: (CompanionPassengerFormData) => void,
  formData: CompanionPassengerFormData,
  companionInfo: CompanionBasicInfo,
  contactMethodContent: ?string,
  declineNotifications: boolean,
  isInternationalBooking: boolean,
  push: Push,
  fetchSavedCreditCardsAndGoToNextPageFn: (string) => void,
  specialAssistanceSelections?: SpecialAssistanceType
};

export class CompanionPassengerPage extends React.Component<Props> {
  _onSubmit = (passengerInfo: CompanionPassengerFormData) => {
    const { saveCompanionPassengerFn } = this.props;

    saveCompanionPassengerFn(passengerInfo);

    this.props.fetchSavedCreditCardsAndGoToNextPageFn('/companion/purchase');
  };

  _goToContactMethod = () => {
    this.props.push('/companion/contact-method');
  };

  _goToSpecialAssistance = () => {
    this.props.push(`/companion/special-assistance`);
  };

  render() {
    const {
      companionInfo,
      formData,
      contactMethodContent,
      declineNotifications,
      isInternationalBooking,
      specialAssistanceSelections
    } = this.props;
    const companionPassengerFormData = { ...formData, contactMethodContent };

    return (
      <div className="companion-passenger">
        <ProgressionBar totalStep={3} step={2} title="Companion" currentIconType="airplane" />
        <CompanionPassengerForm
          companionInfo={companionInfo}
          initialFormData={companionPassengerFormData}
          clickContactMethodFn={this._goToContactMethod}
          contactMethodContent={contactMethodContent}
          declineNotifications={declineNotifications}
          formId={COMPANION_PASSENGER_PERSONAL_INFO_FORM}
          onSubmit={this._onSubmit}
          showContinueButton
          isInternationalBooking={isInternationalBooking}
          clickSpecialAssistanceFn={this._goToSpecialAssistance}
          specialAssistanceSelections={specialAssistanceSelections}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companionInfo: getCompanionInfo(state),
  formData: state.app.companion.companionPassengerPage.formData,
  isInternationalBooking: state.app.companion.isInternationalBooking,
  declineNotifications: _.toBoolean(_.get(state.app.companion, 'contactMethodInfo.declineNotifications')),
  contactMethodContent: getCompanionContactMethodContent(state),
  specialAssistanceSelections: state.app.companion.specialAssistance
});

const mapDispatchToProps = {
  saveCompanionPassengerFn: CompanionActions.saveCompanionPassenger,
  fetchSavedCreditCardsAndGoToNextPageFn: CreditCardActions.fetchSavedCreditCardsAndGoToNextPage
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(CompanionPassengerPage);
