// @flow
import React from 'react';
import _ from 'lodash';
import withField from 'src/shared/form/enhancers/withField';
import CheckboxField from 'src/shared/components/checkboxField';

import type { Node } from 'react';

type Props = {
  children?: Node,
  clickableChildren?: boolean,
  value?: boolean,
  name: string
};

class FormCheckboxField extends React.Component<Props> {
  static defaultProps = {
    clickableChildren: false,
    value: false
  };

  render() {
    const { name, children, value, ...restProps } = this.props;

    return (
      <CheckboxField name={name} checked={value} {...restProps}>
        {children}
      </CheckboxField>
    );
  }
}
export default withField({
  format: _.toBoolean,
  parse: _.toBoolean
})(FormCheckboxField);
