// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import Icon from 'src/shared/components/icon';
import EarlyBird from 'src/shared/constants/earlyBird';
import i18n from '@swa-ui/locale';

import type { EarlyBirdPassengerType } from 'src/earlyBird/flow-typed/earlyBird.types';

const { STATUS } = EarlyBird;

export type onClickIneligibleLabelType = (message: string) => void;
export type onChangeEBCheckboxType = () => void;

type Props = {
  passenger: EarlyBirdPassengerType,
  fieldName: string,
  onClickIneligibleLabel: onClickIneligibleLabelType,
  onChangeEBCheckbox: onChangeEBCheckboxType
};

const EarlyBirdPassengerCheckbox = (props: Props) => {
  const {
    passenger: { name, canPurchaseEarlyBird, accountNumber, decisionDescription },
    fieldName,
    onClickIneligibleLabel,
    onChangeEBCheckbox
  } = props;

  return (
    <div className="early-bird-passenger-checkbox">
      {canPurchaseEarlyBird && (
        <FormCheckboxField
          onChange={onChangeEBCheckbox}
          name={fieldName}
          className="checkbox-button button button--fluid"
          size="large"
          clickableChildren
        >
          <div
            className={cx('early-bird-passenger-checkbox--personal-info', {
              'early-bird-passenger-checkbox--personal-info_disabled': !canPurchaseEarlyBird
            })}
          >
            <p className="early-bird-passenger-checkbox--name">{name}</p>
            {accountNumber && <p className="early-bird-passenger-checkbox--account-number">{accountNumber}</p>}
          </div>
        </FormCheckboxField>
      )}
      {!canPurchaseEarlyBird && (
        <div className="early-bird-passenger-checkbox--disabled-passenger">
          <div className="early-bird-passenger-checkbox--personal-info_disabled">
            <p
              className={cx('early-bird-passenger-checkbox--name', {
                'early-bird-passenger-checkbox--name_no-account-number': _.isEmpty(accountNumber)
              })}
            >
              {name}
            </p>
            {accountNumber && <p className="early-bird-passenger-checkbox--account-number">{accountNumber}</p>}
          </div>
          {decisionDescription === STATUS.A_LIST && (
            <div
              className="early-bird-passenger-checkbox--ineligible-label"
              onClick={() => onClickIneligibleLabel(i18n('EARLY_BIRD_INELIGIBLE_FOR_A_LIST'))}
            >
              <label>{decisionDescription}</label>
            </div>
          )}
          {decisionDescription === STATUS.PURCHASED && (
            <div className="early-bird-passenger-checkbox--ineligible-label">
              <Icon
                onClick={() => onClickIneligibleLabel(i18n('EARLY_BIRD_INELIGIBLE_FOR_ALREADY_PURCHASE'))}
                type="early-bird"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EarlyBirdPassengerCheckbox;
