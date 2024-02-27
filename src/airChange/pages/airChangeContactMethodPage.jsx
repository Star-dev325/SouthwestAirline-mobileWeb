// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import { isAlreadyHasContactMethod } from 'src/airChange/selectors/contactMethodPageSelectors';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import { AIR_CHANGE_CONTACT_METHOD_FORM } from 'src/shared/constants/formIds';

import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';

type Props = {
  updateContactMethodFn: (*) => void,
  goBack: () => void,
  contactMethodInfo: ?ContactMethodInfo,
  isInternationalBooking: boolean,
  alreadyHasContactMethod: boolean,
  isLoggedIn: boolean
};

export class AirChangeContactMethodPage extends React.Component<Props> {
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
        formId={AIR_CHANGE_CONTACT_METHOD_FORM}
        updateContactMethodFn={updateContactMethodFn}
        goBack={goBack}
        contactMethodInfo={contactMethodInfo}
        isInternationalBooking={isInternationalBooking}
        isAlreadyHasContactMethod={alreadyHasContactMethod}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

const mapDispatchToProps = {
  updateContactMethodFn: AirChangeActions.updateContactMethod
};

const mapStateToProps = (state) => ({
  alreadyHasContactMethod: isAlreadyHasContactMethod(state),
  contactMethodInfo: _.get(state, 'app.airChange.contactMethodInfo'),
  isInternationalBooking: _.get(state, 'app.airChange.changePricingPage.response._meta.isInternational'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeContactMethodPage);
