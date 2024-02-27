import { storiesOf } from '@storybook/react';
import React from 'react';
import AirportListGroup from 'src/airports/components/airportListGroup';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

const store = createMockedFormStore();

const isWebViewStore = {
  app: { formData: { MULTI_SELECT_GROUP_FORM_ORIGIN: { url: '', data: { BOT: true, BOS: true, BDL:true, MHT: true, PVD: true  } } } }
};

const isWebViewStoreMock = {
  app: { formData: { MULTI_SELECT_GROUP_FORM_ORIGIN: { url: '', data: { } } } }
};

storiesOf('components/airportListGroup', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore(isWebViewStore)))
  .add('multiSelectGroupCheckboxesWithChecked', () => {
    return (
      <AirportListGroup
        airports={getMultiSelectGroup()['Boston Area Airports']}
        sortByGroups
        isMultiSelectGroupEnabled
        clearFormDataById={_.noop}
        updateFormDataValueFn={_.noop}
        setAirportGroupData={_.noop}
        group={'Boston Area Airports'}
        groupId='BOT'
        formId={'MULTI_SELECT_GROUP_FORM_ORIGIN'}
      />
    );
  });
  storiesOf('components/airportListGroup', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore(isWebViewStoreMock)))
  .add('multiSelectGroupCheckboxesWithoutAllChecked', () => {
    return (
      <AirportListGroup
        airports={getMultiSelectGroup()['Boston Area Airports']}
        sortByGroups
        isMultiSelectGroupEnabled
        clearFormDataById={_.noop}
        updateFormDataValueFn={_.noop}
        setAirportGroupData={_.noop}
        group={'Boston Area Airports'}
        formId={'MULTI_SELECT_GROUP_FORM_ORIGIN'}
      />
    );
  });
