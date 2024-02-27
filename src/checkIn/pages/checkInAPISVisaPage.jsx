// @flow
import withCheckInAPISPage from 'src/checkIn/enhancers/withCheckInAPISPage';
import CheckInAPISVisaForm from 'src/checkIn/components/checkInAPISVisaForm';
import { CHECK_IN_APIS_VISA_FORM } from 'src/shared/constants/formIds';

export default withCheckInAPISPage({ nodeName: 'visa', formId: CHECK_IN_APIS_VISA_FORM })(CheckInAPISVisaForm);
