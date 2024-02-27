import { getChangeType } from 'src/airChange/selectors/changeTypeSelector';

describe('getChangeTypeSelector', () => {
  let fareSummary;

  beforeEach(() => {
    fareSummary = {
      newTripCost: {
        fare: {
          amount: '12,747',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      },
      originalTripCost: {
        fare: {
          amount: '2,747',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      }
    };
  });

  it('should return upgrade as true when it is upgrade', () => {
    fareSummary.originalTripCost.fare.amount = '2,747';
    fareSummary.newTripCost.fare.amount = '12,234';
    expect(getChangeType.resultFunc(fareSummary)).to.be.deep.equal({
      upGrade: true,
      downGrade: false,
      evenExchange: false
    });
  });

  it('should return downgrade as true when it is downgrade', () => {
    fareSummary.originalTripCost.fare.amount = '2,747';
    fareSummary.newTripCost.fare.amount = '1,234';
    expect(getChangeType.resultFunc(fareSummary)).to.be.deep.equal({
      upGrade: false,
      downGrade: true,
      evenExchange: false
    });
  });

  it('should return evenExchange as true when it is even change', () => {
    fareSummary.originalTripCost.fare.amount = '2,747';
    fareSummary.newTripCost.fare.amount = '2,747';
    expect(getChangeType.resultFunc(fareSummary)).to.be.deep.equal({
      upGrade: false,
      downGrade: false,
      evenExchange: true
    });
  });
});
