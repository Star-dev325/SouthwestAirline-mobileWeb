import i18n from '@swa-ui/locale';
import React from 'react';
import ShoppingSortFilterForm from 'src/sameDay/components/shoppingSortFilterForm';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import { SAME_DAY_SORT_FILTER_FORM } from 'src/shared/constants/formIds';

export const getShowSortFilterDialogOptions = (onClick, onDimmerClick) => ({
  bodyClassName: 'shopping-sort-filter-modal',
  buttons: [{ label: i18n('SAME_DAY_SORT_FILTER_APPLY_BUTTON'), style: PRIMARY, onClick }],
  className: 'same-day-shopping-page',
  contentView: <ShoppingSortFilterForm formId={SAME_DAY_SORT_FILTER_FORM} />,
  onDimmerClick
});
