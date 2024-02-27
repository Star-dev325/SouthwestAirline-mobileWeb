import React from 'react';
import ShoppingSortFilterForm from 'src/sameDay/components/shoppingSortFilterForm';
import {
  getShowSortFilterDialogOptions
} from 'src/sameDay/helpers/sameDayShoppingSortFilterHelper';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import { SAME_DAY_SORT_FILTER_FORM } from 'src/shared/constants/formIds';

describe('sameDayShoppingSortFilterHelper', () => {
  describe('getShowSortFilterDialogOptions', () => {
    it('should return correct showDialog options', () => {
      const onClick = () => {};
      const expectedShowDialogOptions = {
        bodyClassName: 'shopping-sort-filter-modal',
        buttons: [{ label: 'SAME_DAY_SORT_FILTER_APPLY_BUTTON', style: PRIMARY, onClick }],
        className: 'same-day-shopping-page',
        contentView: <ShoppingSortFilterForm formId={SAME_DAY_SORT_FILTER_FORM} />
      };

      expect(getShowSortFilterDialogOptions(onClick)).toEqual(expectedShowDialogOptions);
    });
  });
});
