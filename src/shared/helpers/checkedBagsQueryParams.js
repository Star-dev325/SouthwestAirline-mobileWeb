import urls from 'src/shared/bootstrap/urls';
import browserObject from 'src/shared/helpers/browserObject';

export const getCheckedBagsQueryParams = (trackCheckedBags) => {
  const { location } = browserObject;
  const { trackBagsHelpCenterUrl = '' } = urls;
  const queryParams = {
    ...(trackCheckedBags && { helpCenterURL: trackBagsHelpCenterUrl, returnToURL: location.origin })
  };

  return trackCheckedBags ? queryParams : null;
};
