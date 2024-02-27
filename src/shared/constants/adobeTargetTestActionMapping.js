import { setIsSplitPayVisible, setIsUpliftVisible } from 'src/airBooking/actions/airBookingActions';
import { saveDestinationAirport } from 'src/airports/actions/airportsActions';
import {
  setIsChaseExistingCardMember
} from 'src/chase/actions/chaseActions';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';

const {
  RECENT_FLIGHT_DESTINATION_AIRPORT,
  PURCHASE_PAYMENT_METHOD_UPLIFT_DISPLAY,
  CHASE_AUDIENCE_WCM_CONTEXT,
  PURCHASE_PAGE_SPLIT_PAY_DISPLAY
} = AdobeTargetConstants;

export const adobeTargetTestActionMapping = () => ({
  [RECENT_FLIGHT_DESTINATION_AIRPORT]: saveDestinationAirport,
  [PURCHASE_PAYMENT_METHOD_UPLIFT_DISPLAY]: setIsUpliftVisible,
  [CHASE_AUDIENCE_WCM_CONTEXT]: setIsChaseExistingCardMember,
  [PURCHASE_PAGE_SPLIT_PAY_DISPLAY]: setIsSplitPayVisible
});
