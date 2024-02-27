import * as WcmApi from 'src/shared/api/wcm/wcmApi';

export const getTravelAdvisories = () => WcmApi.getJsonFile('content/generated/data/travel_advisories_common.json');
