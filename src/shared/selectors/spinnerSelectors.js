// @flow
const getSpinnerState = (state) => state.app.spinner;

export const getSpinnerMessage = (state: *) => {
  const { asyncChain, chainMessageCount, chainMessages, spinnerMessage } = getSpinnerState(state);
  let message = spinnerMessage;

  if (asyncChain) {
    const messageIndex = Math.min(chainMessageCount, chainMessages?.length - 1);

    if (!isNaN(messageIndex)) {
      message = chainMessages[messageIndex];
    }
  }

  return message;
};
