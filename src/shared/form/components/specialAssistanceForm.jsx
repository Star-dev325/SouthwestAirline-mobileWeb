// @flow
import React, { Component } from 'react';

import Button from 'src/shared/components/button';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import SpecialAssistanceRadioGroupField from 'src/shared/form/fields/specialAssistanceRadioGroupField';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Fields from 'src/shared/components/fields';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import i18n from '@swa-ui/locale';
import { WHEELCHAIR_ASSISTANCE, WHEELCHAIR_STOWAGE } from 'src/shared/constants/specialAssistanceConstants';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  goBack: () => void,
  onSubmit: () => void,
  onChange: (string, *) => void,
  updateFormDataValueFn: (string, *) => {},
  initialFormData: FormData,
  formData: FormData
};

class SpecialAssistanceForm extends Component<Props> {
  componentDidMount() {
    const { formId, updateFormDataValueFn, initialFormData } = this.props;

    updateFormDataValueFn && updateFormDataValueFn(formId, initialFormData);
  }

  _updateNumberOfBatteries = (fieldKey, batteries) => {
    const {
      onChange,
      formData: { WET_BATTERIES, DRY_BATTERIES }
    } = this.props;

    if (fieldKey === 'WET_CELL_BATTERY_WHEELCHAIR') {
      onChange('WET_BATTERIES', batteries);
      onChange('DRY_BATTERIES', null);
    } else if (fieldKey === 'DRY_CELL_BATTERY_WHEELCHAIR') {
      onChange('WET_BATTERIES', null);
      onChange('DRY_BATTERIES', batteries);
    } else {
      if (parseInt(WET_BATTERIES) >= 0 || parseInt(DRY_BATTERIES) >= 0) {
        onChange('WET_BATTERIES', null);
        onChange('DRY_BATTERIES', null);
      }
    }
  };

  render() {
    const {
      formId,
      goBack,
      onSubmit,
      formData: { WET_BATTERIES, DRY_BATTERIES }
    } = this.props;

    const rightButtons = [
      {
        name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        onClick: goBack
      }
    ];

    return (
      <Form formId={formId} className="special-assistance-form" onSubmit={onSubmit}>
        <PageHeaderWithButtons title={i18n('SHARED__SPECIAL_ASSISTANCE__SA_PAGE_TITLE')} rightButtons={rightButtons} />
        <Segments>
          <Segment fill ordinality="secondary">
            <p className="helper-text" ref="SubscriptionDetails">
              {i18n('SHARED__SPECIAL_ASSISTANCE__SA_HELP_TEXT')}
            </p>
            <p className="helper-text" ref="SubscriptionDetails">
              <a target="_blank" href="/special-assistance-info">
                Learn more
              </a>
            </p>
            <Fields
              className="sa-checkbox-fields"
              type="grouped"
              divided
              label={i18n('SHARED__SPECIAL_ASSISTANCE__AIRPORT_ASSISTANCE_SEGMENT_LABEL')}
            >
              <FormCheckboxField
                name="BLIND"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__AIRPORT_ASSISTANCE_BLIND')}
              </FormCheckboxField>
              <FormCheckboxField
                name="DEAF"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__AIRPORT_ASSISTANCE_DEAF')}
              </FormCheckboxField>
              <FormCheckboxField
                name="COGNITIVE_AND_DEVELOPMENTAL_SSR"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__AIRPORT_ASSISTANCE_COGNITIVE_AND_DEVELOPMENTAL_SSR')}
              </FormCheckboxField>
            </Fields>
          </Segment>
          <Segment fill ordinality="secondary">
            <Fields
              className="sa-checkbox-fields"
              type="grouped"
              divided
              label={i18n('SHARED__SPECIAL_ASSISTANCE__ANIMALS__SEGMENT_LABEL')}
            >
              <FormCheckboxField
                name="ASSISTANCE_ANIMAL"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__ASSISTANCE_ANIMAL')}
              </FormCheckboxField>
            </Fields>
          </Segment>
          <Segment fill ordinality="secondary">
            <Fields
              className="sa-radio-fields"
              type="grouped"
              divided
              label={i18n('SHARED__SPECIAL_ASSISTANCE__WHEELCHAIR_ASSISTANCE_SEGMENT_LABEL')}
            >
              <SpecialAssistanceRadioGroupField
                name="WHEELCHAIR_ASSISTANCE"
                className="sa-radio-options"
                radioGroupOptions={WHEELCHAIR_ASSISTANCE.OPTIONS}
              />
            </Fields>
          </Segment>
          <Segment fill ordinality="secondary">
            <Fields className="sa-radio-fields" type="grouped" divided label={WHEELCHAIR_STOWAGE.SEGMENT_LABEL}>
              <SpecialAssistanceRadioGroupField
                name="WHEELCHAIR_STOWAGE"
                className="sa-radio-options"
                radioGroupOptions={WHEELCHAIR_STOWAGE.OPTIONS}
                updateNumberOfBatteriesFn={this._updateNumberOfBatteries}
                WET_BATTERIES={WET_BATTERIES}
                DRY_BATTERIES={DRY_BATTERIES}
                batteryDefault={WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT}
                batteryOptions={WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS}
                goBack={goBack}
              />
            </Fields>
          </Segment>
          <Segment fill ordinality="secondary">
            <Fields
              className="sa-checkbox-fields"
              type="grouped"
              divided
              label={i18n('SHARED__SPECIAL_ASSISTANCE__OTHER_ASSISTANCE_SEGMENT_LABEL')}
            >
              <FormCheckboxField
                name="PEANUT_DUST_ALLERGY"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__OTHER_ASSISTANCE_PEANUT_DUST_ALLERGY')}
              </FormCheckboxField>
              <FormCheckboxField
                name="PORTABLE_OXYGEN_CONCENTRATOR"
                className="checkbox-button"
                size="large"
                clickableChildren
                checkBoxClassName="flex1 flex-cross-center"
                childrenClassName="flex10 ml0"
              >
                {i18n('SHARED__SPECIAL_ASSISTANCE__OTHER_ASSISTANCE_PORTABLE_OXYGEN_CONCENTRATOR')}
              </FormCheckboxField>
            </Fields>
          </Segment>
          <Segment color="blue" inverted>
            <Button type="submit" color="yellow" size="huge" fluid>
              {i18n('SHARED__BUTTON_TEXT__SAVE')}
            </Button>
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  defaultValues: (props: Props) => {
    const { initialFormData } = props;

    return initialFormData;
  }
})(SpecialAssistanceForm);
