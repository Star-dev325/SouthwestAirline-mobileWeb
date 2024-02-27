// @flow
import React from 'react';
import _ from 'lodash';

import { updateSelectedIrn } from 'src/airBooking/actions/airBookingActions';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { connect } from 'react-redux';
import AddManualIrnForm from 'src/airBooking/components/addManualIrnForm';
import { AIR_BOOKING_ADD_MANUAL_IRN } from 'src/shared/constants/formIds';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';

import type { Push } from 'src/shared/flow-typed/shared.types';
import type { ManualIrnFormDataType, SelectedIrnType } from 'src/airBooking/flow-typed/airBooking.types';

type AddManualIrnPageProps = {
  goBack: () => void,
  push: Push,
  selectedIrn?: SelectedIrnType,
  updateSelectedIrnFn: (string, ?boolean) => void
};

export class AddManualIrnPage extends React.Component<AddManualIrnPageProps> {
  componentDidMount = () => {
    raiseSatelliteEvent('add irn');
  };

  _onSubmit = (formData: ManualIrnFormDataType) => {
    const { push, updateSelectedIrnFn } = this.props;

    updateSelectedIrnFn(formData.manualIrn, true);
    push(getNormalizedRoute({ routeName: 'purchaseWithoutClearForm' }));
  };

  render() {
    const { goBack, selectedIrn } = this.props;

    return (
      <div className="add-manual-internal-reference-number-page">
        <AddManualIrnForm
          onSubmit={this._onSubmit}
          formId={AIR_BOOKING_ADD_MANUAL_IRN}
          onCancel={goBack}
          selectedIrn={selectedIrn}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedIrn: _.get(state, 'app.airBooking.selectedIrn')
});

const mapDispatchToProps = {
  updateSelectedIrnFn: updateSelectedIrn
};

const enhancers = _.flowRight(
  withBodyClass('hide-header'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AddManualIrnPage);
