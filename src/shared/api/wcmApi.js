import * as restClient from 'src/shared/api/restClient';

export const getJsonFile = (filePath) =>
  restClient.ajax({
    url: `/${filePath}`,
    type: 'GET',
    dataType: 'json'
  });
