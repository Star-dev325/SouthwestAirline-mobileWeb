// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';

export const isReaccomScenario = (state: *) => !_.isEmpty(_.get(state, 'app.airChange.reaccomFlightPage.response'));

export const isUpgradeScenario = (state: *) =>
  _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false);

export const getReaccomBoundSelections = (state: *) =>
  _.get(state, 'app.airChange.reaccomFlightPage.response.boundSelections');
const getChangeBoundSelections = (state: *) => _.get(state, 'app.airChange.changeFlightPage.response.boundSelections');

export const isOpenJawReservation = createSelector(
  [isReaccomScenario, getReaccomBoundSelections, getChangeBoundSelections],
  (isReaccom: boolean, reaccomBoundSelections: Array<BoundSelection>, changeBoundSelections: Array<BoundSelection>) => {
    const boundSelections = isReaccom ? reaccomBoundSelections : changeBoundSelections;
    const departureAirportCode = _.chain(boundSelections).head().get('fromAirportCode').value();
    const destinationAirportCode = _.chain(boundSelections).last().get('toAirportCode').value();

    return boundSelections && boundSelections.length > 1 && departureAirportCode !== destinationAirportCode;
  }
);
