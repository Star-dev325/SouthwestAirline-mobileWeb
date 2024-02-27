// @flow

import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import DatePicker from 'src/shared/components/datePicker';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  fields?: string[],
  isLapChild?: boolean,
  minLapChildFormYear?: string
} & FieldProps;

class FormDatePickerField extends React.Component<Props> {
  static defaultProps = {
    fields: ['month', 'date', 'year']
  };

  _updateValue = (date) => {
    const format = getDateFormat(this.props.fields);

    this.props.onChange(getDateString(format, date));
  };

  render() {
    const { isLapChild, minLapChildFormYear } = this.props;

    return (
      <DatePicker
        {..._.omit(this.props, 'onChange', 'error', 'clearError')}
        onChange={this._updateValue}
        minLapChildFormYear={isLapChild && minLapChildFormYear}
        isLapChild={isLapChild}
      />
    );
  }
}

function getDateValue(value) {
  const formatValue = dayjs(value).format('YYYY-MM-DD');

  return value ? +dayjs(formatValue) : undefined;
}

function getDateString(format, date) {
  if (date) {
    return dayjs(date).format(format);
  } else {
    return '';
  }
}

function getDateFormat(fields) {
  if (_.includes(fields, 'date')) {
    return 'YYYY-MM-DD';
  } else if (_.includes(fields, 'month')) {
    return 'YYYY-MM';
  }

  return 'YYYY';
}

export default withField({
  format: getDateValue
})(FormDatePickerField);
