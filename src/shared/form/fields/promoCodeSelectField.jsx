// @flow
import React, { Component } from 'react';
import withField from 'src/shared/form/enhancers/withField';
import FormSelectWithPlaceHolderField from 'src/shared/form/fields/formSelectWithPlaceHolderField';

import type { OptionType } from 'src/shared/flow-typed/shared.types';

type Props = {
  value: string,
  name: string,
  options: Array<OptionType>,
  placeholder: string,
  disabledSelect?: boolean,
  onValueChange: (*) => void
};

class PromoCodeSelectField extends Component<Props> {
  static defaultProps = {
    disabledSelect: false
  };

  render() {
    const { value, name, options, placeholder, onValueChange, disabledSelect } = this.props;

    return (
      <div>
        <FormSelectWithPlaceHolderField
          name={name}
          placeholder={placeholder}
          options={options}
          defaultValue={value}
          onChange={onValueChange}
          disabled={disabledSelect}
          disablePlaceholder
        />
      </div>
    );
  }
}

export default withField()(PromoCodeSelectField);
