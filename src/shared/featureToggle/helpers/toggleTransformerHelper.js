import _ from 'lodash';
import defaultToggles from 'src/shared/featureToggle/featureToggleState';

export const transformToToggles = (wcmFeatureToggles, enablePath) => {
  const enableToggles = _.get(wcmFeatureToggles, enablePath, []);
  const keys = _.keys(defaultToggles);

  _.forEach(enableToggles, (toggle) => {
    if (_.includes(keys, toggle)) {
      defaultToggles[toggle] = true;
    }
  });

  return defaultToggles;
};
