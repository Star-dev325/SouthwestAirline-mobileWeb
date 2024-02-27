// @flow
import type { StandbyListPageType } from 'src/standby/flow-typed/standby.types';

class StandbyResponseBuilder {
  standbyListPage: StandbyListPageType;

  constructor() {
    this.standbyListPage = {
      header: {
        flightNumber: '1476',
        date: '2022-11-17',
        destinationDescription: 'Hilo',
        from: 'Honolulu (Oahu), HI (HNL)',
        to: 'Hilo, HI (ITO)',
        hasWifi: false,
        departureTime: '19:25',
        arrivalTime: '20:25'
      },
      standbyList: [
        {
          isConfirmed: true,
          displayName: 'CLAYB / BR',
          number: '1',
          isPnrPassenger: true
        },
        {
          isConfirmed: true,
          displayName: 'CLAYB / LI',
          number: '2',
          isPnrPassenger: false
        },
        {
          isConfirmed: false,
          displayName: 'CLAYB / GI',
          number: '3',
          isPnrPassenger: true
        },
        {
          isConfirmed: false,
          displayName: 'CLAYB / CL',
          number: '4',
          isPnrPassenger: false
        },
        {
          isConfirmed: false,
          displayName: 'CLAYB / RY',
          number: '5',
          isPnrPassenger: false
        }
      ],
      cancelStandbyListingMessage: {
        body: 'If you cancel your standby listing, you will lose your position on the standby list',
        header: 'Are you sure?',
        icon: 'NONE',
        key: 'CANCEL_STANDBY_LISTING_MESSAGE',
        textColor: 'DEFAULT'
      },
      disclaimerText:
        'Standby position subject to change without notice. Seat availability is not guaranteed. Please see a Customer Service Agent for full details of standby position and any questions regarding fare difference, taxes, or fees you may be required to pay.',
      _links: {
        standbyListPolicies: {
          href: '/content/generated/data/overlays/standby_policies.json',
          method: 'GET'
        },
        cancelStandbyListing: {
          href: '/v1/mobile-air-operations/page/standby/47AU4M',
          method: 'PUT',
          labelText: 'Cancel standby listing',
          body: {
            standbyToken:
              'eyJjYXJyaWVyQ29kZSI6IldOIiwib3JpZ2luQWlycG9ydCI6IkRBTCIsImRlcGFydHVyZURhdGUiOiIyMDIyLTExLTE4IiwiZmxpZ2h0TnVtYmVyIjoiNTUiLCJkZXN0aW5hdGlvbkFpcnBvcnQiOiJIT1UiLCJhcnJpdmFsVGltZSI6IjIxOjEwIiwiZGVwYXJ0dXJlVGltZSI6IjIwOjAwIiwicmVjb3JkTG9jYXRvciI6IjQ3QVU0TSIsImZpcnN0TmFtZSI6IlBST1hZIiwibGFzdE5hbWUiOiJDSEFOR0UiLCJwYXNzZW5nZXJTZWFyY2hUb2tlbiI6IjVrMUtTdXh3SGFnTHNXeDRqdmt1NlpyUFJCUFhQbnphTU1HNDhuZTI1aU9UVG5JcW55OW5jZ0xVb3I4TFdQcm5CM3prMS0wRlhUYjlrYWFfNmlNcldwLU5nOXNxcEExQVNIZnVZd3MwUEJKU2lFUGdUdnVqNU5WZV9xemUxS21mNGY3ck9jQmE5R0pkcjZaNnlGZz0iLCJub25SZXZQbnIiOmZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjoiV041NURBTEhPVTIwMjIxMTE4In0='
          }
        }
      },
      disclaimerWithLinks:
        '<a href="https://www.southwest.com/help/changes-and-cancellations/same-day-change-same-day-standby " target="_blank">Standby list policies and information </a>',
      seatsAvailableText: '175 seats available',
      faqWithLinks:
        '<a href="https://www.southwest.com/airfare-types-benefits/sameday-standby-change" target="_blank">Standby FAQs </a> | <a href="https://www.southwest.com/airfare-types-benefits/sameday-standby-change" target="_blank">What are my chances I\'ll make it? </a>'
    };

    return this;
  }

  withCancelBound() {
    this.standbyListPage._links.cancelStandbyListing = null;
    this.standbyListPage._links.cancelBound = {
      href: '/v1/mobile-air-booking/page/flights/cancel-bound/3SHU8X',
      method: 'GET',
      labelText: 'Cancel standby listing',
      query: {
        'passenger-search-token':
          'GxzM0N_YDS43sqczF2VosRxYPudlxAtjfHLB4dS3JxShmcwPdcK0BOfuQkI6DYqUQsMAwkmX_52M5bshwagMXfHg69nzCjNkvpK2EEWgsrgjWOfQxSnupGzWJ7ABPFmUD7-ugUxF98AsV62R0X59'
      }
    };

    return this;
  }

  withOutHeaderDetails() {
    this.standbyListPage.header = null;

    return this;
  }

  withOutSeatsAvailableText() {
    this.standbyListPage.seatsAvailableText = null;

    return this;
  }

  withOutCancelStandbyListing() {
    this.standbyListPage._links.cancelStandbyListing = null;

    return this;
  }

  withOutCancelBoundLabelText() {
    this.standbyListPage._links.cancelBound = {
      href: '/v1/mobile-air-booking/page/flights/cancel-bound/3SHU8X',
      method: 'GET',
      query: {
        'passenger-search-token':
          'GxzM0N_YDS43sqczF2VosRxYPudlxAtjfHLB4dS3JxShmcwPdcK0BOfuQkI6DYqUQsMAwkmX_52M5bshwagMXfHg69nzCjNkvpK2EEWgsrgjWOfQxSnupGzWJ7ABPFmUD7-ugUxF98AsV62R0X59'
      }
    };

    return this;
  }

  withOutCancelStandbyListingLabelText() {
    this.standbyListPage._links.cancelStandbyListing = {
      body: {
        standbyToken:
          'eyJjYXJyaWVyQ29kZSI6IldOIiwib3JpZ2luQWlycG9ydCI6IkRBTCIsImRlcGFydHVyZURhdGUiOiIyMDIyLTExLTE4IiwiZmxpZ2h0TnVtYmVyIjoiNTUiLCJkZXN0aW5hdGlvbkFpcnBvcnQiOiJIT1UiLCJhcnJpdmFsVGltZSI6IjIxOjEwIiwiZGVwYXJ0dXJlVGltZSI6IjIwOjAwIiwicmVjb3JkTG9jYXRvciI6IjQ3QVU0TSIsImZpcnN0TmFtZSI6IlBST1hZIiwibGFzdE5hbWUiOiJDSEFOR0UiLCJwYXNzZW5nZXJTZWFyY2hUb2tlbiI6IjVrMUtTdXh3SGFnTHNXeDRqdmt1NlpyUFJCUFhQbnphTU1HNDhuZTI1aU9UVG5JcW55OW5jZ0xVb3I4TFdQcm5CM3prMS0wRlhUYjlrYWFfNmlNcldwLU5nOXNxcEExQVNIZnVZd3MwUEJKU2lFUGdUdnVqNU5WZV9xemUxS21mNGY3ck9jQmE5R0pkcjZaNnlGZz0iLCJub25SZXZQbnIiOmZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjoiV041NURBTEhPVTIwMjIxMTE4In0='
      },
      href: '/v1/mobile-air-operations/page/standby/47AU4M',
      labelText: 'Cancel standby listing',
      method: 'PUT'
    };

    return this;
  }

  withoutDisclaimerText() {
    this.standbyListPage.disclaimerText = null;

    return this;
  }

  withoutDisclaimerLink() {
    this.standbyListPage.disclaimerWithLinks = null;

    return this;
  }

  build() {
    return this.standbyListPage;
  }
}

export default StandbyResponseBuilder;
