module.exports = {
  reservationContactInformation: {
    messages: [
      {
        key: 'UPDATE_CONTACT_METHOD_MESSAGE',
        header: null,
        body: 'A Reservation may only contain one contact method. By providing your contact information you are granting Southwest Airlines permission to send operational information on your flights.',
        icon: 'NONE',
        textColor: 'DEFAULT'
      }
    ],
    primaryContactMethod: 'MAIL',
    contactEmail: {
      email: 'DIANA.MARTINEZ@WNCO.COM',
      preferredLanguage: 'EN'
    },
    contactPhone: null,
    contactTextMessagePhone: null,
    internationalDeclineNotifications: false,
    contactInformationAnalytics: {
      recordLocator: 'KSC7ZD',
      gdsTicketType: null,
      isInternational: false,
      isSwabiz: false
    },
    isInternational: true,
    _links: {
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
        method: 'POST',
        body: {
          passengerSearchToken:
            '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ',
          contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a'
        }
      }
    }
  }
};
