// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import NavItemLink from 'src/shared/components/navItemLink';
import withField from 'src/shared/form/enhancers/withField';
import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  onNavItemClick: () => void,
  rapidRewardsApplied: boolean
};

const ApplyRapidRewardsNavItemField = (props: Props) => {
  const { onNavItemClick, rapidRewardsApplied } = props;

  return (
    <div data-qa="review-form--apply-rapid-rewards-nav-item">
      <NavItemLink
        onClick={onNavItemClick}
        className={`nav-item-field ${cx({ 'no-points-selected': !rapidRewardsApplied })}`}
        icon={'keyboard-arrow-right'}
        iconClassName={'nav-item-link--icon'}
      >
        <span>{rapidRewardsApplied ? i18n('SPLIT_PAY_PAGE__CASH_POINTS_APPLIED_TEXT') : i18n('SPLIT_PAY_FORM__SELECT_TEXT') }</span>
      </NavItemLink>
    </div>
  );
};

export default withField()(ApplyRapidRewardsNavItemField);
