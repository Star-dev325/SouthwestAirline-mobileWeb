import { getConfirmation as confirmationSelector } from 'src/companion/analytics/confirmationSelector';

describe('confirmationSelector', () => {
  it('should set passengerType to companion', () => {
    const state = buildState({});
    const reservationGroup = confirmationSelector(state).reservationGroups[0];

    expect(reservationGroup.passengerType).to.equal('COMPANION');
  });

  it('should set earlyBirdTotalCostCents to companion', () => {
    const state = buildState({ total: { amount: '30.0' } });
    const reservationGroup = confirmationSelector(state).reservationGroups[0];

    expect(reservationGroup.earlyBirdTotalCostCents).to.equal('30.0');
  });

  it('should set earlyBirdSucceeded to false if failedEarlyBird is not null', () => {
    const state = buildState({ failedEarlyBird: 'not empty' });
    const reservationGroup = confirmationSelector(state).reservationGroups[0];

    expect(reservationGroup.earlyBirdSucceeded).to.be.false;
  });

  it('should set pnr to companion', () => {
    const state = buildState({ recordLocator: 'companion pnr' });
    const reservationGroup = confirmationSelector(state).reservationGroups[0];

    expect(reservationGroup.pnr).to.equal('companion pnr');
  });

  it('should set early bird fields to null if early bird is not selected', () => {
    const state = buildState({ total: {}, failedEarlyBird: null });
    const reservationGroup = confirmationSelector(state).reservationGroups[0];

    expect(reservationGroup.earlyBirdSucceeded).to.equal(null);
    expect(reservationGroup.earlyBirdTotalCostCents).to.equal(null);
  });
});

const buildState = (options = {}) => {
  const { total = { amount: '5.60' }, recordLocator = 'TEST123', failedEarlyBird = null } = options;

  return {
    app: {
      companion: {
        companionConfirmationPage: {
          failedEarlyBird,
          totals: {
            adultFare: {
              earlyBirdPrice: {
                total
              }
            }
          },
          pnrs: [
            {
              recordLocator
            }
          ]
        }
      }
    }
  };
};
