// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import DynamicWaiverMessages from 'src/shared/components/dynamicWaiverMessages';
import Message from 'src/shared/components/message';
import SelectPassengersForm from 'src/shared/components/selectPassengersForm';
import SubHeader from 'src/shared/components/subHeader';
import {
  convertBackgroundBrandColor,
  convertBrandColor,
  iconTypeMap
} from 'src/shared/helpers/productDefinitionsHelper';
import type { SplitPnrDetailsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formData: FormData,
  formId: string,
  hideErrorHeaderMsgFn: () => void,
  onSubmit: () => void,
  showBoundSelection: boolean,
  showEmailFieldWithTexts: boolean,
  splitPnrDetails: SplitPnrDetailsType,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, value: *) => void
};

export const SelectPassengersPage = ({
  formData,
  formId,
  hideErrorHeaderMsgFn,
  onSubmit,
  showBoundSelection,
  showEmailFieldWithTexts,
  splitPnrDetails,
  splitPnrDetails: { headerMessage, messages, passengerSelections = [] },
  updateFormFieldDataValueFn
}: Props) => {
  const _onPassengerSelected = (passengerId, value) => {
    updateFormFieldDataValueFn(formId, passengerId, !value);
  };

  useEffect(() => {
    updateFormFieldDataValueFn(formId, 'receiptEmail', '');

    passengerSelections.forEach((passengerSelection) => {
      updateFormFieldDataValueFn(formId, passengerSelection.passengerId, true);
    });
  }, []);

  useEffect(() => {
    if (!showEmailFieldWithTexts) {
      hideErrorHeaderMsgFn();
      updateFormFieldDataValueFn(formId, 'receiptEmail', '');
    }
  }, [showEmailFieldWithTexts]);

  const _renderHeaderMessage = () => {
    const { body, header, icon, inverseThemeColor, primaryThemeColor } = headerMessage || {};
    const backgroundColor = convertBackgroundBrandColor(inverseThemeColor, 'bgpdkblue');
    const textColor = convertBrandColor(primaryThemeColor, 'white');
    const classnames = `${backgroundColor} ${textColor}`;

    return (
      <Message className={classnames} status={iconTypeMap[icon]}>
        {header}
        <div className="select-passengers--header-message-body" dangerouslySetInnerHTML={{ __html: body }} />
      </Message>
    );
  };

  return (
    <div className="select-passengers">
      <SubHeader title={i18n('SHARED__SELECT_PASSENGERS__PAGE_TITLE')} />
      {messages && <DynamicWaiverMessages messages={messages} />}
      {headerMessage && _renderHeaderMessage()}
      <SelectPassengersForm
        formData={formData}
        formId={formId}
        splitPnrDetails={splitPnrDetails}
        onPassengerSelectedFn={_onPassengerSelected}
        onSubmit={onSubmit}
        showBoundSelection={showBoundSelection}
        showEmailFieldWithTexts={showEmailFieldWithTexts}
      />
    </div>
  );
};

export default SelectPassengersPage;
