// @flow
import withCheckInAPISPage from 'src/checkIn/enhancers/withCheckInAPISPage';
import CheckInAPISPermanentResidentCardForm from 'src/checkIn/components/checkInAPISPermanentResidentCardForm';
import { CHECK_IN_APIS_PERMANENT_RESIDENT_CARD_FORM } from 'src/shared/constants/formIds';

export default withCheckInAPISPage({
  nodeName: 'permanentResidentCard',
  formId: CHECK_IN_APIS_PERMANENT_RESIDENT_CARD_FORM
})(CheckInAPISPermanentResidentCardForm);
