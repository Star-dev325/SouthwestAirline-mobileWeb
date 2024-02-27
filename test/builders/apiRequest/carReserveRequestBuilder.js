module.exports = function() {
  const carReservationRequest = {
    driver: {
      firstName: 'Charith',
      lastName: 'Janusz',
      accountNumber: '',
      flightNumber: null,
      phone: {
        number: '2481234567', countryCode: 1
      }
    },
    extras: [
      { type: 'SKI_RACK' },
      { type: 'CHILD_TODDLER_SEAT' }
    ],
    product: {
      productId: 'MjAxNi0xMi0xNFQxMTozMHxBQ0F8MjAxNi0xMi0xN1QxMTozMHxBQ0F8TUlEU0laRXxBTEFNTw=='
    },
    receiptEmail: 'aterris@example.com',
    purposeOfTravel: null
  };

  this.build = () => carReservationRequest;
};
