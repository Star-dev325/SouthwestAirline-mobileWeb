// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import ContactInfoTravelManagerPage from 'src/shared/pages/contactInfoTravelManagerPage';
import { AIR_BOOKING_INFO_CONTACT_TRAVEL_MANAGER_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

import type { DutyOfCare } from 'src/shared/flow-typed/shared.types';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';

type Props = {
  updateContactInfoTravelManagerFn: (*) => void,
  goBack: () => void,
  dutyOfCareContact: DutyOfCare,
  isInternationalBooking: boolean,
  isLoggedIn: boolean,
  updateFormFieldDataValueFn: (*) => void,
  contactTravelManagerInfo: DutyOfCare
};

export class AirBookingDutyOfCareInfoPage extends React.Component<Props> {
  render() {
    const {
      updateContactInfoTravelManagerFn,
      goBack,
      dutyOfCareContact,
      isInternationalBooking,
      isLoggedIn,
      updateFormFieldDataValueFn,
      contactTravelManagerInfo
    } = this.props;

    return (
      <ContactInfoTravelManagerPage
        testId="ContactInfoTravelManagerPage"
        formId={AIR_BOOKING_INFO_CONTACT_TRAVEL_MANAGER_FORM}
        updateContactInfoTravelManagerFn={updateContactInfoTravelManagerFn}
        goBack={goBack}
        dutyOfCareContact={contactTravelManagerInfo || dutyOfCareContact}
        isInternationalBooking={isInternationalBooking}
        isLoggedIn={isLoggedIn}
        updateFormFieldDataValueFn={updateFormFieldDataValueFn}
        disclaimerText={dutyOfCareContact?.disclaimerText || ''}
        isAirBooking
      />
    );
  }
}

const mapDispatchToProps = {
  updateContactInfoTravelManagerFn: AirBookingActions.updateContactTravelInfoMethod,
  updateFormFieldDataValueFn: updateFormFieldDataValue
};

const mapStateToProps = (state) => ({
  dutyOfCareContact: _.get(state, 'app.airBooking.accountInfo.dutyOfCareContact'),
  isInternationalBooking: _.get(state, 'app.airBooking.isInternationalBooking'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  contactTravelManagerInfo: _.get(state, 'app.airBooking.contactTravelInfo')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-booking-contact-info-travel-manager-page')
);

export default enhancers(AirBookingDutyOfCareInfoPage);
