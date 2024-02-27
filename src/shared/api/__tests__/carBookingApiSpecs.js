import mockRestClient from 'test/unit/helpers/mockRestClient';
import Q from 'q';
import proxyquire from 'proxyquire';
import CarVendorsMobile from 'test/builders/apiResponse/v1/content-delivery/query/carVendorsMobile';
import Vendors from 'test/builders/apiResponse/v1/car-reservations/vendors';
import CarStationsMobile from 'test/builders/apiResponse/v1/content-delivery/query/carStationsMobile';
import Locations from 'test/builders/apiResponse/v1/car-reservations/locations';
import CarShoppingSearchBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/carShoppingSearchBuilder';
import CarPricingBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/product-id/carPricingBuilder';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('carBookingApi', () => {
  let carBookingApi;
  let mockEnvironment;
  let mockFeatureToggleState;
  let carShoppingParams;
  let carPricingProductId;
  let transformVendorResponseStub;
  let transformLocationsResponseStub;
  let transformShoppingResponseStub;
  let transformRetrieveCarPricingResponseStub;
  let transformSearchRequestToCarShoppingApiStub;
  let transformCarReservationRequestStub;

  beforeEach(() => {
    mockEnvironment = {
      car: 'https://the.mobile.com',
      content: 'https://the.content.service.com',
      chapiMisc: 'https://the.chapi.mobile.com'
    };

    mockFeatureToggleState = {};
    carShoppingParams =
      'pickup-location=AUS&dropoff-location=AUS&pickup-datetime=2016-11-30T11:30&dropoff-datetime=2016-12-03T11:30';
    carPricingProductId = 'someProductId';
    transformVendorResponseStub = sinon.stub();
    transformLocationsResponseStub = sinon.stub();
    transformShoppingResponseStub = sinon.stub();
    transformRetrieveCarPricingResponseStub = sinon.stub();
    transformSearchRequestToCarShoppingApiStub = sinon.stub();
    transformCarReservationRequestStub = sinon.stub();

    const carBookingTransformersStub = {
      transformVendorResponse: transformVendorResponseStub,
      transformLocationsResponse: transformLocationsResponseStub,
      transformShoppingResponse: transformShoppingResponseStub,
      transformRetrieveCarPricingResponse: transformRetrieveCarPricingResponseStub,
      transformCarReservationRequest: transformCarReservationRequestStub
    };

    carBookingApi = proxyquire('src/shared/api/carBookingApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment },
      'src/shared/featureToggle/featureToggleState': mockFeatureToggleState,
      'src/carBooking/transformers/searchFormTransformer': { default: transformSearchRequestToCarShoppingApiStub },
      'src/shared/api/transformers/carBookingApiTransformers': carBookingTransformersStub
    });
  });

  afterEach(() => {
    sinon.restore();
    mockFeatureToggleState = {};
  });

  context('when retrieving car vendors', () => {
    let CHAPICarVendorsMobile;

    beforeEach(() => {
      CHAPICarVendorsMobile = new CarVendorsMobile().build();
      sinon.stub(mockRestClient, 'ajax').returns(Q(CHAPICarVendorsMobile));
    });

    it('should use the correct car vendors url', () =>
      carBookingApi.retrieveCarVendors().then(() => {
        const apiParameter = mockRestClient.ajax.lastCall.args[0];

        expect(apiParameter.url).to.equal(`${mockEnvironment.content}/v1/content-delivery/query/car-vendors`);
        expect(apiParameter.query).to.deep.equal({ channel: 'mobile' });
      }));

    it('should use transformVendorResponse to convert chapi response to the wapi response', () => {
      const expectResponse = new Vendors().build();

      transformVendorResponseStub.returns(expectResponse);

      return carBookingApi.retrieveCarVendors().then((responseAfterTransform) => {
        expect(transformVendorResponseStub).to.have.been.calledWith(CHAPICarVendorsMobile);
        expect(responseAfterTransform).to.deep.equal(expectResponse);
      });
    });
  });

  context('when retrieving car locations', () => {
    let CHAPICarStationsMobile;

    beforeEach(() => {
      CHAPICarStationsMobile = new CarStationsMobile().build();
      sinon.stub(mockRestClient, 'ajax').returns(Q(CHAPICarStationsMobile));
    });

    it('should use the correct car stations url', () =>
      carBookingApi.retrieveLocations().then(() => {
        const apiParameter = mockRestClient.ajax.lastCall.args[0];

        expect(apiParameter.url).to.equal(`${mockEnvironment.content}/v1/content-delivery/query/car-stations`);
        expect(apiParameter.query).to.deep.equal({ channel: 'mobile' });
      }));

    it('should use transformLocationsResponse to convert chapi response to the wapi response', () => {
      const expectResponse = new Locations().build();

      transformLocationsResponseStub.returns(expectResponse);

      return carBookingApi.retrieveLocations().then((responseAfterTransform) => {
        expect(transformLocationsResponseStub).to.have.been.calledWith(CHAPICarStationsMobile);
        expect(responseAfterTransform).to.deep.equal(expectResponse);
      });
    });
  });

  context('when search car products', () => {
    let CHAPICarProducts;

    beforeEach(() => {
      CHAPICarProducts = new CarShoppingSearchBuilder().build();
      sinon.stub(mockRestClient, 'ajax').returns(Q(CHAPICarProducts));
    });

    it('should use the correct car products url', () =>
      carBookingApi.shopping(carShoppingParams).then(() => {
        const apiParameter = mockRestClient.ajax.lastCall.args[0];

        expect(apiParameter.url).to.equal(`${mockEnvironment.chapiMisc}/v1/mobile-misc/feature/cars/products`);
      }));

    it('should use transformSearchRequestToCarShoppingApiChapi to create chapi request', () =>
      carBookingApi.shopping(carShoppingParams).then(() => {
        expect(transformSearchRequestToCarShoppingApiStub).to.have.been.calledWith(carShoppingParams);
      }));

    it('should use transformShoppingResponse to convert chapi response to the wapi response', () =>
      carBookingApi.shopping(carShoppingParams).then(() => {
        expect(transformShoppingResponseStub).to.have.been.called;
      }));
  });

  context('when retrieve car pricing', () => {
    let carPricingResponse;

    beforeEach(() => {
      carPricingResponse = new CarPricingBuilder().build();
      sinon.stub(mockRestClient, 'ajax').returns(Q(carPricingResponse));
    });
    it('should use the correct car products url', () =>
      carBookingApi.retrieveCarPricing(carPricingProductId).then(() => {
        const apiParameter = mockRestClient.ajax.lastCall.args[0];

        expect(apiParameter.url).to.equal(
          `${mockEnvironment.chapiMisc}/v1/mobile-misc/feature/cars/product-id/${carPricingProductId}`
        );
      }));
    it('should call transformRetrieveCarPricingResponse to transform retrieve car pricing response', () => {
      sinon.stub();

      return carBookingApi.retrieveCarPricing(carPricingProductId).then(() => {
        expect(transformRetrieveCarPricingResponseStub).to.have.been.called;
      });
    });
  });

  context('when reserve car', () => {
    const originReserveCarRequest = 'originRequest';

    it('should use the correct url', () =>
      carBookingApi.reserveCar(originReserveCarRequest).then((apiParameter) => {
        expect(apiParameter.url).to.equal(`${mockEnvironment.chapiMisc}/v1/mobile-misc/feature/cars/reservations`);
      }));

    it('should use transformCarReservationRequest convert the api request', () => {
      transformCarReservationRequestStub.returns('newRequest');

      return carBookingApi.reserveCar(originReserveCarRequest).then((apiParameter) => {
        expect(apiParameter.body).to.be.equal('newRequest');
        expect(transformCarReservationRequestStub).have.been.calledWith(originReserveCarRequest);
      });
    });
  });
});
