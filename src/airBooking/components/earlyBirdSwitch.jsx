// @flow
import React from 'react';
import ToggleSwitch from 'src/shared/components/toggleSwitch';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';

import type { EarlyBirdSwitchPropsType } from 'src/airBooking/flow-typed/airBooking.types';

export class EarlyBirdSwitch extends React.Component<EarlyBirdSwitchPropsType> {
  _handleToggleSwitchChange = (checked: boolean) => {
    const { saveEarlyBirdSelectedFn } = this.props;

    saveEarlyBirdSelectedFn(checked);
  };

  render() {
    const { earlyBirdSelected } = this.props;

    return <ToggleSwitch onChange={this._handleToggleSwitchChange} checked={earlyBirdSelected} />;
  }
}

const mapStateToProps = (state) => ({
  earlyBirdSelected: _.get(state, 'app.airBooking.earlyBirdSelected', false)
});

const mapDispatchToProps = {
  saveEarlyBirdSelectedFn: AirBookingActions.saveEarlyBirdSelected
};

const enhancers = _.flowRight(connect(mapStateToProps, mapDispatchToProps));

export default enhancers(EarlyBirdSwitch);
