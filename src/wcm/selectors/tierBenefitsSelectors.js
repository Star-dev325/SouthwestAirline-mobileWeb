import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getTierBenefitsResponse = (state) => _.get(state, 'app.wcmContent.tierBenefits');

export const getTierBenefits = createSelector([getTierBenefitsResponse], (tierBenefitsResponse) => {
  if (!tierBenefitsResponse) {
    return {};
  }

  const title = _.get(tierBenefitsResponse, 'tier_benefits.heading');
  const headings = _.map(tierBenefitsResponse.tier_benefits.descriptions, (description) => ({
    title: description.title,
    color: description.color
  }));
  const categories = _.chain(tierBenefitsResponse.tier_benefits.descriptions)
    .map((description) =>
      _.map(description.attributes, (attribute, index) => ({
        title: `${_.get(attribute, 'attribute')}-${index}-${_.get(attribute, 'attribute_suffix', '')}`,
        value: _.get(attribute, 'value')
      }))
    )
    .flatten()
    .groupBy('title')
    .value();

  return {
    title,
    headings,
    categories
  };
});
