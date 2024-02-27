import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import AirportSelectorField from 'src/shared/form/fields/airportSelectorField';

const store = createMockedFormStore();
const MockedForm = createMockedForm(createMockedFormStore());

storiesOf('components/airportSelectorField', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
        />
      </MockedForm>
    );
  })
  .add('with icon', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          iconType="airplane-depart"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
        />
      </MockedForm>
    );
  })
  .add('with right icon', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          iconType="airplane-depart"
          iconRight
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
        />
      </MockedForm>
    );
  })
  .add('with description', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          description="Select Airport"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
        />
      </MockedForm>
    );
  })
  .add('with icon and description', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          description="Select Airport"
          iconType="airplane-depart"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
        />
      </MockedForm>
    );
  })
  .add('new style', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNewStyle
        />
      </MockedForm>
    );
  })
  .add('new style with description', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          description="Select Airport"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNewStyle
        />
      </MockedForm>
    );
  })
  .add('native style', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  })
  .add('native style with icon', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          iconType="airplane-depart"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  })
  .add('native style with description', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          name="from"
          modalId="from"
          placeholder="From"
          description="Select Airport"
          clickableClassName=""
          dataForE2E="from"
          disabled={false}
          allAirports={[]}
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  })
  .add('native style with icon and description', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <AirportSelectorField
          allAirports={[]}
          clickableClassName=""
          containerClassName="search-flights--form-input"
          dataForE2E="from"
          description="Select Airport"
          disabled={false}
          iconType="airplane-depart"
          modalId="from"
          name="from"
          placeholder="From"
          recentlySearched={[]}
          toggles={true}
          updateSelectedAirportInfoFn={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  });
