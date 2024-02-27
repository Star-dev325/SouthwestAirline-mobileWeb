// @flow
import React from 'react';
import _ from 'lodash';
import withField from 'src/shared/form/enhancers/withField';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import cx from 'classnames';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  className?: string,
  label: string
};

const FormRadioField = (props: Props) => {
  const { onChange, value, className, label } = props;

  return (
    <div className={cx('form-radio-field', className)}>
      <div className="form-radio-field--tips">{label}</div>
      <div className="form-radio-field--radio" onClick={() => onChange(!value)}>
        <RadioButtonMark isChecked={value} />
      </div>
    </div>
  );
};

export default withField({
  format: _.toBoolean
})(FormRadioField);
