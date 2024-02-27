// @flow

import _ from 'lodash';
import { connect } from 'react-redux';

import withCheckInAPISPage from 'src/checkIn/enhancers/withCheckInAPISPage';
import CheckInAPISDestinationForm from 'src/checkIn/components/checkInAPISDestinationForm';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { CHECK_IN_APIS_DESTINATION_FORM } from 'src/shared/constants/formIds';

export const transformAdditionalProps = (travelDocument: *) => {
  const destinationConfig = _.get(travelDocument, 'destinationConfig', {});

  return { destinationConfig };
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateFormDataValueFn: FormDataActions.updateFormDataValue
};

const enhancers = _.flowRight(
  withCheckInAPISPage({
    nodeName: 'destination',
    formId: CHECK_IN_APIS_DESTINATION_FORM,
    transformAdditionalProps
  }),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CheckInAPISDestinationForm);
