// @flow
import React from 'react';
import _ from 'lodash';
import withField from 'src/shared/form/enhancers/withField';
import RadioButtonMark from 'src/shared/components/radioButtonMark';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = FieldProps & {
  className?: string,
  label: string,
  callback?: (value: boolean) => void
};

const FormRadioMarkField = (props: Props) => {
  const { onChange, value, className, callback } = props;

  const _handleOnClick = () => {
    onChange(!value);
    callback && callback(!value);
  };

  return (
    <div className={className}>
      <div className="flex2 flex flex-main-center" onClick={_handleOnClick}>
        <RadioButtonMark isChecked={value} />
      </div>
    </div>
  );
};

export default withField({
  format: _.toBoolean
})(FormRadioMarkField);
