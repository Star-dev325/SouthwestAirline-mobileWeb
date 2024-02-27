export const getSplitPnrDetails = () => ({
  selectionText: 'There are multiple passengers on this reservation. <b>Select all the passengers you want to change.</b>',
  confirmationText: "By clicking 'continue’, selected Passengers will <b>receive a new confirmation number.</b>",
  additionalInformationText:
    'This will be needed to manage and check in for any remaining flights. Unselected passengers on this reservation will keep the existing confirmation number and will not be affected.',
  passengerSelections: [
    { name: 'Sammy Travels', passengerCanBeSplitOff: true, passengerId: 'id1' },
    { name: 'Andy Travels', passengerCanBeSplitOff: true, passengerId: 'id2' }
  ]
});

export const getStateWithFormData = (data) => ({
  app: {
    airChange: {
      changeFlightPage: {
        response: {
          splitPnrDetails: getSplitPnrDetails(),
          _links: {
            splitPnr: {
              href: '/v1/mobile-air-booking/page/flights/change/split-pnr/PPUWKZ',
              method: 'PUT',
              body: {
                passengerSearchToken: 'testToken'
              }
            }
          }
        }
      }
    },
    formData: {
      AIR_CHANGE_SELECT_PASSENGERS_FORM: {
        data
      }
    }
  }
});

export const getSplitPnrDetailsForAirCancel = () => ({
  selectionText: 'There are multiple passengers on this reservation. <br/><b>Select all the passengers you want to cancel.</b>',
  confirmationText: "By clicking 'continue', selected Passengers will <b>receive a new confirmation number.</b>",
  additionalInformationText:
    'The New Confirmation # is used to manage and check in for any remaining flights. Unselected passengers keep the same confirmation number.',
  passengerSelections: [
    { name: 'Sammy Travels', passengerId: 'id1' },
    { name: 'Andy Travels', passengerId: 'id2' }
  ]
});

export const refundQuoteLinkObject = {
  body: {
    cancelToken: 'testCancelToken',
    passengerSearchToken: 'testPassengerSearchToken'
  },
  href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/PPUWKZ',
  method: 'POST'
};

export const getStateWithFormDataForAirCancel = (data, showBoundSelection) => ({
  app: {
    account: { isLoggedIn: true },
    airCancel: {
      cancelBoundPage: {
        response: {
          splitPnrDetails: getSplitPnrDetailsForAirCancel(),
          recordLocator: 'PPUWKZ',
          _links: {
            refundQuote: refundQuoteLinkObject,
            splitPnr: {
              body: {
                passengerSearchToken: 'testToken'
              },
              href: '/v1/mobile-air-booking/page/flights/cancel-bound/split-pnr/PPUWKZ',
              method: 'PUT'
            }
          },
          _meta: { showBoundSelection }
        }
      }
    },
    formData: {
      AIR_CANCEL_SELECT_PASSENGERS_FORM: {
        data
      }
    }
  }
});

export const splitPnrLinkObjWithSelectedIdsAndEmail = {
  body: {
    passengerSearchToken: 'testToken',
    passengerIds: ['id1'],
    receiptEmail: 'test@test.com'
  },
  href: '/v1/mobile-air-booking/page/flights/change/split-pnr/PPUWKZ',
  method: 'PUT'
};

export const splitPnrLinkObjWithSelectedIdsAndEmailForAirCancel = {
  ...splitPnrLinkObjWithSelectedIdsAndEmail,
  href: '/v1/mobile-air-booking/page/flights/cancel-bound/split-pnr/PPUWKZ'
};

export const splitPnrDynamicWaiverMessages = [
  {
    key: 'SPLIT_PNR_CHANGE_DW_SUMMARY',
    header: 'You may change your travel date/time at no additional cost.',
    body: 'Circumstances beyond our control (weather, etc.) are creating disruptions to our scheduled service and a flight(s) on which you are currently booked may be adversely affected. To minimize your inconvenience, we are offering the one time opportunity to change your flight date(s) and/or time(s) at no additional cost in accordance with our established reaccommodation practices.',
    icon: 'WARNING',
    textColor: 'NEGATIVE',
    primaryThemeColor: 'primary-red',
    inverseThemeColor: 'neutral-gray2'
  },
  {
    key: 'SPLIT_PNR_CHANGE_DW_DEP_STATIONS',
    header: 'For your departing flight:',
    body: 'Departure Airport: New York/Newark, NJ (EWR) , or New York (LaGuardia), NY (LGA) , or Long Island/Islip, NY (ISP) .\nArrival Airport: Cancun, Mexico (CUN) ',
    icon: 'None',
    textColor: 'NEGATIVE',
    primaryThemeColor: 'primary-red',
    inverseThemeColor: 'neutral-gray2'
  },
  {
    key: 'SPLIT_PNR_CHANGE_DW_RET_STATIONS',
    header: 'For your returning flight:',
    body: 'Departure Airport: Cancun, Mexico (CUN) .\nArrival Airport: New York/Newark, NJ (EWR) , or New York (LaGuardia), NY (LGA) , or Long Island/Islip, NY (ISP) ',
    icon: 'None',
    textColor: 'NEGATIVE',
    primaryThemeColor: 'primary-red',
    inverseThemeColor: 'neutral-gray2'
  }
];

export const airChangeSplitPnrDetailsWithDWMessages = {
  ...getSplitPnrDetails(),
  messages: splitPnrDynamicWaiverMessages
};
export const airChangeSplitPnrDetailsWithHeaderMessage = {
  ...getSplitPnrDetails(),
  headerMessage: {
    body: '• You must have at least one (1) adult on this reservation to accompany minors and children.\n• Minors and children cannot split off this reservation by themselves.\n• If you would like your children or minors to travel as unaccompanied minors, you must cancel their reservation and rebook them.',
    header: "There are minors or children on this reservation.",
    icon: "INFO",
    inverseThemeColor: "primary-dark-blue",
    key: "CHANGE_MULTIPAX_SPLIT_WITH_CHILD",
    primaryThemeColor: "neutral-white",
    textColor: "DEFAULT"
  }
};

export const airChangeSplitPnrDetailsWithPassengerTypeText = {
  ...airChangeSplitPnrDetailsWithHeaderMessage,
  passengerSelections: [
    {
      ...airChangeSplitPnrDetailsWithHeaderMessage.passengerSelections[0],
      passengerTypeText: 'Adult'
    },
    {
      ...airChangeSplitPnrDetailsWithHeaderMessage.passengerSelections[1],
      passengerCanBeSplitOff: false,
      passengerTypeText: 'Child'
    }
  ]
};

export const getSplitPnrDetailsWithChildrenPassengers = () => ({
  ...getSplitPnrDetails(),
  passengerSelections: [
    { name: 'Adult Travels', passengerCanBeSplitOff: true, passengerId: 'id1', passengerTypeText: 'Adult' },
    { name: 'Child One Travels', passengerCanBeSplitOff: false, passengerId: 'id2', passengerTypeText: 'Child' },
    { name: 'Adult Two Travels', passengerCanBeSplitOff: true, passengerId: 'id3', passengerTypeText: 'Adult' },
    { name: 'Child Two Travels', passengerCanBeSplitOff: false, passengerId: 'id4', passengerTypeText: 'Child' }
  ]
});

export const stateWithAllSelectedIdsFormData = getStateWithFormData({ id1: true, id2: true });

export const stateWithAllSelectedIdsFormDataForAirCancel = getStateWithFormDataForAirCancel({ id1: true, id2: true });

export const stateWithAllUnSelectedIdsFormData = getStateWithFormData({ id1: false, id2: false });

export const stateWithAllUnSelectedIdsFormDataForAirCancel = getStateWithFormDataForAirCancel({ id1: false, id2: false });

export const stateWithInvalidEmailFormData = getStateWithFormData({ id1: true, id2: false, receiptEmail: 'test$%#' });

export const stateWithValidEmailFormData = getStateWithFormData({ id1: true, id2: false, receiptEmail: 'test@test.com' });

export const stateWithValidEmailFormDataForAirCancel = getStateWithFormDataForAirCancel({ id1: true, id2: false, receiptEmail: 'test@test.com' });
