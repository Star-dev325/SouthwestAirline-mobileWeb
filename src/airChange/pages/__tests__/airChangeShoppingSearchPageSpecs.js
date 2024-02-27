import i18n from '@swa-ui/locale';
import _ from 'lodash';
import { sandbox } from 'sinon';
import { AirChangeShoppingSearchPage } from 'src/airChange/pages/airChangeShoppingSearchPage';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { getFlightSearchMessage } from 'test/builders/model/airChangeShoppingSearchPageBuilder';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponent } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('airChangeShoppingSearchPage', () => {
  let clearSelectedProductsFnStub;
  let loadAirportsFnStub;
  let loadRecentlySearchedFnStub;
  let pushStub;
  let searchForFlightsFnStub;
  let searchForReaccomFlightsFnStub;
  let updateSelectedAirportInfoFnStub;
  let updateShouldForbidForwardFnStub;

  const initFormData = {
    to: 'LAX',
    from: 'LAS',
    departureAndReturnDate: {
      departureDate: '2018-05-06',
      returnDate: '2018-05-10'
    }
  };
  const changeShoppingLink = {
    href: 'change shopping request href',
    method: 'POST',
    body: {
      outbound: {
        boundReference: 'boundReference',
        date: '2018-05-12',
        'original-airport': 'DAL',
        'destination-airport': 'AUS',
        isChangeBound: true
      }
    }
  };

  beforeEach(() => {
    clearSelectedProductsFnStub = sinon.stub();
    loadAirportsFnStub = sinon.stub();
    loadRecentlySearchedFnStub = sinon.stub();
    pushStub = sinon.stub();
    searchForFlightsFnStub = sinon.stub();
    searchForReaccomFlightsFnStub = sinon.stub();
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
    updateSelectedAirportInfoFnStub = sinon.stub();
    updateShouldForbidForwardFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call loadAirports and loadRecentlySearched', () => {
    createComponentWrapper();
    expect(loadAirportsFnStub).to.have.been.called;
    expect(loadRecentlySearchedFnStub).to.have.been.called;
  });

  context('select departure flight to change', () => {
    it('should render page properly', () => {
      const wrapper = createComponentWrapper({
        selectedBounds: { firstbound: true, secondbound: false },
        searchOptions: {
          returnBoundDisabled: true
        }
      });

      expect(wrapper.find('PageHeader')).to.have.text('Change Departure Flight');
      expect(wrapper.find('AirportSelectorField').at(0)).to.contains.text('Las Vegas, NV');
      expect(wrapper.find('AirportSelectorField').at(1)).to.contains.text('Los Angeles, CA');
      expect(
        wrapper.find('AirportSelectorField').at(1).find('.airport-selector--formatted-airport_disabled')
      ).to.be.present();
    });
  });

  context('select return flight to change', () => {
    it('should render page properly', () => {
      const wrapper = createComponentWrapper({
        selectedBounds: { firstbound: false, secondbound: true },
        searchOptions: {
          departureBoundDisabled: true
        }
      });

      expect(wrapper.find('PageHeader')).to.have.text('Change Return Flight');
      expect(wrapper.find('AirportSelectorField').at(0)).to.contains.text('Las Vegas, NV');
      expect(wrapper.find('AirportSelectorField').at(1)).to.contains.text('Los Angeles, CA');
      expect(
        wrapper.find('AirportSelectorField').at(0).find('.airport-selector--formatted-airport_disabled')
      ).to.be.present();
    });
  });

  context('select both departure and return flights to change', () => {
    it('should render page properly', () => {
      const wrapper = createComponentWrapper({
        selectedBounds: { firstbound: true, secondbound: true },
        searchOptions: {
          returnBoundDisabled: false,
          departureBoundDisabled: false
        }
      });

      expect(wrapper.find('PageHeader')).to.have.text('Change Flight');
      expect(wrapper.find('AirportSelectorField').at(0)).to.contains.text('Las Vegas, NV');
      expect(wrapper.find('AirportSelectorField').at(1)).to.contains.text('Los Angeles, CA');
      expect(
        wrapper.find('AirportSelectorField').at(0).find('.airport-selector--formatted-airport_disabled')
      ).to.be.not.present();
      expect(
        wrapper.find('AirportSelectorField').at(1).find('.airport-selector--formatted-airport_disabled')
      ).to.be.not.present();
    });

    it('greyed out both departure and return flights', () => {
      const wrapper = createComponentWrapper({
        changeFlightPageResponse: {
          _meta: {
            hasUnaccompaniedMinor: true
          }
        }
      });

      expect(
        wrapper.find('AirportSelectorField').at(0).find('.airport-selector--formatted-airport_disabled')
      ).to.be.present();
      expect(
        wrapper.find('AirportSelectorField').at(1).find('.airport-selector--formatted-airport_disabled')
      ).to.be.present();
    });
  });

  context('click to search for flights', () => {
    let boundSelections;

    beforeEach(() => {
      boundSelections = [
        new BoundSelectionBuilder().build(),
        new BoundSelectionBuilder().withFlightType('RETURN').withOriginalDate('2018-05-17').build()
      ];
    });

    it('should pass correct parameters to searchForFlights', () => {
      const selectedBounds = { firstbound: true, secondbound: false };
      const wrapper = createComponentWrapper({
        changeFlightPageResponse: { boundSelections },
        selectedBounds
      });

      submitForm(wrapper);

      const expectedOptions = {
        selectedBounds,
        searchRequest: {
          to: 'LAX',
          from: 'LAS',
          departureAndReturnDate: {
            departureDate: '2018-05-06',
            returnDate: '2018-05-10'
          },
          diffs: {}
        },
        changeShoppingLink,
        boundSelections
      };

      searchForFlightsFnStub.firstCall.args[1]();

      expect(searchForFlightsFnStub).to.have.been.calledWith(expectedOptions);
      expect(pushStub).to.have.been.calledWith('/air/change/outbound/results');
    });

    it('should clear selected products', () => {
      const selectedBounds = { firstbound: true, secondbound: false };
      const wrapper = createComponentWrapper({
        changeFlightPageResponse: { boundSelections },
        selectedBounds
      });

      submitForm(wrapper);

      expect(clearSelectedProductsFnStub).to.have.been.calledWith(false);
    });

    it('should update should forbid forward with false', () => {
      const selectedBounds = { firstbound: true, secondbound: false };
      const wrapper = createComponentWrapper({
        changeFlightPageResponse: { boundSelections },
        selectedBounds
      });

      submitForm(wrapper);

      expect(updateShouldForbidForwardFnStub).to.be.calledWith(false);
    });

    context('next path', () => {
      const selectedBounds = { firstbound: false, secondbound: true };

      it('should pass url with inbound when select the second bound of round trip', () => {
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: { boundSelections },
          selectedBounds
        });

        submitForm(wrapper);

        searchForFlightsFnStub.args[0][1]();
        expect(pushStub).to.have.been.calledWith('/air/change/inbound/results');
      });

      it('should pass url with inbound when select the second bound of open jaw', () => {
        boundSelections[1] = new BoundSelectionBuilder().withOriginalDate('2018-05-17').build();
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: { boundSelections },
          selectedBounds
        });

        submitForm(wrapper);

        searchForFlightsFnStub.args[0][1]();
        expect(pushStub).to.have.been.calledWith('/air/change/inbound/results');
      });
    });

    context('dynamic waiver', () => {
      it('should show popup when user change the station no under dynamic waiver protected', () => {
        const showDialogFnStub = sinon.stub();
        const selectedBounds = { firstbound: true, secondbound: true };
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: {
            boundSelections,
            dynamicWaivers: [
              {
                alternativeArrivalCities: ['BOS'],
                alternativeDepartureCities: ['PDV', 'MHT', 'ATL'],
                calculatedEndDate: '2018-07-32',
                calculatedStartDate: '2018-07-15',
                eligibleEndDate: '2018-07-31',
                eligibleStartDate: '2018-07-16',
                flightType: 'DEPARTURE'
              }
            ]
          },
          selectedBounds,
          showDialogFn: showDialogFnStub
        });

        submitForm(wrapper);

        expect(showDialogFnStub.args[0][0]).to.contains({
          message: i18n('AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE')
        });
      });

      it('should not call showDialogFn and handle default value for changeFlightPageResponse when it is undefined', () => {
        const selectedBounds = { firstbound: true, secondbound: true };
        const showDialogFnStub = sinon.stub();
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: undefined,
          selectedBounds,
          showDialogFn: showDialogFnStub
        });

        submitForm(wrapper);

        expect(showDialogFnStub).to.have.not.been.called;
      });
    });

    describe('reaccom scenario', () => {
      const reaccomProductsLink = {
        ...changeShoppingLink,
        body: {
          ...changeShoppingLink.body,
          shareDataToken: 'testShareDataToken'
        }
      };

      it('should render page properly for ARNK pnrs', () => {
        const wrapper = createComponentWrapper({
          isReaccom: true,
          reaccomFlightPageResponse: {
            _links: { reaccomProducts: { body: undefined } },
            _meta: { allowARNKPnrs: true },
            boundSelections,
            flightSearchMessage: getFlightSearchMessage(),
            selectedBounds: { firstbound: true, secondbound: true }
          }
        });

        expect(wrapper).toMatchSnapshot();
      });

      it('should call clearSelectedProductsFn with true', () => {
        const wrapper = createComponentWrapper({
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections,
            _links: { reaccomProducts: changeShoppingLink }
          }
        });

        submitForm(wrapper);

        expect(clearSelectedProductsFnStub).to.have.been.calledWith(true);
      });

      it('should show popup based on reaccom dynamic waiver', () => {
        const selectedBounds = { firstbound: true, secondbound: true };
        const showDialogFnStub = sinon.stub();
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: {},
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections,
            dynamicWaivers: [
              {
                alternativeDepartureCities: ['JFK', 'LGA']
              }
            ]
          },
          selectedBounds,
          showDialogFn: showDialogFnStub
        });

        submitForm(wrapper);

        expect(showDialogFnStub.args[0][0]).to.contains({
          message: i18n('AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE')
        });
      });

      it('should grey out both departure and return flights when hasUnaccompaniedMinor is true', () => {
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: undefined,
          isReaccom: true,
          reaccomFlightPageResponse: {
            _meta: {
              hasUnaccompaniedMinor: true
            }
          }
        });

        expect(
          wrapper.find('AirportSelectorField').at(0).find('.airport-selector--formatted-airport_disabled')
        ).to.be.present();
        expect(
          wrapper.find('AirportSelectorField').at(1).find('.airport-selector--formatted-airport_disabled')
        ).to.be.present();
      });

      it('should pass isReaccomCoTerminalEligible true to AirChangeShoppingSearchForm when it is eligible', () => {
        const wrapper = createComponentWrapper({
          changeFlightPageResponse: undefined,
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections: [new BoundSelectionBuilder().withReaccomCoTerm().build()]
          }
        });

        expect(wrapper.find('AirChangeShoppingSearchForm').props().isReaccomCoTerminalEligible).to.be.true;
      });

      it('should call searchForReaccomFlightsFnStub with correct reaccom search request when both bounds are selected', () => {
        const expectedReaccomSearchRequest = {
          body: {
            inbound: {
              boundReference: undefined,
              date: '2018-05-10',
              'destination-airport': 'LAS',
              isChangeBound: true,
              'origin-airport': 'LAX'
            },
            outbound: {
              boundReference: undefined,
              date: '2018-05-06',
              'destination-airport': 'LAX',
              isChangeBound: true,
              'origin-airport': 'LAS'
            },
            shareDataToken: 'testShareDataToken'
          },
          href: 'change shopping request href',
          method: 'POST'
        };
        const wrapper = createComponentWrapper({
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections,
            _links: { reaccomProducts: reaccomProductsLink }
          }
        });

        submitForm(wrapper);

        expect(searchForReaccomFlightsFnStub).to.have.been.calledWith(
          expectedReaccomSearchRequest,
          `/air/change/${OUTBOUND}/results`
        );
      });

      it('should call searchForReaccomFlightsFnStub with correct reaccom search request when only inbound is selected', () => {
        const expectedReaccomSearchRequest = {
          body: {
            inbound: {
              boundReference: undefined,
              date: '2018-05-10',
              'destination-airport': 'LAX',
              isChangeBound: true,
              'origin-airport': 'LAS'
            },
            outbound: {
              boundReference: undefined,
              date: '2018-04-17',
              'destination-airport': 'AUS',
              isChangeBound: false,
              'origin-airport': 'BOI'
            },
            shareDataToken: 'testShareDataToken'
          },
          href: 'change shopping request href',
          method: 'POST'
        };
        const wrapper = createComponentWrapper({
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections,
            _links: { reaccomProducts: reaccomProductsLink }
          },
          selectedBounds: { firstbound: false, secondbound: true }
        });

        submitForm(wrapper);

        expect(searchForReaccomFlightsFnStub).to.have.been.calledWith(
          expectedReaccomSearchRequest,
          `/air/change/${INBOUND}/results`
        );
      });

      it('should call searchForReaccomFlightsFnStub with correct reaccom search request when reaccomProducts.body is undefined', () => {
        const expectedReaccomSearchRequest = {
          body: {
            inbound: {
              boundReference: undefined,
              date: '2018-05-10',
              'destination-airport': 'LAS',
              isChangeBound: true,
              'origin-airport': 'LAX'
            },
            outbound: {
              boundReference: undefined,
              date: '2018-05-06',
              'destination-airport': 'LAX',
              isChangeBound: true,
              'origin-airport': 'LAS'
            },
            shareDataToken: undefined
          },
          href: undefined,
          method: undefined
        };
        const wrapper = createComponentWrapper({
          isReaccom: true,
          reaccomFlightPageResponse: {
            boundSelections,
            _links: { reaccomProducts: { body: undefined } }
          }
        });

        submitForm(wrapper);

        expect(searchForReaccomFlightsFnStub).to.have.been.calledWith(
          expectedReaccomSearchRequest,
          `/air/change/${OUTBOUND}/results`
        );
      });
    });
  });

  const AIRPORT_LIST = [
    {
      code: 'LAX',
      airportName: 'Los Angeles',
      displayName: 'Los Angeles',
      cityName: 'Los Angeles,Burbank,Ontario,Orange County',
      shortDisplayName: 'Los Angeles',
      cityState: 'CA',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '33.9425',
      longitude: '-118.408',
      airportSearchName:
        'California, Irvine, Long Beach, Hollywood, Palm Springs, Malibu, City of Angels, Las Angeles, Disney, Burbank, Orange County, Santa Ana, Ontario, Universal Studios, LGB'
    },
    {
      airportName: 'Las Vegas',
      airportSearchName: 'Las Vegas, NV - LAS',
      cityName: 'Las Vegas',
      cityState: 'NV',
      code: 'LAS',
      countryCode: 'US',
      displayName: 'Las Vegas',
      latitude: '36.0801',
      longitude: '-115.152',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Las Vegas'
    }
  ];

  const createComponentWrapper = (props = {}) => {
    const boundSelection = new BoundSelectionBuilder().build();
    const defaultProps = {
      allAirports: AIRPORT_LIST,
      changeFlightPageResponse: {
        _links: {
          changeShopping: changeShoppingLink
        },
        _meta: {
          hasUnaccompaniedMinor: false
        },
        boundSelections: [boundSelection],
        dynamicWaivers: [],
        messages: [],
        selectionMode: 'ALL'
      },
      clearSelectedProductsFn: clearSelectedProductsFnStub,
      defaultLastBookableDate: '',
      hideDialogFn: _.noop,
      history: {
        location: {
          pathname: '/air/change/index.html'
        }
      },
      initFormData,
      isOpenJawReservation: false,
      loadAirportsFn: loadAirportsFnStub,
      loadRecentlySearchedFn: loadRecentlySearchedFnStub,
      push: pushStub,
      recentlySearched: [],
      searchForFlightsFn: searchForFlightsFnStub,
      searchForReaccomFlightsFn: searchForReaccomFlightsFnStub,
      searchOptions: {
        departureBoundDisabled: false,
        earliestBookableDate: undefined,
        lastBookableDate: undefined,
        returnBoundDisabled: false,
        tripType: 'roundTrip'
      },
      selectedBounds: { firstbound: true, secondbound: true },
      showDialogFn: _.noop,
      toggles: {},
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnStub,
      updateShouldForbidForwardFn: updateShouldForbidForwardFnStub
    };

    return createComponent(AirChangeShoppingSearchPage, {
      props: _.merge({}, defaultProps, props)
    });
  };
});
