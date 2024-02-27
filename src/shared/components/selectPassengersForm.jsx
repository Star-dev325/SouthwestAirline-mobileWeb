// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import PassengerCheckbox from 'src/shared/components/passengerCheckbox';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import selectPassengersFormValidator from 'src/shared/form/formValidators/selectPassengersFormValidator';
import { getSelectedPassengerIds } from 'src/shared/helpers/selectPassengersHelper';
import type { SplitPnrDetailsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formData: FormData,
  formId: string,
  onPassengerSelectedFn: (string, boolean) => void,
  onSubmit: () => void,
  showBoundSelection: boolean,
  showEmailFieldWithTexts: boolean,
  splitPnrDetails: SplitPnrDetailsType
};
const SelectPassengersForm = ({
  formData,
  formId,
  onPassengerSelectedFn,
  showEmailFieldWithTexts,
  onSubmit,
  showBoundSelection,
  splitPnrDetails: { selectionText, confirmationText, additionalInformationText, passengerSelections }
}: Props) => {
  const buttonText = showBoundSelection
    ? 'SHARED__SELECT_PASSENGERS__BUTTON_TEXT__CONTINUE_TO_SELECT_FLIGHTS'
    : 'SHARED__SELECT_PASSENGERS__BUTTON_TEXT__CONTINUE_TO_REVIEW';

  return (
    <Form formId={formId} onSubmit={onSubmit}>
      <div className="select-passengers-form--content-container">
        {selectionText && (
          <div className="select-passengers-form--intro">
            <p dangerouslySetInnerHTML={{ __html: selectionText }} />
          </div>
        )}
        <Fields type="grouped">
          {passengerSelections &&
            passengerSelections.map((passengerSelection, key) => {
              let disabled = false;

              if (passengerSelection.passengerTypeText) {
                const selectedPassengerIds = getSelectedPassengerIds(formData);
                const areAllPassengersSelected = selectedPassengerIds.length === passengerSelections.length;
                const areNoPassengersSelected = selectedPassengerIds.length === 0;
                const totalAdults = passengerSelections.filter(passenger => passenger.passengerCanBeSplitOff);
                const selectedAdults = totalAdults.filter(adult => selectedPassengerIds.includes(adult.passengerId));
                const isFirstSelectedAdult = selectedAdults[0] && selectedAdults[0].passengerId === passengerSelection.passengerId;
                const totalChildren = passengerSelections.filter(passenger => !passenger.passengerCanBeSplitOff);
                const selectedChildren = totalChildren.filter(child => selectedPassengerIds.includes(child.passengerId));
                const isSingleAdultWithChildrenSelected = selectedAdults.length === 1 && selectedChildren.length > 0;
                const unselectedChildren = totalChildren.filter(child => !selectedPassengerIds.includes(child.passengerId));
                const isUnselectedChild = unselectedChildren.some((unselectedChild) => unselectedChild.passengerId === passengerSelection.passengerId);
                const unselectedAdults = totalAdults.filter(adult => !selectedPassengerIds.includes(adult.passengerId));
                const areNoAdultsUnselected = unselectedAdults.length === 0;
                const areThereUnselectedChildren = unselectedChildren.length > 0;

                if (areNoPassengersSelected || areAllPassengersSelected) {
                  disabled = !passengerSelection.passengerCanBeSplitOff;
                } else if (isSingleAdultWithChildrenSelected && isFirstSelectedAdult) {
                  disabled = true;
                } else if (areNoAdultsUnselected && areThereUnselectedChildren && isUnselectedChild) {
                  onPassengerSelectedFn(passengerSelection.passengerId, false);
                }
              }

              return (<PassengerCheckbox
                disabled={disabled}
                key={key}
                name={passengerSelection.passengerId}
                onPassengerSelectedFn={onPassengerSelectedFn}
                passengerSelection={passengerSelection}
              />);
            })}
        </Fields>
        {showEmailFieldWithTexts && (
          <>
            <div className="select-passengers-form--texts-container">
              {confirmationText && (
                <div className="select-passengers-form--confirmation-text">
                  <p dangerouslySetInnerHTML={{ __html: confirmationText }} />
                </div>
              )}
              {additionalInformationText && (
                <div className="select-passengers-form--additional-text">
                  <p>{additionalInformationText}</p>
                </div>
              )}
            </div>
            <Fields type="grouped" className="select-passengers-form--email-field">
              <div className="select-passengers-form--email-field-label">
                {i18n('SHARED__SELECT_PASSENGERS__EMAIL_NEW_CONFIRMATION_TO')}
              </div>
              <FormInputField name="receiptEmail" type="email" placeholder="Email address" shouldClearErrorOnUnmount />
            </Fields>
          </>
        )}
      </div>
      <div className="select-passengers-form--continue-button">
        <Button type="submit" color="yellow" size="larger" fluid>
          {i18n(buttonText)}
        </Button>
      </div>
    </Form>
  );
};

export default withForm({
  formValidator: selectPassengersFormValidator
})(SelectPassengersForm);
