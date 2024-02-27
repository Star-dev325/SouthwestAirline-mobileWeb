// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import DriverInfoEditForm from 'src/carBooking/components/driverInfoEditForm';
import type { DriverInfoType } from 'src/carBooking/flow-typed/carBooking.types';
import { CAR_BOOKING_DRIVER_INFO_EDIT_FORM } from 'src/shared/constants/formIds';
import WithBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  driverInfo: DriverInfoType,
  saveUserAccountDriverInfoFn: (DriverInfoType) => void,
  push: Push
};

export class DriverInfoEditPage extends React.Component<Props> {
  _onSubmit = (driverInfo: DriverInfoType) => {
    const { saveUserAccountDriverInfoFn, push } = this.props;

    saveUserAccountDriverInfoFn(driverInfo);
    push(getNormalizedRoute({ routeName: 'purchase' }));
  };

  render() {
    const { driverInfo } = this.props;

    return (
      <div>
        <DriverInfoEditForm
          formId={CAR_BOOKING_DRIVER_INFO_EDIT_FORM}
          initialFormData={driverInfo}
          onSubmit={this._onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  driverInfo: _.get(state, 'app.carBooking.userInfo.driverInfo')
});

const mapDispatchToProps = {
  saveUserAccountDriverInfoFn: CarBookingActions.saveUserAccountDriverInfo
};

const enhancers = _.flowRight(
  WithBodyClass('hide-header'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(DriverInfoEditPage);
