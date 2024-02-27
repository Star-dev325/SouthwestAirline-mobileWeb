// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import CheckboxButton from 'src/shared/components/checkboxButton';
import SavedCreditCardRadioInput from 'src/shared/components/savedCreditCardRadioInput';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { PaymentSavedCreditCard } from 'src/shared/flow-typed/shared.types';

type Props = {
  editMode: boolean,
  isChecked: boolean,
  onCheck?: (creditCardId: string) => void,
  creditCard: PaymentSavedCreditCard,
  disabled: boolean,
  hidden?: boolean,
  justAdded?: boolean,
  showRadioButton?: boolean,
  additionalInfoMessage?: string
} & FieldProps;

const CreditCardRadioField = (props: Props) => {
  const {
    value,
    editMode,
    isChecked,
    onCheck,
    onChange,
    creditCard,
    disabled,
    hidden,
    justAdded,
    showRadioButton,
    additionalInfoMessage
  } = props;
  const onClickCheckBox = () => onCheck && onCheck(creditCard.savedCreditCardId);
  const onSavedCreditCardRadioInputClicked = disabled
    ? _.noop
    : editMode
      ? onClickCheckBox
      : () => onChange(creditCard.savedCreditCardId);

  return (
    <div className={cx({ 'saved-credit-cards--item_edit-mode': editMode, hide: hidden })}>
      {!disabled && editMode && <CheckboxButton defaultChecked={isChecked} onChange={onClickCheckBox} />}
      <SavedCreditCardRadioInput
        showRadioButton={showRadioButton && !disabled && !editMode}
        onClick={onSavedCreditCardRadioInputClicked}
        selected={creditCard.savedCreditCardId === value}
        creditCardInfo={creditCard}
        additionalInfoMessage={additionalInfoMessage}
        disabled={disabled}
        justAdded={justAdded}
      />
    </div>
  );
};

CreditCardRadioField.defaultProps = {
  editMode: false,
  isChecked: false,
  disabled: false,
  showRadioButton: true
};

export default withField()(CreditCardRadioField);
