// @flow

import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getPassengers = (state: *) => _.get(state, 'app.checkIn.checkInFlowData.passengers');
const getTravelDocuments = (state: *) => _.get(state, 'app.checkIn.checkInFlowData.travelDocuments');
const getPaxNumber = (state: *, props: *) => parseInt(_.get(props, 'params.paxNumber'));

export const shouldShowSkipButton = createSelector([getPassengers], (passengers) => passengers.length > 1);

export const isLastPAX = createSelector(
  [getTravelDocuments, getPaxNumber],
  (travelDocuments, paxNumber) => paxNumber === travelDocuments.length
);

export const getDocumentTitles = createSelector([getTravelDocuments, getPaxNumber], (travelDocuments, paxNumber) => {
  const travelDocument = _.get(travelDocuments, `${paxNumber - 1}`, {});
  const { destinationConfig: { title } = {} } = travelDocument;

  return title ? { destination: title } : {};
});

export const getFormData = createSelector([getTravelDocuments, getPaxNumber], (travelDocuments, paxNumber) => {
  const travelDocument = _.get(travelDocuments, `${paxNumber - 1}`, {});
  const { missingDocuments, additionalPassportPageFormData = {} } = travelDocument;

  const omitObject = {
    permanentResidentCard: _.includes(missingDocuments, 'PERMANENT_RESIDENT_CARD'),
    visa: _.includes(missingDocuments, 'VISA'),
    destination: _.includes(missingDocuments, 'DESTINATION')
  };
  const formData = _.omitBy(omitObject, (value) => !value);

  return _.mapValues(formData, (value, key) =>
    (_.has(additionalPassportPageFormData, key) ? additionalPassportPageFormData[key] : null)
  );
});
