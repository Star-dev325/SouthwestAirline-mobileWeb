class AirCancelBoundSelectPageMockResponseBuilder {
  constructor() {
    this.cancelBoundPage = {
      recordLocator: 'TIEOQX',
      boundSelections: [
        {
          productId: 'abcd',
          flightType: 'Departure',
          originalDate: '2020-06-03',
          fromAirport: 'Albany, NY - ALB',
          fromAirportCode: 'ALB',
          toAirport: 'Dallas (Love Field), TX - DAL',
          toAirportCode: 'DAL',
          flight: '1471/634',
          timeDeparts: '05:30',
          timeArrives: '10:25',
          isSelectable: true
        },
        {
          productId: 'zyxw',
          flightType: 'Return',
          originalDate: '2020-06-04',
          fromAirport: 'Dallas (Love Field), TX - DAL',
          fromAirportCode: 'DAL',
          toAirport: 'Albany, NY - ALB',
          toAirportCode: 'ALB',
          flight: '1941/551',
          timeDeparts: '06:00',
          timeArrives: '12:25',
          isSelectable: true
        }
      ],
      _meta: {
        showBoundSelection: true
      },
      _links: {
        refundQuote: {
          href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TIEOQX',
          method: 'POST',
          body: {
            cancelToken: 'cancel-token',
            passengerSearchToken: 'passenger-search-token'
          }
        }
      }
    };
  }

  withBoundSelectionNoticeAndHasInactiveBagsFalse() {
    this.cancelBoundPage.boundSelectionNotice = {
      message: 'Why do you want to cancel?!',
      title: 'Are you sure?'
    };

    this.cancelBoundPage.boundSelections[0].hasInactiveBags = false;

    return this;
  }

  withBoundSelectionNoticeAndHasInactiveBagsTrue() {
    this.cancelBoundPage.boundSelectionNotice = {
      message: 'Why do you want to cancel?!',
      title: 'Are you sure?'
    };

    this.cancelBoundPage.boundSelections[0].hasInactiveBags = true;

    return this;
  }

  withBoundSelectionNoticeEmptyAndHasInactiveBagsTrue() {
    this.cancelBoundPage.boundSelectionNotice = {};

    this.cancelBoundPage.boundSelections[0].hasInactiveBags = true;

    return this;
  }

  withSplitPnrConfirmationMessage() {
    this.cancelBoundPage.messages = [
      {
        header: 'Your new confirmation # 4JJRU5',
        icon: 'INFO',
        inverseThemeColor: 'primary-dark-blue',
        key: 'CANCEL_SPLIT_PNR_CONFIRMATION',
        primaryThemeColor: 'neutral-white'
      }
    ];

    return this;
  }

  build() {
    return { cancelBoundPage: this.cancelBoundPage };
  }
}

export default AirCancelBoundSelectPageMockResponseBuilder;
