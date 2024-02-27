// @flow

import _ from 'lodash';
import AlphabetSelector from 'src/shared/components/alphabetSelector';
import ListGroup from 'src/shared/components/listGroup';
import { scrollToHeader, getAlphabet } from 'src/shared/helpers/alphabetSelectorHelper';
import React from 'react';

import type { HeaderRefsType } from 'src/shared/flow-typed/shared.types';
import type { ListItemType } from 'src/shared/components/searchableList';

type Props = {
  items: Array<ListItemType>,
  showAlphabetSelector: boolean,
  onItemSelect: (*) => void,
  groupByFn?: (ListItemType) => *,
  groupsSortBy?: string
};

const ListGroups = ({ items, showAlphabetSelector, onItemSelect, groupByFn, groupsSortBy }: Props) => {
  const _groupAndSortItems: (Array<ListItemType>) => Array<ListItemType> = (list: Array<ListItemType>) => {
    const groupedList = _.map([list], (listGroup) =>
      _.chain(listGroup).map().groupBy(groupByFn).toPairs().sortBy(groupsSortBy).value()
    );

    return _.flatten(groupedList);
  };

  const _displayItemGroup = (group, id: number) => (
    <div
      key={id}
      ref={(ref) => {
        _.set(headerRefs, group[0], ref);
      }}
    >
      <ListGroup group={group[0]} key={id} items={group[1]} onItemSelect={onItemSelect} />
    </div>
  );

  const headerRefs: HeaderRefsType = {};
  const sortedItemGroups = _groupAndSortItems(items);
  const itemGroupHeaders = _.map(sortedItemGroups, '[0]');

  return (
    <div className="item-list-groups">
      {_.map(sortedItemGroups, _displayItemGroup)}
      <AlphabetSelector
        shouldShow={showAlphabetSelector}
        alphabet={getAlphabet(itemGroupHeaders)}
        scrollTo={scrollToHeader(headerRefs)}
      />
    </div>
  );
};

ListGroups.defaultProps = {
  groupByFn: (item) => {
    const startWithNumber = item && item.label.charAt(0).match(/[0-9]/g);

    return startWithNumber ? '#' : item && item.label.charAt(0).toUpperCase();
  },
  groupsSortBy: '[0]'
};

export default ListGroups;
