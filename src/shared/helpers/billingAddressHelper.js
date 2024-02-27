// @flow
import _ from 'lodash';

import type { BillingAddressFormType } from 'src/shared/flow-typed/shared.types';

export const isBillingAddressComplete = (billingAddress: ?BillingAddressFormType) =>
  !(
    _.isEmpty(billingAddress) ||
    _.isEmpty(_.get(billingAddress, 'isoCountryCode')) ||
    _.isEmpty(_.get(billingAddress, 'addressLine1')) ||
    _.isEmpty(_.get(billingAddress, 'city')) ||
    _.isEmpty(_.get(billingAddress, 'stateProvinceRegion')) ||
    _.isEmpty(_.get(billingAddress, 'zipOrPostalCode')) ||
    _.isEmpty(_.get(billingAddress, 'phoneCountryCode')) ||
    _.isEmpty(_.get(billingAddress, 'phoneNumber'))
  );
