import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMobileBoardingPass = (state) =>
  _.get(state, 'app.checkIn.checkInViewBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView', []);

export const hasMultipleBoardingPasses = createSelector([getMobileBoardingPass], (mobileBoardingPass) => ({
  selectedMultipleTravelers: _.chain(mobileBoardingPass).map('passenger').map('travelerId').uniq().value().length > 1
}));
