import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import SearchableList from 'src/shared/components/searchableList';

const store = createMockedFormStore();
const props = {
  title: 'Modal Search Title',
  itemList: [
    { label: 'Label One', code: '1' },
    { label: 'Label Two', code: '2' },
    { label: 'Label Three', code: '3' }
  ],
  onItemSelect: _.noop,
  onCancel: _.noop,
  codeFieldName: 'theCode'
};
const propsWithSectionHeaders = _.merge({}, props, {
  showSectionHeaders: true,
  itemList: [
    { label: 'Label One', code: '1' },
    { label: 'Label Two', code: '2' },
    { label: 'Label Three', code: '3' },
    { label: '1 One', code: '1' },
    { label: '2 Two', code: '2' }
  ]
});

const propsWithDisabledItem = _.merge({}, props, {
  showSectionHeaders: true,
  itemList: [
    { label: 'Label One', code: '1', disabled: true, disabledMessage: ' - EXPIRED' },
    { label: 'Label Two', code: '2' },
    { label: 'Label Three', code: '3' },
    { label: '1 One', code: '1', disabled: true, disabledMessage: ' - EXPIRED' },
    { label: '2 Two', code: '2' }
  ]
});

const propsWithAlternateItemAllowed = _.merge({}, props, {
  alternateItemAllowed: true,
  alternateNavItemLinkProps: {},
  showSectionHeaders: true,
  alternateNavItemTitle: 'Alternate Item Title',
  itemList: [
    { label: 'Label One', code: '1', disabled: true, disabledMessage: ' - EXPIRED' },
    { label: 'Label Two', code: '2' },
    { label: 'Label Three', code: '3' },
    { label: '1 One', code: '1', disabled: true, disabledMessage: ' - EXPIRED' },
    { label: '2 Two', code: '2' }
  ]
});

storiesOf('components/searchableList', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <SearchableList showSearchBar={false} {...props} />;
  })
  .add('showSearchBar', () => {
    return <SearchableList showSearchBar {...props} />;
  })
  .add('withSectionHeader', () => {
    return <SearchableList showSearchBar {...propsWithSectionHeaders} />;
  })
  .add('withDisabledItem', () => {
    return <SearchableList showSearchBar {...propsWithDisabledItem} />;
  })
  .add('withAlternateItemAllowed', () => {
    return <SearchableList showSearchBar {...propsWithAlternateItemAllowed} />;
  });
