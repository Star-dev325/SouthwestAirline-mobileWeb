import { storiesOf } from '@storybook/react';
import React from 'react';
import SearchBar from 'src/airports/components/searchBar';

storiesOf('components/searchBar', module).add('default', () => {
  return <SearchBar />;
});
