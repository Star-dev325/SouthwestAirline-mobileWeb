import { sandbox } from 'sinon';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import ApiRoutes from 'src/shared/api/apiRoutes';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as RestClient from 'src/shared/api/restClient';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import { APP_ID } from 'src/shared/constants/contentDeliveryApiConstants.js';
import Url from 'url';

const { CONTENT_PATH } = BootstrapConstants;
const { content: baseUrl } = ApiRoutes;

const sinon = sandbox.create();

describe('ContentDeliveryApi', () => {
  const fullUrl = 'full-url';

  const successContent = { response: 'content' };
  const success = { success: true, results: successContent };
  const failure = { success: false };

  const successResponse = Promise.resolve(success);
  const failureResponse = Promise.resolve(failure);
  const errorResponse = Promise.reject('error');
  const undefinedResponse = Promise.resolve(undefined);

  let ajaxStub;
  let fetchBootstrapDataStub;
  let urlResolveStub;

  beforeEach(() => {
    ajaxStub = sinon.stub(RestClient, 'ajax');
    urlResolveStub = sinon.stub(Url, 'resolve').returns(fullUrl);
    fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getContent', () => {
    const type = 'GET';
    const dataType = 'json';
    const bootstrapContent = { bootstrap: 'content' };
    const bootstrapData = { 'mobile-web': { results: bootstrapContent } };
    const query = { appId: APP_ID, channel: 'channel', pageId: 'page', nearestStation: '' };

    context('should fetch placements and handle success response', () => {
      it('without timeout', async () => {
        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result).to.deep.equal(success);
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, undefined);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with timeout', async () => {
        const timeout = 12345;

        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent(query, timeout);

        expect(result).to.deep.equal(success);
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with segments', async () => {
        const segments = ['segment1', 'segment2'];
        const timeout = 12345;

        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent({ ...query, segments }, timeout);

        expect(result).to.deep.equal(success);
        expect(urlResolveStub).to.have.been.calledWith(
          baseUrl,
          'v1/content-delivery/query/placements?segment=segment1&segment=segment2'
        );
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with appContexts', async () => {
        const appContexts = ['context1', 'context2'];
        const timeout = 12345;

        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent({ ...query, appContexts }, timeout);

        expect(result).to.deep.equal(success);
        expect(urlResolveStub).to.have.been.calledWith(
          baseUrl,
          'v1/content-delivery/query/placements?appContext=context1&appContext=context2'
        );
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with segments and appContexts', async () => {
        const segments = ['segment1', 'segment2'];
        const appContexts = ['context1', 'context2'];
        const timeout = 12345;

        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent({ ...query, segments, appContexts }, timeout);

        expect(result).to.deep.equal(success);
        expect(urlResolveStub).to.have.been.calledWith(
          baseUrl,
          'v1/content-delivery/query/placements?segment=segment1&segment=segment2&appContext=context1&appContext=context2'
        );
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with added bootstrap data that is missing in api response', async () => {
        const segments = ['segment1', 'segment2'];
        const appContexts = ['context1', 'context2'];
        const timeout = 12345;

        ajaxStub.returns(successResponse);
        fetchBootstrapDataStub.returns(bootstrapData);

        const result = await ContentDeliveryApi.getContent({ ...query, segments, appContexts }, timeout);

        expect(result).to.deep.equal({ ...success, results: { ...successContent, ...bootstrapContent } });
        expect(urlResolveStub).to.have.been.calledWith(
          baseUrl,
          'v1/content-delivery/query/placements?segment=segment1&segment=segment2&appContext=context1&appContext=context2'
        );
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('with added bootstrap data that is overriden by api response', async () => {
        const segments = ['segment1', 'segment2'];
        const appContexts = ['context1', 'context2'];
        const timeout = 12345;

        const bootstrapResponse = { 'mobile-web': { results: { response: 'content' } } };

        ajaxStub.returns(successResponse);
        fetchBootstrapDataStub.returns(bootstrapResponse);

        const result = await ContentDeliveryApi.getContent({ ...query, segments, appContexts }, timeout);

        expect(result).to.deep.equal({ ...success, results: { ...successContent } });
        expect(urlResolveStub).to.have.been.calledWith(
          baseUrl,
          'v1/content-delivery/query/placements?segment=segment1&segment=segment2&appContext=context1&appContext=context2'
        );
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, timeout);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });
      it('should not pass appContexts and segments in request payload', async () => {
        ajaxStub.returns(successResponse);
        const queryParams = { appContexts: ['context'], segments: ['segment'], channel: 'channel', pageId: 'page' };

        await ContentDeliveryApi.getContent(queryParams);

        expect(queryParams.appContexts).to.equal(undefined);

        expect(queryParams.segments).to.equal(undefined);
        expect(queryParams.channel).to.equal('channel');
      });
    });

    context('should fetch placements and handle failure response', () => {
      it('where response is undefined', async () => {
        ajaxStub.returns(undefinedResponse);
        fetchBootstrapDataStub.returns(bootstrapData);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result).to.deep.equal(bootstrapData['mobile-web']);
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, undefined);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('where response has success field as false', async () => {
        ajaxStub.returns(failureResponse);
        fetchBootstrapDataStub.returns(bootstrapData);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result).to.deep.equal(bootstrapData['mobile-web']);
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, undefined);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });
    });

    context('should fetch placements and handle exception', () => {
      it('with bootstrap data', async () => {
        ajaxStub.returns(errorResponse);
        fetchBootstrapDataStub.returns(bootstrapData);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result).to.deep.equal(bootstrapData['mobile-web']);
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, undefined);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });

      it('without bootstrap data', async () => {
        ajaxStub.returns(errorResponse);
        fetchBootstrapDataStub.returns(undefined);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result).to.deep.equal({});
        expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/placements');
        expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType }, false, undefined);
        expect(fetchBootstrapDataStub).to.have.been.calledWith(CONTENT_PATH);
      });
    });

    context('should handle hideBootstrapOnEmptyContent flag in bootstrap data', () => {
      const bootstrapContent = {
        results: {
          someKey: { content: { placementData: { hideBootstrapOnEmptyContent: true } } },
          someOtherKey: { content: {} }
        }
      };
      const bootstrapData = { 'mobile-web': bootstrapContent };

      it('with error response', async () => {
        fetchBootstrapDataStub.returns(bootstrapData);
        ajaxStub.returns(errorResponse);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result?.results?.someKey?.content?.hidePlacement).to.be.true;
      });

      it('with success response and matching placement id', async () => {
        const successResponseWithMatchingPlacementId = Promise.resolve({ ...bootstrapContent, success: true });

        fetchBootstrapDataStub.returns(bootstrapData);
        ajaxStub.returns(successResponseWithMatchingPlacementId);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result?.results?.someKey?.content?.hidePlacement).to.be.undefined;
      });

      it('with success response and no matching placement id', async () => {
        fetchBootstrapDataStub.returns(bootstrapData);
        ajaxStub.returns(successResponse);

        const result = await ContentDeliveryApi.getContent(query);

        expect(result?.results?.someKey?.content?.hidePlacement).to.be.true;
      });
    });
  });

  context('getMwebToggles', () => {
    it('should fetch application-toggles', async () => {
      const type = 'GET';
      const query = { channel: 'mweb' };
      const dataType = 'json';

      ajaxStub.returns(successResponse);

      const result = await ContentDeliveryApi.getMwebToggles();

      expect(result).to.deep.equal(success);
      expect(urlResolveStub).to.have.been.calledWith(baseUrl, 'v1/content-delivery/query/application-toggles');
      expect(ajaxStub).to.have.been.calledWith({ url: fullUrl, type, query, dataType });
    });
  });
});
