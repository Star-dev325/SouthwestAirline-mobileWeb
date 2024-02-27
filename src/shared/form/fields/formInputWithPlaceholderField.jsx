// @flow

import React from 'react';
import _ from 'lodash';

import { FormInputField } from 'src/shared/form/fields/formInputField';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { Node } from 'react';

type Props = {
  noErrorIcon?: boolean,
  showWarningIcon?: boolean,
  labelStyles?: string,
  inputLabel?: Node,
  placeholder: string
} & FieldProps;

export class FormInputWithPlaceholderField extends React.Component<Props> {
  render() {
    const { value, placeholder } = this.props;

    return (
      <div className="form-input-with-placeholder-field">
        {!_.isEmpty(value) && <label className="form-input-with-placeholder-field--label">{placeholder}</label>}
        <FormInputField {...this.props} />
      </div>
    );
  }
}

export default withField({
  parse: (event: SyntheticInputEvent<*>) => {
    event.preventDefault();

    return event.target.value;
  }
})(FormInputWithPlaceholderField);
