// @flow

import React from 'react';

import withField from 'src/shared/form/enhancers/withField';
import TextArea from 'src/shared/components/textArea';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  className?: string,
  placeholder?: string,
  onMessageChange?: (*) => void,
  rowCount: number,
  maxLength?: number,
  onChange: (*) => void,
  value?: string
};

const FormTextAreaField = (props: Props) => <TextArea {...props} />;

export default withField({
  parse: (event: SyntheticInputEvent<*>) => {
    event.preventDefault();

    return event.target.value;
  }
})(FormTextAreaField);
