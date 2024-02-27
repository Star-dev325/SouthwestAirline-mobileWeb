import _ from 'lodash';
import {
  isOpenJawReservation,
  isReaccomScenario,
  isUpgradeScenario
} from 'src/airChange/selectors/airChangeSelectPageSelector';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';

describe('airChangeSelectPageSelector', () => {
  const changeBoundsPath = 'app.airChange.changeFlightPage.response.boundSelections';
  const reaccomBoundsPath = 'app.airChange.reaccomFlightPage.response.boundSelections';

  const createState = (boundsPath, boundSelections) => {
    const state = {};

    _.set(state, boundsPath, boundSelections);

    return state;
  };

  const openJawBounds = [
    new BoundSelectionBuilder().withFrom('Boise, ID - BOI', 'BOI').build(),
    new BoundSelectionBuilder().withTo('Austin, TX - AUS', 'AUS').build()
  ];

  const bounds = [
    new BoundSelectionBuilder().withFrom('Boise, ID - BOI', 'BOI').build(),
    new BoundSelectionBuilder().withTo('Boise, ID - BOI', 'BOI').build()
  ];

  context('airChange scenario', () => {
    context('isOpenJawReservation', () => {
      it('should return true when departure and destination airport are different', () => {
        const state = createState(changeBoundsPath, openJawBounds);

        expect(isOpenJawReservation(state)).to.be.true;
      });

      it('should return false when departure and destination airport are same', () => {
        const state = createState(changeBoundsPath, bounds);

        expect(isOpenJawReservation(state)).to.be.false;
      });
    });

    context('Reaccom and change scenario', () => {
      context('isOpenJawReservation', () => {
        it('should return true when departure and destination airport are different', () => {
          const state = createState(changeBoundsPath, openJawBounds);

          expect(isOpenJawReservation(state)).to.be.true;
        });

        it('should return false when departure and destination airport are same', () => {
          const state = createState(changeBoundsPath, bounds);

          expect(isOpenJawReservation(state)).to.be.false;
        });
      });
    });

    context('isReaccomScenario', () => {
      it('should return false when reaccomFlightPage is empty', () => {
        const state = createState(changeBoundsPath, bounds);

        expect(isReaccomScenario(state)).to.be.false;
      });
    });
  });

  context('enhanced reaccom scenario', () => {
    context('isOpenJawReservation', () => {
      it('should return true when departure and destination airport are different', () => {
        const state = createState(reaccomBoundsPath, openJawBounds);

        expect(isOpenJawReservation(state)).to.be.true;
      });

      it('should return false when departure and destination airport are same', () => {
        const state = createState(reaccomBoundsPath, bounds);

        expect(isOpenJawReservation(state)).to.be.false;
      });
    });

    context('isReaccomScenario', () => {
      it('should return true when reaccomFlightPage is not empty', () => {
        const state = createState(reaccomBoundsPath, bounds);

        expect(isReaccomScenario(state)).to.be.true;
      });

      it('should return false when reaccomFlightPage is empty', () => {
        const state = createState(changeBoundsPath, bounds);

        expect(isReaccomScenario(state)).to.be.false;
      });
    });
  });

  context('airUpgrade scenario', () => {
    it('should return true for isUpgradeScenario', () => {
      const state = { app: { airChange: { changePricingPage: { response: { _meta: { isUpgrade: true } } } } } };

      expect(isUpgradeScenario(state)).to.be.true;
    });

    it('should return false for isUpgradeScenario', () => {
      expect(isUpgradeScenario()).to.be.false;
    });
  });
});
