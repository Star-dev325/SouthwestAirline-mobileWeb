import * as WcmApi from 'src/shared/api/wcm/wcmApi';

export const getAirports = () => WcmApi.getJsonFile('content/generated/data/service/air_stations.json');
