import { render } from '@testing-library/react';
import React from 'react';
import DynamicWaiverMessages from 'src/shared/components/dynamicWaiverMessages';
import { splitPnrDynamicWaiverMessages } from 'test/builders/model/selectPassengersPageBuilder';

describe('DynamicWaiverMessages', () => {
  it('should render the component with splitPnrDynamicWaiverSummaryMessage when it exists', () => {
    const { container } = createComponent({ messages: [splitPnrDynamicWaiverMessages[0]] });

    expect(container).toMatchSnapshot();
  });

  it('should render the component with splitPnrDynamicWaiverDepartureStationsMessage when it exists', () => {
    const { container } = createComponent({ messages: [splitPnrDynamicWaiverMessages[1]] });

    expect(container).toMatchSnapshot();
  });

  it('should render the component with splitPnrDynamicWaiverReturnStationsMessage when it exists', () => {
    const { container } = createComponent({ messages: [splitPnrDynamicWaiverMessages[2]] });

    expect(container).toMatchSnapshot();
  });

  it('should render the component correctly when stationsMessage body is undefined', () => {
    const { container } = createComponent({ messages: [{ ...splitPnrDynamicWaiverMessages[2], body: undefined }] });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => render(<DynamicWaiverMessages {...props} />);
});
