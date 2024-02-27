import dayjs from 'dayjs';
import { getInitFormData, getSearchOptions } from 'src/airChange/selectors/airChangeShoppingSearchPageSelectors';
import AirportBuilder from 'test/builders/model/airportBuilder';
import boundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import fakeClock from 'test/unit/helpers/fakeClock';

describe('airChangeShoppingSearchPageSelectors', () => {
  const departureAndReturnDate = {
    departureDate: '2018-04-17',
    returnDate: '2018-04-19'
  };
  const isReaccomScenario = false;
  const reaccomDepartureAndReturnDate = {
    departureDate: '2022-04-27',
    returnDate: '2022-04-29'
  };
  let changeBoundSelections;
  let firstBound;
  let reaccomBoundSelections;
  let reaccomFirstBound;
  let reaccomSecondBound;
  let secondBound;

  beforeEach(() => {
    fakeClock.setTimeTo('2018-04-05');
    firstBound = new boundSelectionBuilder().build();
    reaccomFirstBound = new boundSelectionBuilder()
      .withFlightType('DEPARTURE')
      .withOriginalDate('2022-04-27')
      .withFrom('Houston, TX - HOU', 'HOU')
      .withTo('New York, NY - JFK', 'JFK')
      .withReaccomCoTerm()
      .build();
    reaccomSecondBound = new boundSelectionBuilder()
      .withFlightType('RETURN')
      .withOriginalDate('2022-04-29')
      .withFrom('New York, NY - JFK', 'JFK')
      .withTo('Houston, TX - HOU', 'HOU')
      .withReaccomCoTerm()
      .build();
    secondBound = new boundSelectionBuilder()
      .withFlightType('RETURN')
      .withOriginalDate('2018-04-19')
      .withFrom('Austin, TX - AUS', 'AUS')
      .withTo('Boise, ID - BOI', 'BOI')
      .build();
    changeBoundSelections = [firstBound, secondBound];
    reaccomBoundSelections = [reaccomFirstBound, reaccomSecondBound];
  });

  afterEach(() => {
    fakeClock.restore();
  });

  context('getInitFormData', () => {
    it('should return proper initialFormData', () => {
      const selectedBounds = { firstbound: true, secondbound: false };

      expect(getInitFormData.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario)).to.deep.equal({
        from: 'BOI',
        to: 'AUS',
        departureAndReturnDate
      });
    });

    context('value of from and to', () => {
      it('should get from and to value from secondBound when only select secondbound', () => {
        const selectedBounds = { firstbound: false, secondbound: true };

        expect(getInitFormData.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario)).to.deep.equal({
          from: 'AUS',
          to: 'BOI',
          departureAndReturnDate
        });
      });
    });

    describe('when isReaccomScenario is true', () => {
      const isReaccomScenario = true;

      it('should return reaccom firstbound selection values when firstbound is true', () => {
        const selectedBounds = { firstbound: true, secondbound: false };

        expect(
          getInitFormData.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario, reaccomBoundSelections)
        ).to.deep.equal({
          departureAndReturnDate: reaccomDepartureAndReturnDate,
          from: 'HOU',
          to: 'JFK'
        });
      });

      it('should return reaccom secondbound selection values when secondbound is true', () => {
        const selectedBounds = { firstbound: false, secondbound: true };

        expect(
          getInitFormData.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario, reaccomBoundSelections)
        ).to.deep.equal({
          departureAndReturnDate: reaccomDepartureAndReturnDate,
          from: 'JFK',
          to: 'HOU'
        });
      });
    });
  });

  context('getSearchOptions', () => {
    const airportWithHOUCode = new AirportBuilder().withCode('HOU').build();
    const airportWithIAHCode = new AirportBuilder().withCode('IAH').build();
    const airportWithJFKCode = new AirportBuilder().withCode('JFK').build();
    const airportWithLAXCode = new AirportBuilder().withCode('LAX').build();
    const airportWithSFOCode = new AirportBuilder().withCode('SFO').build();
    const allAirports = [
      airportWithHOUCode,
      airportWithIAHCode,
      airportWithJFKCode,
      airportWithLAXCode,
      airportWithSFOCode
    ];
    const reaccomCoTerminalDates = {
      departureEarliestBookableDate: undefined,
      departureLastBookableDate: undefined,
      returnEarliestBookableDate: undefined,
      returnLastBookableDate: undefined
    };
    const defaultSearchOptions = {
      departureBoundDisabled: false,
      earliestBookableDate: undefined,
      lastBookableDate: undefined,
      reaccomCoTerminalDates,
      reaccomCoTerminalDepartureAirports: undefined,
      reaccomCoTerminalReturnAirports: undefined,
      returnBoundDisabled: false,
      tripType: 'oneWay'
    };

    context('round trip', () => {
      const defaultRoundTripSearchOptions = {
        ...defaultSearchOptions,
        tripType: 'roundTrip'
      };
      const selectedBothBounds = {
        firstbound: true,
        secondbound: true
      };

      it('should return proper searchOptions when selected two bounds', () => {
        expect(getSearchOptions.resultFunc(changeBoundSelections, selectedBothBounds, isReaccomScenario)).to.deep.equal(
          defaultRoundTripSearchOptions
        );
      });

      it('should return proper searchOptions when only select firstbound', () => {
        const selectedBounds = {
          firstbound: true
        };

        expect(getSearchOptions.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario)).to.deep.equal({
          ...defaultSearchOptions,
          lastBookableDate: '2018-04-19',
          returnBoundDisabled: true
        });
      });

      it('should return proper searchOptions when only select secondbound', () => {
        const selectedBounds = {
          secondbound: true
        };

        expect(getSearchOptions.resultFunc(changeBoundSelections, selectedBounds, isReaccomScenario)).to.deep.equal({
          ...defaultSearchOptions,
          departureBoundDisabled: true,
          earliestBookableDate: '2018-04-17'
        });
      });

      describe('when isReaccomScenario is true', () => {
        const isReaccomScenario = true;

        it('should return proper searchOptions when two bounds are selected', () => {
          expect(
            getSearchOptions.resultFunc(
              changeBoundSelections,
              selectedBothBounds,
              isReaccomScenario,
              reaccomBoundSelections,
              allAirports
            )
          ).to.deep.equal({
            ...defaultSearchOptions,
            reaccomCoTerminalDates: {
              departureEarliestBookableDate: dayjs('2018-04-15'),
              departureLastBookableDate: dayjs('2018-05-01'),
              returnEarliestBookableDate: dayjs('2018-04-15'),
              returnLastBookableDate: dayjs('2018-05-01')
            },
            reaccomCoTerminalDepartureAirports: [airportWithHOUCode, airportWithIAHCode],
            reaccomCoTerminalReturnAirports: [airportWithJFKCode],
            tripType: 'roundTrip'
          });
        });

        it('should return proper searchOptions with reaccom co terminal airports default values when there are no reaccom co terminal airport codes', () => {
          expect(
            getSearchOptions.resultFunc(
              changeBoundSelections,
              selectedBothBounds,
              isReaccomScenario,
              [firstBound, secondBound],
              allAirports
            )
          ).to.deep.equal(defaultRoundTripSearchOptions);
        });

        it('should return proper searchOptions with default values when boundSelections is undefined', () => {
          const state = {
            app: {
              airChange: {
                reaccomFlightPage: {
                  response: {}
                },
                selectedBounds: selectedBothBounds
              },
              airports: {
                allAirports
              }
            }
          };

          expect(getSearchOptions(state)).to.deep.equal(defaultRoundTripSearchOptions);
        });

        it('should return proper reaccomCoTerminalDates with default values when multiSelectShoppingDates and shoppingDates are falsy', () => {
          const defaultDate = dayjs('2018-04-05');
          const reaccomFirstBoundCopy = { ...reaccomFirstBound };
          const reaccomSecondBoundWithUndefinedDates = {
            ...reaccomSecondBound,
            multiSelectShoppingDates: undefined,
            shoppingDates: undefined
          };

          delete reaccomFirstBoundCopy.multiSelectShoppingDates;
          delete reaccomFirstBoundCopy.shoppingDates;

          const state = {
            app: {
              airChange: {
                reaccomFlightPage: {
                  response: {
                    boundSelections: [reaccomFirstBoundCopy, reaccomSecondBoundWithUndefinedDates]
                  }
                },
                selectedBounds: selectedBothBounds
              },
              airports: {
                allAirports
              }
            }
          };

          expect(getSearchOptions(state).reaccomCoTerminalDates).to.deep.equal({
            departureEarliestBookableDate: defaultDate,
            departureLastBookableDate: defaultDate,
            returnEarliestBookableDate: defaultDate,
            returnLastBookableDate: defaultDate
          });
        });

        it('should return proper searchOptions when only firstbound is selected', () => {
          const selectedBounds = {
            firstbound: true
          };

          expect(
            getSearchOptions.resultFunc(
              changeBoundSelections,
              selectedBounds,
              isReaccomScenario,
              reaccomBoundSelections,
              allAirports
            )
          ).to.deep.equal({
            ...defaultSearchOptions,
            lastBookableDate: '2022-04-29',
            reaccomCoTerminalDates: {
              departureEarliestBookableDate: dayjs('2018-04-15'),
              departureLastBookableDate: dayjs('2018-05-01'),
              returnEarliestBookableDate: undefined,
              returnLastBookableDate: undefined
            },
            reaccomCoTerminalDepartureAirports: [airportWithHOUCode, airportWithIAHCode],
            reaccomCoTerminalReturnAirports: [airportWithJFKCode],
            returnBoundDisabled: true
          });
        });

        it('should return proper searchOptions when only secondbound is selected', () => {
          const selectedBounds = {
            secondbound: true
          };

          expect(
            getSearchOptions.resultFunc(
              changeBoundSelections,
              selectedBounds,
              isReaccomScenario,
              reaccomBoundSelections,
              allAirports
            )
          ).to.deep.equal({
            ...defaultSearchOptions,
            departureBoundDisabled: true,
            earliestBookableDate: '2022-04-27',
            reaccomCoTerminalDates: {
              departureEarliestBookableDate: undefined,
              departureLastBookableDate: undefined,
              returnEarliestBookableDate: dayjs('2018-04-15'),
              returnLastBookableDate: dayjs('2018-05-01')
            },
            reaccomCoTerminalReturnAirports: [airportWithJFKCode]
          });
        });
      });
    });

    context('one way', () => {
      const selectedFirstBound = {
        firstbound: true
      };

      it('should return proper searchOptions when only select firstbound', () => {
        expect(getSearchOptions.resultFunc([firstBound], selectedFirstBound, isReaccomScenario)).to.deep.equal(
          defaultSearchOptions
        );
      });

      it('should return proper searchOptions when only select secondbound', () => {
        const selectedBounds = {
          secondbound: true
        };

        expect(getSearchOptions.resultFunc([secondBound], selectedBounds, isReaccomScenario)).to.deep.equal({
          ...defaultSearchOptions,
          earliestBookableDate: '2018-04-19'
        });
      });

      describe('when isReaccomScenario is true', () => {
        const isReaccomScenario = true;

        it('should return proper searchOptions when only firstbound is selected', () => {
          expect(
            getSearchOptions.resultFunc(
              changeBoundSelections,
              selectedFirstBound,
              isReaccomScenario,
              [reaccomFirstBound],
              allAirports
            )
          ).to.deep.equal({
            ...defaultSearchOptions,
            reaccomCoTerminalDates: {
              departureEarliestBookableDate: dayjs('2018-04-15'),
              departureLastBookableDate: dayjs('2018-05-01'),
              returnEarliestBookableDate: undefined,
              returnLastBookableDate: undefined
            },
            reaccomCoTerminalDepartureAirports: [airportWithHOUCode, airportWithIAHCode],
            reaccomCoTerminalReturnAirports: [airportWithJFKCode]
          });
        });

        it('should return proper searchOptions with default values when reaccomBoundSelections is undefined', () => {
          expect(
            getSearchOptions.resultFunc(changeBoundSelections, selectedFirstBound, isReaccomScenario, [])
          ).to.deep.equal(defaultSearchOptions);
        });

        it('should return proper searchOptions with default values when state is undefined', () => {
          expect(getSearchOptions({})).to.deep.equal(defaultSearchOptions);
        });
      });
    });
  });
});
