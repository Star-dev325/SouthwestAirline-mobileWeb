// @flow
import React from 'react';
import { RAPID_REWARDS_VISA_ID } from 'src/shared/constants/creditCardConstants';
import i18n from '@swa-ui/locale';
import CreditCardRadioField from 'src/shared/form/fields/creditCardRadioField';
import withFields from 'src/shared/form/enhancers/withFields';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  editMode: boolean,
  formData: FormData,
  justAdded?: boolean
};

const chaseInstantCreditCard = {
  savedCreditCardId: RAPID_REWARDS_VISA_ID,
  type: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
  name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__RAPID_REWARDS_VISA')
};

const ChaseInstantCreditCardFields = (props: Props) => {
  const { justAdded, editMode } = props;

  return (
    <div className="rapid-rewards-credit-card">
      <span className="saved-credit-cards--title">{i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__RAPID_REWARDS_VISA')}</span>
      <CreditCardRadioField
        name="selectedCardId"
        disabled={editMode}
        creditCard={chaseInstantCreditCard}
        fieldClassName="saved-credit-cards--item-field"
        justAdded={justAdded}
      />
    </div>
  );
};

ChaseInstantCreditCardFields.defaultProps = {
  editMode: false
};

export default withFields(ChaseInstantCreditCardFields);
