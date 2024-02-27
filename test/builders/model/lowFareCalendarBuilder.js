export default class LowFareCalendarBuilder {
  constructor() {
    this.outboundPage = {};
    this.inboundPage = {};
    this.response = {};
    this.selectedDates = {};
  }

  withRoundTripPoints() {
    this.outboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: null
        },
        {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.inboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.response = {
      lowFareCalendarPage: {
        lowFareCalendarAnalytics: {
          passengercount: '1',
          currencycode: 'POINTS',
          triptype: 'RT',
          origindestination: 'ALBDAL',
          destinationreturn: 'DALALB',
          lowestpriceout: 'none',
          lowestpointsout: '18598',
          lowestpricereturn: 'none',
          lowestpointsreturn: '18598',
          datesout: '03022020|03252020',
          datesrtn: '03022020|03252020'
        }
      }
    };
    this.selectedDates = {
      outboundDate: '2020-03-03',
      inboundDate: '2020-03-06'
    };

    return this;
  }

  withRoundTripUSD() {
    this.outboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: null
        },
        {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.inboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }, {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.response = {
      lowFareCalendarPage: {
        lowFareCalendarAnalytics: {
          passengercount: '1',
          currencycode: 'REVENUE',
          triptype: 'RT',
          origindestination: 'ALBDAL',
          destinationreturn: 'DALALB',
          lowestpriceout: '185.98',
          lowestpointsout: 'none',
          lowestpricereturn: '185.98',
          lowestpointsreturn: 'none',
          datesout: '03022020|03252020',
          datesrtn: '03022020|03252020'
        }
      }
    };
    this.selectedDates = {
      outboundDate: '2020-03-03',
      inboundDate: '2020-03-06'
    };

    return this;
  }

  withOneWayTripPoints() {
    this.outboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: null
        },
        {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '157,278',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '39,498',
              currencyCode: 'PTS',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.inboundPage = null;
    this.response = {
      lowFareCalendarPage: {
        lowFareCalendarAnalytics: {
          passengercount: '1',
          currencycode: 'POINTS',
          triptype: 'OW',
          origindestination: 'ALBDAL',
          destinationreturn: 'none',
          lowestpriceout: 'none',
          lowestpointsout: '18598',
          lowestpricereturn: 'none',
          lowestpointsreturn: 'none',
          datesout: '03022020|03252020',
          datesrtn: 'none'
        }
      }
    };
    this.selectedDates = {
      outboundDate: '2020-03-03'
    };

    return this;
  }

  withOneWayTripUSD() {
    this.outboundPage = {
      lowFareCalendarDays: [
        {
          date: '2020-03-02',
          lowestPrice: null
        },
        {
          date: '2020-03-03',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-04',
          lowestPrice: {
            price: {
              amount: '1,572.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-05',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-03-06',
          lowestPrice: {
            price: {
              amount: '394.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ]
    };
    this.inboundPage = null;
    this.response = {
      lowFareCalendarPage: {
        lowFareCalendarAnalytics: {
          passengercount: '1',
          currencycode: 'REVENUE',
          triptype: 'OW',
          origindestination: 'ALBDAL',
          destinationreturn: 'none',
          lowestpriceout: '185.98',
          lowestpointsout: 'none',
          lowestpricereturn: 'none',
          lowestpointsreturn: 'none',
          datesout: '03022020|03252020',
          datesrtn: 'none'
        }
      }
    };
    this.selectedDates = {
      outboundDate: '2020-03-03'
    };

    return this;
  }

  withDatesSelected(outboundDate, inboundDate) {
    this.selectedDates = {
      outboundDate,
      inboundDate
    };

    return this;
  }

  build() {
    return {
      outboundPage: this.outboundPage,
      inboundPage: this.inboundPage,
      response: this.response,
      selectedDates: this.selectedDates
    };
  }
}
