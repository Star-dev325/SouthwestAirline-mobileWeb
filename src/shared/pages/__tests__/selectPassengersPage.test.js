jest.mock('src/shared/actions/formDataActions', () => ({
  updateFormFieldDataValue: jest.fn(() => ({ type: 'FAKE-ACTION' }))
}));
jest.mock('src/shared/actions/sharedActions', () => ({ hideErrorHeaderMsg: jest.fn(() => ({ type: 'FAKE-ACTION' })) }));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { hideErrorHeaderMsg } from 'src/shared/actions/sharedActions';
import SelectPassengersPage from 'src/shared/pages/selectPassengersPage';
import {
  airChangeSplitPnrDetailsWithDWMessages,
  airChangeSplitPnrDetailsWithHeaderMessage,
  getSplitPnrDetails,
  stateWithAllUnSelectedIdsFormData
} from 'test/builders/model/selectPassengersPageBuilder';

describe('SelectPassengersPage', () => {
  const formId = 'TestId';
  let hideErrorHeaderMsgFnStub;
  let updateFormFieldDataValueFnStub;

  beforeEach(() => {
    hideErrorHeaderMsgFnStub = hideErrorHeaderMsg.mockImplementation(() => ({ type: 'FAKE-ACTION' }));
    updateFormFieldDataValueFnStub = updateFormFieldDataValue.mockImplementation(() => ({ type: 'FAKE-ACTION' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call updateFormFieldDataValueFn and hideErrorHeaderMsg on component did update when showEmailFieldWithTexts is true', async () => {
    createComponent({ showEmailFieldWithTexts: true });

    expect(updateFormFieldDataValueFnStub).not.toHaveBeenCalledWith();
    expect(hideErrorHeaderMsgFnStub).not.toHaveBeenCalledWith();
  });

  it('should call updateFormFieldDataValueFn and hideErrorHeaderMsg on component did update when showEmailFieldWithTexts is false', async () => {
    createComponent({ showEmailFieldWithTexts: false });

    expect(updateFormFieldDataValueFnStub).toHaveBeenCalledWith(formId, 'receiptEmail', '');
    expect(hideErrorHeaderMsgFnStub).toHaveBeenCalledWith();
  });

  it('should call updateFormFieldDataValueFn on passenger selection', async () => {
    const { container } = createComponent();
    const toggleSwitch = container.querySelector('.toggle-switch');

    fireEvent.click(toggleSwitch);

    expect(updateFormFieldDataValueFnStub).toHaveBeenCalledWith(formId, 'id1', true);
  });

  it('should call updateFormFieldDataValueFn with formId, passengerId and value as true on mount', async () => {
    createComponent();

    expect(updateFormFieldDataValueFnStub).toHaveBeenCalledWith(formId, 'id1', true);
    expect(updateFormFieldDataValueFnStub).toHaveBeenCalledWith(formId, 'receiptEmail', '');
  });

  it('should render the page correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the page with DynamicWaiverMessages when messages exist', () => {
    const { container } = createComponent({ splitPnrDetails: airChangeSplitPnrDetailsWithDWMessages });

    expect(container).toMatchSnapshot();
  });

  it('should render the page with header message when headerMessage exists', () => {
    const { container } = createComponent({ splitPnrDetails: airChangeSplitPnrDetailsWithHeaderMessage });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}, state = stateWithAllUnSelectedIdsFormData) => {
    const defaultProps = {
      formData: { id1: true, id2: true },
      formId,
      hideErrorHeaderMsgFn: hideErrorHeaderMsgFnStub,
      showBoundSelection: true,
      splitPnrDetails: getSplitPnrDetails(),
      updateFormFieldDataValueFn: updateFormFieldDataValueFnStub
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={configureMockStore()(state)}>
        <SelectPassengersPage {...finalProps} />
      </Provider>
    );
  };
});
