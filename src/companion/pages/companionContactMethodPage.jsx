// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as CompanionActions from 'src/companion/actions/companionActions';
import { isAlreadyHasContactMethod } from 'src/companion/selectors/contactMethodPageSelectors';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import { COMPANION_CONTACT_METHOD_FORM } from 'src/shared/constants/formIds';

import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';

type Props = {
  updateContactMethodFn: (*) => void,
  goBack: () => void,
  contactMethodInfo: ?ContactMethodInfo,
  isInternationalBooking: boolean,
  isAlreadyHasContactMethod: boolean,
  alreadyHasContactMethod: boolean,
  isLoggedIn: boolean
};

export class companionContactMethodPage extends React.Component<Props> {
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
        formId={COMPANION_CONTACT_METHOD_FORM}
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
  updateContactMethodFn: CompanionActions.updateContactMethod
};

const mapStateToProps = (state) => ({
  alreadyHasContactMethod: isAlreadyHasContactMethod(state),
  contactMethodInfo: _.get(state, 'app.companion.contactMethodInfo'),
  isInternationalBooking: _.get(state, 'app.companion.isInternationalBooking'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(companionContactMethodPage);
