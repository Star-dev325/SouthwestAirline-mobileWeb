// @flow

import _ from 'lodash';
import React from 'react';
import RadioInput from 'src/shared/components/radioInput';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

class FormRadioInputField extends React.Component<FieldProps> {
  render() {
    const { onChange, ...restProps } = this.props;

    return <RadioInput onSelect={onChange} {..._.omit(restProps, 'error', 'clearError')} />;
  }
}

export default withField({
  parse: (selectedOption) => selectedOption.value
})(FormRadioInputField);
