import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';
import SpecialAssistanceForm from 'src/shared/form/components/specialAssistanceForm';

const defaultProps = {
  formId: 'formid',
  goBack: _.noop,
  onSubmit: _.noop,
  updateFormDataValueFn: _.noop,
  initialFormData: DEFAULT_FIELD_VALUES
};

const checkboxProps = {
  formId: 'formid',
  goBack: _.noop,
  onSubmit: _.noop,
  updateFormDataValueFn: _.noop,
  initialFormData: {
    BLIND: true,
    DEAF: true,
    COGNITIVE_AND_DEVELOPMENTAL_SSR: true,
    ASSISTANCE_ANIMAL: true,
    PEANUT_DUST_ALLERGY: true,
    PORTABLE_OXYGEN_CONCENTRATOR: true,
    WHEELCHAIR_ASSISTANCE: 'NONE',
    WHEELCHAIR_STOWAGE: 'NONE',
    WET_BATTERIES: null,
    DRY_BATTERIES: null
  }
};

const radioSelectedProps = {
  formId: 'formid',
  goBack: _.noop,
  onSubmit: _.noop,
  updateFormDataValueFn: _.noop,
  initialFormData: {
    BLIND: false,
    DEAF: false,
    COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
    ASSISTANCE_ANIMAL: false,
    PEANUT_DUST_ALLERGY: false,
    PORTABLE_OXYGEN_CONCENTRATOR: false,
    WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
    WHEELCHAIR_STOWAGE: 'WET_CELL_BATTERY_WHEELCHAIR',
    WET_BATTERIES: '3',
    DRY_BATTERIES: null
  }
};

storiesOf('components/specialAssistanceForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <SpecialAssistanceForm {...defaultProps} />;
  })
  .add('all checkboxes are checked', () => {
    return <SpecialAssistanceForm {...checkboxProps} />;
  })
  .add('radios selected', () => {
    return <SpecialAssistanceForm {...radioSelectedProps} />;
  });
