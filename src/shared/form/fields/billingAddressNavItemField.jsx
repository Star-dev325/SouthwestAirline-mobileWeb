// @flow

import React from 'react';

import NavItemLink from 'src/shared/components/navItemLink';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  onNavItemClick: () => void,
  billingAddressComplete: boolean
};

const BillingAddressNavItemField = (props: Props) => {
  const { onNavItemClick, billingAddressComplete } = props;

  return (
    <div data-qa="review-form--billing-address-nav-item">
      {billingAddressComplete && (
        <NavItemLink
          onClick={onNavItemClick}
          className={'nav-item-field'}
          icon={'keyboard-arrow-right'}
          iconClassName={'nav-item-link--icon'}
        >
          {<span className="pdkblue">Complete</span>}
        </NavItemLink>
      )}
      {!billingAddressComplete && (
        <NavItemLink
          onClick={onNavItemClick}
          className={'nav-item-field'}
          icon={'exclamation-circle warning'}
          iconClassName={'nav-item-link--bang-icon'}
        >
          {<span className="gray3">Required</span>}
        </NavItemLink>
      )}
    </div>
  );
};

export default withField()(BillingAddressNavItemField);
