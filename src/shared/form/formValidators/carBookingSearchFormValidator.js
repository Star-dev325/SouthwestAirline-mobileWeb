import _ from 'lodash';
import dayjs from 'dayjs';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';
import { CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';

const TIME_FORMAT = 'h:mma';

const isDropOffLaterThanPickUp = ({ departureAndReturnDate: { pickUpDate, dropOffDate }, pickUpTime, dropOffTime }) => {
  if (validator.isSameValue(pickUpDate, dropOffDate)) {
    return pickUpTime && dropOffTime && dayjs(dropOffTime, TIME_FORMAT).isAfter(dayjs(pickUpTime, TIME_FORMAT));
  }

  return true;
};

const populateTimeDefaults = (formData) => {
  const { pickUpTime, dropOffTime } = formData;

  formData.pickUpTime = pickUpTime ? pickUpTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT;
  formData.dropOffTime = dropOffTime ? dropOffTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT;
};

const isRequired = true;

export default () => (formData) => {
  populateTimeDefaults(formData);

  const fieldRules = {
    departureAndReturnCities: [
      {
        type: ERROR_HEADER,
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        validator: () =>
          !_.isEmpty(formData.departureAndReturnCities.pickUp) || !_.isEmpty(formData.departureAndReturnCities.dropOff)
      }
    ],
    departureAndReturnDate: [
      {
        isRequired
      }
    ],
    pickUpTime: [
      {
        type: ERROR_HEADER,
        msg: i18n('SHARED__ERROR_MESSAGES__RETURN_TIME_MUST_AFTER_PICK_UP_TIME'),
        validator: () => isDropOffLaterThanPickUp(formData)
      }
    ],
    dropOffTime: [
      {
        type: ERROR_HEADER,
        msg: i18n('SHARED__ERROR_MESSAGES__RETURN_TIME_MUST_AFTER_PICK_UP_TIME'),
        validator: () => isDropOffLaterThanPickUp(formData)
      }
    ],
    vehicleType: [
      {
        isRequired
      }
    ],
    carCompany: [
      {
        isRequired
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
