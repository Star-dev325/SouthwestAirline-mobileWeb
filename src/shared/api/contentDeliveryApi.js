// @flow
import _ from 'lodash';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import environment from 'src/shared/api/apiRoutes';
import * as restClient from 'src/shared/api/restClient';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import { APP_ID } from 'src/shared/constants/contentDeliveryApiConstants.js';
import url from 'url';

export type QueryParameter = {|
  pageId: string,
  channel: string,
  segments?: Array<string>,
  appContexts?: Array<string>,
  nearestStation?: string
|};

export const getContent = (queryParams: QueryParameter, timeout: ?number): Promise<*> => {
  const bootstrapContent = _.cloneDeep(_.get(fetchBootstrapData(BootstrapConstants.CONTENT_PATH), 'mobile-web', {}));
  const results = bootstrapContent.results || {};

  const placementsToHideOnEmptyResponse = Object.keys(results).filter(
    (placementId) =>
      !!_.get(bootstrapContent, `results.${placementId}.content.placementData.hideBootstrapOnEmptyContent`)
  );

  const addHideIndicatorToBootstrapContent = () => {
    placementsToHideOnEmptyResponse.forEach((placementId) => {
      _.set(bootstrapContent, `results.${placementId}.content.hidePlacement`, true);
    });
  };

  const segmentParamsFormatted = getFormattedParams(queryParams, 'segment');
  const appContextParamsFormatted = getFormattedParams(queryParams, 'appContext');
  const paramsPrefix = segmentParamsFormatted || appContextParamsFormatted ? '?' : '';
  const paramSeparator = segmentParamsFormatted && appContextParamsFormatted ? '&' : '';

  delete queryParams.appContexts;
  delete queryParams.segments;

  const options = {
    url: url.resolve(
      environment.content,
      `v1/content-delivery/query/placements${paramsPrefix}${segmentParamsFormatted}${paramSeparator}${appContextParamsFormatted}`
    ),
    type: 'GET',
    query: { ...queryParams, appId: APP_ID },
    dataType: 'json'
  };

  return restClient
    .ajax(options, false, timeout)
    .then((response = {}) => (response.success ? response : Promise.reject()))
    .then((response) => {
      const shouldHide =
        placementsToHideOnEmptyResponse.length &&
        !Object.keys(response.results).some((placementId) => placementsToHideOnEmptyResponse.includes(placementId));

      shouldHide && addHideIndicatorToBootstrapContent();

      return response;
    })
    .then((response) => ({
      ...response,
      results: {
        ...bootstrapContent.results,
        ...response.results
      }
    }))
    .catch(() => {
      addHideIndicatorToBootstrapContent();

      return { ...bootstrapContent };
    });
};

const getFormattedParams = (queryParams: QueryParameter, paramName) => {
  const params = _.chain(queryParams[`${paramName}s`])
    .map((param) => `${paramName}=${param}`)
    .join('&')
    .value();

  return params ? `${params}` : '';
};

export const getMwebToggles = (): Promise<*> => {
  const queryParameters = {
    channel: 'mweb'
  };

  return restClient.ajax({
    url: url.resolve(environment.content, 'v1/content-delivery/query/application-toggles'),
    type: 'GET',
    query: queryParameters,
    dataType: 'json'
  });
};
