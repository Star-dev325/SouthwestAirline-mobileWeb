import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { FlightDetailsPage } from 'src/flightStatus/pages/flightDetailsPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import FlightStatusDetailsBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/flight-status/flightStatusDetailsBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';

describe('Flight Details Page', () => {
  let fetchFlightDetailsFnMock;
  let shareFlightStatusDetailsFnMock;

  beforeEach(() => {
    fetchFlightDetailsFnMock = jest.fn();
    shareFlightStatusDetailsFnMock = jest.fn();
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('renders those flight details', (done) => {
      const { container } = createPage();

      waitFor.untilAssertPass(() => {
        expect(container.querySelector('.flight-details')).toBeInTheDocument();
        expect(container.querySelector('.page-header--right-button')).not.toBeInTheDocument();
      }, done);
    });

    describe('render', () => {
      it('should render single leg flight when flightStatusDetailsPage is not empty', (done) => {
        const { container } = createPage();

        waitFor.untilAssertPass(() => {
          expect(container.querySelectorAll('.segment-details')).toHaveLength(1);
          expect(container.querySelectorAll('.leg-details')).toHaveLength(1);
          expect(container.querySelector('.page-header--right-button')).not.toBeInTheDocument();
        }, done);
      });

      it('should render multi leg flight when flightStatusDetailsPage is not empty', () => {
        const FlightStatusDetailsPageResponse = new FlightStatusDetailsBuilder()
          .withConnectingFlight()
          .build().flightStatusDetailsPage;

        const props = {
          query: {
            from: 'ATL',
            to: 'HOU',
            date: '2017-04-09',
            flightNumber: '100',
            connectingAirportCode: 'MSY',
            secondFlightNumber: '205'
          },
          flightStatusDetailsPage: {
            response: FlightStatusDetailsPageResponse
          }
        };
        const { container } = createPage(props);

        expect(container.querySelectorAll('.segment-details')).toHaveLength(1);
        expect(container.querySelectorAll('.leg-details')).toHaveLength(2);
        expect(container.querySelector('.page-header--right-button')).not.toBeInTheDocument();
      });

      it('should render multi leg flight when flightStatusDetailsPage is not empty with flight-keys', () => {
        const FlightStatusDetailsPageResponse = new FlightStatusDetailsBuilder()
          .withConnectingFlight()
          .build().flightStatusDetailsPage;

        const props = {
          query: {
            "flight-keys": "2023-11-10:AUSHOU1228|2023-11-10:HOUDAL20"
          },
          flightStatusDetailsPage: {
            response: FlightStatusDetailsPageResponse
          }
        };
        const { container } = createPage(props);

        expect(container.querySelectorAll('.segment-details')).toHaveLength(1);
        expect(container.querySelectorAll('.leg-details')).toHaveLength(2);
        expect(container.querySelector('.page-header--right-button')).not.toBeInTheDocument();
      });

      it('should not render when flightStatusDetailsPage is empty', () => {
        const { container } = createPage({ flightStatusDetailsPage: { response: null } });

        expect(container.querySelector('.segment-details')).not.toBeInTheDocument();
        expect(container.querySelector('.leg-details')).not.toBeInTheDocument();
        expect(container.querySelector('.page-header--right-button')).not.toBeInTheDocument();
      });

      describe('in webView', () => {
        it('and should render refresh button', (done) => {
          const { container } = createPage({ isWebView: true });

          waitFor.untilAssertPass(() => {
            expect(container.querySelector('.page-header--right-button')).toBeInTheDocument();
          }, done);
        });

        it('and should render Share button when shareFlightStatus is true', (done) => {
          const { container } = createPage({ isWebView: true, shareFlightStatus: true });

          waitFor.untilAssertPass(() => {
            expect(container.querySelector('.share-button')).toBeInTheDocument();
          }, done);
        });
      });
    });
  });

  describe('trip description', () => {
    it('should should display page header use flight numbers', () => {
      const { container } = createPage();

      expect(container.querySelector('.page-title-details').textContent).toEqual('Flight 1632 / 1781');
    });
  });

  it('should pass correct date, from and to props to component SearchFlightsSummaryHeader', () => {
    const { container } = createPage();

    expect(container).toMatchSnapshot();
  });

  it('should map multiple FlightStatusDetailCard use flightCards', (done) => {
    const FlightStatusDetailsPageResponse = new FlightStatusDetailsBuilder().build().flightStatusDetailsPage;
    const props = {
      flightStatusDetailsPage: {
        response: FlightStatusDetailsPageResponse
      }
    };
    const { container } = createPage(props);

    waitFor.untilAssertPass(() => {
      expect(container.querySelectorAll('.segment-details')).toHaveLength(1);
    }, done);
  });

  describe('fetchFlightDetailsFn called', () => {
    it('should call fetchFlightDetailsFnStub when component mounts', () => {
      createPage({}, true);
      expect(fetchFlightDetailsFnMock).toBeCalled();
    });
  });

  describe('in WebView and shareFlightStatusDetailsFn called', () => {
    it('should call shareFlightStatusDetailsFn when Share button is clicked', () => {
      const { container } = createPage({ isWebView: true, shareFlightStatus: true });

      expect(container.querySelector('.share-button')).toBeInTheDocument();

      fireEvent.click(container.querySelector('.share-button'));

      expect(shareFlightStatusDetailsFnMock).toBeCalled();
      expect(analyticsEventHelper.raiseSatelliteEvent).toBeCalled();
    });
  });

  describe('in WebView and click on renderRefreshButton', () => {
    it('should call fetchFlightDetailsFn when renderRefreshButton button is clicked', () => {
      const { container } = createPage({ isWebView: true, shareFlightStatus: true });

      expect(container.querySelector('.page-header--right-button')).toBeInTheDocument();

      fireEvent.click(container.querySelector('.page-header--right-button'));

      expect(fetchFlightDetailsFnMock).toBeCalled();
    });
  });

  const createPage = (props = {}, useNullResponse = false) => {
    const FlightStatusDetailsPageResponse = useNullResponse
      ? null
      : new FlightStatusDetailsBuilder().build().flightStatusDetailsPage;
    const defaultProps = {
      flightStatusDetailsPage: {
        response: FlightStatusDetailsPageResponse
      },
      query: {
        "flight-keys": "2023-11-10:AUSELP1009|2023-11-10:ELPDAL1565"
      },
      isWebView: false,
      shareFlightStatus: false,
      fetchFlightDetailsFn: fetchFlightDetailsFnMock,
      shareFlightStatusDetailsFn: shareFlightStatusDetailsFnMock
    };
    const mergedProps = { ...defaultProps, ...props };

    return createComponent(FlightDetailsPage, { props: { ...mergedProps } });
  };
});
