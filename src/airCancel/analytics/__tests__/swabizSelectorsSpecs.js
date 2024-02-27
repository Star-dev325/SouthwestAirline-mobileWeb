import _ from 'lodash';
import { getSwabiz } from 'src/airCancel/analytics/swabizSelectors';

describe('getSwabizSelectors', () => {
  it('should return the value isSwabiz from the CHAPI cancelSummaryPage response', () => {
    const state = _.set({}, 'app.airCancel.cancelSummaryPage.response.isSwabiz', true);

    expect(getSwabiz(state)).to.be.deep.equal({ isSwabiz: true });
  });
});
