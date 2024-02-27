import * as restClient from 'src/shared/api/restClient';

export const getJsonFile = (filePath) =>
  restClient.ajax({
    url: `/${filePath}`,
    type: 'GET',
    dataType: 'json'
  });

export const retrieveApplicationProperties = () => getJsonFile('content/app/properties/applicationProperties.json');
