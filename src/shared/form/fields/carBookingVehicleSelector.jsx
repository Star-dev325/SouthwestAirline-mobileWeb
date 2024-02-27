// @flow
import React from 'react';
import Select from 'src/shared/components/select';
import * as VehicleTypesHelper from 'src/carBooking/helpers/vehicleTypesHelper';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import withField from 'src/shared/form/enhancers/withField';

type Props = {
  onChange: (string) => void,
  value?: string,
  label: string
};

class CarBookingVehicleSelector extends React.Component<Props> {
  _updateValue = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { label, value } = this.props;

    return (
      <div className="relative">
        <Select
          name="vehicleType"
          ref="vehicleTypeSelectList"
          options={optionsHelper.getOptionsByValueList(VehicleTypesHelper.allLabels())}
          caretIcon={false}
          onChange={this._updateValue}
          value={value}
          className="car-booking-vehicle-selector--select absolute t0 fullwidth fullheight bgtransp"
        />
        <div className="flex flex-main-between flex-cross-center">
          <label className="pl5 xlarge">{label}</label>
          <div className="regular gray4 pr5 car-booking-vehicle-selector--fake-select-label">{value}</div>
        </div>
      </div>
    );
  }
}

export default withField()(CarBookingVehicleSelector);
