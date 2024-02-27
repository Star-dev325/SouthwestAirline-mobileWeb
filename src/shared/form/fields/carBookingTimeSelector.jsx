// @flow
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import withField from 'src/shared/form/enhancers/withField';

type Props = {
  name: string,
  value: string,
  placeholder: string,
  hint: string
};

class CarBookingTimeSelector extends React.Component<Props> {
  _generateTimeArray() {
    const times = _.range(48);
    const startOfYear = dayjs().startOf('year');

    return _.chain(times)
      .map((value) => startOfYear.clone().add(value * 30, 'minutes'))
      .map((time) => {
        const timeString = time.format('h:mmA');

        return {
          label: timeString,
          value: timeString
        };
      })
      .value();
  }

  render() {
    const { hint, placeholder, ...restProps } = this.props;

    return (
      <div className="car-time-selector">
        <div>
          <FormSelectField
            caretIcon={false}
            defaultHidden
            options={this._generateTimeArray()}
            placeholder={placeholder}
            {...restProps}
          />
          <span className="car-time-selector--hint">{hint}</span>
        </div>
      </div>
    );
  }
}

export default withField()(CarBookingTimeSelector);
