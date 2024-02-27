// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { isAlreadyHasContactMethod } from 'src/airBooking/selectors/contactMethodPageSelectors';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import { AIR_BOOKING_CONTACT_METHOD_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';

type Props = {
  updateContactMethodFn: (*) => void,
  goBack: () => void,
  contactMethodInfo: ?ContactMethodInfo,
  isInternationalBooking: boolean,
  alreadyHasContactMethod: boolean,
  isLoggedIn: boolean
};

export class AirBookingContactMethodPage extends React.Component<Props> {
  render() {
    const {
      updateContactMethodFn,
      goBack,
      contactMethodInfo,
      isInternationalBooking,
      alreadyHasContactMethod,
      isLoggedIn
    } = this.props;

    return (
      <ContactMethodPage
        formId={AIR_BOOKING_CONTACT_METHOD_FORM}
        updateContactMethodFn={updateContactMethodFn}
        goBack={goBack}
        contactMethodInfo={contactMethodInfo}
        isInternationalBooking={isInternationalBooking}
        isAlreadyHasContactMethod={alreadyHasContactMethod}
        isLoggedIn={isLoggedIn}
        isAirBooking
      />
    );
  }
}

const mapDispatchToProps = {
  updateContactMethodFn: AirBookingActions.updateContactMethod
};

const mapStateToProps = (state) => ({
  alreadyHasContactMethod: isAlreadyHasContactMethod(state),
  contactMethodInfo: _.get(state, 'app.airBooking.contactMethodInfo'),
  isInternationalBooking: _.get(state, 'app.airBooking.isInternationalBooking'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-booking-contact-method-page')
);

export default enhancers(AirBookingContactMethodPage);
