import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getTravelInformation = (state) => _.get(state, 'app.viewReservation.travelInformationPage');

export const getKtnRedress = createSelector([getTravelInformation], (travelInformation) => {
  const hasStoredRedress = _.isEqual(
    _.get(travelInformation, `response.editPNRPassengerPage.redressNumber`),
    'On File'
  );
  const hasStoredKTN = _.isEqual(_.get(travelInformation, `response.editPNRPassengerPage.knownTravelerId`), 'On File');
  const addedRedress = !_.isEmpty(_.get(travelInformation, `saveTravelInformationRequest.body.redressNumber`));
  const addedKTN = !_.isEmpty(_.get(travelInformation, `saveTravelInformationRequest.body.knownTravelerId`));
  const editedRedress = hasStoredRedress && addedRedress;
  const editedKTN = hasStoredKTN && addedKTN;

  return {
    editedRedress,
    editedKTN
  };
});
