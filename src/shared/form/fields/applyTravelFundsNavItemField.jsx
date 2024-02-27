// @flow

import React from 'react';
import cx from 'classnames';

import NavItemLink from 'src/shared/components/navItemLink';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  onNavItemClick: () => void,
  travelFundsApplied: boolean
};

const ApplyTravelFundsNavItemField = (props: Props) => {
  const { onNavItemClick, travelFundsApplied } = props;

  return (
    <div data-qa="review-form--apply-travel-funds-nav-item">
      <NavItemLink
        onClick={onNavItemClick}
        className={`nav-item-field ${cx({ 'no-funds-selected': !travelFundsApplied })}`}
        icon={'keyboard-arrow-right'}
        iconClassName={'nav-item-link--icon'}
      >
        <span>{travelFundsApplied ? 'Funds Applied' : 'Select (optional)'}</span>
      </NavItemLink>
    </div>
  );
};

export default withField()(ApplyTravelFundsNavItemField);
