import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {
  mapStateToProps,
  SameDayBoundSelectionPage
} from 'src/sameDay/pages/sameDayBoundSelectionPage';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

describe('sameDayBoundSelectionPage', () => {
  let retrieveSameDayBoundInformationFnMock;
  let retrieveSameDayShoppingInformationFnMock;
  const selectBoundMock = 0;
  const viewForSameDayPageMock = {
    _links: {
      sameDayShopping: {
        href: '/v1/mobile-air-operations/page/same-day/shopping4ENWXX',
        method: 'POST',
        body: {
          sameDayToken:
            'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2pZxX0k1GtpcWb28okHxM9yEPt6Nic3LbR1NTQyTsl8afOXxewf1G8B-8J2fgRo_UX0MlsMY7SOtlJmbg=='
        }
      }
    },
    boundSelectionMessage: '',
    _meta: { showBoundSelection: true }
  };

  beforeEach(() => {
    retrieveSameDayBoundInformationFnMock = jest.fn();
    retrieveSameDayShoppingInformationFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render Same day selection page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('Should render Same day selection page with bound selection', () => {
    const { viewReservationViewPage } = new ViewReservationBuilder().withViewForSameDayPage().build();
    const state = { app: { viewReservation: viewReservationViewPage } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should not render if update does not require bound selection', () => {
    const mockProps = {
      viewForSameDayPage: {
        ...viewForSameDayPageMock,
        _meta: { showBoundSelection: false }
      }
    };
    const { container } = createComponent(mockProps);

    expect(container.querySelector('.bound-selection')).toBeNull();
  });

  it('should not cause an error if props are not provided', () => {
    const mockProps = {
      viewForSameDayPage: undefined
    };
    const innerCreateComponent = () => {
      createComponent(mockProps);
    };

    expect(innerCreateComponent).not.toThrow();
  });

  it('should not cause an error if state is not provided', () => {
    const mockState = {};
    const innerMapStateToProps = () => {
      mapStateToProps(mockState);
    };

    expect(innerMapStateToProps).not.toThrow();
  });

  it('should render the web view placeholder title if show bound selection is false', () => {
    const mockProps = {
      isWebView: true,
      viewForSameDayPage: {
        ...viewForSameDayPageMock,
        _meta: { showBoundSelection: false }
      }
    };
    const { container } = createComponent(mockProps);

    expect(container).toMatchSnapshot();
  });

  it('should retrieve same day bound information when in web view', () => {
    const mockSameDayUpdates = {
      "href": "/v1/mobile-air-operations/page/same-day/PNR123",
      "method": "POST",
      "body": {
        "passengerSearchToken": "abc.123.xyz"
      },
      "labelText": "Same-day standby"
    };
    const mockProps = {
      isWebView: true,
      location: {
        state: {
          ...mockSameDayUpdates
        }
      },
      viewForSameDayPage: null
    };

    createComponent(mockProps);

    expect(retrieveSameDayBoundInformationFnMock).toHaveBeenCalledWith(mockSameDayUpdates, true);
  });

  it('should not retrieve same day bound information if no link data is provided', () => {
    const mockSameDayUpdates = {
      "href": "/v1/mobile-air-operations/page/same-day/PNR123",
      "method": "POST",
      "body": {
        "passengerSearchToken": "abc.123.xyz"
      },
      "labelText": "Same-day standby"
    };
    const mockProps = {
      isWebView: true,
      location: {
        state: {}
      },
      viewForSameDayPage: null
    };

    createComponent(mockProps);

    expect(retrieveSameDayBoundInformationFnMock).not.toHaveBeenCalledWith(mockSameDayUpdates, true);
  });

  it('Should call retrieveSameDayShoppingInformationFn on Continue button click when sameDayShopping has data ', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPageMock, selectBoundMock);
  });

  it('Should call retrieveSameDayShoppingInformationFn on Continue button click when sameDayShopping is empty in _links object of viewForSameDayPage', () => {
    const instance = React.createRef();
    const viewForSameDayPage = {
      _links: {
        sameDayShopping: {}
      },
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: false
        },
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, selectBoundMock);
  });

  it('Should call retrieveSameDayShoppingInformationFn on Continue button click when _links is unavailable in viewForSameDayPage', () => {
    const instance = React.createRef();
    const selectedBound = { firstbound: false, secondbound: true };
    const viewForSameDayPage = {
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: false
        },
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage, selectedBound });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, 1);
  });

  it('Should call retrieveSameDayShoppingInformationFn on Continue button click when _links object is {} in viewForSameDayPage ', () => {
    const instance = React.createRef();
    const viewForSameDayPage = {
      _links: {},
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage });
    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, selectBoundMock);
  });

  it('Should call retrieveSameDayShoppingInformationFn on Continue button click  when _links object is undefined in viewForSameDayPage', () => {
    const instance = React.createRef();
    const viewForSameDayPage = {
      _links: undefined,
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, selectBoundMock);
  });

  it('Should  call retrieveSameDayShoppingInformationFn on Continue button click  when sameDayShopping is undefiend in _links object of viewForSameDayPage', () => {
    const instance = React.createRef();
    const viewForSameDayPage = {
      _links: {
        sameDayShopping: undefined
      },
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, selectBoundMock);
  });

  it('Should  call retrieveSameDayShoppingInformationFn on Continue button click  when sameDayShopping object is null in viewForSameDayPage', () => {
    const instance = React.createRef();
    const viewForSameDayPage = {
      _links: {
        sameDayShopping: null
      },
      boundSelections: [
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        },
        {
          flightType: 'Departure',
          originalDate: '2022-08-11',
          fromAirport: 'Denver, CO - DEN',
          fromAirportCode: 'DEN',
          toAirport: 'Phoenix, AZ - PHX',
          toAirportCode: 'PHX',
          flight: '1933',
          timeDeparts: '08:30',
          timeArrives: '09:30',
          boundReference: 'bound1',
          isSelectable: true
        }
      ],
      boundSelectionMessage: 'test',
      _meta: {}
    };

    createComponent({ ref: instance, viewForSameDayPage });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPage, 0);
  });

  it('Should  call retrieveSameDayShoppingInformationFn on Continue button click  when selectbound is 1 ', () => {
    const instance = React.createRef();
    const selectedBound = { firstbound: false, secondbound: true };

    createComponent({ ref: instance, selectedBound });

    instance.current._onSameDayContinueButtonClick();

    expect(retrieveSameDayShoppingInformationFnMock).toHaveBeenCalledWith(viewForSameDayPageMock, 1);
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      match: { params: '' },
      location: {},
      selectedBound: { firstbound: true, secondbound: false },
      viewForSameDayPage: viewForSameDayPageMock,
      retrieveSameDayBoundInformationFn: retrieveSameDayBoundInformationFnMock,
      retrieveSameDayShoppingInformationFn: retrieveSameDayShoppingInformationFnMock
    };
    const defaultState = {
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        },
        viewReservation: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <SameDayBoundSelectionPage {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
