import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getFareDetailsResponse = (state) => _.get(state, 'app.wcmContent.fareDetails');

export const getFareDetails = () =>
  createSelector([getFareDetailsResponse], (fareDetailsResponse) => {
    if (_.isEmpty(fareDetailsResponse)) {
      return {};
    }
    const { descriptions } = fareDetailsResponse.fare_details;
    const title = _.get(fareDetailsResponse, 'fare_details.heading');
    const headings = _.map(descriptions, (description) => ({
      fareName: description.title,
      stylizedFareName: description.stylized_title,
      amountOfPoints: description.secondary_title,
      pointsPerDollar: description.tertiary_title,
      backgroundColor: description.color,
      textColor: description.text_color || null
    }));
    const categories = _.chain(descriptions)
      .map((description) =>
        _.map(description.attributes, (attribute, index) => ({
          title: `${_.get(attribute, 'attribute')}--${index}`,
          value: _.get(attribute, 'value'),
          color: description.color,
          description: _.get(attribute, 'attribute_description', null)
        }))
      )
      .flatten()
      .groupBy((attribute) => attribute.title.split('--')[1])
      .mapKeys((value) => {
        if (value) {
          return value[0].title;
        }
      })
      .value();

    return {
      title,
      headings,
      categories
    };
  });
