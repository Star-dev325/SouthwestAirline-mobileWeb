import _ from 'lodash';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import {
  flightChangeSelectedFlightMktgSelector,
  getAirChangeInboundFareData,
  getAirChangeInboundFareDifferencesData,
  getAirChangeInboundFlight,
  getAirChangeInboundStopData,
  getAirChangeOutboundFareData,
  getAirChangeOutboundFareDifferencesData,
  getAirChangeOutboundFlight,
  getAirChangeOutboundStopData
} from 'src/airChange/analytics/flightChangeSelectedFlightMktgSelector';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('flightChangeSelectedFlightMktgSelector', () => {
  const priceDifferenceMap = {
    BUS: '37',
    ANY: '130',
    PLU: '200',
    WGA: '430'
  };
  const fareDifferences = ['+30', '+227', '-22', '0', '+279', 'invalid'];
  const { DIRECT_FLIGHT, NONSTOP_FLIGHT, POINTS_BOOKING, NOT_SELECTED } = mktgDataConstants;
  const getMockState = (
    selectedFlightIndex,
    direction,
    numberOfStops = 0,
    outboundFlightIndex = -1,
    stopCity = null,
    bookingType
  ) => {
    const getMockFares = (fares, bookingType) =>
      fares.map((fareProductId) => ({
        _meta: { fareProductId },
        priceDifference: { amount: priceDifferenceMap[fareProductId], bookingType, sign: '-' },
        stopCity
      }));

    const getMockProducts = () =>
      new ProductsBuilder().withProductDefinitions().build().flightShoppingPage.productDefinitions.products;

    const products = getMockProducts();
    const productIds = products.map(({ productId }) => productId);
    const cards = _.range(11).map(() => ({
      fares: getMockFares(productIds, bookingType),
      fareDifferences,
      _meta: { numberOfStops }
    }));
    const state = _.chain({})
      .set('app.airChange.changeShoppingPage.response.productDefinitions.products', [...products])
      .set('app.airChange.changeShoppingPage.response.flights.outboundPage.cards', [...cards])
      .set('app.airChange.selectFarePage.selectedFlight.page.params.direction', direction)
      .set('app.airChange.selectFarePage.selectedFlight.card', cards[selectedFlightIndex])
      .set('app.airChange.changeShoppingPage.response._meta.purchaseWithPoints', bookingType === POINTS_BOOKING)
      .set('app.airChange.changeShoppingPage.response.mktg_data', { mktgProp: 'mock mktg_data prop' })
      .value();

    if (direction === 'outbound') {
      _.set(state, 'app.airChange.changeShoppingPage.selectedProducts', null);
    } else {
      _.set(state, 'app.airChange.changeShoppingPage.selectedProducts.outbound.flightCardIndex', outboundFlightIndex);
    }

    return state;
  };

  describe('when an outbound (bound1) flight is selected', () => {
    it('should return the selected fares, stop information for an outbound flight along with the inbound selections for pricing and points all set to "none"', () => {
      const direction = 'outbound';
      const selectedFlightIndex = 7;
      const outboundFlowState = getMockState(selectedFlightIndex, direction);
      const [outboundFlowMktgData] = flightChangeSelectedFlightMktgSelector(outboundFlowState);
      const expectedResult = {
        air_bound1_stops: 0,
        air_bound1_stoptype: 'Nonstop',
        air_bound1_viewfaretypes: 'BUS|ANY|WGA',
        air_bound1_viewfareproductids: 'BUS|ANY|WGA',
        air_bound1_viewfarecurrency: `-${priceDifferenceMap['BUS']}|-${priceDifferenceMap['ANY']}|-${priceDifferenceMap['WGA']}`,
        air_bound1_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        air_bound1_viewfareproductid1: 'BUS',
        air_bound1_viewfaretype1: 'BUS',
        air_bound1_viewfarecurrency1: `-${priceDifferenceMap['BUS']}`,
        air_bound1_viewfarepoints1: NOT_SELECTED,
        air_bound1_viewfareproductid2: 'ANY',
        air_bound1_viewfaretype2: 'ANY',
        air_bound1_viewfarecurrency2: `-${priceDifferenceMap['ANY']}`,
        air_bound1_viewfarepoints2: NOT_SELECTED,
        air_bound1_viewfareproductid3: 'WGA',
        air_bound1_viewfaretype3: 'WGA',
        air_bound1_viewfarecurrency3: `-${priceDifferenceMap['WGA']}`,
        air_bound1_viewfarepoints3: NOT_SELECTED,
        air_bound2_viewfaretypes: 'BUS|ANY|WGA',
        air_bound2_viewfareproductids: 'BUS|ANY|WGA',
        air_bound2_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        air_bound2_viewfareproductid1: 'BUS',
        air_bound2_viewfaretype1: 'BUS',
        air_bound2_viewfarecurrency1: NOT_SELECTED,
        air_bound2_viewfarepoints1: NOT_SELECTED,
        air_bound2_viewfareproductid2: 'ANY',
        air_bound2_viewfaretype2: 'ANY',
        air_bound2_viewfarecurrency2: NOT_SELECTED,
        air_bound2_viewfarepoints2: NOT_SELECTED,
        air_bound2_viewfareproductid3: 'WGA',
        air_bound2_viewfaretype3: 'WGA',
        air_bound2_viewfarecurrency3: NOT_SELECTED,
        air_bound2_viewfarepoints3: NOT_SELECTED,
        air_bound2_stops: NOT_SELECTED,
        air_bound2_stoptype: NOT_SELECTED,
        air_bound1_viewfarediffcurrency1: fareDifferences[0],
        air_bound1_viewfarediffcurrency2: fareDifferences[1],
        air_bound1_viewfarediffcurrency3: fareDifferences[2],
        air_bound1_viewfarediffcurrency4: fareDifferences[3],
        air_bound1_viewfarediffcurrency5: fareDifferences[4],
        air_bound1_viewfarediffcurrency6: fareDifferences[5],
        mktgProp: 'mock mktg_data prop',
        ...globalMktgState
      };

      expect(outboundFlowMktgData).toStrictEqual(expectedResult);
    });
  });

  describe('when an inbound flight (bound2) flight is selected ', () => {
    it('should return the stop information for an outbound flight and the selected fares and stop information for an inbound flight', () => {
      const direction = 'inbound';
      const selectedFlightIndex = 2;
      const outboundFlightIndex = 7;
      const numberOfStops = 0;
      const inboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops, outboundFlightIndex);
      const [inboundFlowMktgData] = flightChangeSelectedFlightMktgSelector(inboundFlowState);
      const expectedResult = {
        air_bound1_stops: 0,
        air_bound1_stoptype: 'Nonstop',
        air_bound2_viewfaretypes: 'BUS|ANY|WGA',
        air_bound2_viewfareproductids: 'BUS|ANY|WGA',
        air_bound2_viewfarecurrency: `-${priceDifferenceMap['BUS']}|-${priceDifferenceMap['ANY']}|-${priceDifferenceMap['WGA']}`,
        air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        air_bound2_viewfareproductid1: 'BUS',
        air_bound2_viewfaretype1: 'BUS',
        air_bound2_viewfarecurrency1: `-${priceDifferenceMap['BUS']}`,
        air_bound2_viewfarepoints1: NOT_SELECTED,
        air_bound2_viewfareproductid2: 'ANY',
        air_bound2_viewfaretype2: 'ANY',
        air_bound2_viewfarecurrency2: `-${priceDifferenceMap['ANY']}`,
        air_bound2_viewfarepoints2: NOT_SELECTED,
        air_bound2_viewfareproductid3: 'WGA',
        air_bound2_viewfaretype3: 'WGA',
        air_bound2_viewfarecurrency3: `-${priceDifferenceMap['WGA']}`,
        air_bound2_viewfarepoints3: NOT_SELECTED,
        air_bound2_stops: 0,
        air_bound2_stoptype: 'Nonstop',
        air_bound2_viewfarediffcurrency1: fareDifferences[0],
        air_bound2_viewfarediffcurrency2: fareDifferences[1],
        air_bound2_viewfarediffcurrency3: fareDifferences[2],
        air_bound2_viewfarediffcurrency4: fareDifferences[3],
        air_bound2_viewfarediffcurrency5: fareDifferences[4],
        air_bound2_viewfarediffcurrency6: fareDifferences[5],
        mktgProp: 'mock mktg_data prop',
        ...globalMktgState
      };

      expect(inboundFlowMktgData).toStrictEqual(expectedResult);
    });
  });

  describe('when in the outbound change flow', () => {
    it('getAirChangeOutboundFareData should return an empty object if fares do not exist', () => {
      const selectedFlightIndex = 3;
      const direction = 'outbound';
      const selectedOutboundIndex = 5;
      const numberOfStops = 0;
      const outboundState = getMockState(selectedFlightIndex, direction, numberOfStops, selectedOutboundIndex);
      const outboundStateWithMissingFares = _.set(
        outboundState,
        'app.airChange.selectFarePage.selectedFlight.card',
        {}
      );
      const expectedResult = {};
      const missingFaresResult = getAirChangeOutboundFareData(outboundStateWithMissingFares);
      const outboundStateWithNullFares = _.set(
        outboundState,
        'app.airChange.selectFarePage.selectedFlight.card.fares',
        null
      );
      const nullFaresResult = getAirChangeOutboundFareData(outboundStateWithNullFares);

      expect(missingFaresResult).toStrictEqual(expectedResult);
      expect(nullFaresResult).toStrictEqual(expectedResult);
    });

    it('getAirChangeOutboundFareData should select the outbound fare information from the selectedFlight state property and not from the selectedProducts property', () => {
      const selectedFlightIndex = 5;
      const direction = 'outbound';
      const outboundFlowState = getMockState(selectedFlightIndex, direction, 0, -1, null, POINTS_BOOKING);
      const outboundStateWithoutSelectedProducts = _.set(
        outboundFlowState,
        'app.airChange.changeShoppingPage.selectedProducts',
        undefined
      );
      const result = getAirChangeOutboundFareData(outboundStateWithoutSelectedProducts);
      const expectedResult = {
        air_bound1_viewfaretypes: 'BUS|ANY|WGA',
        air_bound1_viewfareproductids: 'BUS|ANY|WGA',
        air_bound1_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        air_bound1_viewfarepoints: `-${priceDifferenceMap['BUS']}|-${priceDifferenceMap['ANY']}|-${priceDifferenceMap['WGA']}`,
        air_bound1_viewfareproductid1: 'BUS',
        air_bound1_viewfaretype1: 'BUS',
        air_bound1_viewfarecurrency1: NOT_SELECTED,
        air_bound1_viewfarepoints1: `-${priceDifferenceMap['BUS']}`,
        air_bound1_viewfareproductid2: 'ANY',
        air_bound1_viewfaretype2: 'ANY',
        air_bound1_viewfarecurrency2: NOT_SELECTED,
        air_bound1_viewfarepoints2: `-${priceDifferenceMap['ANY']}`,
        air_bound1_viewfareproductid3: 'WGA',
        air_bound1_viewfaretype3: 'WGA',
        air_bound1_viewfarecurrency3: NOT_SELECTED,
        air_bound1_viewfarepoints3: `-${priceDifferenceMap['WGA']}`
      };

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('when in the inbound change flow', () => {
    it('getAirChangeOutboundFareData should be empty', () => {
      const selectedFlightIndex = 7;
      const direction = 'inbound';
      const selectedOutboundIndex = 5;
      const numberOfStops = 0;
      const inboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops, selectedOutboundIndex);
      const inboundStateWithoutSelectedFlight = _.set(
        inboundFlowState,
        'app.airChange.selectFarePage.selectedFlight.card',
        undefined
      );
      const result = getAirChangeOutboundFareData(inboundStateWithoutSelectedFlight);
      const expectedResult = {};

      expect(result).toStrictEqual(expectedResult);
    });
  });

  it('getAirChangeInboundFareData should set the outbound fare pricing and points information to "none" when selecting from the outbound flow state', () => {
    const selectedFlightIndex = 8;
    const direction = 'outbound';
    const outboundFlowState = getMockState(selectedFlightIndex, direction);
    const result = getAirChangeInboundFareData(outboundFlowState);
    const expectedResult = {
      air_bound2_viewfaretypes: 'BUS|ANY|WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfarecurrency1: NOT_SELECTED,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfarecurrency2: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfarecurrency3: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED
    };

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundFareData should select the inbound fare information from the selectedFlight state property in the inbound flow', () => {
    const selectedFlightIndex = 7;
    const direction = 'inbound';
    const inboundFlowState = getMockState(selectedFlightIndex, direction);
    const result = getAirChangeInboundFareData(inboundFlowState);
    const expectedResult = {
      air_bound2_viewfaretypes: 'BUS|ANY|WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfarecurrency: `-${priceDifferenceMap['BUS']}|-${priceDifferenceMap['ANY']}|-${priceDifferenceMap['WGA']}`,
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfarecurrency1: `-${priceDifferenceMap['BUS']}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfarecurrency2: `-${priceDifferenceMap['ANY']}`,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfarecurrency3: `-${priceDifferenceMap['WGA']}`,
      air_bound2_viewfarepoints3: NOT_SELECTED
    };

    expect(result).toStrictEqual(expectedResult);
  });

  it('getInbound flight should return an empty object in the outbound selection flow', () => {
    const selectedFlightIndex = 2;
    const direction = 'outbound';
    const selectedOutboundIndex = 4;
    const numberOfStops = 0;
    const outboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops, selectedOutboundIndex);
    const result = getAirChangeInboundFlight(outboundFlowState);

    expect(result).toStrictEqual({});
  });

  it('getInbound flight should return inbound flight information in the inbound selection flow', () => {
    const selectedFlightIndex = 1;
    const direction = 'inbound';
    const inboundFlowState = getMockState(selectedFlightIndex, direction);
    const expectedResult = _.get(inboundFlowState, 'app.airChange.selectFarePage.selectedFlight.card');
    const result = getAirChangeInboundFlight(inboundFlowState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFlight should return the selected product when in the inbound selection flow', () => {
    const selectedFlightIndex = 3;
    const direction = 'inbound';
    const selectedOutboundIndex = 5;
    const numberOfStops = 0;
    const inboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops, selectedOutboundIndex);
    const expectedResult = _.get(
      inboundFlowState,
      `app.airChange.changeShoppingPage.response.flights.outboundPage.cards.${selectedOutboundIndex}`
    );
    const result = getAirChangeOutboundFlight(inboundFlowState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFlight should return outbound flight information in the outbound flight selection flow', () => {
    const selectedFlightIndex = 3;
    const direction = 'outbound';
    const outboundFlowState = getMockState(selectedFlightIndex, direction);
    const expectedResult = _.get(outboundFlowState, 'app.airChange.selectFarePage.selectedFlight.card');
    const result = getAirChangeOutboundFlight(outboundFlowState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundStopData should return the stop data for the outbound flight', () => {
    const selectedFlightIndex = 1;
    const direction = 'outbound';
    const numberOfStops = 0;
    const outboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops);
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: NONSTOP_FLIGHT
    };
    const result = getAirChangeOutboundStopData(outboundFlowState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundStopData should return the stop data for the inbbound flight', () => {
    const selectedFlightIndex = 2;
    const direction = 'inbound';
    const numberOfStops = 2;
    const selectedOutboundIndex = 4;
    const inboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops, selectedOutboundIndex);
    const expectedResult = {
      air_bound2_stops: numberOfStops,
      air_bound2_stoptype: DIRECT_FLIGHT
    };
    const result = getAirChangeInboundStopData(inboundFlowState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFareDifferencesData should select the fare difference information from the selectedFlight in the outbound flow', () => {
    const selectedFlightIndex = 7;
    const direction = 'outbound';
    const numberOfStops = 3;
    const outboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops);
    const result = getAirChangeOutboundFareDifferencesData(outboundFlowState);
    const expectedResult = {
      air_bound1_viewfarediffcurrency1: fareDifferences[0],
      air_bound1_viewfarediffcurrency2: fareDifferences[1],
      air_bound1_viewfarediffcurrency3: fareDifferences[2],
      air_bound1_viewfarediffcurrency4: fareDifferences[3],
      air_bound1_viewfarediffcurrency5: fareDifferences[4],
      air_bound1_viewfarediffcurrency6: fareDifferences[5]
    };

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFareDifferencesData should be empty in the inbound flow', () => {
    const selectedFlightIndex = 7;
    const direction = 'inbound';
    const numberOfStops = 3;
    const inboundFlowState = getMockState(selectedFlightIndex, direction, numberOfStops);
    const result = getAirChangeOutboundFareDifferencesData(inboundFlowState);
    const expectedResult = {};

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFareDifferencesData should be empty if the fareDifferences property is missing', () => {
    const selectedFlightIndex = 7;
    const direction = 'outbound';
    const stateMissingFareDifferences = _.merge({}, getMockState(selectedFlightIndex, direction));

    stateMissingFareDifferences.app.airChange.selectFarePage.selectedFlight.card = undefined;
    const expectedResult = {};
    const result = getAirChangeOutboundFareDifferencesData(stateMissingFareDifferences);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeOutboundFareDifferencesData should be empty if the fareDifferences property is null', () => {
    const selectedFlightIndex = 7;
    const direction = 'outbound';
    const stateWitNullFareDifferences = _.merge({}, getMockState(selectedFlightIndex, direction));

    stateWitNullFareDifferences.app.airChange.selectFarePage.selectedFlight.card.fareDifferences = null;
    const expectedResult = {};
    const result = getAirChangeOutboundFareDifferencesData(stateWitNullFareDifferences);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundFareDifferencesData should select the fare information from the selectedFlight state property in the inbound flow', () => {
    const selectedFlightIndex = 7;
    const direction = 'inbound';
    const inboundFlowState = getMockState(selectedFlightIndex, direction);
    const result = getAirChangeInboundFareDifferencesData(inboundFlowState);
    const expectedResult = {
      air_bound2_viewfarediffcurrency1: fareDifferences[0],
      air_bound2_viewfarediffcurrency2: fareDifferences[1],
      air_bound2_viewfarediffcurrency3: fareDifferences[2],
      air_bound2_viewfarediffcurrency4: fareDifferences[3],
      air_bound2_viewfarediffcurrency5: fareDifferences[4],
      air_bound2_viewfarediffcurrency6: fareDifferences[5]
    };

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundFareDifferencesData should be empty outbound flow', () => {
    const selectedFlightIndex = 7;
    const direction = 'outbound';
    const outboundFlowState = getMockState(selectedFlightIndex, direction);
    const result = getAirChangeInboundFareDifferencesData(outboundFlowState);
    const expectedResult = {};

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundFareDifferencesData should be empty if the fareDifferences property is missing', () => {
    const selectedFlightIndex = 7;
    const direction = 'inbound';
    const stateMissingFareDifferences = _.merge({}, getMockState(selectedFlightIndex, direction));

    stateMissingFareDifferences.app.airChange.selectFarePage.selectedFlight.card = undefined;
    const expectedResult = {};
    const result = getAirChangeInboundFareDifferencesData(stateMissingFareDifferences);

    expect(result).toStrictEqual(expectedResult);
  });

  it('getAirChangeInboundFareDifferencesData should be empty if the fareDifferences property is null', () => {
    const selectedFlightIndex = 7;
    const direction = 'inbound';
    const stateWitNullFareDifferences = _.merge({}, getMockState(selectedFlightIndex, direction));

    stateWitNullFareDifferences.app.airChange.selectFarePage.selectedFlight.card.fareDifferences = null;
    const expectedResult = {};
    const result = getAirChangeInboundFareDifferencesData(stateWitNullFareDifferences);

    expect(result).toStrictEqual(expectedResult);
  });
});
