import _ from 'lodash';
import { flightChangeConfirmationMktgSelector } from 'src/airChange/analytics/flightChangeConfirmationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightChangeConfirmationMktgSelector', () => {
  it('should return an empty object for mktgData if "app.airChange.changeConfirmationPage.response.mktg_data" does not exist', () => {
    const [mktgData] = flightChangeConfirmationMktgSelector({});

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...ANALYTICS.CONFIRMATION_PAGE });
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.airChange.changeConfirmationPage.response.mktg_data', mockData);
    const [mktgData] = flightChangeConfirmationMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData, ...ANALYTICS.CONFIRMATION_PAGE });
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const expectedResult = {
      ...ANALYTICS.CONFIRMATION_PAGE,
      ...globalMktgState
    };
    const state = _.merge(
      _.set({}, 'app.airChange.changeConfirmationPage.response.mktg_data', expectedResult),
      _.set({}, 'app.airChange.changePricingPage.response._meta.isUpgrade', false)
    );
    const [mktgData] = flightChangeConfirmationMktgSelector(state);

    expect(mktgData).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property when isUpgrade true', () => {
    const upgradeMktgData = {
      formcomplete: '1',
      formname: 'upgrade',
      ...ANALYTICS.CONFIRMATION_PAGE,
      ...globalMktgState
    };
    const state = _.merge(
      _.set({}, 'app.airChange.changeConfirmationPage.response.mktg_data', upgradeMktgData),
      _.set({}, 'app.airChange.changePricingPage.response._meta.isUpgrade', true)
    );
    const [mktgData] = flightChangeConfirmationMktgSelector(state);

    expect(mktgData).toStrictEqual(upgradeMktgData);
  });
});
