// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import BillingAddressForm from 'src/shared/components/billingAddressForm';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { transformContactInfoToBillingAddressFormData } from 'src/shared/transformers/billingAddressTransformer';
import { AIRBOOKING_BILLING_ADDRESS_FORM } from 'src/shared/constants/formIds';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { Push, AccountContactInfoType, BillingAddressFormType } from 'src/shared/flow-typed/shared.types';

type Props = {
  push: Push,
  goBack: () => void,
  contactInfo?: AccountContactInfoType,
  travelFundsAddress?: BillingAddressFormType,
  saveTravelFundsBillingAddressFn: (BillingAddressFormType) => void
};

export class AirBookingBillingAddressPage extends React.Component<Props> {
  _getInitialFormData = () => {
    const { contactInfo, travelFundsAddress } = this.props;

    if (contactInfo && _.isEmpty(travelFundsAddress)) {
      return transformContactInfoToBillingAddressFormData(contactInfo);
    } else if (travelFundsAddress) {
      return travelFundsAddress;
    }
  };

  _onSubmit = (formData: FormData) => {
    const { goBack, saveTravelFundsBillingAddressFn } = this.props;

    saveTravelFundsBillingAddressFn(formData);
    goBack();
  };

  render() {
    const { goBack } = this.props;
    const initialFormData = this._getInitialFormData();

    return (
      <div>
        <BillingAddressForm
          initialFormData={initialFormData}
          formId={AIRBOOKING_BILLING_ADDRESS_FORM}
          onSubmit={this._onSubmit}
          goBack={goBack}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contactInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
  travelFundsAddress: _.get(state, 'app.airBooking.purchaseSummaryPage.travelFundsAddress')
});

const mapDispatchToProps = {
  saveTravelFundsBillingAddressFn: AirBookingActions.saveTravelFundsBillingAddress
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirBookingBillingAddressPage);
