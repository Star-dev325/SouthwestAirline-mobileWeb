import transferTravelFundsConfirmation from 'mocks/templates/travelFunds/transferTravelFundsConfirmation';

const transferTravelFundsConfirmationWithPartialSuccess = {
  ...transferTravelFundsConfirmation,
  headerMessage: {
    key: 'TRANSFER_PARTIAL_CONFIRMATION',
    header: 'Transfer Confirmed',
    body: "The transfer has been completed, however there may be a problem with the email confirmation. The flight credit is now associated with <name>'s Rapid Rewards account.",
    icon: 'WARNING',
    textColor: 'DEFAULT',
    backgroundColor: 'DEFAULT'
  }
};

export default transferTravelFundsConfirmationWithPartialSuccess;
