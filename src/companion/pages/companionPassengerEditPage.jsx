// @flow
import React from 'react';
import _ from 'lodash';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import CompanionPassengerForm from 'src/companion/components/companionPassengerForm';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { connect } from 'react-redux';
import { COMPANION_PASSENGER_PERSONAL_INFO_EDIT_FORM } from 'src/shared/constants/formIds';
import * as CompanionActions from 'src/companion/actions/companionActions';
import { getCompanionInfo } from 'src/companion/selectors/companionPassengerPageSelectors';
import type { CompanionPassengerFormData, CompanionBasicInfo } from 'src/companion/flow-typed/companion.types';
import { getCompanionContactMethodContent } from 'src/companion/selectors/companionContactMethodSelectors';
import type { Push, SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

type Props = {
  saveCompanionPassengerFn: (CompanionPassengerFormData) => void,
  formData: CompanionPassengerFormData,
  companionInfo: CompanionBasicInfo,
  declineNotifications: boolean,
  isInternationalBooking: boolean,
  contactMethodContent: ?string,
  push: Push,
  goBack: () => void,
  specialAssistanceSelections?: SpecialAssistanceType
};

export class CompanionPassengerEditPage extends React.Component<Props> {
  _onSubmit = (passengerInfo: CompanionPassengerFormData) => {
    this.props.saveCompanionPassengerFn(passengerInfo);
    this.props.goBack();
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
      <div>
        <CompanionPassengerForm
          companionInfo={companionInfo}
          initialFormData={companionPassengerFormData}
          contactMethodContent={contactMethodContent}
          declineNotifications={declineNotifications}
          formId={COMPANION_PASSENGER_PERSONAL_INFO_EDIT_FORM}
          onSubmit={this._onSubmit}
          clickContactMethodFn={this._goToContactMethod}
          name="companion-passenger-edit-form"
          showHeaderButton
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
  declineNotifications: _.toBoolean(_.get(state.app.companion, 'contactMethodInfo.declineNotifications')),
  contactMethodInfo: state.app.companion.contactMethodInfo,
  isInternationalBooking: state.app.companion.isInternationalBooking,
  contactMethodContent: getCompanionContactMethodContent(state),
  specialAssistanceSelections: state.app.companion.specialAssistance
});

const mapDispatchToProps = {
  saveCompanionPassengerFn: CompanionActions.saveCompanionPassenger
};

export default _.flowRight(
  withBodyClass('hide-header'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CompanionPassengerEditPage);
