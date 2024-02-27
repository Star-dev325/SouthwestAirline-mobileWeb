// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { updateAPISData } from 'src/checkIn/actions/checkInActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Options = {
  nodeName: string,
  formId: string,
  transformAdditionalProps?: (*) => *
};

type Props = {
  params: {
    paxNumber: string
  },
  travelDocuments: *,
  updateAPISDataFn: (formData: FormData, nodeName: string, paxNumber: string) => void,
  goBack: () => void
};

const withCheckInAPISPage = (options: Options) => {
  const { nodeName, formId, transformAdditionalProps } = options;

  return (CheckInAPISForm: *) => {
    class ConnectedCheckInAPISPage extends React.Component<Props> {
      componentDidMount() {
        raiseSatelliteEvent('TOOL:CHCK:destination address');
      }

      _updateAPISData = (formData: FormData) => {
        const {
          params: { paxNumber },
          updateAPISDataFn,
          goBack
        } = this.props;

        updateAPISDataFn(formData, nodeName, paxNumber);
        goBack();
      };

      render() {
        const {
          travelDocuments,
          params: { paxNumber },
          goBack
        } = this.props;
        const paxNumberInt = Number.parseInt(paxNumber);
        const travelDocument = _.get(travelDocuments, `${paxNumberInt - 1}`);
        const currentPassengerData = _.get(travelDocument, `additionalPassportPageFormData.${nodeName}`);
        const additionalProps = transformAdditionalProps ? transformAdditionalProps(travelDocument) : {};

        return (
          <CheckInAPISForm
            initialFormData={currentPassengerData}
            {...additionalProps}
            onCancel={goBack}
            formId={formId}
            onSubmit={this._updateAPISData}
          />
        );
      }
    }

    ConnectedCheckInAPISPage.displayName = `${_.upperFirst(nodeName)}Page`;

    const mapStateToProps = (state) => ({
      travelDocuments: _.get(state, 'app.checkIn.checkInFlowData.travelDocuments')
    });

    const mapDispatchToProps = {
      updateAPISDataFn: updateAPISData
    };

    const enhancers = _.flowRight(
      withConnectedReactRouter,
      withBodyClass('hide-header'),
      connect(mapStateToProps, mapDispatchToProps)
    );

    return enhancers(ConnectedCheckInAPISPage);
  };
};

export default withCheckInAPISPage;
