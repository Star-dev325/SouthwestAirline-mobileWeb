export const getModifyBaggageDetailsMockData = (additionalItems = []) => ({
  linkIcon: 'two-bags',
  linkPrefixText: 'At the airport?',
  linkSuffixClickableText: 'Find out what to do with your bags.',
  modalDetails: {
    buttonText: 'Got it',
    infoList: [
      {
        icon: 'number-circle-one',
        text: 'Bring your bags to the airport kiosk at least 45 minutes prior to departure.'
      },
      {
        icon: 'number-circle-two',
        text: 'Confirm your bag selections at the kiosk and print your bag tags.'
      },
      {
        icon: 'number-circle-three',
        text: 'Self-tag bags and bring them to a Customer Service Agent at bag drop in the lobby.'
      }
    ].concat(additionalItems),
    title: 'What to expect at the airport'
  }
});
