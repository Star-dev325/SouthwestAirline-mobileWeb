import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { getSelectedBounds, getSelectedBoundsKey } from 'src/airChange/transformers/airChangeSelectFormTransformer';

describe('airChangeSelectFormTransformer', () => {
  describe('getSelectedBounds', () => {
    describe('isReaccom false', () => {
      it('should return firstbound as true if dynamic waiver is true', () => {
        const boundSelections = [new BoundSelectionBuilder().withDynamicWaiver(true).build()];

        expect(getSelectedBounds({ boundSelections })).toMatchObject({ firstbound: true });
      });

      it('should set firstbound and secondbound based on dynamic waiver status', () => {
        const boundSelections = [
          new BoundSelectionBuilder().withDynamicWaiver(false).build(),
          new BoundSelectionBuilder().withDynamicWaiver(true).build()
        ];

        expect(getSelectedBounds({ boundSelections })).toMatchObject({
          firstbound: false,
          secondbound: true
        });
      });
    });

    describe('isReaccom true', () => {
      describe('when isReaccomBlockMultiBoundSelection false', () => {
        let isReaccomBlockMultiBoundSelection;

        beforeEach(() => {
          isReaccomBlockMultiBoundSelection = false;
        });

        it('should return firstbound as true when selectable is true and flown is false', () => {
          const boundSelections = [new BoundSelectionBuilder().withReaccomBound().build()];

          expect(
            getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
          ).toMatchObject({ firstbound: true });
        });

        it('should return firstbound as true when selectable is true and flown is true', () => {
          const boundSelections = [new BoundSelectionBuilder().withReaccomBound(true, true).build()];

          expect(
            getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
          ).toMatchObject({ firstbound: false });
        });

        it('should set firstbound and secondbound when based on selectable and flown', () => {
          const boundSelections = [
            new BoundSelectionBuilder().withReaccomBound(true, true).build(),
            new BoundSelectionBuilder().withReaccomBound(true, false).build()
          ];

          expect(
            getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
          ).toMatchObject({
            firstbound: false,
            secondbound: true
          });
        });
      });

      describe('when isReaccomBlockMultiBoundSelection true', () => {
        let isReaccomBlockMultiBoundSelection;

        beforeEach(() => {
          isReaccomBlockMultiBoundSelection = true;
        });

        describe('single bound', () => {
          it('should return firstbound as false when selectable is false', () => {
            const boundSelections = [new BoundSelectionBuilder().withReaccomBound(false).build()];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({ firstbound: false });
          });

          it('should return firstbound as false when selectable is true and flown is true', () => {
            const boundSelections = [new BoundSelectionBuilder().withReaccomBound(true, true).build()];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({ firstbound: false });
          });

          it('should return firstbound as false when selectable is true and flown is false', () => {
            const boundSelections = [new BoundSelectionBuilder().withReaccomBound().build()];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({ firstbound: true });
          });
        });

        describe('two bounds', () => {
          it('should set firstbound true and secondbound to true when both bounds are eligible', () => {
            const boundSelections = [
              new BoundSelectionBuilder().withReaccomBound(true).build(),
              new BoundSelectionBuilder().withReaccomBound(true).build()
            ];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({
              firstbound: false,
              secondbound: false
            });
          });

          it('should set firstbound false and secondbound to true when 1st bound is not eligible (flown) and 2nd bound is eligible', () => {
            const boundSelections = [
              new BoundSelectionBuilder().withReaccomBound(true, true).build(),
              new BoundSelectionBuilder().withReaccomBound(true, false).build()
            ];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({
              firstbound: false,
              secondbound: true
            });
          });

          it('should set firstbound true and secondbound to false when 1st bound eligible and 2nd bound is not eligible (flown)', () => {
            const boundSelections = [
              new BoundSelectionBuilder().withReaccomBound(true, false).build(),
              new BoundSelectionBuilder().withReaccomBound(true, true).build()
            ];

            expect(
              getSelectedBounds({ boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection })
            ).toMatchObject({
              firstbound: true,
              secondbound: false
            });
          });
        });
      });
    });
  });

  describe('getSelectedBoundsKey', () => {
    const showSwappedBounds = false;

    describe('showSwappedBounds is false', () => {
      it('should return firstbound when index is 0', () => {
        expect(getSelectedBoundsKey(0, showSwappedBounds)).toBe('firstbound');
      });

      it('should return secondbound when index is not 0', () => {
        expect(getSelectedBoundsKey(1, showSwappedBounds)).toBe('secondbound');
      });

      it('should return secondbound when index is not 0 when swappedBounds is not specified', () => {
        expect(getSelectedBoundsKey(1)).toBe('secondbound');
      });
    });

    describe('showSwappedBounds is true', () => {
      const showSwappedBounds = true;

      it('should return secondbound when index is 0', () => {
        expect(getSelectedBoundsKey(0, showSwappedBounds)).toBe('secondbound');
      });

      it('should return firstbound when index is 1', () => {
        expect(getSelectedBoundsKey(1, showSwappedBounds)).toBe('firstbound');
      });
    });
  });
});
