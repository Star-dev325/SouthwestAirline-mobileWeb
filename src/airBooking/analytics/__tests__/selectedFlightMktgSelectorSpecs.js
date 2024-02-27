import _ from 'lodash';
import {
  getInboundFareData,
  getInboundFareDifferencesData,
  getInboundFlight,
  getInboundStopData,
  getMultiSelectData,
  getOutboundFareData,
  getOutboundFareDifferencesData,
  getOutboundFlight,
  getOutboundStopData,
  getSearchFormData,
  selectedFlightMktgSelector
} from 'src/airBooking/analytics/selectedFlightMktgSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';

describe('selectedFlightMktgSelector', () => {
  const priceMap = {
    ANY: '300',
    BUS: '400',
    PLU: '200',
    WGA: '100'
  };

  const getMockProducts = () =>
    new ProductsBuilder().withProductDefinitions().build().flightShoppingPage.productDefinitions.products;

  const fareDifferences = ['+30', '+227', '-22', '0', '+279', 'invalid'];
  const { NOT_SELECTED, DIRECT_FLIGHT, NONSTOP_FLIGHT, CURRENCY_BOOKING, POINTS_BOOKING } = mktgDataConstants;
  const getMockState = ({
    bookingType,
    direction,
    isMultiSelectGroup = false,
    numberOfStops = NOT_SELECTED,
    outboundFlightIndex = -1,
    promoCode,
    selectedFlightIndex,
    stopCity = null
  }) => {
    const getMockFares = (fares) =>
      fares.map((fareProductId) => ({
        _meta: { fareProductId },
        price: { amount: priceMap[fareProductId] },
        stopCity
      }));

    const products = getMockProducts();
    const productIds = products.map(({ productId }) => productId);

    const cards = _.range(11).map(() =>
      _.set({ fares: getMockFares(productIds), fareDifferences }, '_meta.numberOfStops', numberOfStops)
    );

    const state = _.chain({})
      .set('app.airBooking.flightShoppingPage.response.flightShoppingPage.productDefinitions.products', [...products])
      .set('app.airBooking.flightShoppingPage.response.flightShoppingPage.outboundPage.cards', [...cards])
      .set(
        'app.airBooking.flightShoppingPage.response.flightShoppingPage._meta.purchaseWithPoints',
        bookingType === POINTS_BOOKING
      )
      .set(`app.airBooking.selectedFlight.${direction}.params.direction`, direction)
      .set(`app.airBooking.selectedFlight.currentDirection`, direction)
      .set(`app.airBooking.selectedFlight.${direction}.card`, cards[selectedFlightIndex])
      .set(`app.airports.multiSelectGroup.isSelected`, isMultiSelectGroup)

      .value();

    if (direction === 'outbound') {
      _.set(state, 'app.airBooking.selectedProducts', null);
    } else {
      _.set(state, 'app.airBooking.selectedProducts.adult.outbound.flightCardIndex', outboundFlightIndex);
    }

    if (promoCode) {
      _.set(state, 'app.airBooking.searchRequest.promoCode', promoCode);
    }

    return state;
  };

  it('When an outbound (bound1) flight it selected it should return the selected fares, ids, prices stops and points for an outbound flight along with the inbound selections all set to "none" ', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const numberOfStops = 2;
    const outboundFlowState = getMockState({ selectedFlightIndex, direction, numberOfStops });
    const [outboundFlowMktgData] = selectedFlightMktgSelector(outboundFlowState);
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: DIRECT_FLIGHT,
      air_bound1_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound1_viewfarecurrency1: priceMap['BUS'],
      air_bound1_viewfarecurrency2: priceMap['ANY'],
      air_bound1_viewfarecurrency3: priceMap['WGA'],
      air_bound1_viewfarediffcurrency1: fareDifferences[0],
      air_bound1_viewfarediffcurrency2: fareDifferences[1],
      air_bound1_viewfarediffcurrency3: fareDifferences[2],
      air_bound1_viewfarediffcurrency4: fareDifferences[3],
      air_bound1_viewfarediffcurrency5: fareDifferences[4],
      air_bound1_viewfarediffcurrency6: fareDifferences[5],
      air_bound1_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound1_viewfarepoints1: NOT_SELECTED,
      air_bound1_viewfarepoints2: NOT_SELECTED,
      air_bound1_viewfarepoints3: NOT_SELECTED,
      air_bound1_viewfareproductid1: 'BUS',
      air_bound1_viewfareproductid2: 'ANY',
      air_bound1_viewfareproductid3: 'WGA',
      air_bound1_viewfareproductids: 'BUS|ANY|WGA',
      air_bound1_viewfaretype1: 'BUS',
      air_bound1_viewfaretype2: 'ANY',
      air_bound1_viewfaretype3: 'WGA',
      air_bound1_viewfaretypes: 'BUS|ANY|WGA',
      air_bound2_stops: NOT_SELECTED,
      air_bound2_stoptype: NOT_SELECTED,
      air_bound2_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarecurrency1: NOT_SELECTED,
      air_bound2_viewfarecurrency2: NOT_SELECTED,
      air_bound2_viewfarecurrency3: NOT_SELECTED,
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(outboundFlowMktgData).to.eql(expectedResult);
  });

  it('When an outbound (bound1) flight it selected and a promocode was entered it should return the selected fares, ids, prices stops, points, and promocode for an outbound flight along with the inbound selections all set to "none" ', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const numberOfStops = 2;
    const promoCode = 'MOCK_PROMO';
    const outboundFlowState = getMockState({ selectedFlightIndex, direction, numberOfStops, promoCode });
    const [outboundFlowMktgData] = selectedFlightMktgSelector(outboundFlowState);
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: DIRECT_FLIGHT,
      air_bound1_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound1_viewfarecurrency1: priceMap['BUS'],
      air_bound1_viewfarecurrency2: priceMap['ANY'],
      air_bound1_viewfarecurrency3: priceMap['WGA'],
      air_bound1_viewfarediffcurrency1: fareDifferences[0],
      air_bound1_viewfarediffcurrency2: fareDifferences[1],
      air_bound1_viewfarediffcurrency3: fareDifferences[2],
      air_bound1_viewfarediffcurrency4: fareDifferences[3],
      air_bound1_viewfarediffcurrency5: fareDifferences[4],
      air_bound1_viewfarediffcurrency6: fareDifferences[5],
      air_bound1_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound1_viewfarepoints1: NOT_SELECTED,
      air_bound1_viewfarepoints2: NOT_SELECTED,
      air_bound1_viewfarepoints3: NOT_SELECTED,
      air_bound1_viewfareproductid1: 'BUS',
      air_bound1_viewfareproductid2: 'ANY',
      air_bound1_viewfareproductid3: 'WGA',
      air_bound1_viewfareproductids: 'BUS|ANY|WGA',
      air_bound1_viewfaretype1: 'BUS',
      air_bound1_viewfaretype2: 'ANY',
      air_bound1_viewfaretype3: 'WGA',
      air_bound1_viewfaretypes: 'BUS|ANY|WGA',
      air_bound2_stops: NOT_SELECTED,
      air_bound2_stoptype: NOT_SELECTED,
      air_bound2_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarecurrency1: NOT_SELECTED,
      air_bound2_viewfarecurrency2: NOT_SELECTED,
      air_bound2_viewfarecurrency3: NOT_SELECTED,
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA',
      promocode: promoCode
    };

    expect(outboundFlowMktgData).to.eql(expectedResult);
  });

  it('When an inbound flight (bound2) flight is selected it should return the stops for an outbound flight and the selected fares, fare differences, prices for the inbound flight', () => {
    const direction = 'inbound';
    const numberOfStops = 1;
    const outboundFlightIndex = 7;
    const selectedFlightIndex = 2;
    const stopCity = 0;
    const inboundFlowState = getMockState({
      direction,
      numberOfStops,
      outboundFlightIndex,
      selectedFlightIndex,
      stopCity
    });

    const [inboundFlowMktgData] = selectedFlightMktgSelector(inboundFlowState);
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: DIRECT_FLIGHT,
      air_bound2_stops: numberOfStops,
      air_bound2_stoptype: DIRECT_FLIGHT,
      air_bound2_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound2_viewfarecurrency1: priceMap['BUS'],
      air_bound2_viewfarecurrency2: priceMap['ANY'],
      air_bound2_viewfarecurrency3: priceMap['WGA'],
      air_bound2_viewfarediffcurrency1: fareDifferences[0],
      air_bound2_viewfarediffcurrency2: fareDifferences[1],
      air_bound2_viewfarediffcurrency3: fareDifferences[2],
      air_bound2_viewfarediffcurrency4: fareDifferences[3],
      air_bound2_viewfarediffcurrency5: fareDifferences[4],
      air_bound2_viewfarediffcurrency6: fareDifferences[5],
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(inboundFlowMktgData).to.eql(expectedResult);
  });

  it('when an inbound flight (bound2) flight is selected it should return the stops for an outbound flight and the selected fares, fare differences, and points for the inbound flight', () => {
    const direction = 'inbound';
    const numberOfStops = 1;
    const outboundFlightIndex = 7;
    const selectedFlightIndex = 2;
    const inboundFlowState = getMockState({
      bookingType: POINTS_BOOKING,
      direction,
      numberOfStops,
      outboundFlightIndex,
      selectedFlightIndex,
      stopCity: 0
    });

    const [inboundFlowMktgData] = selectedFlightMktgSelector(inboundFlowState);
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: DIRECT_FLIGHT,
      air_bound2_stops: numberOfStops,
      air_bound2_stoptype: DIRECT_FLIGHT,
      air_bound2_viewfarecurrency: 'none|none|none',
      air_bound2_viewfarecurrency1: NOT_SELECTED,
      air_bound2_viewfarecurrency2: NOT_SELECTED,
      air_bound2_viewfarecurrency3: NOT_SELECTED,
      air_bound2_viewfarediffpoints1: fareDifferences[0],
      air_bound2_viewfarediffpoints2: fareDifferences[1],
      air_bound2_viewfarediffpoints3: fareDifferences[2],
      air_bound2_viewfarediffpoints4: fareDifferences[3],
      air_bound2_viewfarediffpoints5: fareDifferences[4],
      air_bound2_viewfarediffpoints6: fareDifferences[5],
      air_bound2_viewfarepoints: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound2_viewfarepoints1: priceMap['BUS'],
      air_bound2_viewfarepoints2: priceMap['ANY'],
      air_bound2_viewfarepoints3: priceMap['WGA'],
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(inboundFlowMktgData).to.eql(expectedResult);
  });

  it('getOutboundFareData should return an empty object if fares do not exist', () => {
    const direction = 'outbound';
    const numberOfStops = 0;
    const outboundFlightIndex = 5;
    const selectedFlightIndex = 3;
    const outboundState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const outboundStateWithMissingFares = _.set(outboundState, `app.airBooking.selectedFlight.${direction}.card`, {});
    const expectedResult = {};
    const missingFaresResult = getOutboundFareData(outboundStateWithMissingFares);

    expect(missingFaresResult).to.eql(expectedResult);
  });

  it('getOutboundFareData should return an empty object if fares are set to null', () => {
    const direction = 'outbound';
    const numberOfStops = 0;
    const outboundFlightIndex = 5;
    const selectedFlightIndex = 3;
    const outboundState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const outboundStateWithNullFares = _.set(
      outboundState,
      `app.airBooking.selectedFlight.${direction}.card.fares`,
      null
    );
    const expectedResult = {};
    const nullFaresResult = getOutboundFareData(outboundStateWithNullFares);

    expect(nullFaresResult).to.eql(expectedResult);
  });

  it('getOutboundFareData should select the fare information from the selectedFlight state property in the outbound flow', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 5;
    const outboundFlowState = getMockState({ direction, selectedFlightIndex });
    const outboundStateWithoutSelectedProducts = _.set(outboundFlowState, 'app.airBooking.selectedProducts', undefined);
    const result = getOutboundFareData(outboundStateWithoutSelectedProducts);
    const expectedResult = {
      air_bound1_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound1_viewfarecurrency1: priceMap['BUS'],
      air_bound1_viewfarecurrency2: priceMap['ANY'],
      air_bound1_viewfarecurrency3: priceMap['WGA'],
      air_bound1_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound1_viewfarepoints1: NOT_SELECTED,
      air_bound1_viewfarepoints2: NOT_SELECTED,
      air_bound1_viewfarepoints3: NOT_SELECTED,
      air_bound1_viewfareproductid1: 'BUS',
      air_bound1_viewfareproductid2: 'ANY',
      air_bound1_viewfareproductid3: 'WGA',
      air_bound1_viewfareproductids: 'BUS|ANY|WGA',
      air_bound1_viewfaretype1: 'BUS',
      air_bound1_viewfaretype2: 'ANY',
      air_bound1_viewfaretype3: 'WGA',
      air_bound1_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFareData should be empty in the inbound flow', () => {
    const direction = 'inbound';
    const numberOfStops = 0;
    const outboundFlightIndex = 5;
    const selectedFlightIndex = 7;
    const inboundFlowState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const inboundStateWithoutSelectedFlight = _.set(
      inboundFlowState,
      `app.airBooking.selectedFlight.${direction}.card`,
      undefined
    );
    const result = getOutboundFareData(inboundStateWithoutSelectedFlight);
    const expectedResult = {};

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareData should set the fare information to "none" when selecting from the outbound flow state', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 8;
    const outboundFlowState = getMockState({ direction, selectedFlightIndex });
    const result = getInboundFareData(outboundFlowState);
    const expectedResult = {
      air_bound2_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarecurrency1: NOT_SELECTED,
      air_bound2_viewfarecurrency2: NOT_SELECTED,
      air_bound2_viewfarecurrency3: NOT_SELECTED,
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareData should select the fare information from the selectedFlight state property in the inbound flow', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 7;
    const inboundFlowState = getMockState({ direction, selectedFlightIndex });
    const result = getInboundFareData(inboundFlowState);
    const expectedResult = {
      air_bound2_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
      air_bound2_viewfarecurrency1: priceMap['BUS'],
      air_bound2_viewfarecurrency2: priceMap['ANY'],
      air_bound2_viewfarecurrency3: priceMap['WGA'],
      air_bound2_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
      air_bound2_viewfarepoints1: NOT_SELECTED,
      air_bound2_viewfarepoints2: NOT_SELECTED,
      air_bound2_viewfarepoints3: NOT_SELECTED,
      air_bound2_viewfareproductid1: 'BUS',
      air_bound2_viewfareproductid2: 'ANY',
      air_bound2_viewfareproductid3: 'WGA',
      air_bound2_viewfareproductids: 'BUS|ANY|WGA',
      air_bound2_viewfaretype1: 'BUS',
      air_bound2_viewfaretype2: 'ANY',
      air_bound2_viewfaretype3: 'WGA',
      air_bound2_viewfaretypes: 'BUS|ANY|WGA'
    };

    expect(result).to.eql(expectedResult);
  });

  it('getInbound flight should return an empty object in the outbound flight selection flow', () => {
    const direction = 'outbound';
    const numberOfStops = 0;
    const outboundFlightIndex = 4;
    const selectedFlightIndex = 2;
    const outboundFlowState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const result = JSON.stringify(getInboundFlight(outboundFlowState));

    expect(result).to.eql('{}');
  });

  it('getInbound flight should return an an inbound flight information in the inbound flight selection flow', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 1;
    const inboundFlowState = getMockState({ direction, selectedFlightIndex });
    const expectedResult = _.get(inboundFlowState, `app.airBooking.selectedFlight.${direction}.card`);
    const result = getInboundFlight(inboundFlowState);

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFlight should return the selected product when in the inbound flight selection flow', () => {
    const direction = 'inbound';
    const numberOfStops = 0;
    const outboundFlightIndex = 5;
    const selectedFlightIndex = 3;
    const inboundFlowState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const expectedResult = _.get(
      inboundFlowState,
      `app.airBooking.flightShoppingPage.response.flightShoppingPage.outboundPage.cards.${outboundFlightIndex}`
    );
    const result = getOutboundFlight(inboundFlowState);

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFlight should return an an outbound flight information in the outbound flight selection flow', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 3;
    const outboundFlowState = getMockState({ direction, selectedFlightIndex });
    const expectedResult = _.get(outboundFlowState, `app.airBooking.selectedFlight.${direction}.card`);
    const result = getOutboundFlight(outboundFlowState);

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundStopData should return the stop data for the outbound flight', () => {
    const direction = 'outbound';
    const numberOfStops = 0;
    const selectedFlightIndex = 1;
    const outboundFlowState = getMockState({ direction, numberOfStops, selectedFlightIndex });
    const expectedResult = {
      air_bound1_stops: numberOfStops,
      air_bound1_stoptype: NONSTOP_FLIGHT
    };
    const result = getOutboundStopData(outboundFlowState);

    expect(result).to.eql(expectedResult);
  });

  it('getInboundStopData should return the stop data for the inbbound flight', () => {
    const direction = 'inbound';
    const numberOfStops = 2;
    const outboundFlightIndex = 4;
    const selectedFlightIndex = 2;
    const inboundFlowState = getMockState({ direction, numberOfStops, outboundFlightIndex, selectedFlightIndex });
    const expectedResult = {
      air_bound2_stops: numberOfStops,
      air_bound2_stoptype: DIRECT_FLIGHT
    };
    const result = getInboundStopData(inboundFlowState);

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFareDifferencesData should select the fare difference information from the selectedFlight in the outbound flow', () => {
    const direction = 'outbound';
    const numberOfStops = 3;
    const selectedFlightIndex = 7;
    const outboundFlowState = getMockState({ direction, numberOfStops, selectedFlightIndex });
    const result = getOutboundFareDifferencesData(outboundFlowState);
    const expectedResult = {
      air_bound1_viewfarediffcurrency1: fareDifferences[0],
      air_bound1_viewfarediffcurrency2: fareDifferences[1],
      air_bound1_viewfarediffcurrency3: fareDifferences[2],
      air_bound1_viewfarediffcurrency4: fareDifferences[3],
      air_bound1_viewfarediffcurrency5: fareDifferences[4],
      air_bound1_viewfarediffcurrency6: fareDifferences[5]
    };

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFareDifferencesData should be empty in the inbound flow', () => {
    const direction = 'inbound';
    const numberOfStops = 3;
    const selectedFlightIndex = 7;
    const inboundFlowState = getMockState({ direction, numberOfStops, selectedFlightIndex });
    const result = getOutboundFareDifferencesData(inboundFlowState);
    const expectedResult = {};

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFareDifferencesData should be empty if the fareDifferences property is missing', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const stateMissingFareDifferences = _.merge(
      {},
      getMockState({
        bookingType: CURRENCY_BOOKING,
        direction,
        numberOfStops: '',
        outboundFlightIndex: -1,
        selectedFlightIndex,
        stopCity: 0
      })
    );
    const expectedResult = {
      air_bound1_viewfarediffcurrency1: fareDifferences[0],
      air_bound1_viewfarediffcurrency2: fareDifferences[1],
      air_bound1_viewfarediffcurrency3: fareDifferences[2],
      air_bound1_viewfarediffcurrency4: fareDifferences[3],
      air_bound1_viewfarediffcurrency5: fareDifferences[4],
      air_bound1_viewfarediffcurrency6: fareDifferences[5]
    };
    const result = getOutboundFareDifferencesData(stateMissingFareDifferences);

    expect(result).to.eql(expectedResult);
  });

  it('getOutboundFareDifferencesData should be empty if the fareDifferences property is null', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const stateWitNullFareDifferences = _.merge({}, getMockState({ direction, selectedFlightIndex }));

    stateWitNullFareDifferences.app.airBooking.selectedFlight.outbound.card.fareDifferences = null;
    const expectedResult = {};
    const result = getOutboundFareDifferencesData(stateWitNullFareDifferences);

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareDifferencesData should select the fare information from the selectedFlight state property in the inbound flow', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 7;
    const inboundFlowState = getMockState({ direction, selectedFlightIndex });
    const result = getInboundFareDifferencesData(inboundFlowState);
    const expectedResult = {
      air_bound2_viewfarediffcurrency1: fareDifferences[0],
      air_bound2_viewfarediffcurrency2: fareDifferences[1],
      air_bound2_viewfarediffcurrency3: fareDifferences[2],
      air_bound2_viewfarediffcurrency4: fareDifferences[3],
      air_bound2_viewfarediffcurrency5: fareDifferences[4],
      air_bound2_viewfarediffcurrency6: fareDifferences[5]
    };

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareDifferencesData should be empty outbound flow', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const outboundFlowState = getMockState({ direction, selectedFlightIndex });
    const result = getInboundFareDifferencesData(outboundFlowState);
    const expectedResult = {};

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareDifferencesData should be empty if the fareDifferences property is missing', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 7;
    const stateMissingFareDifferences = _.merge({}, getMockState({ direction, selectedFlightIndex }));

    stateMissingFareDifferences.app.airBooking.selectedFlight.inbound.card.fareDifferences = undefined;
    const expectedResult = {};
    const result = getInboundFareDifferencesData(stateMissingFareDifferences);

    expect(result).to.eql(expectedResult);
  });

  it('getInboundFareDifferencesData should be empty if the fareDifferences property is null', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 7;
    const stateWitNullFareDifferences = _.merge({}, getMockState({ direction, selectedFlightIndex }));

    stateWitNullFareDifferences.app.airBooking.selectedFlight.inbound.card.fareDifferences = null;
    const expectedResult = {};
    const result = getInboundFareDifferencesData(stateWitNullFareDifferences);

    expect(result).to.eql(expectedResult);
  });

  it('getMultiSelectData should return outbound multiselect data when direction is outbound', () => {
    const direction = 'outbound';
    const selectedFlightIndex = 7;
    const result = getMultiSelectData(
      _.merge({}, getMockState({ direction, isMultiSelectGroup: true, selectedFlightIndex }))
    );

    const expectedResult = {
      ...ANALYTICS.MULTI_SELECT_OUTBOUND_FARE_PAGE,
      ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS
    };

    expect(result).to.eql(expectedResult);
  });

  it('getMultiSelectData should return inbound multiselect data when direction is inbound', () => {
    const direction = 'inbound';
    const selectedFlightIndex = 7;
    const result = getMultiSelectData(
      _.merge({}, getMockState({ direction, isMultiSelectGroup: true, selectedFlightIndex }))
    );

    const expectedResult = {
      ...ANALYTICS.MULTI_SELECT_INBOUND_FARE_PAGE,
      ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS
    };

    expect(result).to.eql(expectedResult);
  });

  it('getSearchFormData should return promocode when available', () => {
    const promoCode = 'MOCK_PROMO';
    const promoCodeState =  getMockState({ promoCode });
    const expectedResult = { promocode: promoCode };
    const result = getSearchFormData(promoCodeState);

    expect(result).to.eql(expectedResult);
  });
});
