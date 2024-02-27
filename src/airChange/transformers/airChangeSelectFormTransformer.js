// @flow
import _ from 'lodash';

import type { SelectedBounds } from 'src/airChange/flow-typed/airChange.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';

export const getSelectedBoundsKey = (index: number, showSwappedBounds: boolean) => {
  let selectedBoundKey = index === 0 ? 'firstbound' : 'secondbound';

  if (showSwappedBounds) {
    selectedBoundKey = index === 0 ? 'secondbound' : 'firstbound';
  }

  return selectedBoundKey;
};

const defaultSelectedBounds = { firstbound: false };

const _getReaccomSelectedBounds = (
  boundSelections: Array<BoundSelection>,
  showSwappedBounds: boolean,
  isReaccomBlockMultiBoundSelection: boolean
) => {
  const numberBoundsEligible = _.filter(boundSelections, { boundFlown: false, isSelectable: true }).length;
  const isSelectedBlocked = isReaccomBlockMultiBoundSelection && numberBoundsEligible === 2;

  return _.reduce(
    boundSelections,
    (selectedBounds: SelectedBounds, bound: BoundSelection, index: number) => {
      const selectedBoundKey = getSelectedBoundsKey(index, showSwappedBounds);

      return _.merge({}, selectedBounds, {
        [selectedBoundKey]: !bound.boundFlown && bound.isSelectable && !isSelectedBlocked
      });
    },
    defaultSelectedBounds
  );
};

export const getSelectedBounds = (props: {
  boundSelections: Array<BoundSelection>,
  isReaccom: boolean,
  showSwappedBounds: boolean,
  isReaccomBlockMultiBoundSelection: boolean
}) => {
  const { boundSelections, isReaccom, showSwappedBounds, isReaccomBlockMultiBoundSelection } = props;

  if (isReaccom) {
    return _getReaccomSelectedBounds(boundSelections, showSwappedBounds, isReaccomBlockMultiBoundSelection);
  }

  return _.reduce(
    boundSelections,
    (selectedBounds: SelectedBounds, bound: BoundSelection, index: number) => {
      const selectedBoundKey = getSelectedBoundsKey(index, showSwappedBounds);

      return _.merge({}, selectedBounds, { [selectedBoundKey]: bound.showWarningIcon });
    },
    defaultSelectedBounds
  );
};
