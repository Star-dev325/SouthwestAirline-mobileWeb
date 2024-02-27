import _ from 'lodash';
import { getIsRevenue } from 'src/standby/analytics/isRevenueSelector';

describe('getIsRevenue', () => {
  it('should return null when the redux store isRevenue is null', () => {
    const state = _.set({}, 'app.standby.isRevenue', null);

    expect(getIsRevenue(state)).to.be.null;
  });

  it('should return true when the redux store isRevenue is true', () => {
    const state = _.set({}, 'app.standby.isRevenue', true);

    expect(getIsRevenue(state)).to.be.true;
  });

  it('should return false when the redux store isRevenue is false', () => {
    const state = _.set({}, 'app.standby.isRevenue', false);

    expect(getIsRevenue(state)).to.be.false;
  });
});
