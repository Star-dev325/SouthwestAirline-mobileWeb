// @flow
import React from 'react';
import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import cx from 'classnames';

import Select from 'src/shared/components/select';
import type { OptionType } from 'src/shared/flow-typed/shared.types';

type dateType = number | Date | Dayjs;

const fieldsConfig = [
  { name: 'Year', key: 'year' },
  { name: 'Month', key: 'month' },
  { name: 'Day', key: 'date' }
];

const baseDate = new Date('1970/01/01');

type Props = {
  triggerDefaultOnFocus?: boolean,
  fields?: Array<string>,
  min?: dateType,
  max?: dateType,
  value?: dateType,
  defaultDate: dateType,
  onChange: (*) => void,
  showPreviousYears?: boolean,
  minLapChildFormYear?: dateType,
  isLapChild: boolean
};

class DatePicker extends React.Component<Props> {
  static defaultProps = {
    showPreviousYears: false,
    triggerDefaultOnFocus: true,
    defaultDate: dayjs().subtract(2, 'year').month(0).date(1).toDate(),
    fields: ['month', 'date', 'year'],
    min: dayjs(baseDate).year(1896),
    max: dayjs()
  };

  _getYearOptions = () => {
    const { min, max, showPreviousYears, minLapChildFormYear, isLapChild } = this.props;
    const minYearToUse = isLapChild ? minLapChildFormYear : min;

    return _.range(dayjs(minYearToUse).get('year'), dayjs(max).get('year') + 1).map((value) => ({
      value,
      label: value,
      hidden: showPreviousYears && value < dayjs().get('year')
    }));
  };

  _getMonthOptions = (): Array<OptionType> => {
    const { min, max, defaultDate, showPreviousYears, value: currentValue } = this.props;
    const currentDate = showPreviousYears ? dayjs() : min;
    const currentValueDayjs = dayjs(currentValue || defaultDate);

    return _.range(1, 12 + 1).map((value) => {
      const baseValue = dayjs(baseDate).set('year', currentValueDayjs.get('year'));

      const leftRange = setField(baseValue, 'month', value);
      const rightRange = dayjs(leftRange).add(1, 'months').valueOf() - 1;

      return {
        disabled: !isRangeHasValidPart(currentDate, max, leftRange, rightRange),
        value,
        label: dayjs(leftRange).format('MMMM')
      };
    });
  };

  _getDateOptions = () => {
    const { min, max, defaultDate, value: currentValue } = this.props;
    const currentValueDayjs = dayjs(currentValue || defaultDate);

    return _.range(1, currentValueDayjs.daysInMonth() + 1).map((value) => {
      const baseValue = dayjs(baseDate)
        .set('year', currentValueDayjs.get('year'))
        .set('month', currentValueDayjs.get('month'));

      const leftRange = setField(baseValue, 'date', value);
      const rightRange = dayjs(leftRange).add(1, 'days').valueOf() - 1;

      return {
        disabled: !isRangeHasValidPart(min, max, leftRange, rightRange),
        value,
        label: value
      };
    });
  };

  _onFieldChange = (fieldKey: string, value: string) => {
    const { value: currentValue } = this.props;

    const newValue = setField(currentValue, fieldKey, parseInt(value));

    this._triggerValidValue(newValue);
  };

  _onFocus = () => {
    const { value, triggerDefaultOnFocus, defaultDate } = this.props;

    if (!value && triggerDefaultOnFocus) {
      this._triggerValidValue(defaultDate);
    }
  };

  _triggerValidValue = (value: dateType) => {
    const { min, max } = this.props;

    // trigger onChange with value if value validate, else will trigger min or max.
    this.props.onChange(getValidValue(min, max, value));
  };

  _renderField = (key: string) => {
    const name = _.get(_.find(fieldsConfig, { key }), 'name');
    const { value } = this.props;
    const fieldValue = value ? getField(value, key) : '';
    const { _getDateOptions, _getMonthOptions, _getYearOptions } = this;
    const getOptions = key === 'date' ? _getDateOptions : key === 'month' ? _getMonthOptions : _getYearOptions;

    return (
      <div key={key} className={cx('date-selection--select', `date-selection-${key}`)}>
        <Select
          options={getOptions()}
          placeholder={name}
          value={fieldValue}
          onChange={this._onFieldChange.bind(this, key)}
          onFocus={this._onFocus}
          onBlur={() => {
            this.forceUpdate();
          }}
          disablePlaceholder
          iconFixed
        />
      </div>
    );
  };

  render() {
    const { fields } = this.props;

    return <div className="date-selection">{fields && fields.map(this._renderField)}</div>;
  }
}

const isDateValid = (min, max, date) => dayjs(date).isSameOrAfter(min) && dayjs(date).isSameOrBefore(max);

const isRangeHasValidPart = (min, max, leftRange, rightRange) =>
  isDateValid(min, max, leftRange) || isDateValid(min, max, rightRange);

const getValidValue = (min, max, date) => {
  if (dayjs(date).isBefore(min)) {
    return min;
  } else if (dayjs(date).isAfter(max)) {
    return max;
  } else {
    return date;
  }
};

const getField = (value, field) => {
  const fieldValue = dayjs(value).get(field);

  return field === 'month' ? fieldValue + 1 : fieldValue;
};

const setField = (target, field, value) =>
  dayjs(target)
    .set(field, field === 'month' ? value - 1 : value)
    .valueOf();

export default DatePicker;
