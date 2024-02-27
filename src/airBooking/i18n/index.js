import airBookingText from 'src/airBooking/i18n/airBookingText';
import confirmFooterText from 'src/airBooking/i18n/confirmFooterText';
import lowFareCalendarText from 'src/airBooking/i18n/lowFareCalendarText';
import popupText from 'src/airBooking/i18n/popupText';
import splitPayText from 'src/airBooking/i18n/splitPayText';
import confirmPassportRequiredText from 'src/airBooking/i18n/confirmPassportRequiredText';

const airBooking = {
  ...airBookingText,
  ...confirmFooterText,
  ...confirmPassportRequiredText,
  ...lowFareCalendarText,
  ...popupText,
  ...splitPayText
};

export default airBooking;
