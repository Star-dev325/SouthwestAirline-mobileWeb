// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as CompanionActions from 'src/companion/actions/companionActions';
import BillingAddressForm from 'src/shared/components/billingAddressForm';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { transformContactInfoToBillingAddressFormData } from 'src/shared/transformers/billingAddressTransformer';
import { COMPANION_BILLING_ADDRESS_FORM } from 'src/shared/constants/formIds';

import type { Push, AccountContactInfoType, BillingAddressFormType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  goBack: () => void,
  push: Push,
  travelFundsAddress?: BillingAddressFormType,
  contactInfo?: AccountContactInfoType,
  saveTravelFundsBillingAddressFn: (BillingAddressFormType) => void
};

export class CompanionBillingAddressPage extends React.Component<Props> {
  _buildInitialFormData = () => {
    const { travelFundsAddress, contactInfo } = this.props;

    if (_.isEmpty(travelFundsAddress) && contactInfo) {
      return transformContactInfoToBillingAddressFormData(contactInfo);
    } else if (travelFundsAddress) {
      return travelFundsAddress;
    }
  };

  _onSubmit = (billingAddressFormData: FormData) => {
    const { saveTravelFundsBillingAddressFn, goBack } = this.props;

    saveTravelFundsBillingAddressFn(billingAddressFormData);
    goBack();
  };

  render() {
    const initialFormData = this._buildInitialFormData();

    return (
      <div>
        <BillingAddressForm
          initialFormData={initialFormData}
          formId={COMPANION_BILLING_ADDRESS_FORM}
          onSubmit={this._onSubmit}
          goBack={this.props.goBack}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  travelFundsAddress: _.get(state, 'app.companion.travelFundsAddress'),
  contactInfo: _.get(state, 'app.account.accountInfo.contactInfo')
});

const mapDispatchToProps = {
  saveTravelFundsBillingAddressFn: CompanionActions.saveTravelFundsBillingAddress
};

const enhancers = _.flowRight(
  withHideGlobalHeader,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CompanionBillingAddressPage);
