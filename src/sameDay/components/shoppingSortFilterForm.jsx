import i18n from '@swa-ui/locale';
import React from 'react';
import LabelContainer from 'src/shared/components/labelContainer';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import FormRadioInputField from 'src/shared/form/fields/formRadioInputField';
import SortingOptions from 'src/shared/constants/sortingOptions';

const { STARTING_FROM_AMOUNT, DURATION_MINUTES, NUMBER_OF_STOPS, DEPARTURE_TIME } = SortingOptions;

const ShoppingSortFilterForm = ({ formId }) => {
  const options = [
    {
      label: i18n('SAME_DAY__SHOPPING_FORM_DEPARTURE_LABEL'),
      value: DEPARTURE_TIME
    },
    {
      label: i18n('SAME_DAY__SHOPPING_FORM_STOPS_LABEL'),
      value: NUMBER_OF_STOPS
    },
    {
      label: i18n('SAME_DAY__SHOPPING_FORM_DURATION_LABEL'),
      value: DURATION_MINUTES
    },
    {
      label: i18n('SAME_DAY__SHOPPING_FORM_PRICE_LABEL'),
      value: STARTING_FROM_AMOUNT
    }
  ];

  return (
    <div className="shopping-sort-filter-form">
      <Form formId={formId}>
        <LabelContainer labelText="Sort By">
          <FormRadioInputField
            alignLeft
            grayText
            isVerticallyAligned
            name="sortBy"
            options={options}
            removeBorder
            removeShadows
          />
        </LabelContainer>

        <LabelContainer className="shopping-sort-filter-label" labelText="Filter By">
          <FormCheckboxField className="shopping-sort-filter-form-checkbox" name="nonStop">
            {i18n('SAME_DAY__SHOPPING_FORM_NONSTOP_LABEL')}
          </FormCheckboxField>
          <FormCheckboxField className="shopping-sort-filter-form-checkbox" name="standby">
            {i18n('SAME_DAY__SHOPPING_FORM_AVAILABLE_STANDBY_LABEL')}
          </FormCheckboxField>
          <FormCheckboxField className="shopping-sort-filter-form-checkbox" name="confirmed">
            {i18n('SAME_DAY__SHOPPING_FORM_AVAILABLE_CONFIRMED_LABEL')}
          </FormCheckboxField>
        </LabelContainer>
      </Form>
    </div>
  );
};

export default withForm({
  defaultValues: () => ({
    sortBy: DEPARTURE_TIME
  })
})(ShoppingSortFilterForm);
